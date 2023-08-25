import { Box, Grid } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiCurrencyTextFiled from '../../../../../../formElements/MuiCurrencyTextFiled';
import { insuranceDefaultValues, InsuranceForm } from '../../InsuranceUtils';
import MuiCheckbox from '../../../../../../formElements/MuiCheckbox';

type Props = {
  control: Control<InsuranceForm, any>;
  errors: FieldErrors<InsuranceForm>;
  isDisableMinimumDue: boolean;
  isPaymentDue: boolean;
  handleChangeAccountBalance: (value: number) => void;
  setValue: UseFormSetValue<InsuranceForm>;
};
const InsurancePayment: FC<Props> = ({
  control,
  isDisableMinimumDue,
  handleChangeAccountBalance,
  setValue,
}) => {
  const { t } = useTranslation();

  const amountState = useWatch({ control, name: 'amount' });
  const discountState = useWatch({ control, name: 'discount' });
  const isFullPauBalanceState = useWatch({ control, name: 'is_paid_in_full' });

  const frequencyDueDayState = useWatch({ control, name: 'frequency' });

  useMemo(() => {
    setValue('account_balance', insuranceDefaultValues.account_balance);
    setValue('minimum_due', insuranceDefaultValues.minimum_due);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequencyDueDayState.value, setValue, isFullPauBalanceState]);

  useMemo(() => {
    if (amountState || discountState) {
      setValue('paid', (amountState || 0) - (discountState || 0));
    } else {
      setValue('paid', null);
    }
  }, [amountState, discountState, setValue]);

  return (
    <MuiDotAccordion label={t('general.containers.payment')} isDisabledExpand>
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid item xs={6}>
          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <MuiCurrencyTextFiled
                {...field}
                label={t('general.fieldNames.fullAmount')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        {!!isFullPauBalanceState === false && (
          <Grid item xs={6}>
            <Controller
              name="account_balance"
              control={control}
              render={({ field, fieldState }) => (
                <MuiCurrencyTextFiled
                  {...field}
                  onChange={(value: any) => {
                    field.onChange(value);
                    handleChangeAccountBalance(value.target.value);
                  }}
                  isDisabled={isFullPauBalanceState}
                  label={t('general.fieldNames.accountBalance')}
                  placeholder={t('general.placeholders.enter_number')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}
        {!!isFullPauBalanceState === false && (
          <Grid sm={6} item>
            <Controller
              name="minimum_due"
              control={control}
              render={({ field, fieldState }) => (
                <MuiCurrencyTextFiled
                  {...field}
                  isReadOnly={isDisableMinimumDue}
                  label={t('general.fieldNames.minimumDue')}
                  placeholder={t('general.placeholders.enter_number')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}

        <Grid sm={6} item>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', height: '100%', mt: { xs: '30px' } }}>
            <Controller
              name="is_paid_in_full"
              control={control}
              render={({ field }) => <MuiCheckbox {...field} label={t('general.fieldNames.paidInFull')} />}
            />
          </Box>
        </Grid>

        {!!isFullPauBalanceState && (
          <Grid item xs={6}>
            <Controller
              name="discount"
              control={control}
              render={({ field, fieldState }) => (
                <MuiCurrencyTextFiled
                  {...field}
                  // onChange={(value: any) => {
                  //   field.onChange(value);
                  //   handleChangeAccountBalance(value.target.value);
                  // }}
                  label={t('general.fieldNames.discount')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}
        {isFullPauBalanceState && (
          <Grid item xs={6}>
            <Controller
              name="paid"
              control={control}
              render={({ field, fieldState }) => (
                <MuiCurrencyTextFiled
                  {...field}
                  // onChange={(value: any) => {
                  //   field.onChange(value);
                  //
                  //   handleChangeAccountBalance(value.target.value);
                  // }}
                  isDisabled
                  label={t('general.fieldNames.paid')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}
      </Grid>
    </MuiDotAccordion>
  );
};

export default InsurancePayment;
