import React, { FC, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import TagManager from 'react-gtm-module';
import DowngradeFormsContainer from '../../../../DowngradePlanModal/DowngradePlanContainer/components/DowngradeFormsContainer';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import {
  StripeTextFieldCVC,
  StripeTextFieldExpiry,
  StripeTextFieldNumber,
} from '../../../../../../formElements/stripeElements/StripeTextField/StripeTextField';
import {
  PaymentCardContainer,
  PaymentCardVariants,
} from '../../../../../../../pages/Settings/components/Wallet/components/PaymentCard/PaymentCard.style';
import PaymentVariants from '../../../../../../../assets/Images/wallet/payment-variants.png';
import { setLoading } from '../../../../../../../store/Common/commonSlice';
import { useAppDispatch } from '../../../../../../../shared/hooks/redux';
import { createPaymentMethod, createSubscription } from '../../../../../../../store/settings/settingsThunk';
import { CouponModel, PlanModel } from '../../../../../../../shared/models/plans.model';
import { PlanPeriodEnum } from '../../../../../../../shared/enums/planPeriodEnum';
import { selectGoogleTagManagerPlansEvents } from '../../../../../../../shared/utils/selectGoogleTagManagerPlansEvents';
import MuiSnackbar from '../../../../../../MuiSnackbar';
import Promocode from '../../../../DowngradePlanModal/DowngradePlanContainer/components/Promocode';
import { NotificationService } from '../../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';

type Props = {
  setStep: (step: number) => void;
  onClose: () => void;
  plan: PlanModel;
  handleGetCouponInfo: (promocode: string, handleSetError: (text: string) => void) => void;
  couponState: CouponModel | null;
};

const PlanAddCard: FC<Props> = ({ setStep, couponState, handleGetCouponInfo, plan, onClose }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [errorText, setErrorText] = useState('');

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
      dispatch(setLoading(false));
      NotificationService.error(error?.message || t('general.notifications.defaultError'));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (paymentMethod?.id) {
        setErrorText('');
        await dispatch(createPaymentMethod({ source: paymentMethod?.id })).then((response) => {
          if (createPaymentMethod.fulfilled.match(response)) {
            dispatch(createSubscription({ id: plan.id, code: couponState?.coupon.id }))
              .then(async (resp) => {
                if (createSubscription.fulfilled.match(resp)) {
                  if (
                    resp.payload.user_status === 'requires_action' ||
                    resp.payload.user_status === 'requires_payment_method'
                  ) {
                    window.location = resp.payload.payment_url;
                  } else {
                    setStep(2);
                  }
                  selectGoogleTagManagerPlansEvents({ tag: plan?.tag, period: plan?.period });
                } else {
                  if (resp.payload?.status === 425) {
                    selectGoogleTagManagerPlansEvents({ tag: plan?.tag, period: plan?.period });
                    setStep(2);
                  } else {
                    setErrorText(resp.payload?.message || '');
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

        // handleCreatePaymentMethod(paymentMethod?.id);

        if (process.env.REACT_APP_ENV === 'production') {
          TagManager.dataLayer({
            dataLayer: {
              event: 'payment_info_send',
            },
          });
        }
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

  const { cardNumberError, expiredError, cvcError } = state;
  return (
    <DowngradeFormsContainer
      title={`Purchase ${plan?.name}`}
      onClose={onClose}
      isStepper={false}
      rightBtnProps={{
        isShow: true,
        label: 'Pay',
        variant: 'contained',
        onClick: () => handleSubmit(),
        isStopPropagation: false,
      }}
      middleBtnProps={{ isShow: true, label: 'Cancel', type: 'button', onClick: onClose }}
    >
      <Box>
        <Box mb="4px" display="flex" justifyContent="center">
          <Typography
            variant="h3"
            component="span"
            sx={{
              color: theme.palette.case.neutral.n700,
            }}
          >
            Total amount{' '}
            <Typography
              component="span"
              sx={{
                color: theme.palette.primary.main,
              }}
              variant="h3"
            >
              ${couponState?.amount ? couponState.amount / 100 : plan?.amount ? plan.amount / 100 : ''}
            </Typography>
          </Typography>
        </Box>
        <Box mb="16px" textAlign="center">
          {plan?.period && plan?.period === PlanPeriodEnum.month ? (
            <Typography
              sx={{
                color: theme.palette.case.neutral.n700,
              }}
              variant="large"
            >
              for your monthly subscription
            </Typography>
          ) : isMobile ? (
            <>
              <Typography
                component="p"
                sx={{
                  color: theme.palette.case.neutral.n700,
                }}
                variant="large"
              >
                for your annual subscription,
              </Typography>
              <Typography component="p" variant="large">
                saving <Typography variant="large_bolt">20%</Typography> of{' '}
                <Typography variant="large_bolt">
                  ${plan?.amount && (plan.amount * 100) / 80 / 100}
                </Typography>
              </Typography>
            </>
          ) : (
            <Typography
              sx={{
                color: theme.palette.case.neutral.n700,
              }}
              variant="large"
            >
              for your annual subscription, saving <Typography variant="large_bolt">20%</Typography> of{' '}
              <Typography variant="large_bolt">${plan?.amount && (plan.amount * 100) / 80 / 100}</Typography>
            </Typography>
          )}
        </Box>
        <Box
          height="1px"
          width="100%"
          sx={{
            background: '#F2EDED',
          }}
        />

        {errorText && (
          <Box mt="16px">
            <MuiSnackbar text={errorText} />
          </Box>
        )}

        <Box mt="16px">
          <Box mb="16px">
            <Box mb="4px">
              <Typography variant="h3">Payment information</Typography>
            </Box>
            <Box>
              <Typography variant="default">Add here your full name and card information </Typography>
            </Box>
          </Box>
          <Box>
            <PaymentCardContainer>
              <Box sx={{ width: '100%', alignSelf: 'flex-start', maxWidth: '180px' }}>
                <MuiBaseTextFiled
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeName(event.currentTarget.value)
                  }
                  isError={!!nameError}
                  errorMessage={nameError}
                  label={t('general.fieldNames.cardholderName')}
                  placeholder={t('general.placeholders.enter_cardholder_name')}
                />
              </Box>

              <Box
                sx={{
                  mt: '16px',
                  mb: '24px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ width: '100%', maxWidth: '180px' }}>
                  <StripeTextFieldNumber
                    error={Boolean(cardNumberError)}
                    labelErrorMessage={cardNumberError}
                    onChange={onElementChange('cardNumberComplete', 'cardNumberError')}
                  />
                </Box>

                <Box sx={{ width: '100%', maxWidth: '73px' }}>
                  <StripeTextFieldExpiry
                    error={Boolean(expiredError)}
                    labelErrorMessage={expiredError}
                    onChange={onElementChange('expiredComplete', 'expiredError')}
                  />
                </Box>

                <Box sx={{ width: '100%', maxWidth: '62px' }}>
                  <StripeTextFieldCVC
                    error={Boolean(cvcError)}
                    labelErrorMessage={cvcError}
                    onChange={onElementChange('cvcComplete', 'cvcError')}
                  />
                </Box>
              </Box>

              <Box>
                <PaymentCardVariants>
                  <img src={PaymentVariants} alt="payment variants" />
                </PaymentCardVariants>
              </Box>
            </PaymentCardContainer>
          </Box>
        </Box>
      </Box>
      {plan?.period !== PlanPeriodEnum.year && (
        <Box mt="16px">
          <Promocode couponState={couponState} handleApply={handleGetCouponInfo} />
        </Box>
      )}
    </DowngradeFormsContainer>
  );
};

export default PlanAddCard;
