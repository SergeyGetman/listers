import React, { ChangeEvent, FC, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import MuiSelect from '../../../../../components/formElements/MuiSelect';
import MuiBaseTextFiled from '../../../../../components/formElements/MuiBaseTextFiled';
import { FormMoreDetails } from '../../types';
import { validation } from '../../../../../components/modals/garage/CreateGarageItemModal/components/steps/GeneralInfoStep/components/FirstSubStep/validation';
import { rest } from './rest';
import { CreateGarageItemModalContextProvider } from '../../../../../components/modals/garage/CreateGarageItemModal/context/CreateGarageItemModalContext';
import { HeaderOnlyTitleGeneralInformation } from '../../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import { vinValidate } from '../../../GaragePreSteps/PreStepCustom/consts/validate';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import { useBodySelectFromVehicle } from '../hooks/useBodyselect';
import { getDataAllDataForm } from '../../../store/garageSliceV2';

interface IGarageTypeCarProps {
  transportType: string;
  isReady?: boolean;
  readySubmit?: boolean;
}

const GarageTypeCar: FC<IGarageTypeCarProps> = ({ readySubmit }) => {
  const { t } = useTranslation();
  const { vinAndLicensePlate, insuranceRecognitionData } = useAppSelector((state) => state.garageV2);
  const { vehicles } = insuranceRecognitionData || [];
  const dispatch = useDispatch();

  const {
    bodyStyle,
    trim,
    exteriorColor,
    interiorColor,
    fuelType,
    engine,
    transmission,
    mileage,
    drivetrain,
    manufacturer,
    vinNumber,
  } = vinAndLicensePlate;

  const { bodySt } = useBodySelectFromVehicle(bodyStyle);

  const { control, getValues, setValue } = useForm<FormMoreDetails>({
    mode: 'onSubmit',
    defaultValues: rest.initialValueMoreDetailBlock,
    resolver: yupResolver(validation),
  });

  useEffect(
    () => {
      setValue('body', { value: bodySt, label: bodySt });
      setValue('trim', { value: trim, label: trim });
      setValue('exterior_color', { value: exteriorColor, label: exteriorColor });
      setValue('interior_color', { value: interiorColor, label: interiorColor });
      setValue('fuel_type', { value: fuelType, label: fuelType });
      setValue('engine_type', engine?.model);
      setValue('transmission', { value: transmission?.style, label: transmission?.style });
      setValue('mileage', mileage);
      setValue('drivetrain', drivetrain);
      setValue('country_of_assembly', manufacturer?.country);
      if (vinNumber || vehicles) {
        setValue('vin', vinNumber ?? vehicles[0]?.vin);
      }
    },
    // eslint-disable-next-line
    [
      bodyStyle,
      trim,
      exteriorColor,
      interiorColor,
      fuelType,
      engine,
      transmission,
      mileage,
      drivetrain,
      manufacturer,
      vinNumber,
      setValue,
      vehicles,
    ],
  );

  useEffect(() => {
    if (readySubmit) {
      const values = getValues();
      dispatch(getDataAllDataForm(values));
    }
    // eslint-disable-next-line
  }, [readySubmit, dispatch]);

  return (
    <>
      <CreateGarageItemModalContextProvider>
        <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} columnSpacing="24px">
          <Grid xs={12} md={2} lg={2} item>
            <HeaderOnlyTitleGeneralInformation variant="s2">
              {t('garageHub.moreDetailsBlock.title')}
            </HeaderOnlyTitleGeneralInformation>
          </Grid>

          <Grid item xs={12} sm={10}>
            <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} maxWidth="900px" columnSpacing="24px">
              <Grid xs={12} sm={6} md={6} item>
                <Controller
                  name="body"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      isSearchable
                      isClearable
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.bodyStyle')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.bodyStyle')}
                      options={bodySt || rest.bodyTypeOptions}
                      isError={!!fieldState?.error?.message}
                      helpText={fieldState?.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="trim"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      isSearchable
                      isClearable
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.trim')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.trim')}
                      options={rest.trimTypeOptions}
                      isError={!!fieldState?.error?.message}
                      helpText={fieldState?.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="exterior_color"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      isSearchable
                      isClearable
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.exteriorColor')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.exteriorColor')}
                      options={rest.colorTypeOptions}
                      isError={!!fieldState?.error?.message}
                      helpText={fieldState?.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="interior_color"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      isSearchable
                      isClearable
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.interiorColor')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.interiorColor')}
                      options={rest.colorTypeOptions}
                      isError={!!fieldState?.error?.message}
                      helpText={fieldState?.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="fuel_type"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      isSearchable
                      isClearable
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.fuelType')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.fuelType')}
                      options={rest.fuelTypeOptions}
                      isError={!!fieldState?.error?.message}
                      helpText={fieldState?.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="engine_type"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      {...field}
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.engineType')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.engineType')}
                      isSearchable
                      isClearable
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      onChange={(val: any) => {
                        field.onChange(val);
                      }}
                      type="text"
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="transmission"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      isSearchable
                      isClearable
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.transmissions')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.transmissions')}
                      options={rest.transmissionTypeOptions}
                      isError={!!fieldState?.error?.message}
                      helpText={fieldState?.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="mileage"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.mileage')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.mileage')}
                      isSearchable
                      isClearable
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      type="text"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="drivetrain"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.drivetrain')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.drivetrain')}
                      isSearchable
                      isClearable
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      type="text"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="country_of_assembly"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.countryOfAssembly')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.countryOfAssembly')}
                      isSearchable
                      isClearable
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      type="text"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Controller
                  name="vin"
                  control={control}
                  rules={vinValidate}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      {...field}
                      isShowHint
                      maxHintValue={72}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const text = e.currentTarget.value.toUpperCase().trim();
                        field.onChange(text);
                      }}
                      label={t('general.fieldNames.vinNumber')}
                      placeholder={t('general.placeholders.vinNumber')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CreateGarageItemModalContextProvider>
    </>
  );
};

export default GarageTypeCar;
