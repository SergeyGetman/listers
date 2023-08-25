import { AppDispatch, RootState } from '../store';
import { getTransportItem } from './garageThunk';
import { PlannerItemSocketType } from '../../components/GeneralSockets/GeneralSockets';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { getPaymentItem } from '../payment/paymentThunk';
import { getModalByName } from '../../shared/functions/getModalByName';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import modalObserver from '../../shared/utils/observers/modalObserver';

export const garageGlobalSocketUpdateItem =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const transportId = getState().garage.transport.data?.id;
    if (transportId && id === transportId) {
      dispatch(getTransportItem(id));
    }
  };

export const garageSocketUpdatePaymentModal =
  (event: PlannerItemSocketType, isList = true) =>
  (dispatch: AppDispatch) => {
    if (event?.item?.model_type === PlannerItemModelTypeEnum.payment) {
      dispatch(getPaymentItem({ paymentId: event.item.id, is_list: isList ? 1 : 0 })).then((result) => {
        if (getPaymentItem.fulfilled.match(result)) {
          const modal = getModalByName(ModalNamesEnum.viewPaymentModal);
          if (modal?.isOpen && modal?.props?.paymentId === event.item.id) {
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
