import React, { FC, useMemo } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiCurrencyTextFiled from '../../../../../../formElements/MuiCurrencyTextFiled';
import { FormStickerType } from '../../VehicleStickerContainer';
import { YesNoEnum } from '../../../../../../../shared/enums/gender.enum';

type Props = {
  onClose?: () => void;
  control: Control<FormStickerType, any>;
  watch: UseFormWatch<FormStickerType>;
};

const VehicleStickerFeeBlock: FC<Props> = ({ control, watch }) => {
  const { t } = useTranslation();

  const zoneFee = watch('zone_fee');
  const stickerFee = watch('sticker_fee');
  const lateFee = watch('late_fee');
  const administrativeFee = watch('administrative_fee');

  const feeSum = useMemo(() => {
    let sum = 0;

    if (zoneFee) {
      sum += zoneFee;
    }
    if (stickerFee) {
      sum += stickerFee;
    }
    if (lateFee) {
      sum += lateFee;
    }
    if (administrativeFee) {
      sum += administrativeFee;
    }
    return sum;
  }, [administrativeFee, lateFee, stickerFee, zoneFee]);

  return (
    <MuiDotAccordion label={t('general.containers.fee')} isDefaultExpand={false}>
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={6} sm={6} item>
          <Controller
            name="sticker_fee"
            control={control}
            render={({ field, fieldState }) => (
              <MuiCurrencyTextFiled
                {...field}
                label={t('general.fieldNames.stickerFee')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        {watch('zone') !== null && watch('zone')?.value === YesNoEnum.yes && (
          <Grid xs={6} sm={6} item>
            <Controller
              name="zone_fee"
              control={control}
              render={({ field, fieldState }) => (
                <MuiCurrencyTextFiled
                  {...field}
                  label={t('general.fieldNames.zoneFee')}
                  placeholder={t('general.placeholders.enter_number')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}

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
        <Grid xs={12} sm={6} item>
          <MuiCurrencyTextFiled value={feeSum} isReadOnly label={t('general.fieldNames.totalAmount')} />
        </Grid>
      </Grid>
    </MuiDotAccordion>
  );
};

export default VehicleStickerFeeBlock;
