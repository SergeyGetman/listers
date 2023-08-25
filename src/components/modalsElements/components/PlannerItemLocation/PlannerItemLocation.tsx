import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import { Box } from '@mui/material';
import LocationEdit from '../../../locations/LocationEdit';
type PlannerItemLocationProps = {
  control: Control<any>;
  placeholder?: string;
  locationFiledName?: string;
};
const PlannerItemLocation: FC<PlannerItemLocationProps> = ({ control, placeholder, locationFiledName }) => {
  const { t } = useTranslation();

  return (
    <Box mt="16px">
      <Controller
        name={locationFiledName ? locationFiledName : 'physicalAddress'}
        control={control}
        render={({ field }) => (
          <LocationEdit
            {...field}
            placeholder={placeholder ? placeholder : t('general.placeholders.enter_location')}
          />
        )}
      />
    </Box>
  );
};

export default PlannerItemLocation;
