import React, { FC, useEffect } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { CreateGarageItemModalContextProvider } from '../../../../../components/modals/garage/CreateGarageItemModal/context/CreateGarageItemModalContext';
import MuiSelect from '../../../../../components/formElements/MuiSelect';
import { rest } from './rest';
import MuiBaseTextFiled from '../../../../../components/formElements/MuiBaseTextFiled';
import { FormMotoBlock } from '../../types';
import { validation } from '../../../../../components/modals/garage/CreateGarageItemModal/components/steps/GeneralInfoStep/components/FirstSubStep/validation';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { useBodySelectFromVehicle } from '../hooks/useBodyselect';
import { getDataAllDataForm } from '../../../store/garageSliceV2';

interface IGarageTypeMotoProps {
  readySubmit?: boolean;
}

const GarageTypeMoto: FC<IGarageTypeMotoProps> = ({ readySubmit }) => {
  const { control, setValue, getValues } = useForm<FormMotoBlock>({
    mode: 'onSubmit',
    defaultValues: rest.initialValueMotoBlock,
    resolver: yupResolver(validation),
  });

  const { vinAndLicensePlate } = useAppSelector((state) => state.garageV2);

  const dispatch = useAppDispatch();

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

  useEffect(
    () => {
      setValue('trim', { value: trim, label: trim });
      setValue('exterior_color', { value: exteriorColor, label: exteriorColor });
      setValue('engine_type', engine?.model);
      setValue('transmission', { value: transmission?.style, label: transmission?.style });
      setValue('mileage', mileage);
      setValue('drivetrain', drivetrain);
      setValue('country_of_assembly', manufacturer?.country);
      setValue('vin', vinNumber);
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
    ],
  );

  useEffect(() => {
    if (readySubmit) {
      const values = getValues();
      dispatch(getDataAllDataForm(values));
    }
  }, [readySubmit, dispatch, getValues]);

  return (
    <>
      <CreateGarageItemModalContextProvider>
        <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} columnSpacing="24px">
          <Grid xs={12} md={2} lg={2} item>
            <> {t('garageHub.moreDetailsBlock.title')}</>
          </Grid>

          <Grid item xs={12} sm={10}>
            <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} maxWidth="900px" columnSpacing="24px">
              <Grid xs={12} sm={6} item>
                <Controller
                  name="style"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      isSearchable
                      isClearable
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.bodyStyleMoto')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.bodyStyleMoto')}
                      options={bodySt || rest.motoBykeCircle}
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
                  name="fuel_type"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.fuelType')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.fuelType')}
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
                  name="engine_type"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.engineType')}
                      placeholder={t('garageHub.moreDetailsBlock.moreDetailsSelectsLabel.engineType')}
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
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      {...field}
                      isShowHint
                      maxHintValue={72}
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

export default GarageTypeMoto;
