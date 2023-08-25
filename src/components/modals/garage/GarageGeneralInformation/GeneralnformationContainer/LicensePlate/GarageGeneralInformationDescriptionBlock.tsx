import React, { FC } from 'react';

import { Grid } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import MuiDotAccordion from '../../../../../accordions/MuiDotAccordion';
import MuiBaseTextFiled from '../../../../../formElements/MuiBaseTextFiled';

type Props = {
  control: Control<any>;
};

const GarageGeneralInformationDescriptionBlock: FC<Props> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <MuiDotAccordion label="License plate" isDisabledExpand>
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid item md={6} xs={12}>
          <Controller
            name="state_on_license_plate"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                label={t('general.fieldNames.state')}
                placeholder={t('general.placeholders.enter_state')}
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
                label={t('general.fieldNames.number')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </MuiDotAccordion>
  );
};

export default GarageGeneralInformationDescriptionBlock;
