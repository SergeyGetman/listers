import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { HeaderOnlyTitleGeneralInformation } from '../../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import MuiCurrencyTextFiled from '../../../../../components/formElements/MuiCurrencyTextFiled';

interface IGarageInsuranceDeductibles {
  control: Control<any>;
}

const GarageInsureDeductibles: FC<IGarageInsuranceDeductibles> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid
        container
        rowSpacing={{ xs: '16px', sm: '16px' }}
        columnSpacing="24px"
        sx={{ padding: '20px 16px' }}
      >
        <Grid xs={12} md={2} lg={2} item>
          <HeaderOnlyTitleGeneralInformation variant="s2">
            {t('garageHub.DeductiblesBlock.title')}
          </HeaderOnlyTitleGeneralInformation>
        </Grid>

        <Grid item xs={12} sm={10}>
          <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} maxWidth="900px" columnSpacing="24px">
            <Grid item xs={6}>
              <Controller
                name="collision"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiCurrencyTextFiled
                    {...field}
                    label={t('garageHub.DeductiblesBlock.deductiblesLabel.comprehensive')}
                    placeholder={t('garageHub.DeductiblesBlock.deductiblesPlaceholder.placeholderName')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="comprehensive"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiCurrencyTextFiled
                    {...field}
                    label={t('garageHub.DeductiblesBlock.deductiblesLabel.collision')}
                    placeholder={t('garageHub.DeductiblesBlock.deductiblesPlaceholder.placeholderName')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GarageInsureDeductibles;
