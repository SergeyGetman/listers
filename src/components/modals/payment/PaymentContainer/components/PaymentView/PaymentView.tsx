import { Box, Grid, Typography } from '@mui/material';
import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PaymentCard from '../../../../../../pages/Settings/components/Wallet/components/PaymentCard';
import MuiBaseInputView from '../../../../../formElements/MuiBaseInputView';
import MuiDefaultDrawerHeader from '../../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import { SubscriptionInfoModel } from '../../../../../../shared/models/plans.model';
import { PlanNameEnum, PlanPeriodEnum } from '../../../../../../shared/enums/planPeriodEnum';
import { ProfileExpiredModel } from '../../../../../../shared/models/profile/profile.model';
import ModalFooter from '../../../../../modalsElements/containers/Footer/ModalFooter';
import i18next from '../../../../../../shared/locales/i18n';
import { useAppSelector } from '../../../../../../shared/hooks/redux';

type Props = {
  onClose: () => void;
  setIsView: (isView: boolean) => void;
  data: SubscriptionInfoModel;
  isBilling: boolean;
  expired?: ProfileExpiredModel;
  handleBillingPay: () => void;
  handleCancelSubscription: () => void;
  loading: boolean;
  monthCharge: string;
  nextDueDate: string;
  isShowPaymentFields: boolean;
  handleDeleteCard: (id: number) => void;
};

const PaymentView: FC<Props> = ({
  onClose,
  setIsView,
  data,
  isBilling,
  expired,
  loading,
  handleBillingPay,
  handleCancelSubscription,
  monthCharge,
  nextDueDate,
  isShowPaymentFields,
  handleDeleteCard,
}) => {
  const { t } = useTranslation();
  const profile = useAppSelector((state) => state.profile.data);

  const menu = useMemo(() => {
    return [
      { label: i18next.t('general.actionMenus.edit'), callback: () => setIsView(false) },
      {
        label: i18next.t('general.actionMenus.deleteCard'),
        isDisabled: !data.card,
        callback: () => handleDeleteCard(data.card.id),
      },
    ];
  }, [data, handleDeleteCard, setIsView]);

  const getExpiredText = useCallback(() => {
    if (expired) {
      if (expired.period === PlanPeriodEnum.year) {
        return expired.name;
      }
      if (expired.period === PlanPeriodEnum.month) {
        let text = expired.name;
        for (let i = 0; i < expired.user_hubs.length; i++) {
          text += `, ${expired.user_hubs[i].name}`;
        }

        return text;
      }
      if (expired.name === PlanNameEnum.starter && expired.is_hubs) {
        let text = expired.user_hubs[0].name;
        for (let i = 1; i < expired.user_hubs.length; i++) {
          text += `, ${expired.user_hubs[i].name}`;
        }

        return text;
      }
      return '';
    }

    return '';
  }, [expired]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <MuiDefaultDrawerHeader
        isShowCloseBtn={!isBilling}
        onClose={onClose}
        title={isBilling ? t('general.header.billingIssue') : t('general.containers.cardInformation')}
        isShowHeaderMenu
        headerMenuList={menu}
      />
      <Box sx={{ p: '30px 10px 0 10px', flexGrow: 1 }}>
        <PaymentCard card={data.card} />

        {isShowPaymentFields && (
          <Grid sx={{ mt: '16px' }} container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={6} item>
              <MuiBaseInputView content={monthCharge} label="" />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView content={nextDueDate} label="" />
            </Grid>
          </Grid>
        )}

        {isBilling && (
          <Box sx={{ mt: '30px' }}>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              <Box>
                <ErrorOutlineIcon
                  sx={(theme) => ({
                    color: theme.palette.error.main,
                    fontSize: '16px',
                  })}
                />
              </Box>
              <Box>
                <Typography variant="default">
                  {t('wallet.payment.billingIssue.recommend.firstPart')}{' '}
                  <Typography sx={{ textTransform: 'capitalize' }} component="span">
                    ({getExpiredText()})
                  </Typography>{' '}
                  {t('wallet.payment.billingIssue.recommend.secondPart')}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: '5px', mt: '30px' }}>
              <Box>
                <ErrorOutlineIcon
                  sx={(theme) => ({
                    color: theme.palette.case.main.blue.high,
                    fontSize: '16px',
                  })}
                />
              </Box>
              <Box>
                <Typography variant="default">{t('wallet.payment.billingIssue.inform')}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      {isBilling ? (
        <ModalFooter
          isShow
          middleBtnProps={{
            color: 'secondary',
            isLoadingBtn: true,
            loading,
            isShow: true,
            label: t('general.buttons.cancelSubscription'),
            onClick: () => handleCancelSubscription(),
          }}
          rightBtnProps={{
            isLoadingBtn: true,
            isStopPropagation: false,
            isShow: true,
            label: t('general.buttons.pay'),
            variant: 'contained',
            loading,
            onClick: () => handleBillingPay(),
          }}
        />
      ) : (
        <>
          {profile?.subscription?.package_canceled === null ||
          profile?.next_subscription?.package_canceled === null ? (
            <ModalFooter
              isShow
              middleBtnProps={{
                color: 'secondary',
                isLoadingBtn: true,
                loading,
                isShow: true,
                label: t('general.buttons.cancelSubscription'),
                onClick: () => handleCancelSubscription(),
              }}
            />
          ) : (
            <>
              {data.card ? (
                <ModalFooter
                  isShow
                  middleBtnProps={{
                    color: 'secondary',
                    isLoadingBtn: false,
                    isShow: true,
                    label: t('general.actionMenus.deleteCard'),
                    onClick: () => handleDeleteCard(data.card.id),
                  }}
                />
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default PaymentView;
