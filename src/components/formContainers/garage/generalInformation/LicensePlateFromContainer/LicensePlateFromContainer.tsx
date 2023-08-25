import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import BaseContainer from '../../../../containers/BaseContainer';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';

type LicensePlateFromContainerProps = {
  control: Control<any>;
};
const LicensePlateFromContainer: FC<LicensePlateFromContainerProps> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <BaseContainer title={t('general.containers.licensePlate')}>
      <Grid container rowSpacing="24px" columnSpacing="24px">
        <Grid item md={6} xs={12}>
          <Controller
            name="state_on_license_plate"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.state')}
                placeholder={t('general.placeholders.state')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="license_plate"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.number')}
                placeholder={t('general.placeholders.number')}
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

export default LicensePlateFromContainer;
