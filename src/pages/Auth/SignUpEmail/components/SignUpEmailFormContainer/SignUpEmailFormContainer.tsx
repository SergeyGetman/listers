import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MuiBaseTextFiled from '../../../../../components/formElements/MuiBaseTextFiled';
type SignUpFromContainerProps = {
  control: any;
};
const SignUpEmailFormContainer: FC<SignUpFromContainerProps> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <Grid container rowSpacing="16px" columnSpacing="20px" sx={{ mb: '16px' }}>
      <Grid xs={12} sm={12} md={6} item>
        <Controller
          name="first_name"
          control={control}
          render={({ field, fieldState }) => (
            <MuiBaseTextFiled
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              label={t('general.fieldNames.firstName')}
              placeholder={t('general.placeholders.enter_your_first_name')}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid xs={12} sm={12} md={6} item>
        <Controller
          name="last_name"
          control={control}
          render={({ field, fieldState }) => (
            <MuiBaseTextFiled
              isShowPasswordIcons={false}
              label={t('general.fieldNames.lastName')}
              placeholder={t('general.placeholders.enter_your_last_name')}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid xs={12} item>
        <Controller
          name="login"
          control={control}
          render={({ field, fieldState }) => (
            <MuiBaseTextFiled
              {...field}
              label={t('general.fieldNames.email')}
              placeholder={t('general.placeholders.enter_email')}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default SignUpEmailFormContainer;
