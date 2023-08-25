import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment/moment';
import { PreStepCard } from '../../components/PreStepCard/PreStepCard';
import { ReactComponent as HandIcon } from '../../../../assets/Images/newGarage/pre-step/Hand.svg';
import MuiSelect from '../../../../components/formElements/MuiSelect';
import useYearOptions from '../../../../shared/hooks/useGetGarageOptions';
import MuiBaseTextFiled from '../../../../components/formElements/MuiBaseTextFiled';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { OptionType } from '../../../../components/formElements/MuiSelect/types';
import { TransportTypeEnum } from '../../../../shared/enums/garage.enums';
import { getTransportTypeSelector } from '../../store/garage-selectors';
import { setDataFromPreSteps, setGarageTransportType } from '../../store/garageSliceV2';
import { createNewTransport, getInfoMake, getInfoModel } from '../../store/garageThunkV2';
import { validationV2 } from '../../../../components/modals/garage/CreateGarageItemModal/components/steps/GeneralInfoStep/components/FirstSubStep/validation';
import router from '../../../../shared/services/router';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import { changeRequestTransportType } from '../../utils/changeRequestTransportType';

type SelectType = OptionType | null;
type FormType = {
  year: SelectType;
  make: SelectType;
  model: SelectType;
};

const PreStepCustom = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { getYears } = useYearOptions();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const currentTransportType = useAppSelector(getTransportTypeSelector);

  const [makeOptions, setMakeOptions] = useState<OptionType[]>([]);
  const [modelOptions, setModelOptions] = useState<OptionType[]>([]);
  const [isLoadingData, setIsLoadingData] = useState({
    isMakeLoading: false,
    isModelLoading: false,
  });

  const { control, handleSubmit, setValue, watch } = useForm<FormType>({
    mode: 'onSubmit',
    defaultValues: {
      year: null,
      make: null,
      model: null,
    },
    resolver: yupResolver(validationV2),
  });

  const [watchYear, watchMake, watchModel] = watch(['year', 'make', 'model']);

  const disableProceedBtn = !watchYear?.value || !watchMake?.value || !watchModel?.value;

  const getMakeOptions = async () => {
    setIsLoadingData((prevState) => ({
      ...prevState,
      isMakeLoading: true,
    }));
    await dispatch(getInfoMake(changeRequestTransportType(currentTransportType)))
      .unwrap()
      .then((res) => {
        setMakeOptions(res.data);
      })
      .finally(() =>
        setIsLoadingData((prevState) => ({
          ...prevState,
          isMakeLoading: false,
        })),
      );
  };
  const clearMakeOptions = () => {
    setMakeOptions([]);
  };

  const getModelOptions = async () => {
    setIsLoadingData((prevState) => ({
      ...prevState,
      isModelLoading: true,
    }));

    await dispatch(
      getInfoModel({
        year: +watchYear!.value,
        make: watchMake!.value,
        vehicleType: changeRequestTransportType(currentTransportType),
      }),
    )
      .unwrap()
      .then((res) => {
        setModelOptions(res.data);
      })
      .finally(() =>
        setIsLoadingData((prevState) => ({
          ...prevState,
          isModelLoading: false,
        })),
      );
  };
  const clearModelOptions = () => {
    setModelOptions([]);
  };

  const changedMake = () => {
    setValue('model', null);
  };
  const changedMakeAndModel = () => {
    setValue('model', null);
    setValue('make', null);
  };

  const submitCustomForm: SubmitHandler<FormType> = async (data) => {
    const mapperData = {
      transport_type: currentTransportType,
      year: +moment(data.year?.value).format('YYYY') || null,
      make: data.make?.value || null,
      model: data.model?.value || null,
    };

    dispatch(setDataFromPreSteps(mapperData));
    await dispatch(createNewTransport(mapperData));
    navigate('/create-car');
  };

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { title: t('general.breadcrumbs.garage'), href: router.garageNew.path },
        { title: `Add new ${currentTransportType}` },
      ]),
    );

    if (!!currentTransportType) return;

    const localStorageTransportType = localStorage.getItem('transportType') as TransportTypeEnum;
    dispatch(setGarageTransportType({ transportType: localStorageTransportType }));
  }, [currentTransportType, dispatch, t]);

  return (
    <form
      style={{ maxWidth: '672px', height: '100%', margin: '0 auto', marginTop: '175px' }}
      onSubmit={handleSubmit(submitCustomForm)}
    >
      <PreStepCard
        isShowFooter
        variantItem={{
          icon: <HandIcon />,
          subtitle: t('stubs.garage.preStep.custom.header.subtitle'),
          title: t('stubs.garage.preStep.custom.header.title'),
        }}
        header={t('stubs.garage.preStep.custom.header.header')}
        rightBtnProps={{
          label: t('plans.button.proceed'),
          type: 'submit',
          isShow: true,
          variant: 'contained',
          isDisabled: disableProceedBtn,
        }}
        middleBtnProps={{
          label: t('plans.button.back'),
          onClick: () => navigate(`${router.garageNew.path}/${router.garageNew.children.preStep.path}`),
          isShow: true,
        }}
      >
        <Box display="flex" flexDirection="column" gap={isMobile ? '8px' : '12px'}>
          <Box width={isMobile ? '100%' : '299px'}>
            <Controller
              control={control}
              name="year"
              rules={{ required: 'The field is required' }}
              render={({ field, fieldState }) => {
                return (
                  <MuiSelect
                    {...field}
                    isSearchable
                    isRequired
                    isClearable
                    label={t('garageHub.titleCarInformation.carInformSelects.year')}
                    placeholder={t('garageHub.titleCarInformation.carInformSelectsPlaceholder.labelYear')}
                    options={getYears(1885)}
                    onChange={(value) => {
                      changedMakeAndModel();
                      field.onChange(value);
                    }}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                );
              }}
            />
          </Box>

          <Box display="flex" gap={isMobile ? '8px' : '24px'} flexDirection={isMobile ? 'column' : 'row'}>
            <Box width="100%">
              {currentTransportType !== TransportTypeEnum.custom && (
                <Controller
                  name="make"
                  control={control}
                  render={({ field }) => {
                    return (
                      <MuiSelect
                        {...field}
                        isSearchable
                        isRequired
                        isClearable
                        isCreatable
                        onChange={(value) => {
                          changedMake();
                          field.onChange(value);
                        }}
                        getAsyncData={getMakeOptions}
                        clearAsyncData={clearMakeOptions}
                        label={t('garageHub.titleCarInformation.carInformSelects.make')}
                        placeholder={t('garageHub.titleCarInformation.carInformSelectsPlaceholder.labelMake')}
                        options={makeOptions}
                        isDisabled={!watchYear}
                        isLoading={isLoadingData.isMakeLoading}
                      />
                    );
                  }}
                />
              )}
              {currentTransportType === TransportTypeEnum.custom && (
                <Controller
                  name="make"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <MuiBaseTextFiled
                        {...field}
                        isRequired
                        value={field.value?.value || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange({
                            value: event.currentTarget.value,
                            label: event.currentTarget.value,
                          });
                        }}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        isDisabled={!watchYear}
                        label={t('garageHub.titleCarInformation.carInformSelects.make')}
                        placeholder={t(
                          'garageHub.titleCarInformation.carInformSelectsPlaceholder.labelEnterMake',
                        )}
                      />
                    );
                  }}
                />
              )}
            </Box>
            <Box width="100%">
              {currentTransportType !== TransportTypeEnum.custom && !watchMake?.isNew ? (
                <Controller
                  name="model"
                  control={control}
                  render={({ field }) => {
                    return (
                      <MuiSelect
                        {...field}
                        isSearchable
                        isRequired
                        isClearable
                        isCreatable
                        getAsyncData={getModelOptions}
                        clearAsyncData={clearModelOptions}
                        label={t('garageHub.titleCarInformation.carInformSelects.model')}
                        placeholder={t(
                          'garageHub.titleCarInformation.carInformSelectsPlaceholder.labelModel',
                        )}
                        options={modelOptions}
                        isDisabled={!watchYear || !watchMake}
                        isLoading={isLoadingData.isModelLoading}
                      />
                    );
                  }}
                />
              ) : (
                <Controller
                  name="model"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <MuiBaseTextFiled
                        {...field}
                        value={field.value?.value || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          field.onChange({
                            value: event.currentTarget.value,
                            label: event.currentTarget.value,
                          })
                        }
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        isDisabled={!watchYear}
                        label={t('garageHub.titleCarInformation.carInformSelects.model')}
                        placeholder={t(
                          'garageHub.titleCarInformation.carInformSelectsPlaceholder.labelEnterModel',
                        )}
                      />
                    );
                  }}
                />
              )}
              {currentTransportType === TransportTypeEnum.custom && watchMake?.isNew && (
                <Controller
                  name="model"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <MuiBaseTextFiled
                        {...field}
                        value={field.value?.value || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          field.onChange({
                            value: event.currentTarget.value,
                            label: event.currentTarget.value,
                          })
                        }
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        isDisabled={!watchYear}
                        label={t('garageHub.titleCarInformation.carInformSelects.model')}
                        placeholder={t(
                          'garageHub.titleCarInformation.carInformSelectsPlaceholder.labelEnterModel',
                        )}
                      />
                    );
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </PreStepCard>
    </form>
  );
};
export default PreStepCustom;
