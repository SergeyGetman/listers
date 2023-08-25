import { PlannerItemSocketType } from '../../components/GeneralSockets/GeneralSockets';
import { AppDispatch } from '../store';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { getModalByName } from '../../shared/functions/getModalByName';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { getEvent } from './eventsThunk';
import { updatedEventItem } from './eventsSlice';
import modalObserver from '../../shared/utils/observers/modalObserver';

export const eventsSocketUpdateItem =
  (event: PlannerItemSocketType, isList = true, isUpdateModal = true) =>
  (dispatch: AppDispatch) => {
    if (event?.item?.model_type === PlannerItemModelTypeEnum.event) {
      dispatch(getEvent({ eventId: event.item.id, is_list: isList ? 1 : 0 })).then((result) => {
        if (getEvent.fulfilled.match(result)) {
          dispatch(updatedEventItem(result.payload));
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
    }
  };
