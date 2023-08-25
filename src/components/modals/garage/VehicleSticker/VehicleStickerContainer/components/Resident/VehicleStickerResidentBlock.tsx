import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiSelect from '../../../../../../formElements/MuiSelect';

import useGetConnections from '../../../../../../../shared/hooks/useGetConnections';
import LocationEdit from '../../../../../../locations/LocationEdit';

type Props = {
  onClose?: () => void;
  control: Control<any>;
};

const VehicleStickerResidentBlock: FC<Props> = ({ control }) => {
  const { t } = useTranslation();

  const { connectionsLoading, connectionsOptions } = useGetConnections(true);

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

export default VehicleStickerResidentBlock;
