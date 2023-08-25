import React from 'react';
import { Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import MuiSelect from '../../../../../components/formElements/MuiSelect';
import { FormType } from '../../../../../components/modals/garage/CreateGarageItemModal/components/steps/GeneralInfoStep/components/FirstSubStep/types';
import { HeaderOnlyTitleGeneralInformation } from '../../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import { validation } from '../../../../../components/modals/garage/CreateGarageItemModal/components/steps/GeneralInfoStep/components/FirstSubStep/validation';
import { rest } from '../../../components/GarageMoreDetails/components/rest';

const GarageInsuranceMaiInformation = () => {
  const { t } = useTranslation();

  const initialValue: any = {
    transport_type: 'car',
    year: null,
    make: null,
    model: null,
    style: null,
    trim: null,
    body: null,
    exterior_color: null,
    interior_color: null,
  };

  const { control } = useForm<FormType>({
    defaultValues: initialValue,
    resolver: yupResolver(validation),
  });

  return (
    <>
      <Grid
        container
        rowSpacing={{ xs: '16px', sm: '16px' }}
        columnSpacing="24px"
        sx={{ padding: '40px 16px' }}
      >
        <Grid xs={12} md={2} lg={2} item>
          <HeaderOnlyTitleGeneralInformation variant="s2">
            {t('garageHub.MainInformationBlock.title')}
          </HeaderOnlyTitleGeneralInformation>
        </Grid>

        <Grid item xs={12} sm={10}>
          <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} maxWidth="900px" columnSpacing="24px">
            <Grid xs={6} item>
              <Controller
                name="transport_type"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isSearchable
                    isClearable
                    label={t('garageHub.MainInformationBlock.MainInformationLabel.policyNumber')}
                    placeholder={t('garageHub.MainInformationBlock.MainInformationPlaceholder.enterNumber')}
                    options={rest.bodyTypeOptions}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                name="trim"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isSearchable
                    isClearable
                    label={t('garageHub.MainInformationBlock.MainInformationLabel.issuedBy')}
                    placeholder={t('garageHub.MainInformationBlock.MainInformationPlaceholder.enterCompany')}
                    options={rest.trimTypeOptions}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={6} item>
              <Controller
                name="exterior_color"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isSearchable
                    isClearable
                    label={t('garageHub.MainInformationBlock.MainInformationLabel.naic')}
                    placeholder={t('garageHub.MainInformationBlock.MainInformationPlaceholder.enterNumber')}
                    options={rest.colorTypeOptions}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
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

export default GarageInsuranceMaiInformation;
