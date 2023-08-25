import i18next from 'i18next';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import { parsePhoneNumber } from 'react-phone-number-input';
import { AppDispatch } from '../../../store/store';
import { NetworkUserModel } from '../../../shared/models/network';
import {
  networkCancel,
  networkCancelFuture,
  networkResend,
  networkResendFutureRequest,
  pendingConfirm,
} from '../../../store/network/networkThunk';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { networkActionsType } from '../../../shared/enums/network/networkActionsType.enum';
import router from '../../../shared/services/router';
import { setNetworkSelectUserInfo } from '../../../store/network/networkSlice';

export const networkActions = ({
  type,
  dispatch,
  user,
  navigate,
}: {
  type: networkActionsType;
  dispatch: AppDispatch;
  navigate?: NavigateFunction;
  user: NetworkUserModel;
}) => {
  switch (type) {
    case networkActionsType.confirmPendingRequest:
      return dispatch(pendingConfirm(user.friend_id)).then((result: any) => {
        if (pendingConfirm.fulfilled.match(result)) {
          NotificationService.success(
            i18next.t('network.toasts.requestConfirm', { userFullName: user.full_name }),
          );
          if (navigate) {
            navigate(`${router.networkNew.path}`);
          }
        }
      });
      break;
    case networkActionsType.declinePendingRequest:
      return modalObserver.addModal(ModalNamesEnum.alertModal, {
        props: {
          rightBtnProps: {
            label: i18next.t('general.buttons.confirm'),
            isShow: true,
            onClick: () => {
              dispatch(networkCancel(user.friend_id)).then((result: any) => {
                if (networkCancel.fulfilled.match(result)) {
                  NotificationService.success(
                    i18next.t('network.toasts.requestCanceled', { userFullName: user.full_name }),
                  );
                  modalObserver.removeModal(ModalNamesEnum.alertModal);
                  if (navigate) {
                    navigate(`${router.networkNew.path}`);
                  }
                }
              });
            },
          },
          leftBtnProps: {
            label: i18next.t('general.buttons.cancel'),
            isShow: true,
          },
          modalContent: {
            header: i18next.t('network.confirmModal.declinePendingRequest.header'),
            title: i18next.t('network.confirmModal.declinePendingRequest.title', {
              userFullName: user.full_name,
            }),
            subtitle: i18next.t('network.confirmModal.declinePendingRequest.subtitle'),
            variantIcon: 'warning',
          },
        },
      });
      break;
    case networkActionsType.canselSentRequest:
      return modalObserver.addModal(ModalNamesEnum.alertModal, {
        props: {
          rightBtnProps: {
            label: i18next.t('general.buttons.confirm'),
            isShow: true,
            onClick: () => {
              dispatch(networkCancel(user.friend_id)).then((result: any) => {
                if (networkCancel.fulfilled.match(result)) {
                  NotificationService.success(
                    i18next.t('network.toasts.connectionRequestCanceled', { userFullName: user.full_name }),
                  );
                  modalObserver.removeModal(ModalNamesEnum.alertModal);
                  if (navigate) {
                    navigate(`${router.networkNew.path}`);
                  }
                }
              });
            },
          },
          leftBtnProps: {
            label: i18next.t('general.buttons.cancel'),
            isShow: true,
          },
          modalContent: {
            header: i18next.t('network.confirmModal.canselSentRequest.header'),
            title: i18next.t('network.confirmModal.canselSentRequest.title'),
            subtitle: i18next.t('network.confirmModal.canselSentRequest.subtitle'),
            variantIcon: 'warning',
          },
        },
      });
      break;
    case networkActionsType.canselFutureSentRequest:
      return modalObserver.addModal(ModalNamesEnum.alertModal, {
        props: {
          rightBtnProps: {
            label: i18next.t('general.buttons.confirm'),
            isShow: true,
            onClick: () => {
              dispatch(networkCancelFuture(user.friend_id)).then((result: any) => {
                if (networkCancelFuture.fulfilled.match(result)) {
                  NotificationService.success(
                    i18next.t('network.toasts.connectionRequestCanceled', { userFullName: user.full_name }),
                  );
                  modalObserver.removeModal(ModalNamesEnum.alertModal);
                  if (navigate) {
                    navigate(`${router.networkNew.path}`);
                  }
                }
              });
            },
          },
          leftBtnProps: {
            label: i18next.t('general.buttons.cancel'),
            isShow: true,
          },
          modalContent: {
            header: i18next.t('network.confirmModal.canselSentRequest.header'),
            title: i18next.t('network.confirmModal.canselSentRequest.title'),
            subtitle: i18next.t('network.confirmModal.canselSentRequest.subtitle'),
            variantIcon: 'warning',
          },
        },
      });
      break;
    case networkActionsType.resendRequest:
      return dispatch(networkResend(user.friend_id)).then((result: any) => {
        if (networkResend.fulfilled.match(result)) {
          modalObserver.removeModal(ModalNamesEnum.alertModal);
        }
        dispatch(setNetworkSelectUserInfo(user.id));
      });
    case networkActionsType.resendFutureRequest:
      return dispatch(
        networkResendFutureRequest({
          friendId: user.friend_id,
          data: {
            login: user.email ? user.email : user.phone,
            country: user.phone ? parsePhoneNumber(user.phone)?.country : '',
            role: user.role,
          },
        }),
      ).then((result: any) => {
        if (networkResendFutureRequest.fulfilled.match(result)) {
          NotificationService.success(
            i18next.t('network.toasts.futureRequestResend', { userFullName: user.full_name }),
          );
          modalObserver.removeModal(ModalNamesEnum.alertModal);
          dispatch(setNetworkSelectUserInfo(user.id));
        }
      });

    default:
      return null;
      break;
  }
};
