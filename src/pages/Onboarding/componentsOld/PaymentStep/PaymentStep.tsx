import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useTranslation } from 'react-i18next';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import DoneIcon from '@mui/icons-material/Done';

import TagManager from 'react-gtm-module';
import Promocode from '../../../../components/modals/plan/DowngradePlanModal/DowngradePlanContainer/components/Promocode';

import stripeGuardImg from '../../../../assets/Images/stripeSecurity.png';
import cardTypeImg from '../../../../assets/Images/cardType.png';

import OnboardingLayout from '../OnboardingLayout';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { setLoading } from '../../../../store/Common/commonSlice';
import {
  createPaymentMethod,
  createSubscription,
  getCuponInfo,
} from '../../../../store/settings/settingsThunk';
import { CouponModel, PlanModel } from '../../../../shared/models/plans.model';
import { setViewDataItem } from '../../../../store/Profile/profile.actions';
import { ProfileViewDataEnum } from '../../../../shared/enums/profileViewData.enum';
import MuiBaseTextFiled from '../../../../components/formElements/MuiBaseTextFiled';
import {
  StripeTextFieldCVC,
  StripeTextFieldExpiry,
  StripeTextFieldNumber,
} from '../../../../components/formElements/stripeElements/StripeTextField/StripeTextField';
import { PlansPricingItemEnum } from '../../../../shared/enums/plansPricingItem.enum';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { PlanPeriodEnum } from '../../../../shared/enums/planPeriodEnum';
import { selectGoogleTagManagerOnboardingPlansEvents } from '../../../../shared/utils/selectGoogleTagManagerOnboardingPlansEvents';
type Props = {
  plan: PlanModel;
  handleConfirmOnboarding: () => void;
  handleCancelPayment: () => void;
  isTrial: boolean;
  isShowCloseBtn?: boolean;
  isPromocde: boolean;
  isFullWidth?: boolean;
  period: PlanPeriodEnum;
};
const PaymentStep: FC<Props> = ({
  plan,
  handleConfirmOnboarding,
  isTrial,
  isShowCloseBtn = false,
  handleCancelPayment,
  isPromocde,
  period,
  isFullWidth,
}) => {
  const stripe = useStripe();
  const { t } = useTranslation();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const [couponState, setCouponState] = useState<CouponModel | null>(null);
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const validateName = (value: string) => {
    setNameError('');
    if (value.trim().length < 2) {
      setNameError(t('validation.general.min', { field: t('general.fieldNames.cardholderName'), count: 2 }));
    }
    if (value.trim() === '') {
      setNameError(
        t('validation.general.required', {
          field: t('general.fieldNames.cardholderName'),
        }),
      );
    }
  };

  const handleChangeName = (value: string) => {
    setName(value);
    setNameError('');
    validateName(value);
  };
  const handleSubmit = async () => {
    if (name.trim().length < 2 || !stripe || !elements) {
      validateName(name);
      return;
    }
    dispatch(setLoading(true));
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement) as StripeCardNumberElement,
      billing_details: {
        name,
      },
    });

    if (error?.code) {
      NotificationService.error(error?.message || t('general.notifications.defaultError'));
      dispatch(setLoading(false));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (paymentMethod?.id) {
        await dispatch(createPaymentMethod({ source: paymentMethod?.id })).then((response) => {
          if (createPaymentMethod.fulfilled.match(response)) {
            dispatch(createSubscription({ id: plan.id, code: couponState?.coupon.id, isTrial }))
              .then(async (resp) => {
                if (createSubscription.fulfilled.match(resp)) {
                  await dispatch(setViewDataItem({ entity: ProfileViewDataEnum.is_view_onboarding }));
                  selectGoogleTagManagerOnboardingPlansEvents({ tag: plan?.tag, period: plan?.period });
                  handleConfirmOnboarding();

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

                  if (
                    resp.payload.user_status === 'requires_action' ||
                    resp.payload.user_status === 'requires_payment_method'
                  ) {
                    window.location = resp.payload.payment_url;
                  }
                } else {
                  if (resp.payload?.status === 425) {
                    handleConfirmOnboarding();
                  }
                }
                // if (createSubscription.rejected.match(resp)) {
                //   setErrorText(resp.payload?.message || '');
                // }
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

  const [state, setState] = React.useState({
    cardNumberComplete: false,
    expiredComplete: false,
    cvcComplete: false,
    cardNumberError: '',
    expiredError: '',
    cvcError: '',
  });

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
          // TODO add i18
          handleSetError('This promo code is invalid. Try again.');
        }
        dispatch(setLoading(false));
      });
    },
    [dispatch, plan?.id],
  );

  const getHubAccess = useCallback((hubName: PlansPricingItemEnum) => {
    if (hubName === PlansPricingItemEnum.basic) {
      return ['Tasks', 'Events', 'Deadlines'];
    }
    return ['Payments', 'Meetings', 'Reminders', 'Appointment'];
  }, []);

  const { cardNumberError, expiredError, cvcError } = state;
  return (
    <OnboardingLayout
      step={7}
      isShowStep={false}
      isCloseBtn={isShowCloseBtn}
      title={isTrial ? 'Special Offer' : 'Your Purchase'}
      onCloseClick={handleCancelPayment}
      rightBtnProps={{
        isShow: true,
        label: isTrial ? 'Start' : 'Pay',
        variant: 'contained',
        onClick: handleSubmit,
        isDisabled: Boolean(expiredError) || Boolean(cardNumberError) || Boolean(cvcError) || name.length < 2,
      }}
      middleBtnProps={{
        isShow: isTrial ? false : true,
        label: 'Cancel',
        variant: 'outlined',
        onClick: handleCancelPayment,
      }}
      isFullWidth={isFullWidth}
      totalSteps={0}
      maxWidth={745}
      minHeight={500}
    >
      <Grid container>
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
            {isTrial || isPromocde || couponState?.coupon?.id ? (
              <Box>
                <Box>
                  <Typography variant="h3" sx={{ color: theme.palette.case.neutral.n900 }}>
                    Order Summary
                  </Typography>
                </Box>
                <Box sx={{ borderTop: `1px solid ${theme.palette.case.neutral.n100}`, m: '16px 0px' }} />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography
                    sx={{ color: theme.palette.case.neutral.n800 }}
                    variant="default"
                    component="span"
                  >
                    <Typography variant="extra_large_bolt" component="span">
                      {plan.name} Plan
                    </Typography>{' '}
                    {period === PlanPeriodEnum.month ? '/ month' : '/ year'}
                  </Typography>
                  <Typography sx={{ color: theme.palette.case.neutral.n600 }} variant="large">
                    ${plan.amount / 100}
                  </Typography>
                </Box>
                {isTrial || couponState?.coupon?.id ? (
                  <Box mt="16px" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="large_bolt" component="span">
                      {isTrial ? 'Trial sale' : 'You just saved'}{' '}
                      {isTrial && (
                        <Typography variant="default" component="span">
                          / 7 days
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
                    backgroundColor: theme.palette.case.neutral.n200,
                    p: '16px',
                  }}
                >
                  <Typography variant="large_bolt" sx={{ color: theme.palette.case.neutral.n900 }}>
                    With the {plan.name} plan you will get unlimited access to:
                  </Typography>
                  {getHubAccess(plan.tag).map((item) => (
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
                    <Typography variant="large_bolt" component="span">
                      {plan.name} Plan
                    </Typography>
                    {period === PlanPeriodEnum.month ? '/ month' : '/ year'}
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
                  Total amount
                </Typography>
                {isTrial ? '/ 7 days' : isPromocde ? '/ first month' : ''}
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
            {isTrial === false && (
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
                Payment information
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
                  isError={!!nameError}
                  errorMessage={nameError}
                  label={t('general.fieldNames.cardholderName')}
                />
              </Grid>
              <Grid item xs={12}>
                <StripeTextFieldNumber
                  error={Boolean(cardNumberError)}
                  labelErrorMessage={cardNumberError}
                  onChange={onElementChange('cardNumberComplete', 'cardNumberError')}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container columnSpacing="16px">
                  <Grid item xs={4}>
                    <StripeTextFieldExpiry
                      error={Boolean(expiredError)}
                      labelErrorMessage="Date is incomplete"
                      onChange={onElementChange('expiredComplete', 'expiredError')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StripeTextFieldCVC
                      error={Boolean(cvcError)}
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
