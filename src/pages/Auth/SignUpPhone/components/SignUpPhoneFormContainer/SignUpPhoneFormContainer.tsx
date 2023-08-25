import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MuiBaseTextFiled from '../../../../../components/formElements/MuiBaseTextFiled';
import MuiPhoneNumberTextFiled from '../../../../../components/formElements/MuiPhoneNumberTextFiled';
type SignUpFromContainerProps = {
  control: any;
  handleChangePhone: (number: string, country: string) => void;
};
const SignUpPhoneFormContainer: FC<SignUpFromContainerProps> = ({ control, handleChangePhone }) => {
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
            <MuiPhoneNumberTextFiled
              {...field}
              label={t('general.fieldNames.phone')}
              onChange={(value: string, country: string) => handleChangePhone(value, country)}
              placeholder={t('general.placeholders.enter_number')}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              type="text"
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default SignUpPhoneFormContainer;
