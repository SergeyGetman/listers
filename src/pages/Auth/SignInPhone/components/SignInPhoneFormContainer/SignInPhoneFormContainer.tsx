import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MuiPhoneNumberTextFiled from '../../../../../components/formElements/MuiPhoneNumberTextFiled';
type SignUpFromContainerProps = {
  control: any;
  handleChangePhone: (number: string, country: string) => void;
};
const SignInPhoneFormContainer: FC<SignUpFromContainerProps> = ({ control, handleChangePhone }) => {
  const { t } = useTranslation();

  return (
    <Grid container rowSpacing="16px" columnSpacing="20px" sx={{ mb: '16px' }}>
      <Grid xs={12} item>
        <Controller
          name="login"
          control={control}
          render={({ field, fieldState }) => (
            <MuiPhoneNumberTextFiled
              {...field}
              label={t('general.fieldNames.phone')}
              onChange={(value: string, country: string) => handleChangePhone(value, country)}
              placeholder={t('general.placeholders.enter_number')}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default SignInPhoneFormContainer;
