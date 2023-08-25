import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import { Grid } from '@mui/material';
import BaseContainer from '../../../../containers/BaseContainer';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
type ZoneFormContainerProps = {
  control: Control<any>;
};
const ZoneFormContainer: FC<ZoneFormContainerProps> = ({ control }) => {
  const { t } = useTranslation();
  return (
    <BaseContainer title={t('general.containers.zone')}>
      <Grid container rowSpacing="24px" columnSpacing="24px">
        <Grid item md={6} xs={12}>
          <Controller
            name="zone_number"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                type="number"
                label={`${t('general.fieldNames.zoneNumber')}`}
                placeholder={t('general.placeholders.zoneNumber')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default ZoneFormContainer;
