import { Box, Grid, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import TagManager from 'react-gtm-module';
import { PaymentCardContainer } from '../../../../../../pages/Settings/components/Wallet/components/PaymentCard/PaymentCard.style';
import MuiBaseInputView from '../../../../../formElements/MuiBaseInputView';
import MuiBaseTextFiled from '../../../../../formElements/MuiBaseTextFiled';
import MuiDefaultDrawerHeader from '../../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import {
  StripeTextFieldCVC,
  StripeTextFieldExpiry,
  StripeTextFieldNumber,
} from '../../../../../formElements/stripeElements/StripeTextField/StripeTextField';
import ModalFooter from '../../../../../modalsElements/containers/Footer/ModalFooter';
import { PlanModel } from '../../../../../../shared/models/plans.model';
import MuiTextAccordion from '../../../../../accordions/MuiTextAccordion';
import { NotificationService } from '../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';

type Props = {
  onClose: () => void;
  handleCreatePaymentMethod: (source: string, callback: (val: boolean) => void) => void;
  plan?: PlanModel;
  isCard: boolean;
  isBilling: boolean;
  setIsView: (val: boolean) => void;
  monthCharge: string;
  nextDueDate: string;
  isShowPaymentFields: boolean;
};

const PaymentEdit: FC<Props> = ({
  onClose,
  handleCreatePaymentMethod,
  plan,
  isCard,
  isBilling,
  setIsView,
  monthCharge,
  nextDueDate,
  isShowPaymentFields,
}) => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement) as StripeCardNumberElement,
      billing_details: {
        name,
      },
    });

    if (error?.code) {
      setLoading(false);
      NotificationService.error(error?.message || t('general.notifications.defaultError'));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (paymentMethod?.id) {
        handleCreatePaymentMethod(paymentMethod?.id, setLoading);
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
        isEditMode
      />
      <Box sx={{ p: '30px 10px 0 10px', flexGrow: 1 }}>
        <PaymentCardContainer>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={6} item>
              <MuiBaseTextFiled
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeName(event.currentTarget.value)
                }
                isError={!!nameError}
                errorMessage={nameError}
                label={t('general.fieldNames.cardholderName')}
                placeholder={t('general.placeholders.enter_cardholder_name')}
              />
            </Grid>
            <Grid item xs={6} />
            <Grid xs={6} item>
              <StripeTextFieldNumber
                error={Boolean(cardNumberError)}
                labelErrorMessage={cardNumberError}
                onChange={onElementChange('cardNumberComplete', 'cardNumberError')}
              />
            </Grid>
            <Grid xs={3} item>
              <StripeTextFieldExpiry
                error={Boolean(expiredError)}
                labelErrorMessage={expiredError}
                onChange={onElementChange('expiredComplete', 'expiredError')}
              />
            </Grid>
            <Grid xs={3} item>
              <StripeTextFieldCVC
                error={Boolean(cvcError)}
                labelErrorMessage={cvcError}
                onChange={onElementChange('cvcComplete', 'cvcError')}
              />
            </Grid>
          </Grid>
        </PaymentCardContainer>

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

        {isCard === false && (
          <Box sx={{ mt: '40px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '16px' }}>
              <Typography sx={{ margin: '0 auto' }} variant="large_bolt">
                {t('wallet.payment.faq.header')}
              </Typography>
            </Box>

            <Box>
              <Box
                sx={(theme) => ({
                  borderTop: `1px solid ${theme.palette.case.neutral.n200}`,
                })}
              >
                <MuiTextAccordion
                  title={t('wallet.payment.faq.title.firstPaymentDue')}
                  text={t('wallet.payment.faq.text.firstPaymentDue')}
                />
              </Box>
              <Box
                sx={(theme) => ({
                  borderTop: `1px solid ${theme.palette.case.neutral.n200}`,
                })}
              >
                <MuiTextAccordion
                  title={t('wallet.payment.faq.title.switchPlans')}
                  text={t('wallet.payment.faq.text.switchPlans')}
                />
              </Box>
              <Box
                sx={(theme) => ({
                  borderTop: `1px solid ${theme.palette.case.neutral.n200}`,
                  borderBottom: `1px solid ${theme.palette.case.neutral.n200}`,
                })}
              >
                <MuiTextAccordion
                  title={t('wallet.payment.faq.title.policy')}
                  text={t('wallet.payment.faq.text.policy')}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <ModalFooter
        isShow
        middleBtnProps={{
          color: 'primary',
          isShow: true,
          label: t('general.buttons.cancel'),
          onClick: () => setIsView(true),
        }}
        rightBtnProps={{
          isLoadingBtn: true,
          isStopPropagation: false,
          isShow: true,
          label: plan ? t('general.buttons.pay') : t('general.buttons.save'),
          variant: 'contained',
          loading,
          onClick: () => handleSubmit(),
        }}
      />
    </Box>
  );
};

export default PaymentEdit;
