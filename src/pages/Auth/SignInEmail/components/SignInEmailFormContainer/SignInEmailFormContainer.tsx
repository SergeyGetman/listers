import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MuiBaseTextFiled from '../../../../../components/formElements/MuiBaseTextFiled';
type SignUpFromContainerProps = {
  control: any;
};
const SignInEmailFormContainer: FC<SignUpFromContainerProps> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <Grid container rowSpacing="16px" columnSpacing="20px" sx={{ mb: '16px' }}>
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

export default SignInEmailFormContainer;
