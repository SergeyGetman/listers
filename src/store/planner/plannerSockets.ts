import i18next from 'i18next';
import { AppDispatch, RootState } from '../store';
import { PlannerItemSocketType } from '../../components/GeneralSockets/GeneralSockets';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { getTask } from '../roadmap/roadmapThunk';
import { removePlannerListItem, updatePlannerListItemWithoutSplit } from './plannerSlice';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { getModalByName } from '../../shared/functions/getModalByName';
import { getEvent } from '../events/eventsThunk';
import { getPaymentItem } from '../payment/paymentThunk';
import router from '../../shared/services/router';
import { removeRoadmapItem } from '../roadmap/roadmapSlice';
import { removeEventItem } from '../events/eventsSlice';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import modalObserver from '../../shared/utils/observers/modalObserver';
import { removeChecklist } from '../todo/Checklists/checklistsSlice';
import { removeNote } from '../todo/Notes/notesSlice';

export const plannerSocketUpdateItem =
  (event: PlannerItemSocketType, isList = true, isUpdateModal = true) =>
  (dispatch: AppDispatch) => {
    if (event?.item?.model_type === PlannerItemModelTypeEnum.task) {
      dispatch(getTask({ taskId: event.item.id, is_list: isList ? 1 : 0 })).then((result) => {
        if (getTask.fulfilled.match(result)) {
          dispatch(updatePlannerListItemWithoutSplit(result.payload));

          if (isUpdateModal) {
            const modal = getModalByName(ModalNamesEnum.viewTaskModal);

            if (modal?.isOpen && modal?.props?.taskId === `${event.item.id}`) {
              modalObserver.updateModalProps(ModalNamesEnum.viewTaskModal, {
                props: {
                  data: result.payload,
                },
              });
            }
          }
        }
      });
    } else if (event?.item?.model_type === PlannerItemModelTypeEnum.event) {
      dispatch(getEvent({ eventId: event.item.id, is_list: isList ? 1 : 0 })).then((result) => {
        if (getEvent.fulfilled.match(result)) {
          dispatch(updatePlannerListItemWithoutSplit(result.payload));
          if (isUpdateModal) {
            const modal = getModalByName(ModalNamesEnum.viewEventModal);
            if (modal?.isOpen && modal?.props?.eventId === `${event.item.id}`) {
              modalObserver.updateModalProps(ModalNamesEnum.viewEventModal, {
                props: {
                  data: result.payload,
                },
              });
            }
          }
        }
      });
    } else if (event?.item?.model_type === PlannerItemModelTypeEnum.payment) {
      dispatch(getPaymentItem({ paymentId: event.item.id, is_list: isList ? 1 : 0 })).then((result) => {
        if (getPaymentItem.fulfilled.match(result)) {
          dispatch(updatePlannerListItemWithoutSplit(result.payload));
          if (isUpdateModal) {
            const modal = getModalByName(ModalNamesEnum.viewPaymentModal);
            if (modal?.isOpen && modal?.props?.paymentId === `${event.item.id}`) {
              modalObserver.updateModalProps(ModalNamesEnum.viewPaymentModal, {
                props: {
                  data: result.payload,
                },
              });
            }
          }
        }
      });
    }
  };

export const plannerSocketDeleteItem =
  (event: PlannerItemSocketType, location: any) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { id } = getState().profile.data;

    if (id !== event.user.id) {
      if (
        event.item.model_type === PlannerItemModelTypeEnum.todo &&
        location.pathname === `${router.todo.path}`
      ) {
        dispatch(removeChecklist(event.item.id));
      } else if (
        event.item.model_type === PlannerItemModelTypeEnum.note &&
        location.pathname === `${router.todo.path}/${router.todo.children.notes.path}`
      ) {
        dispatch(removeNote(event.item.id));
      } else if (
        event.item.model_type === PlannerItemModelTypeEnum.task &&
        location.pathname === router.journal.path
      ) {
        dispatch(removePlannerListItem({ id: event.item.id, modelType: PlannerItemModelTypeEnum.task }));
      } else if (
        event.item.model_type === PlannerItemModelTypeEnum.task &&
        location.pathname === `${router.roadmap.path}`
      ) {
        dispatch(removeRoadmapItem(event.item.id));
      } else if (
        event.item.model_type === PlannerItemModelTypeEnum.event &&
        location.pathname === `${router.events.path}`
      ) {
        dispatch(removeEventItem(event.item.id));
      } else if (
        event.item.model_type === PlannerItemModelTypeEnum.event &&
        location.pathname === router.journal.path
      ) {
        dispatch(removePlannerListItem({ id: event.item.id, modelType: PlannerItemModelTypeEnum.event }));
      }

      // Notification

      if (event.item.model_type === PlannerItemModelTypeEnum.task) {
        NotificationService.plannerItemUpdate(
          i18next.t('general.notifications.taskDeletedBy', { title: event.item.title }),
          `${event.user.first_name} ${event.user.last_name}`,
        );
      } else if (event.item.model_type === PlannerItemModelTypeEnum.event) {
        NotificationService.plannerItemUpdate(
          i18next.t('general.notifications.eventDeletedBy', { title: event.item.title }),
          `${event.user.first_name} ${event.user.last_name}`,
        );
      } else if (event.item.model_type === PlannerItemModelTypeEnum.todo) {
        NotificationService.plannerItemUpdate(
          i18next.t('general.notifications.todoDeletedBy', { title: event.item.title }),
          `${event.user.first_name} ${event.user.last_name}`,
        );
      }
    }
  };
