import { Grid } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import { FrequencyEnum } from '../../../../../../../shared/enums/frequency.enum';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiDatePicker from '../../../../../../formElements/MuiDatePicker';
import MuiSelect from '../../../../../../formElements/MuiSelect';
import { OptionType } from '../../../../../../formElements/MuiSelect/MuiSelect';
import { insuranceDefaultValues, InsuranceForm } from '../../InsuranceUtils';
import MuiCheckbox from '../../../../../../formElements/MuiCheckbox';
import { InsuranceDateCheckboxContainer } from './InsuranceDate.style';

type Props = {
  control: Control<InsuranceForm, any>;
  watch: UseFormWatch<InsuranceForm>;
  setValue: UseFormSetValue<InsuranceForm>;
  frequencyOptions: OptionType[];
  handleChangeFrequencyData: (paymentDate: Date | null, expirationDate: Date | null) => void;
};

const InsuranceDate: FC<Props> = ({
  control,
  watch,
  setValue,
  frequencyOptions,
  handleChangeFrequencyData,
}) => {
  const { t } = useTranslation();

  const accountBalanceState = useWatch({ control, name: 'account_balance' });
  const effectiveState = useWatch({ control, name: 'effective' });
  const expirationState = useWatch({ control, name: 'expiration' });
  const paymentDueDayState = useWatch({ control, name: 'payment_due_day' });
  const isFullPauBalanceState = useWatch({ control, name: 'is_paid_in_full' });

  const handleClearExpirationDate = () => {
    setValue('payment_due_day.date', insuranceDefaultValues.payment_due_day.date);
    setValue('minimum_due', watch('account_balance'));
    setValue('frequency', insuranceDefaultValues.frequency);
  };

  const handleClearEffectiveDate = () => {
    setValue('payment_due_day.date', insuranceDefaultValues.payment_due_day.date);
    setValue('expiration.date', insuranceDefaultValues.expiration.date);
    setValue('minimum_due', watch('account_balance'));
    setValue('frequency', insuranceDefaultValues.frequency);
  };

  const handleClearPaymentDueDay = useCallback(() => {
    setValue('minimum_due', accountBalanceState);
    setValue('frequency', insuranceDefaultValues.frequency);
  }, [accountBalanceState, setValue]);

  return (
    <MuiDotAccordion
      label={t('general.containers.date')}
      isDisabledExpand
      isShowInfoDialog
      infoTooltipText={t('general.tooltips.activateNotifyMe')}
    >
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid item xs={12} md={6}>
          <Grid container columnSpacing="20px">
            <Grid sm={7} item>
              <Controller
                name="effective.date"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiDatePicker
                    {...field}
                    isFullWidth={false}
                    isRequired
                    onChange={(date: any) => {
                      field.onChange(date);
                      handleClearEffectiveDate();
                    }}
                    label={t('general.fieldNames.effectiveDate')}
                    placeholder={t('general.placeholders.select_date')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid sm={5} item>
              <InsuranceDateCheckboxContainer>
                <Controller
                  name="effective.is_notify"
                  control={control}
                  render={({ field }) => <MuiCheckbox {...field} label={t('general.fieldNames.notifyMe')} />}
                />
              </InsuranceDateCheckboxContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container columnSpacing="20px">
            <Grid sm={7} item>
              <Controller
                name="expiration.date"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiDatePicker
                    {...field}
                    isFullWidth={false}
                    isRequired
                    label={t('general.fieldNames.expirationDate')}
                    placeholder={t('general.placeholders.select_date')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                    onChange={(date: any) => {
                      field.onChange(date);
                      handleClearExpirationDate();
                      handleChangeFrequencyData(watch('payment_due_day').date, date);
                    }}
                    minDate={watch('effective').date}
                  />
                )}
              />
            </Grid>
            <Grid sm={5} item>
              <InsuranceDateCheckboxContainer>
                <Controller
                  name="expiration.is_notify"
                  control={control}
                  render={({ field }) => <MuiCheckbox {...field} label={t('general.fieldNames.notifyMe')} />}
                />
              </InsuranceDateCheckboxContainer>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container columnSpacing="20px">
            <Grid sm={7} item>
              <Controller
                name="payment_due_day.date"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiDatePicker
                    {...field}
                    isFullWidth={false}
                    isDisabled={!expirationState.date}
                    label={t('general.fieldNames.paymentDueDay')}
                    placeholder={t('general.placeholders.select_date')}
                    onChange={(date: any) => {
                      field.onChange(date);
                      handleClearPaymentDueDay();
                      handleChangeFrequencyData(date, expirationState.date);
                    }}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                    minDate={effectiveState.date}
                    maxDate={expirationState.date}
                  />
                )}
              />
            </Grid>
            <Grid sm={5} item>
              <InsuranceDateCheckboxContainer>
                <Controller
                  name="payment_due_day.is_notify"
                  control={control}
                  render={({ field }) => <MuiCheckbox {...field} label={t('general.fieldNames.notifyMe')} />}
                />
              </InsuranceDateCheckboxContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="frequency"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isSearchable
                isDisabled={!paymentDueDayState.date || isFullPauBalanceState}
                onChange={(value) => {
                  field.onChange(value);

                  if (value.value === FrequencyEnum.none) {
                    setValue('minimum_due', accountBalanceState, { shouldValidate: true });
                  }
                }}
                options={frequencyOptions}
                label={t('general.fieldNames.frequency')}
                placeholder={t('general.placeholders.select_frequency')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </MuiDotAccordion>
  );
};

export default InsuranceDate;
