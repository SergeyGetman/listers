import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiBaseInputView from '../../../../../../components/formElements/MuiBaseInputView';
import PaymentVariants from '../../../../../../assets/Images/wallet/payment-variants.png';
import { PaymentCardContainer, PaymentCardVariants } from './PaymentCard.style';
import { BankCardModel } from '../../../../../../shared/models/plans.model';

type Props = {
  card: BankCardModel | null;
  handleOpenPaymentModal?: () => void;
};

const PaymentCard: FC<Props> = ({ card, handleOpenPaymentModal }) => {
  const { t } = useTranslation();
  return (
    <PaymentCardContainer
      isClickable={!!handleOpenPaymentModal}
      onClick={!!handleOpenPaymentModal ? handleOpenPaymentModal : () => {}}
    >
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={6} item>
          <MuiBaseInputView
            content={card?.data?.name || '-'}
            isShowBottomBorder
            label={t('general.fieldNames.cardholderName')}
          />
        </Grid>
        <Grid item xs={6} />
        <Grid xs={6} item>
          <MuiBaseInputView
            content={card?.data?.last4 ? `**** **** **** ${card?.data?.last4}` : '-'}
            isShowBottomBorder
            label={t('general.fieldNames.cardNumber')}
          />
        </Grid>
        <Grid xs={3} item>
          <MuiBaseInputView
            content={
              card?.data?.exp_month && card?.data?.exp_year
                ? `${card.data.exp_month}/${card.data.exp_year.toString().slice(2, 4)}`
                : '-'
            }
            isShowBottomBorder
            label={t('general.fieldNames.MMYY')}
          />
        </Grid>
        <Grid xs={3} item>
          <MuiBaseInputView
            content={card ? '***' : '-'}
            isShowBottomBorder
            label={t('general.fieldNames.CVC')}
          />
        </Grid>
        <Grid xs={12} sx={{ paddingTop: '20px !important' }} item>
          <PaymentCardVariants>
            <img src={PaymentVariants} alt="payment variants" />
          </PaymentCardVariants>
        </Grid>
      </Grid>
    </PaymentCardContainer>
  );
};

export default PaymentCard;
