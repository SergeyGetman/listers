import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import MuiDatePicker from '../../../../formElements/MuiDatePicker';
import MuiSmallNumberTextFiled from '../../../../formElements/MuiSmallNumberTextFiled';
import { MonthlyCustomRecurringCalendar } from './MonthlyCustomRecurring.style';
type MonthlyCustomRecurringProps = {
  control: Control<any>;
};
const MonthlyCustomRecurring: FC<MonthlyCustomRecurringProps> = ({ control }) => {
  const { t } = useTranslation();
  //  add Local
  return (
    <Box>
      <Controller
        name="recurring_pattern.repeat_interval"
        control={control}
        render={({ field, fieldState }) => (
          <MuiSmallNumberTextFiled
            {...field}
            isError={!!fieldState?.error?.message}
            errorMessage={fieldState?.error?.message}
            leftLabel="Repeat every"
            rightLabel="month(s)"
          />
        )}
      />
      <MonthlyCustomRecurringCalendar sx={{ mt: '16px' }}>
        <Controller
          name="recurring_pattern.start_date"
          control={control}
          render={({ field }) => <DatePicker {...field} selected={field.value} inline />}
        />
      </MonthlyCustomRecurringCalendar>
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

export default MonthlyCustomRecurring;
