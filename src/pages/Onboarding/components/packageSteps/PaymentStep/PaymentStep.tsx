import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useCallback, useState, useMemo } from 'react';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useTranslation, Trans } from 'react-i18next';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import DoneIcon from '@mui/icons-material/Done';
import TagManager from 'react-gtm-module';
import Promocode from '../../../../../components/modals/plan/DowngradePlanModal/DowngradePlanContainer/components/Promocode';
import stripeGuardImg from '../../../../../assets/Images/stripeSecurity.png';
import cardTypeImg from '../../../../../assets/Images/cardType.png';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { setLoading } from '../../../../../store/Common/commonSlice';
import {
  createPaymentMethod,
  createSubscription,
  getCuponInfo,
} from '../../../../../store/settings/settingsThunk';
import { CouponModel, PlanModel } from '../../../../../shared/models/plans.model';
import { setViewDataItem } from '../../../../../store/Profile/profile.actions';
import { ProfileViewDataEnum } from '../../../../../shared/enums/profileViewData.enum';
import MuiBaseTextFiled from '../../../../../components/formElements/MuiBaseTextFiled';
import {
  StripeTextFieldCVC,
  StripeTextFieldExpiry,
  StripeTextFieldNumber,
} from '../../../../../components/formElements/stripeElements/StripeTextField/StripeTextField';
import { PlansPricingItemEnum } from '../../../../../shared/enums/plansPricingItem.enum';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { PlanPeriodEnum } from '../../../../../shared/enums/planPeriodEnum';
import { selectGoogleTagManagerOnboardingPlansEvents } from '../../../../../shared/utils/selectGoogleTagManagerOnboardingPlansEvents';
import OnboardingLayout from '../../OnboardingLayout';

