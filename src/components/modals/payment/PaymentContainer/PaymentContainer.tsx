import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import TagManager from 'react-gtm-module';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import PaymentEdit from './components/PaymentEdit';
import PaymentView from './components/PaymentView';
import { PlanModel, SubscriptionInfoModel } from '../../../../shared/models/plans.model';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import {
  billingPay,
  cancelSubscription,
  createPaymentMethod,
  createSubscription,
  getSubscriptionInfo,
} from '../../../../store/settings/settingsThunk';
import { setLoading } from '../../../../store/Common/commonSlice';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { PlanPeriodEnum } from '../../../../shared/enums/planPeriodEnum';
import { ProfileExpiredModel } from '../../../../shared/models/profile/profile.model';
import { activateHub, deletePaymentCard, getProfileInfo } from '../../../../store/Profile/profile.actions';
import { HubModel } from '../../../../shared/models/hub.model';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { getWalletItems } from '../../../../store/wallet/walletThunk';
import { setWalletData } from '../../../../store/wallet/walletSlice';
import PaymentContainerSkeleton from './components/PaymentContainerSkeleton';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type Props = {
  onClose: () => void;
  plan?: PlanModel;
  isBilling?: boolean;
  expired?: ProfileExpiredModel;
  isEdit?: boolean;
  hub?: HubModel;
};
const PaymentContainer: FC<Props> = ({ onClose, plan, isBilling = false, expired, isEdit = false, hub }) => {
  const [isView, setIsView] = useState(!isEdit);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfoModel | null>(null);
  const { filters } = useAppSelector(({ wallet }) => wallet);
  const profileData = useAppSelector(({ profile }) => profile.data);

  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleOpenIframe = () => {
    if (subscriptionInfo !== null && subscriptionInfo?.subscription.payment_url !== null) {
      window.location.href = subscriptionInfo?.subscription.payment_url;
    }
  };

  const getDate = (date: string) => {
    const isThisMounts = +moment().format('D') < 7;
    if (isThisMounts) {
      return `${moment(date, 'YYYY-MM-DD HH:mm:ss').format('MMMM')}`;
    }
    return `${moment(date, 'YYYY-MM-DD HH:mm:ss').add(1, 'month').format('MMMM')}`;
  };

  const monthCharge = useMemo(() => {
    if (isBilling && expired) {
      return expired.period === PlanPeriodEnum.month
        ? `Monthly charge - ${expired.amount / 100}$/month`
        : `Yearly charge - ${expired.amount / 100}$/year`;
    }

    if (hub) {
      if (hub.amount) return `Monthly charge - ${hub.amount / 100}$/month`;
    }

    if (plan) {
      return plan?.period === PlanPeriodEnum.month
        ? `Monthly charge - ${plan.amount / 100}$/month`
        : `Yearly charge - ${plan.amount / 100}$/year`;
    }
    if (subscriptionInfo?.subscription) {
      return subscriptionInfo.subscription.period === PlanPeriodEnum.month
        ? `Monthly charge - ${subscriptionInfo.subscription.amount / 100}$/month`
        : `Yearly charge - ${subscriptionInfo.subscription.amount / 100}$/year`;
    }
    return '';
  }, [expired, hub, isBilling, plan, subscriptionInfo]);

  const nextDueDate = useMemo(() => {
    if (subscriptionInfo) {
      if (plan) {
        const isThisMounts = +moment().format('D') < 7;
        if (isThisMounts) {
          return `Next due date - ${moment().format('MMMM')} 14`;
        }
        return `Next due date - ${moment().add(1, 'month').format('MMMM')} 14`;
      }

      if (hub) {
        const isThisHubMounts = +moment().format('D') < 7;
        if (isThisHubMounts) {
          return `Next due date - ${moment().format('MMMM')} 14`;
        }
        return `Next due date - ${moment().add(1, 'month').format('MMMM')} 14`;
      }

      if (isBilling) {
        return subscriptionInfo.subscription.period === PlanPeriodEnum.month
          ? `Next due date - ${moment(subscriptionInfo.subscription.expired_at, 'YYYY-MM-DD HH:mm:ss')
              .add(1, 'month')
              .format('MMMM DD')}`
          : `Next due date - ${moment(subscriptionInfo.subscription.expired_at, 'YYYY-MM-DD HH:mm:ss')
              .add(1, 'year')
              .format('MMMM DD / YYYY')}`;
      }

      if (subscriptionInfo?.subscription) {
        return subscriptionInfo.subscription.period === PlanPeriodEnum.month
          ? `Next due date - ${moment(subscriptionInfo.subscription.expired_at, 'YYYY-MM-DD HH:mm:ss').format(
              'MMMM DD',
            )}`
          : `Next due date - ${moment(subscriptionInfo.subscription.expired_at, 'YYYY-MM-DD HH:mm:ss').format(
              'MMMM DD / YYYY',
            )}`;
      }
    }

    return '';
  }, [hub, isBilling, plan, subscriptionInfo]);

  const isShowPaymentFields = useMemo(() => {
    if (isBilling) return true;
    return !!((plan || hub) && subscriptionInfo && subscriptionInfo.card === null);
  }, [hub, isBilling, plan, subscriptionInfo]);

  const handleUpdateWallet = () => {
    dispatch(getWalletItems(filters)).then((result) => {
      if (getWalletItems.fulfilled.match(result)) {
        dispatch(setWalletData(result.payload));
      }
    });
  };

  const getSubscription = useCallback(
    (isSetEdit: boolean) => {
      dispatch(getSubscriptionInfo()).then((response) => {
        if (getSubscriptionInfo.fulfilled.match(response)) {
          if (isSetEdit === false) {
            if (response.payload.card) {
              setIsView(true);
            } else {
              setIsView(false);
            }
          }
          setSubscriptionInfo(response.payload);
        }
      });
    },
    [dispatch],
  );

  const handleCreateSubscription = () => {
    if (plan) {
      dispatch(setLoading(true));
      dispatch(createSubscription({ id: plan.id }))
        .then((response) => {
          if (createSubscription.fulfilled.match(response)) {
            modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
              props: {
                title: 'Congratulations!',
                text:
                  'Yay! You’re embarking on a great journey! hubmee can’t wait to see your incredible progress as your subscription plan upgrades.\n' +
                  `Hurry up and try everything the new subscription plan has to offer until the 14th of ${getDate(
                    moment().format('YYYY-MM-DD HH:mm:ss') || '',
                  )}`,
                isHideFooter: true,
              },
            });
            handleUpdateWallet();
            if (
              response.payload.user_status === 'requires_action' ||
              response.payload.user_status === 'requires_payment_method'
            ) {
              window.location = response.payload.payment_url;
            }
          } else {
            if (response.payload?.status === 425) {
              modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
                props: {
                  title: 'Congratulations!',
                  text:
                    'Yay! You’re embarking on a great journey! hubmee can’t wait to see your incredible progress as your subscription plan upgrades.\n' +
                    `Hurry up and try everything the new subscription plan has to offer until the 14th of ${getDate(
                      moment().format('YYYY-MM-DD HH:mm:ss') || '',
                    )}`,
                  isHideFooter: true,
                },
              });
              handleUpdateWallet();
            }
          }
        })
        .finally(() => dispatch(setLoading(false)));
    }
  };

  const handleBillingPay = () => {
    if (expired) {
      if (
        subscriptionInfo?.subscription.payment_url &&
        subscriptionInfo?.subscription?.user_status === 'requires_action'
      ) {
        handleOpenIframe();
        return;
      }
      setIsLoading(true);
      dispatch(billingPay(expired.id))
        .then((result) => {
          if (billingPay.fulfilled.match(result)) {
            handleUpdateWallet();
            modalObserver.removeAllModals();
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleCancelSubscription = () => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.confirmCancelSubscription.title'),
        text: t('general.modals.confirmCancelSubscription.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          const subscriptionId = isBilling
            ? profileData?.expired[0]?.id
            : profileData?.subscription?.package_canceled === null
            ? profileData?.subscription?.id
            : profileData?.next_subscription?.id;
          dispatch(setLoading(true));

          dispatch(cancelSubscription(subscriptionId))
            .then((result) => {
              if (cancelSubscription.fulfilled.match(result)) {
                if (process.env.REACT_APP_ENV === 'production') {
                  TagManager.dataLayer({
                    dataLayer: {
                      event: 'cancel_subscription_btn_click',
                    },
                  });
                }
                if (isBilling) {
                  modalObserver.removeModal(ModalNamesEnum.payment);
                }
                dispatch(setLoading(false));
              } else {
                dispatch(setLoading(false));
              }
            })
            .catch(() => {
              dispatch(setLoading(false));
            });
        },
      },
    });
  };

  const handleCreatePaymentMethod = (source: string, callback: (val: boolean) => void) => {
    dispatch(createPaymentMethod({ source })).then((response) => {
      dispatch(setLoading(true));
      if (createPaymentMethod.fulfilled.match(response)) {
        callback(false);
        getSubscription(false);
        dispatch(getProfileInfo()).then((res) => {
          if (getProfileInfo.fulfilled.match(res)) {
            if (!!res?.payload?.expired?.length) {
              handleBillingPay();
            } else {
              handleUpdateWallet();
              modalObserver.closeAllModals();
            }
          }
        });
        dispatch(setLoading(false));
      } else {
        callback(false);
        dispatch(setLoading(false));
      }
      if (hub) {
        dispatch(setLoading(true));
        dispatch(activateHub(hub.id))
          .then((result) => {
            if (activateHub.fulfilled.match(result)) {
              onClose();
              NotificationService.success(t('general.notifications.activateHub'));
              handleUpdateWallet();
              dispatch(getProfileInfo());
            }
          })
          .finally(() => dispatch(setLoading(false)));

        return;
      }

      if (plan) {
        handleCreateSubscription();
        onClose();
      }
    });
  };

  const onDeleteCard = (cardId: number) => {
    dispatch(setLoading(true));
    dispatch(deletePaymentCard(cardId))
      .then((result) => {
        if (deletePaymentCard.fulfilled.match(result)) {
          // dispatch(removeAllModals());
          getSubscription(false);
          handleUpdateWallet();
          dispatch(getProfileInfo());
          if (isBilling) {
            modalObserver.removeModal(ModalNamesEnum.payment);
          }
        }
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const handleDeleteCard = (cardId: number) => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.deleteCard.title'),
        text: t('general.modals.deleteCard.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => onDeleteCard(cardId),
      },
    });
  };

  useEffect(() => {
    getSubscription(isEdit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSubscription]);

  return (
    <>
      {subscriptionInfo === null ? (
        <PaymentContainerSkeleton />
      ) : isView ? (
        <PaymentView
          isShowPaymentFields={isShowPaymentFields}
          nextDueDate={nextDueDate}
          onClose={onClose}
          setIsView={(value) => setIsView(value)}
          data={subscriptionInfo}
          isBilling={isBilling}
          loading={isLoading}
          handleBillingPay={handleBillingPay}
          handleCancelSubscription={handleCancelSubscription}
          expired={expired}
          monthCharge={monthCharge}
          handleDeleteCard={handleDeleteCard}
        />
      ) : (
        <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY as string, { locale: 'en' })}>
          <PaymentEdit
            isShowPaymentFields={isShowPaymentFields}
            nextDueDate={nextDueDate}
            isCard={!!subscriptionInfo.card}
            isBilling={isBilling}
            monthCharge={monthCharge}
            setIsView={(value) => setIsView(value)}
            plan={plan}
            onClose={onClose}
            handleCreatePaymentMethod={handleCreatePaymentMethod}
          />
        </Elements>
      )}
    </>
  );
};

export default PaymentContainer;
