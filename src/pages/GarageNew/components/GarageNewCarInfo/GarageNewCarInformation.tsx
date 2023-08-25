import React, { FC, useEffect, useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { validation } from '../../../../components/modals/garage/CreateGarageItemModal/components/steps/GeneralInfoStep/components/FirstSubStep/validation';
import MuiSelect from '../../../../components/formElements/MuiSelect';
import useYearOptions from '../../../../shared/hooks/useGetGarageOptions';
import { HeaderOnlyTitleGeneralInformation } from '../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import {
  CreateGarageItemModalContextProvider,
  CreateGarageItemModalContextType,
} from '../../../../components/modals/garage/CreateGarageItemModal/context/CreateGarageItemModalContext';
import { rest } from '../GarageMoreDetails/components/rest';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { IFormTypes, IOption } from './types';
import { changeDisableBTN, setDataFromPreSteps } from '../../store/garageSliceV2';
import { changeDataFormMinimalSend } from '../../utils/changeDataFormMinimalSend';
import { BlockCarInform } from './GarageNewCarInformation.style';

interface IGarageNewCarInformation {
  isTablet?: boolean;
  context?: CreateGarageItemModalContextType;
  readySubmit?: boolean;
}

const GarageNewCarInformation: FC<IGarageNewCarInformation> = ({ readySubmit }) => {
  const { getYears } = useYearOptions();
  const dispatch = useAppDispatch();

  const { year, make, model } = useAppSelector((state) => state.garageV2.dataFromPrevStep);
  const scanInsureVinNumber = useAppSelector((state) => state.garageV2.vinAndLicensePlate);
  const { transportType, insuranceRecognitionData } = useAppSelector((state) => state.garageV2);

  const theme = useTheme();

  const isMobileDisplay = useMediaQuery(`${theme.breakpoints.down('md')}`);
  const isTabletDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const initialValue: IFormTypes = {
    transport_type: transportType,
    year: year,
    make: make,
    model: model,
  };

  const { control, setValue, handleSubmit, watch } = useForm<IFormTypes>({
    mode: 'onSubmit',
    defaultValues: initialValue,
    resolver: yupResolver(validation),
  });

  const [watchModel] = watch(['model']);

  useEffect(() => {
    const optionWatchMake = (watchModel as IOption) || {};
    if (!!watchModel && !!Object.entries(watchModel)?.length && !!Object.entries(watchModel)?.length) {
      dispatch(changeDisableBTN(!optionWatchMake.value));
    }
    if (watchModel === null) {
      dispatch(changeDisableBTN(false));
    }
  }, [watchModel, dispatch]);

  const manualScaning = useCallback(() => {
    setValue('year', { value: year, label: year });
    setValue('make', { value: make, label: make });
    setValue('model', { value: model, label: model });
    const dataToDispatch = {
      year: year || '',
      make: make || '',
      model: model || '',
    };

    dispatch(setDataFromPreSteps(dataToDispatch));
  }, [setValue, year, make, model, dispatch]);

  const scanVin = useCallback(() => {
    setValue('year', {
      value: scanInsureVinNumber?.year,
      label: scanInsureVinNumber?.year,
    });
    setValue('make', { value: scanInsureVinNumber?.make, label: scanInsureVinNumber?.make });
    setValue('model', { value: scanInsureVinNumber?.model, label: scanInsureVinNumber?.model });

    const dataToDispatch = {
      year: scanInsureVinNumber?.year || '',
      make: scanInsureVinNumber?.make || '',
      model: scanInsureVinNumber?.model || '',
    };

    dispatch(setDataFromPreSteps(dataToDispatch));
  }, [setValue, dispatch, scanInsureVinNumber?.year, scanInsureVinNumber?.make, scanInsureVinNumber?.model]);

  const scanInsurance = useCallback(() => {
    const { vehicles } = insuranceRecognitionData;

    setValue('year', { value: vehicles[0]?.year, label: vehicles[0]?.year });
    setValue('make', { value: vehicles[0]?.make, label: vehicles[0]?.make });
    setValue('model', { value: vehicles[0]?.model, label: vehicles[0]?.model });
    const dataToDispatch = {
      transport_type: transportType,
      year: vehicles[0]?.year || '',
      make: vehicles[0]?.make || '',
      model: vehicles[0]?.model || '',
    };

    dispatch(setDataFromPreSteps(dataToDispatch));
  }, [insuranceRecognitionData, setValue, dispatch, transportType]);

  useEffect(() => {
    if (!!Object.entries(scanInsureVinNumber).length) {
      scanVin();
    } else if (!!Object.entries(insuranceRecognitionData).length) scanInsurance();
    else {
      manualScaning();
    }
  }, [scanInsureVinNumber, scanVin, manualScaning, scanInsurance, insuranceRecognitionData]);

  const handleFormSubmit: SubmitHandler<IFormTypes> = (data: IFormTypes) => {
    const dataUpdate = changeDataFormMinimalSend(data);
    dispatch(setDataFromPreSteps(dataUpdate));
  };

  useEffect(() => {
    if (readySubmit) {
      handleSubmit(handleFormSubmit)();
    }
    // eslint-disable-next-line
  }, [readySubmit]);

  const { t } = useTranslation();
  return (
    <CreateGarageItemModalContextProvider>
      <>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} columnSpacing="24px">
            <Grid>
              <HeaderOnlyTitleGeneralInformation variant="s2">
                {t('garageHub.MainInformationBlock.title')}
              </HeaderOnlyTitleGeneralInformation>
            </Grid>
            <Grid xs={12} sm={11} md={2} lg={2} spacing={1} item>
              <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} maxWidth="900px" columnSpacing="24px">
                <Grid lg={3.5} md={3.5} sm={3} xs={6} item>
                  <Controller
                    name="year"
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <MuiSelect
                          {...field}
                          isRequired
                          isSearchable
                          isClearable
                          label={t('garageHub.titleCarInformation.carInformSelects.year')}
                          placeholder={
                            year?.length >= 0
                              ? t('garageHub.titleCarInformation.carInformSelectsPlaceholder.labelYear')
                              : ''
                          }
                          options={getYears(1885)}
                          isError={!!fieldState?.error?.message}
                          helpText={fieldState?.error?.message}
                        />
                      );
                    }}
                  />
                </Grid>

                <Grid lg={6} md={3.5} sm={3} xs={6} item>
                  <Controller
                    name="make"
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <MuiSelect
                          {...field}
                          isRequired
                          isSearchable
                          isClearable
                          label={t('garageHub.titleCarInformation.carInformSelects.make')}
                          placeholder={t(
                            'garageHub.titleCarInformation.carInformSelectsPlaceholder.labelMake',
                          )}
                          options={rest.trimTypeOptions}
                          isError={!!fieldState?.error?.message}
                          helpText={fieldState?.error?.message}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid
                  xs={12}
                  lg={3.5}
                  md={6}
                  sm={3}
                  item
                  sx={{
                    opacity: '1',
                    display: isMobileDisplay ? 'none' : isTabletDisplay ? 'none' : 'flex',
                    backgroundColor: theme.palette.case.neutral.n800,
                  }}
                >
                  <Controller
                    name="make"
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

                <Grid xs={12} lg={6} md={6} sm={5} item>
                  <Controller
                    name="model"
                    control={control}
                    render={({ field, fieldState }) => {
                      return (
                        <MuiSelect
                          {...field}
                          value={field.value}
                          isRequired
                          isSearchable
                          isClearable
                          label={t('garageHub.titleCarInformation.carInformSelects.model')}
                          placeholder={t('garageHub.titleCarInformation.carInformSelects.model')}
                          options={rest.bodyTypeOptions}
                          isError={!!fieldState?.error?.message}
                          helpText={fieldState?.error?.message}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </>
    </CreateGarageItemModalContextProvider>
  );
};

export default GarageNewCarInformation;
