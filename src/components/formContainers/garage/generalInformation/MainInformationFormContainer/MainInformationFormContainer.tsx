import React, { FC, useState } from 'react';
import { Control, Controller, UseFormSetValue, useWatch } from 'react-hook-form';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseContainer from '../../../../containers/BaseContainer';
import MuiSelect from '../../../../formElements/MuiSelect';
import {
  TransportBodyEnums,
  TransportColorEnum,
  TransportStyleEnum,
  TransportTrimEnum,
  TransportTypeEnum,
} from '../../../../../shared/enums/garage.enums';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import { getMake, getModel } from '../../../../../store/garage/garageThunk';
import { generateSelectOptions } from '../../../../../shared/utils/generateSelectOptions';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import useYearOptions from '../../../../../shared/hooks/useGetGarageOptions';
import { OptionType } from '../../../../formElements/MuiSelect/types';
type MainInformationFormContainerProps = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  transportType: TransportTypeEnum;
};
const bodyTypeOptions = generateSelectOptions(Object.values(TransportBodyEnums), 'garage.bodyType');
const styleTypeOptions = generateSelectOptions(Object.values(TransportStyleEnum), 'garage.styleType');
const trimTypeOptions = generateSelectOptions(Object.values(TransportTrimEnum), 'garage.trimType');
const colorTypeOptions = generateSelectOptions(Object.values(TransportColorEnum), 'garage.colorType');

const MainInformationFormContainer: FC<MainInformationFormContainerProps> = ({
  control,
  setValue,
  transportType,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { getYears } = useYearOptions();
  const [makeLoading, setMakeLoading] = useState(false);
  const [makeOptions, setMakeOptions] = useState<OptionType[]>([]);
  const [modelOptions, setModelOptions] = useState<OptionType[]>([]);
  const [modelLoading, setModelLoading] = useState(false);
  const makeValue = useWatch({
    control,
    name: 'make',
  });

  const getModelOptions = () => {
    setModelLoading(true);
    dispatch(getModel(transportType as string, makeValue?.value as string))
      .then((result) => setModelOptions(result))
      .finally(() => setModelLoading(false));
  };

  const getMakeOptions = () => {
    setMakeLoading(true);
    dispatch(getMake(transportType as string))
      .then((result) => setMakeOptions(result))
      .finally(() => setMakeLoading(false));
  };

  const changedMake = () => {
    setValue('model', null);
  };

  const clearMakeOptions = () => {
    setMakeOptions([]);
  };
  const clearModelOptions = () => {
    setModelOptions([]);
  };

  return (
    <BaseContainer
      title={t('general.containers.typeInformation', { type: t(`garage.transportType.${transportType}`) })}
    >
      <Grid container rowSpacing="24px" columnSpacing="24px">
        <Grid item xs={2}>
          <Controller
            name="year"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isSearchable
                isRequired
                isClearable
                label={t('general.fieldNames.year')}
                placeholder={t('general.placeholders.manufactureYear')}
                options={getYears(1885)}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={5}>
          {transportType === TransportTypeEnum.custom ? (
            <Controller
              name="make"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  {...field}
                  isRequired
                  isShowHint
                  maxHintValue={72}
                  label={t('general.fieldNames.make')}
                  placeholder={t('general.placeholders.make')}
                  value={field.value?.label || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange({ value: event.currentTarget.value, label: event.currentTarget.value });
                  }}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          ) : (
            <Controller
              name="make"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <MuiSelect
                    {...field}
                    onChange={(value) => {
                      changedMake();
                      field.onChange(value);
                    }}
                    isCreatable
                    isRequired
                    isClearable
                    isDisabled={false}
                    isSearchable
                    isLoading={makeLoading}
                    getAsyncData={getMakeOptions}
                    clearAsyncData={clearMakeOptions}
                    label={t('general.fieldNames.make')}
                    placeholder={t('general.placeholders.make')}
                    options={makeOptions}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                );
              }}
            />
          )}
        </Grid>
        <Grid item xs={5}>
          {transportType === TransportTypeEnum.custom || makeValue?.isNew ? (
            <Controller
              name="model"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  {...field}
                  isRequired
                  isShowHint
                  maxHintValue={72}
                  value={field.value?.label || ''}
                  label={t('general.fieldNames.model')}
                  placeholder={t('general.placeholders.model')}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange({ value: event.currentTarget.value, label: event.currentTarget.value })
                  }
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          ) : (
            <Controller
              name="model"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  isDisabled={makeValue === null}
                  isSearchable
                  isClearable
                  isRequired
                  isCreatable
                  getAsyncData={getModelOptions}
                  clearAsyncData={clearModelOptions}
                  isLoading={modelLoading}
                  label={t('general.fieldNames.model')}
                  placeholder={t('general.placeholders.model')}
                  options={modelOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          )}
        </Grid>
        {transportType === TransportTypeEnum.motorcycle && (
          <Grid item md={6} xs={12}>
            <Controller
              name="style"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  isClearable
                  isCreatable
                  isSearchable
                  label={t('general.fieldNames.style')}
                  placeholder={t('general.placeholders.style')}
                  options={styleTypeOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}

        {transportType === TransportTypeEnum.car && (
          <Grid item md={6} xs={12}>
            <Controller
              name="body"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  isClearable
                  isCreatable
                  isSearchable
                  label={t('general.fieldNames.bodyStyle')}
                  placeholder={t('general.placeholders.bodyStyle')}
                  options={bodyTypeOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}
        {transportType === TransportTypeEnum.car && (
          <Grid item md={6} xs={12}>
            <Controller
              name="trim"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  isSearchable
                  isCreatable
                  isClearable
                  label={t('general.fieldNames.trim')}
                  placeholder={t('general.placeholders.trim')}
                  options={trimTypeOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}
        <Grid item md={6} xs={12}>
          <Controller
            name="exterior_color"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isSearchable
                isClearable
                isCreatable
                label={t('general.fieldNames.exteriorColor')}
                placeholder={t('general.placeholders.exteriorColor')}
                options={colorTypeOptions}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        {transportType !== null && transportType !== TransportTypeEnum.motorcycle && (
          <Grid item md={6} xs={12}>
            <Controller
              name="interior_color"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  isSearchable
                  isClearable
                  isCreatable
                  label={t('general.fieldNames.interiorColor')}
                  placeholder={t('general.placeholders.interiorColor')}
                  options={colorTypeOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}
      </Grid>
    </BaseContainer>
  );
};

export default MainInformationFormContainer;
