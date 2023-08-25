import { AppDispatch } from '../store';
import { PlannerItemSocketType } from '../../components/GeneralSockets/GeneralSockets';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { getTask } from './roadmapThunk';

import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { getModalByName } from '../../shared/functions/getModalByName';
import { updateRoadmapItem } from './roadmapSlice';
import modalObserver from '../../shared/utils/observers/modalObserver';

export const roadmapSocketUpdateItem =
  (event: PlannerItemSocketType, isList = true, isUpdateModal = true) =>
  (dispatch: AppDispatch) => {
    if (event?.item?.model_type === PlannerItemModelTypeEnum.task) {
      dispatch(getTask({ taskId: event.item.id, is_list: isList ? 1 : 0 })).then((result) => {
        if (getTask.fulfilled.match(result)) {
          dispatch(updateRoadmapItem(result.payload));
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
    }
  };
