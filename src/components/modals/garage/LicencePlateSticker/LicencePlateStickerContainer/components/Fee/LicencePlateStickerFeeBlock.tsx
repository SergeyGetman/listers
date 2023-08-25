import React, { FC, useMemo } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiCurrencyTextFiled from '../../../../../../formElements/MuiCurrencyTextFiled';
import { FormStickerLicenseValues } from '../../LicencePlateStickerContainer';

type Props = {
  control: Control<any>;
  watch: UseFormWatch<FormStickerLicenseValues>;
};

const LicencePlateStickerFeeBlock: FC<Props> = ({ control, watch }) => {
  const { t } = useTranslation();

  const renewalFee = watch('renewal_fee');
  const lateFee = watch('late_fee');
  const administrativeFee = watch('administrative_fee');

  const feeSum = useMemo(() => {
    let sum = 0;

    if (typeof renewalFee === 'number') {
      sum += renewalFee;
    }
    if (lateFee) {
      sum += lateFee;
    }
    if (administrativeFee) {
      sum += administrativeFee;
    }
    return sum;
  }, [administrativeFee, lateFee, renewalFee]);

  return (
    <MuiDotAccordion label={t('general.containers.fee')} isDisabledExpand>
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={6} sm={6} item>
          <Controller
            name="renewal_fee"
            control={control}
            render={({ field, fieldState }) => (
              <MuiCurrencyTextFiled
                {...field}
                label={t('general.fieldNames.renewalFee')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={6} sm={6} item>
          <Controller
            name="late_fee"
            control={control}
            render={({ field, fieldState }) => (
              <MuiCurrencyTextFiled
                {...field}
                label={t('general.fieldNames.lateFee')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={6} sm={6} item>
          <Controller
            name="administrative_fee"
            control={control}
            render={({ field, fieldState }) => (
              <MuiCurrencyTextFiled
                {...field}
                label={t('general.fieldNames.administrativeFee')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={6} sm={6} item>
          <MuiCurrencyTextFiled isReadOnly label={t('general.fieldNames.totalAmount')} value={feeSum} />
        </Grid>
      </Grid>
    </MuiDotAccordion>
  );
};

export default LicencePlateStickerFeeBlock;
