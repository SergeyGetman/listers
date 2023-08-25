import { AppDispatch } from '../store';
import { PlannerItemSocketType } from '../../components/GeneralSockets/GeneralSockets';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { getTask } from '../roadmap/roadmapThunk';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { getModalByName } from '../../shared/functions/getModalByName';
import { getEvent } from '../events/eventsThunk';
import { getPaymentItem } from '../payment/paymentThunk';
import modalObserver from '../../shared/utils/observers/modalObserver';

export const calendarSocketUpdateItem = (event: PlannerItemSocketType) => (dispatch: AppDispatch) => {
  if (event?.item?.model_type === PlannerItemModelTypeEnum.task) {
    dispatch(getTask({ taskId: event.item.id, is_list: 1 })).then((result) => {
      if (getTask.fulfilled.match(result)) {
        const modal = getModalByName(ModalNamesEnum.viewTaskModal);
        if (modal?.isOpen && modal?.props?.taskId === `${event.item.id}`) {
          modalObserver.updateModalProps(ModalNamesEnum.viewTaskModal, {
            props: {
              data: result.payload,
            },
          });
        }
      }
    });
  } else if (event?.item?.model_type === PlannerItemModelTypeEnum.event) {
    dispatch(getEvent({ eventId: event.item.id })).then((result) => {
      if (getEvent.fulfilled.match(result)) {
        const modal = getModalByName(ModalNamesEnum.viewEventModal);
        if (modal?.isOpen && modal?.props?.eventId === `${event.item.id}`) {
          modalObserver.updateModalProps(ModalNamesEnum.viewEventModal, {
            props: {
              data: result.payload,
            },
          });
        }
      }
    });
  } else if (event?.item?.model_type === PlannerItemModelTypeEnum.payment) {
    dispatch(getPaymentItem({ paymentId: event.item.id })).then((result) => {
      if (getPaymentItem.fulfilled.match(result)) {
        const modal = getModalByName(ModalNamesEnum.viewPaymentModal);
        if (modal?.isOpen && modal?.props?.paymentId === `${event.item.id}`) {
          modalObserver.updateModalProps(ModalNamesEnum.viewPaymentModal, {
            props: {
              data: result.payload,
            },
          });
        }
      }
    });
  }
};
