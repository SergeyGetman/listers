import React, { ChangeEvent, FC } from 'react';
import { Box, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { CreateGarageItemModalContextProvider } from '../../../../components/modals/garage/CreateGarageItemModal/context/CreateGarageItemModalContext';
import { HeaderOnlyTitleGeneralInformation } from '../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import MuiSelect from '../../../../components/formElements/MuiSelect';
import { rest } from '../GarageMoreDetails/components/rest';
import MuiBaseTextFiled from '../../../../components/formElements/MuiBaseTextFiled';
import { validation } from '../../../../components/modals/garage/CreateGarageItemModal/components/steps/GeneralInfoStep/components/FirstSubStep/validation';
import { licensePlateValidate } from '../../GaragePreSteps/PreStepCustom/consts/validate';
import { IGarageLicense } from './types';

interface IGarageLicensePlate {
  pageNum?: number;
  readySubmit?: boolean;
}

const GarageLicensePlate: FC<IGarageLicensePlate> = () => {
  const { t } = useTranslation();
  const { control } = useForm<IGarageLicense>({
    defaultValues: rest.initialValue,
    resolver: yupResolver(validation),
  });

  return (
    <>
      <Box sx={{ marginTop: '40px' }}>
        <CreateGarageItemModalContextProvider>
          <Grid container rowSpacing={{ xs: '16px', sm: '24px' }} columnSpacing="24px">
            <Grid xs={12} md={2} lg={2} item>
              <HeaderOnlyTitleGeneralInformation variant="s2">
                {t('garageHub.LicensePlateBlock.title')}
              </HeaderOnlyTitleGeneralInformation>
            </Grid>

            <Grid item xs={12} sm={10}>
              <Grid container rowSpacing={{ xs: '16px', sm: '24px' }} maxWidth="900px" columnSpacing="24px">
                <Grid xs={6} item>
                  <Controller
                    name="number"
                    control={control}
                    rules={licensePlateValidate}
                    render={({ field, fieldState }) => (
                      <MuiBaseTextFiled
                        {...field}
                        label={t('garageHub.LicensePlateBlock.LicensePlateLabel.number')}
                        placeholder={t('garageHub.LicensePlateBlock.LicensePlateLabel.number')}
                        isSearchable
                        isClearable
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const text = e.currentTarget.value.toUpperCase().trim();
                          field.onChange(text);
                        }}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        type="text"
                      />
                    )}
                  />
                </Grid>
                <Grid xs={6} item>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiSelect
                        {...field}
                        isSearchable
                        isClearable
                        label={t('garageHub.LicensePlateBlock.LicensePlateLabel.state')}
                        placeholder={t('garageHub.LicensePlateBlock.LicensePlateLabel.state')}
                        options={rest.usaStateOptions}
                        isError={!!fieldState?.error?.message}
                        helpText={fieldState?.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CreateGarageItemModalContextProvider>
      </Box>
    </>
  );
};

export default GarageLicensePlate;
