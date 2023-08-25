import React, { FC } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  TransportFuelTypeEnum,
  TransportHybridEnum,
  TransportTransmissionTypeEnum,
} from '../../../../../shared/enums/garage.enums';
import BaseContainer from '../../../../containers/BaseContainer';
import MuiSelect from '../../../../formElements/MuiSelect';
import { generateSelectOptions } from '../../../../../shared/utils/generateSelectOptions';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
type MoreDetailsFormContainerProps = {
  control: Control<any>;
};

const fuelTypeOptions = generateSelectOptions(Object.values(TransportFuelTypeEnum), 'garage.fuelType');
const hybridTypeOptions = generateSelectOptions(Object.values(TransportHybridEnum), 'garage.hybridType');
const transmissionTypeOptions = generateSelectOptions(
  Object.values(TransportTransmissionTypeEnum),
  'garage.transmissionType',
);

const MoreDetailsFormContainer: FC<MoreDetailsFormContainerProps> = ({ control }) => {
  const { t } = useTranslation();

  const fuelTypeValue = useWatch({
    control,
    name: 'fuel_type',
  });

  return (
    <BaseContainer title={t('general.containers.moreDetails')}>
      <Grid container rowSpacing="24px" columnSpacing="24px">
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
                placeholder={t('general.placeholders.selectType', {
                  props: t('general.fuel'),
                })}
                options={fuelTypeOptions}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        {fuelTypeValue?.value === TransportFuelTypeEnum.hybrid && (
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
                  placeholder={t('general.placeholders.hybridType')}
                  options={hybridTypeOptions}
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
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.engineType')}
                placeholder={t('general.placeholders.engineType')}
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
                placeholder={t('general.placeholders.transmission')}
                options={transmissionTypeOptions}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="mileage"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.mileage')}
                placeholder={t('general.placeholders.mileage')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="drivetrain"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.drivetrain')}
                placeholder={t('general.placeholders.drivetrain')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="country_of_assembly"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                isShowHint
                maxHintValue={72}
                label={t('general.fieldNames.countryOfAssembly')}
                placeholder={t('general.placeholders.countryAssembly')}
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
    </BaseContainer>
  );
};

export default MoreDetailsFormContainer;