type Props = {
  isUpgradeModal?: boolean;
  plan: PlanModel;
  handleConfirm: () => void;
  handleBack: () => void;
  isTrial: boolean;
  isPromocode: boolean;
  period: PlanPeriodEnum;
  isShowTitleCloseBtn?: boolean;
  isHideBackBtn?: boolean;
  handleTitleCloseBtn?: () => void;
};
const PaymentStep: FC<Props> = ({
  plan,
  handleConfirm,
  handleBack,
  isTrial,
  isPromocode,
  period,
  isUpgradeModal = false,
  isShowTitleCloseBtn = false,
  isHideBackBtn = false,
  handleTitleCloseBtn,
}) => {
  const stripe = useStripe();
  const { t } = useTranslation();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const [couponState, setCouponState] = useState<CouponModel | null>(null);
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [state, setState] = useState({
    cardNumberComplete: false,
    expiredComplete: false,
    cvcComplete: false,
    cardNumberError: '',
    expiredError: '',
    cvcError: '',
    name: '',
    nameError: '',
  });

  const validateName = (value: string) => {
    setState((prevState) => ({ ...prevState, nameError: '' }));
    if (value.trim().length < 2) {
      setState((prevState) => ({
        ...prevState,
        nameError: t('validation.general.min', { field: t('general.fieldNames.cardholderName'), count: 2 }),
      }));
    }
    if (value.trim() === '') {
      setState((prevState) => ({
        ...prevState,
        nameError: t('validation.general.required', {
          field: t('general.fieldNames.cardholderName'),
        }),
      }));
    }
  };

  const handleChangeName = (value: string) => {
    setState((prevState) => ({ ...prevState, name: value }));
    setState((prevState) => ({ ...prevState, nameError: '' }));
    validateName(value);
  };
  const handleSubmit = async () => {
    if (state.name.trim().length < 2 || !stripe || !elements) {
      validateName(state.name);
      return;
    }
    dispatch(setLoading(true));
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement) as StripeCardNumberElement,
      billing_details: {
        name: state.name,
      },
    });

    if (error?.code) {
      NotificationService.error(error?.message || t('general.notifications.defaultError'));
      dispatch(setLoading(false));
    } else {
      if (paymentMethod?.id) {
        await dispatch(createPaymentMethod({ source: paymentMethod?.id })).then((response) => {
          if (createPaymentMethod.fulfilled.match(response)) {
            dispatch(createSubscription({ id: plan.id, code: couponState?.coupon.id, isTrial }))
              .then(async (resp) => {
                if (createSubscription.fulfilled.match(resp)) {
                  if (isUpgradeModal) {
                    await dispatch(setViewDataItem({ entity: ProfileViewDataEnum.is_view_onboarding }));
                    selectGoogleTagManagerOnboardingPlansEvents({ tag: plan?.tag, period: plan?.period });
                    if (process.env.REACT_APP_ENV === 'production') {
                      if (isTrial) {
                        TagManager.dataLayer({
                          dataLayer: {
                            event: 'onboarding_paid_with_trial',
                          },
                        });
                      } else if (couponState?.coupon.id) {
                        TagManager.dataLayer({
                          dataLayer: {
                            event: 'onboarding_paid_with_discount',
                          },
                        });
                      } else {
                        TagManager.dataLayer({
                          dataLayer: {
                            event: 'onboarding_paid',
                          },
                        });
                      }
                    }
                  }

                  handleConfirm();

                  if (
                    resp.payload.user_status === 'requires_action' ||
                    resp.payload.user_status === 'requires_payment_method'
                  ) {
                    window.location = resp.payload.payment_url;
                  }
                } else {
                  if (resp.payload?.status === 425) {
                    handleConfirm();
                  }
                }
              })
              .finally(() => {
                dispatch(setLoading(false));
              });
          } else {
            dispatch(setLoading(false));
          }
        });
      }
    }
  };

  const onElementChange =
    (field: string, errorField: string) =>
    ({
      complete,
      error,
    }: {
      complete: boolean;
      error: { type: 'validation_error'; code: string; message: string } | undefined;
    }) => {
      setState({ ...state, [field]: complete, [errorField]: error?.message || null });
    };
  const handleGetCouponInfo = useCallback(
    (promocode: string, handleSetError: (text: string) => void) => {
      dispatch(setLoading(true));
      dispatch(getCuponInfo({ name: promocode, package_id: plan.id })).then((res) => {
        if (getCuponInfo.fulfilled.match(res)) {
          setCouponState(res.payload);
        }
        if (getCuponInfo.rejected.match(res)) {
          handleSetError(t('onboarding.paymentStep.promoError'));
        }
        dispatch(setLoading(false));
      });
    },
    [dispatch, plan?.id, t],
  );

  const availableHubs = useMemo(() => {
    if (plan.tag === PlansPricingItemEnum.starter) {
      return ['Checklists', 'Notes'];
    }
    if (plan.tag === PlansPricingItemEnum.basic) {
      return ['Deadlines', 'Events', 'Tasks'];
    }
    return ['Payments', 'Meetings', 'Reminders', 'Appointment'];
  }, [plan]);

  const { cardNumberError, expiredError, cvcError, nameError } = state;
  return (
    <OnboardingLayout
      isHidePadding={isUpgradeModal}
      handleTitleCloseBtn={handleTitleCloseBtn}
      isShowTitleCloseBtn={isShowTitleCloseBtn}
      isShowLogo={!isUpgradeModal}
      logoPosition="outside"
      title={isTrial ? 'Special Offer' : 'Your Purchase'}
      maxWidth={isUpgradeModal ? 800 : 745}
      leftBtnProps={{
        isShow: !isHideBackBtn,
        label: isTrial && isPromocode ? t('general.buttons.back') : t('general.buttons.cancel'),
        variant: 'outlined',
        onClick: handleBack,
      }}
      rightBtnProps={{
        isShow: true,
        label: isTrial ? t('general.buttons.start') : t('general.buttons.pay'),
        variant: 'contained',
        onClick: handleSubmit,
      }}
      minHeight={518}
    >
      <Grid sx={{ mt: '24px' }} container>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            borderRight: matchSm ? 'none' : `1px solid ${theme.palette.case.neutral.n100} `,
            borderBottom: matchSm ? `1px solid ${theme.palette.case.neutral.n100}` : 'none',
            pb: matchSm ? '16px' : 0,
            pr: matchSm ? 0 : '30px',
          }}
        >
          <Box>
            {isTrial || isPromocode || couponState?.coupon?.id ? (
              <Box>
                <Box>
                  <Typography variant="h3" sx={{ color: theme.palette.case.neutral.n900 }}>
                    {t('onboarding.paymentStep.title')}
                  </Typography>
                </Box>
                <Box sx={{ borderTop: `1px solid ${theme.palette.case.neutral.n100}`, m: '16px 0px' }} />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography
                    sx={{ color: theme.palette.case.neutral.n800 }}
                    variant="default"
                    component="span"
                  >
                    <Trans i18nKey="onboarding.paymentStep.plan" values={{ plan: plan.name, period }}>
                      <Typography variant="large_bolt" component="span" />
                    </Trans>
                  </Typography>
                  <Typography sx={{ color: theme.palette.case.neutral.n600 }} variant="large">
                    ${plan.amount / 100}
                  </Typography>
                </Box>
                {isTrial || couponState?.coupon?.id ? (
                  <Box mt="16px" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="large_bolt" component="span">
                      {isTrial ? t('onboarding.paymentStep.trial') : t('onboarding.paymentStep.promo')}{' '}
                      {isTrial && (
                        <Typography variant="default" component="span">
                          / {t('onboarding.paymentStep.sevenDays')}
                        </Typography>
                      )}
                    </Typography>

                    <Typography sx={{ color: theme.palette.error.main }} variant="large_bolt">
                      {isTrial ? '-100%' : `-$${(plan.amount - (couponState?.amount || 0)) / 100}`}
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            ) : (
              <Box>
                <Box
                  sx={{
                    borderRadius: `5px`,
                    border: `1px solid ${theme.palette.case.neutral.n100}`,
                    backgroundColor: theme.palette.case.neutral.n75,
                    p: '16px',
                  }}
                >
                  <Typography variant="large_bolt" sx={{ color: theme.palette.case.neutral.n900 }}>
                    {t('onboarding.paymentStep.access', { plan: plan.name })}
                  </Typography>
                  {availableHubs.map((item) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: '4px' }}>
                      <DoneIcon
                        sx={{ width: '20px', height: '20px', color: theme.palette.primary.main, mr: '8px' }}
                      />
                      <Typography sx={{ color: theme.palette.case.neutral.n700 }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt="16px">
                  <Typography
                    sx={{ color: theme.palette.case.neutral.n800 }}
                    variant="default"
                    component="span"
                  >
                    <Trans i18nKey="onboarding.paymentStep.plan" values={{ plan: plan.name, period }}>
                      <Typography variant="large_bolt" component="span" />
                    </Trans>
                  </Typography>
                  <Typography sx={{ color: theme.palette.case.neutral.n600 }} variant="large">
                    ${plan.amount / 100}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box sx={{ borderTop: `1px solid ${theme.palette.case.neutral.n100}`, m: '16px 0px' }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography sx={{ color: theme.palette.case.neutral.n800 }} variant="small" component="span">
                <Typography
                  sx={{ color: theme.palette.case.neutral.n900 }}
                  variant="h3"
                  mr="8px"
                  component="span"
                >
                  {t('onboarding.paymentStep.totalAmount')}
                </Typography>
                {isTrial
                  ? `/ ${t('onboarding.paymentStep.sevenDays')}`
                  : isPromocode
                  ? `/ ${t('onboarding.paymentStep.firstMonth')}`
                  : ''}
              </Typography>
              <Typography sx={{ color: theme.palette.case.primary.p600 }} variant="h3">
                $
                {isTrial
                  ? 0
                  : couponState?.coupon?.percent_off
                  ? plan.amount / 100 - (plan.amount / 100) * (couponState.coupon.percent_off / 100)
                  : plan.amount / 100}
              </Typography>
            </Box>
            {isTrial === false && plan.tag !== PlansPricingItemEnum.starter && (
              <Box mt="16px">
                <Promocode gridSize={12} couponState={couponState} handleApply={handleGetCouponInfo} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid xs={12} sm={6} item sx={{ pl: matchSm ? 0 : '30px', pt: matchSm ? '16px' : 0 }}>
          <Box>
            <Box mb="20px">
              <Typography variant="h3" sx={{ color: theme.palette.case.neutral.n900 }}>
                {t('onboarding.paymentStep.paymentInfo')}
              </Typography>
            </Box>
            <Box mb="20px">
              <img alt="stripe" src={stripeGuardImg} />
            </Box>
            <Grid
              container
              sx={{
                border: `1px solid ${theme.palette.case.neutral.n100}`,
                borderRadius: '10px',
                p: '8px 16px 16px',
              }}
              rowSpacing="8px"
              width="100%"
            >
              <Grid item xs={12}>
                <MuiBaseTextFiled
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeName(event.currentTarget.value)
                  }
                  value={state.name}
                  isError={!!nameError}
                  errorMessage={nameError}
                  placeholder={t('general.placeholders.enter_cardholder_name')}
                  label={t('general.fieldNames.cardholderName')}
                />
              </Grid>
              <Grid item xs={12}>
                <StripeTextFieldNumber
                  error={Boolean(cardNumberError)}
                  value={state.cardNumberComplete ? '1' : ''}
                  labelErrorMessage={cardNumberError}
                  onChange={onElementChange('cardNumberComplete', 'cardNumberError')}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container columnSpacing="16px">
                  <Grid item xs={4}>
                    <StripeTextFieldExpiry
                      error={Boolean(expiredError)}
                      value={state.expiredComplete ? '1' : ''}
                      labelErrorMessage="Date is incomplete"
                      onChange={onElementChange('expiredComplete', 'expiredError')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StripeTextFieldCVC
                      error={Boolean(cvcError)}
                      value={state.cvcComplete ? '1' : ''}
                      labelErrorMessage={cvcError}
                      onChange={onElementChange('cvcComplete', 'cvcError')}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <img alt="stripe" src={cardTypeImg} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </OnboardingLayout>
  );
};

export default PaymentStep;
