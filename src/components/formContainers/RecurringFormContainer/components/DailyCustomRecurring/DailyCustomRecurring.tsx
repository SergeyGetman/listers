import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MuiSmallNumberTextFiled from '../../../../formElements/MuiSmallNumberTextFiled';
import MuiDatePicker from '../../../../formElements/MuiDatePicker';
type DailyCustomRecurringProps = {
  control: Control<any>;
};
const DailyCustomRecurring: FC<DailyCustomRecurringProps> = ({ control }) => {
  const { t } = useTranslation();
  //  add Local

  return (
    <Box>
      <Controller
        name="recurring_pattern.repeat_interval"
        control={control}
        render={({ field, fieldState }) => (
          <MuiSmallNumberTextFiled
            isError={!!fieldState?.error?.message}
            errorMessage={fieldState?.error?.message}
            {...field}
            leftLabel="Repeat every"
            rightLabel="day(s)"
          />
        )}
      />
      <Box sx={{ mt: '16px', width: '50%' }}>
        <Controller
          name="recurring_pattern.end_date"
          control={control}
          render={({ field, fieldState }) => (
            <MuiDatePicker
              {...field}
              isFullWidth={false}
              label={t('general.fieldNames.ends')}
              placeholder={t('general.placeholders.select_date')}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default DailyCustomRecurring;
