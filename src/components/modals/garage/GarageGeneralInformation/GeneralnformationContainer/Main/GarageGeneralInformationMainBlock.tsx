import React, { FC, memo, useCallback, useMemo, useState } from 'react';

import { Grid } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { UseFormWatch } from 'react-hook-form/dist/types/form';
import MuiSelect from '../../../../../formElements/MuiSelect';
import MuiDotAccordion from '../../../../../accordions/MuiDotAccordion';
import useYearOptions from '../../../../../../shared/hooks/useGetGarageOptions';
import { TransportGeneralInformationForm } from '../GeneralInformationContainer';
import MuiBaseTextFiled from '../../../../../formElements/MuiBaseTextFiled';
import { OptionType } from '../../../../../formElements/MuiSelect/MuiSelect';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import { getMake, getModel } from '../../../../../../store/garage/garageThunk';
import {
  TransportBodyEnums,
  TransportColorEnum,
  TransportFuelTypeEnum,
  TransportHybridEnum,
  TransportStyleEnum,
  TransportTrimEnum,
  TransportTypeEnum,
  TransportTransmissionTypeEnum,
} from '../../../../../../shared/enums/garage.enums';

import { generateSelectOptions } from '../../../../../../shared/utils/generateSelectOptions';

type Props = {
  control: Control<any>;
  watch: UseFormWatch<TransportGeneralInformationForm>;
  changedTransportType: (selectedTransportType: OptionType) => void;
  changedMake: () => void;
};

