import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import { InsuranceForm } from '../../InsuranceUtils';

type Props = {
  control: Control<InsuranceForm, any>;
  watch: UseFormWatch<InsuranceForm>;
  setValue: UseFormSetValue<InsuranceForm>;
  handleChangeFrequencyData: (paymentDate: Date | null, expirationDate: Date | null) => void;
};

const InsuranceMain: FC<Props> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <MuiDotAccordion label={t('general.containers.main')} isDisabledExpand>
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid item xs={12} md={6}>
          <Controller
            name="issued_by"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.issuedBy')}
                placeholder={t('general.placeholders.enter_company')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="policy_number"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.policyNumber')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="naic"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.naic')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </MuiDotAccordion>
  );
};

export default InsuranceMain;
