import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import BaseContainer from '../../../../containers/BaseContainer';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
type MainInformationFormContainerProps = {
  control: Control<any>;
};
const MainInformationFormContainer: FC<MainInformationFormContainerProps> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <BaseContainer title={t('general.containers.mainInformation')}>
      <Grid container rowSpacing="24px" columnSpacing="24px">
        <Grid item md={6} xs={12}>
          <Controller
            name="registration_id"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.registrationID')}
                placeholder={t('general.placeholders.registrationID')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(event.target.value.toUpperCase())
                }
                isRequired
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="pin_code"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.pinCode')}
                placeholder={t('general.placeholders.pinCode')}
                isShowHint
                maxHintValue={72}
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

export default MainInformationFormContainer;
