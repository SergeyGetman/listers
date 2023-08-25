import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseContainer from '../../../containers/BaseContainer';
import MuiCurrencyTextFiled from '../../../formElements/MuiCurrencyTextFiled';
type DeductiblesFormContainerProps = {
  control: Control<any>;
};
const DeductiblesFormContainer: FC<DeductiblesFormContainerProps> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <BaseContainer title={t('general.containers.deductibles')}>
      <Grid container rowSpacing="24px" columnSpacing="24px">
        <Grid item md={6} xs={12}>
          <Controller
            name="collision"
            control={control}
            render={({ field, fieldState }) => (
              <MuiCurrencyTextFiled
                {...field}
                label={t('general.fieldNames.сollision')}
                placeholder={t('general.placeholders.collision')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="comprehensive"
            control={control}
            render={({ field, fieldState }) => (
              <MuiCurrencyTextFiled
                {...field}
                label={t('general.fieldNames.comprehensive')}
                placeholder={t('general.placeholders.comprehensive')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default DeductiblesFormContainer;
