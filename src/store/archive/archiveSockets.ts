import { PlannerItemSocketType } from '../../components/GeneralSockets/GeneralSockets';
import { AppDispatch } from '../store';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { getTask } from '../roadmap/roadmapThunk';
import { getModalByName } from '../../shared/functions/getModalByName';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { getEvent } from '../events/eventsThunk';
import { updateArchiveItem } from './archiveSlice';
import modalObserver from '../../shared/utils/observers/modalObserver';

export const archiveSocketUpdateItem =
  (event: PlannerItemSocketType, isList = true) =>
  (dispatch: AppDispatch) => {
    if (event?.item?.model_type === PlannerItemModelTypeEnum.task) {
      dispatch(getTask({ taskId: event.item.id, is_list: isList ? 1 : 0 })).then((result) => {
        if (getTask.fulfilled.match(result)) {
          dispatch(updateArchiveItem(result.payload));
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
      dispatch(getEvent({ eventId: event.item.id, is_list: isList ? 1 : 0 })).then((result) => {
        if (getEvent.fulfilled.match(result)) {
          dispatch(updateArchiveItem(result.payload));
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
    }
  };
