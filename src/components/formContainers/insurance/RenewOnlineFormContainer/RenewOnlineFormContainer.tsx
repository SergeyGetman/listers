import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import BaseContainer from '../../../containers/BaseContainer';
import MuiBaseTextFiled from '../../../formElements/MuiBaseTextFiled';
type RenewOnlineFormContainerProps = {
  control: Control<any>;
};
const RenewOnlineFormContainer: FC<RenewOnlineFormContainerProps> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <BaseContainer title={t('general.containers.renewOnline')}>
      <Grid container rowSpacing="24px" columnSpacing="24px">
        <Grid item md={6} xs={12}>
          <Controller
            name="renew"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.website')}
                placeholder={t('general.placeholders.website')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="login"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.login')}
                placeholder={t('general.placeholders.login')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.password')}
                placeholder={t('general.placeholders.password')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="password"
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default RenewOnlineFormContainer;
