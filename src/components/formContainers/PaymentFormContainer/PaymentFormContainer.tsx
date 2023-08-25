import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import MuiDatePicker from '../../formElements/MuiDatePicker';
import MuiCurrencyTextFiled from '../../formElements/MuiCurrencyTextFiled';
import MuiTooltip from '../../MuiTooltip';
import { PaymentsTypeEnum } from '../../../shared/enums/paymentsTypeEnum';
type PaymentFormContainerProps = {
  control: Control<any>;
  paymentType: string;
};
const PaymentFormContainer: FC<PaymentFormContainerProps> = ({ control, paymentType }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <MuiTooltip title={t('general.tooltips.editThisDataInGarage')}>
        <Grid container columnSpacing="16px">
          <Grid xs={6} item>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  label={t('general.fieldNames.title')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                  isDisabled
                  type="text"
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
      </MuiTooltip>
      <MuiTooltip title={t('general.tooltips.editThisDataInGarage')}>
        <Box sx={{ mt: '16px', width: '100%' }}>
          <Grid container columnSpacing="20px" rowSpacing="16px">
            {paymentType === PaymentsTypeEnum.sticker && (
              <>
                <Grid xs={6} item>
                  <Controller
                    name="sticker_reference"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        label={t('general.fieldNames.reference')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        isDisabled
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Controller
                    name="sticker_number"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        label={t('general.fieldNames.number')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        isDisabled
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Controller
                    name="sticker_type"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        label={t('general.fieldNames.type')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        isDisabled
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            {paymentType === PaymentsTypeEnum.insurance && (
              <>
                <Grid xs={6} item>
                  <Controller
                    name="issued_by"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        label={t('general.fieldNames.issuedBy')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        isDisabled
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Controller
                    name="policy_number"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        label={t('general.fieldNames.policyNumber')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        isDisabled
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            {paymentType === PaymentsTypeEnum.license && (
              <>
                <Grid xs={6} item>
                  <Controller
                    name="registration_id"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        label={t('general.fieldNames.registrationID')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        isDisabled
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </MuiTooltip>
      <Box sx={{ mt: '30px' }}>
        <MuiDotAccordion isDisabledExpand label={t('general.containers.payment')} isDefaultExpand>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={12} item>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={6} item>
                  <Controller
                    name="started_at"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiDatePicker
                        {...field}
                        isFullWidth={false}
                        isRequired
                        isClearable={false}
                        label={t(
                          paymentType === PaymentsTypeEnum.insurance
                            ? 'general.fieldNames.paymentDay'
                            : 'general.fieldNames.purchaseDate',
                        )}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                      />
                    )}
                  />
                </Grid>
                <MuiTooltip title={t('general.tooltips.editThisDataInGarage')}>
                  <Grid xs={6} item>
                    <Controller
                      name="due_dated_at"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiDatePicker
                          {...field}
                          isFullWidth={false}
                          isDisabled
                          label={t(
                            paymentType === PaymentsTypeEnum.insurance
                              ? 'general.fieldNames.paymentDueDay'
                              : 'general.fieldNames.purchaseDueDate',
                          )}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                        />
                      )}
                    />
                  </Grid>
                </MuiTooltip>
                {paymentType === PaymentsTypeEnum.insurance && (
                  <MuiTooltip title={t('general.tooltips.editThisDataInGarage')}>
                    <Grid xs={6} item>
                      <Controller
                        name="frequency"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiBaseTextFiled
                            label={t('general.fieldNames.frequency')}
                            isError={!!fieldState?.error?.message}
                            errorMessage={fieldState?.error?.message}
                            isDisabled
                            type="text"
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                  </MuiTooltip>
                )}
                <MuiTooltip title={t('general.tooltips.editThisDataInGarage')}>
                  <Grid xs={6} item>
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiCurrencyTextFiled
                          {...field}
                          label={t('general.fieldNames.amount')}
                          isDisabled
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                        />
                      )}
                    />
                  </Grid>
                </MuiTooltip>
                <Grid xs={6} item>
                  <Controller
                    name="late_fee"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiCurrencyTextFiled
                        {...field}
                        label={t('general.fieldNames.lateFee')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiDotAccordion>
      </Box>
    </Box>
  );
};

export default PaymentFormContainer;