const GarageGeneralInformationMainBlock: FC<Props> = ({
  control,
  watch,
  changedTransportType,
  changedMake,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { getYears } = useYearOptions();

  const [makeOptions, setMakeOptions] = useState<OptionType[]>([]);
  const [makeLoading, setMakeLoading] = useState(false);
  const [modelOptions, setModelOptions] = useState<OptionType[]>([]);
  const [modelLoading, setModelLoading] = useState(false);

  const transportTypeOptions = useMemo(() => {
    return generateSelectOptions(Object.values(TransportTypeEnum), 'garage.transportType');
  }, []);

  const bodyTypeOptions = useMemo(() => {
    return generateSelectOptions(Object.values(TransportBodyEnums), 'garage.bodyType');
  }, []);
  const styleTypeOptions = useMemo(() => {
    return generateSelectOptions(Object.values(TransportStyleEnum), 'garage.styleType');
  }, []);
  const trimTypeOptions = useMemo(() => {
    return generateSelectOptions(Object.values(TransportTrimEnum), 'garage.trimType');
  }, []);

  const fuelTypeOptions = useMemo(() => {
    return generateSelectOptions(Object.values(TransportFuelTypeEnum), 'garage.fuelType');
  }, []);
  const hubridTypeOptions = useMemo(() => {
    return generateSelectOptions(Object.values(TransportHybridEnum), 'garage.hybridType');
  }, []);
  const transmissionTypeOptions = useMemo(() => {
    return generateSelectOptions(Object.values(TransportTransmissionTypeEnum), 'garage.transmissionType');
  }, []);
  const colorTypeOptions = useMemo(() => {
    return generateSelectOptions(Object.values(TransportColorEnum), 'garage.colorType');
  }, []);
  // TODO maybe need
  // const motorcycleTypeOptions = useMemo(() => {
  //   return generateSelectOptions(Object.values(TransportMotorcycleType), 'garage.motorcycleType');
  // }, []);

  const getMakeOptions = useCallback(() => {
    setMakeLoading(true);
    dispatch(getMake(watch('transport_type')?.value as string))
      .then((result) => setMakeOptions(result))
      .finally(() => setMakeLoading(false));
  }, [dispatch, watch]);

  const clearMakeOptions = () => {
    setMakeOptions([]);
  };

  const getModelOptions = useCallback(() => {
    setModelLoading(true);
    dispatch(getModel(watch('transport_type')?.value as string, watch('make')?.value as string))
      .then((result) => setModelOptions(result))
      .finally(() => setModelLoading(false));
  }, [dispatch, watch]);

  const clearModelOptions = () => {
    setModelOptions([]);
  };

  const selectedTransportType: TransportTypeEnum | null = useMemo(() => {
    if (watch('transport_type') === null) {
      return null;
    }
    if (watch('transport_type')?.value === TransportTypeEnum.car) {
      return TransportTypeEnum.car;
    }
    if (watch('transport_type')?.value === TransportTypeEnum.motorcycle) {
      return TransportTypeEnum.motorcycle;
    }
    return TransportTypeEnum.custom;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, watch('transport_type')]);

  return (
    <MuiDotAccordion
      label={t('general.containers.main')}
      isDisabledExpand
      isShowInfoDialog
      infoTooltipText={t('general.tooltips.selectTypeTransport')}
    >
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid item xs={6}>
          <Controller
            name="transport_type"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                onChange={(value) => {
                  changedTransportType(value);
                  field.onChange(value);
                }}
                isSearchable
                isClearable
                isCreatable
                isRequired
                label={t('general.fieldNames.transportType')}
                placeholder={t('general.placeholders.select_type')}
                options={transportTypeOptions}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
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
                placeholder={t('general.placeholders.select_year')}
                options={getYears(1885)}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          {selectedTransportType === null || selectedTransportType !== TransportTypeEnum.custom ? (
            <Controller
              name="make"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  onChange={(value) => {
                    changedMake();
                    field.onChange(value);
                  }}
                  isCreatable
                  isRequired
                  isClearable
                  isDisabled={watch('transport_type') === null}
                  isSearchable
                  isLoading={makeLoading}
                  getAsyncData={getMakeOptions}
                  clearAsyncData={clearMakeOptions}
                  label={t('general.fieldNames.make')}
                  placeholder={t('general.placeholders.select_manufacturer')}
                  options={makeOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          ) : (
            <Controller
              name="make"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  {...field}
                  isRequired
                  label={t('general.fieldNames.make')}
                  placeholder={t('general.placeholders.enter_manufacturer')}
                  value={field.value?.label || ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange({ value: event.currentTarget.value, label: event.currentTarget.value })
                  }
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {selectedTransportType === TransportTypeEnum.custom || watch('make')?.isNew ? (
            <Controller
              name="model"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  {...field}
                  isRequired
                  value={field.value?.label || ''}
                  label={t('general.fieldNames.model')}
                  placeholder={t('general.placeholders.enter_model')}
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
                  isDisabled={watch('transport_type') === null || watch('make') === null}
                  isSearchable
                  isClearable
                  isRequired
                  isCreatable
                  getAsyncData={getModelOptions}
                  clearAsyncData={clearModelOptions}
                  isLoading={modelLoading}
                  label={t('general.fieldNames.model')}
                  placeholder={t('general.placeholders.select_model')}
                  options={modelOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          )}
        </Grid>

        {selectedTransportType === TransportTypeEnum.motorcycle && (
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
                  placeholder={t('general.placeholders.select_body_style')}
                  options={styleTypeOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}

        {selectedTransportType === TransportTypeEnum.car && (
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
                  placeholder={t('general.placeholders.select_body_style')}
                  options={bodyTypeOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}
        {selectedTransportType === TransportTypeEnum.car && (
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
                  placeholder={t('general.placeholders.select_trim')}
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
                placeholder={t('general.placeholders.select_color')}
                options={colorTypeOptions}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        {selectedTransportType !== null && selectedTransportType !== TransportTypeEnum.motorcycle && (
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
                  placeholder={t('general.placeholders.select_color')}
                  options={colorTypeOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}

        {(selectedTransportType === TransportTypeEnum.car ||
          selectedTransportType === TransportTypeEnum.motorcycle) && (
          <Grid item md={6} xs={12}>
            <Controller
              name="fuel_type"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  isSearchable
                  isClearable
                  isCreatable
                  label={t('general.fieldNames.fuelType')}
                  placeholder={t('general.placeholders.select_type')}
                  options={fuelTypeOptions}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}

        {(selectedTransportType === TransportTypeEnum.car ||
          selectedTransportType === TransportTypeEnum.motorcycle) &&
          watch('fuel_type')?.label === t('garage.fuelType.hybrid') && (
            <Grid item md={6} xs={12}>
              <Controller
                name="hybrid_type"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isSearchable
                    isClearable
                    isCreatable
                    label={t('general.fieldNames.hybridType')}
                    placeholder={t('general.placeholders.select_type')}
                    options={hubridTypeOptions}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
          )}

        <Grid item md={6} xs={12}>
          <Controller
            name="engine_type"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                label={t('general.fieldNames.engineType')}
                placeholder={t('general.placeholders.enter_engine_type')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="transmission"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isSearchable
                isClearable
                isCreatable
                label={t('general.fieldNames.transmission')}
                placeholder={t('general.placeholders.select_type')}
                options={transmissionTypeOptions}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        {(selectedTransportType === TransportTypeEnum.car ||
          selectedTransportType === TransportTypeEnum.motorcycle) && (
          <Grid item md={6} xs={12}>
            <Controller
              name="mileage"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  {...field}
                  label={t('general.fieldNames.mileage')}
                  placeholder={t('general.placeholders.enter_mileage')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}
        {(selectedTransportType === TransportTypeEnum.car ||
          selectedTransportType === TransportTypeEnum.motorcycle) && (
          <Grid item md={6} xs={12}>
            <Controller
              name="drivetrain"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  {...field}
                  label={t('general.fieldNames.drivetrain')}
                  placeholder={t('general.placeholders.enter_drivetrain')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
        )}

        <Grid item md={6} xs={12}>
          <Controller
            name="country_of_assembly"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                label={t('general.fieldNames.countryOfAssembly')}
                placeholder={t('general.placeholders.enter_country')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="vin"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                label={t('general.fieldNames.vinNumber')}
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

export default memo(GarageGeneralInformationMainBlock);
