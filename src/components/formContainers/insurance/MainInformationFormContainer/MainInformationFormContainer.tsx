import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiBaseTextFiled from '../../../formElements/MuiBaseTextFiled';
import BaseContainer from '../../../containers/BaseContainer';
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
            name="issued_by"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.issuedBy')}
                placeholder={t('general.placeholders.issuedBy')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="policy_number"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.policyNumber')}
                placeholder={t('general.placeholders.policyNumber')}
                isRequired
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="naic"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.naic')}
                placeholder={t('general.placeholders.naic')}
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

export default MainInformationFormContainer;
