import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Control, UseFormWatch } from 'react-hook-form/dist/types/form';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiSelect from '../../../../../../formElements/MuiSelect';
import LocationEdit from '../../../../../../locations/LocationEdit';
import useGetConnections from '../../../../../../../shared/hooks/useGetConnections';
import useUsaStates from '../../../../../../../shared/hooks/useUsaStates';
import { FormStickerLicenseValues } from '../../LicencePlateStickerContainer';

type Props = {
  control: Control<any>;
  watch: UseFormWatch<FormStickerLicenseValues>;
  handleChangeState: () => void;
};

const LicencePlateStickerResidentBlock: FC<Props> = ({ control, watch, handleChangeState }) => {
  const { t } = useTranslation();
  const { connectionsLoading, connectionsOptions } = useGetConnections();
  const { statesWithCounties, getCounty } = useUsaStates();

  return (
    <MuiDotAccordion label={t('general.containers.resident')} isDefaultExpand={false}>
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={12} sm={6} item>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isClearable
                isCreatable
                isSearchable
                isLoading={connectionsLoading}
                options={connectionsOptions}
                label={t('general.fieldNames.name')}
                placeholder={t('general.placeholders.select_name')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isClearable
                isSearchable
                onChange={(value) => {
                  field.onChange(value);
                  handleChangeState();
                }}
                options={statesWithCounties}
                label={t('general.fieldNames.state')}
                placeholder={t('general.placeholders.select_state')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Controller
            name="county"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isDisabled={watch('state') === null}
                isClearable
                isSearchable
                options={getCounty(watch('state')?.value || '')}
                label={t('general.fieldNames.county')}
                placeholder={t('general.placeholders.select_county')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={12} item>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <LocationEdit
                {...field}
                label={t('general.fieldNames.location')}
                placeholder={t('general.placeholders.enter_location')}
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

export default LicencePlateStickerResidentBlock;
