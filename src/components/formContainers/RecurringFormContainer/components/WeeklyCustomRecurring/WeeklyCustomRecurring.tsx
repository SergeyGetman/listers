import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, Controller, UseFormSetValue, useWatch } from 'react-hook-form';
import { Box, Checkbox, Typography } from '@mui/material';
import MuiSmallNumberTextFiled from '../../../../formElements/MuiSmallNumberTextFiled';
import MuiDatePicker from '../../../../formElements/MuiDatePicker';
import { RecurringWeeklyDaysConfig } from '../../../../../shared/configs/selectors/recurringWeeklyDays.config';
import { RecurringWeeklyDaysEnum } from '../../../../../shared/enums/recurringWeeklyDays.enum';
import { WeeklyRecurringCheckbox } from './WeeklyCustomRecurring.style';

type WeeklyCustomRecurringProps = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
};
const WeeklyCustomRecurring: FC<WeeklyCustomRecurringProps> = ({ control, setValue }) => {
  const { t } = useTranslation();

  const recurringWeeklyDaysOptions = [
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.SU],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.MO],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.TU],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.WE],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.TH],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.FR],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.SA],
  ];
  const repeatByDaysArr = useWatch({
    control,
    name: 'recurring_pattern.repeat_by_days',
  });
  const handleWeeklyDaysChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const daysSet = new Set(repeatByDaysArr);
    const value = e.target.value;
    if (checked) {
      if (repeatByDaysArr.length === 6) {
        return;
      }
      setValue('recurring_pattern.repeat_by_days', Array.from(daysSet.add(value)));
    } else {
      if (repeatByDaysArr.length === 1) {
        return;
      }
      daysSet.delete(value);
      setValue('recurring_pattern.repeat_by_days', Array.from(daysSet));
    }
  };
  //  add Local
  return (
    <Box>
      {recurringWeeklyDaysOptions.map((item, index) => (
        <Controller
          key={index}
          name="recurring_pattern.repeat_by_days"
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              sx={{ borderRadius: '0', mr: '8px' }}
              value={item.value}
              color="primary"
              onChange={handleWeeklyDaysChange}
              checked={field?.value?.indexOf(item.value) !== -1}
              checkedIcon={
                <WeeklyRecurringCheckbox isSelected>
                  <Typography variant="default">{item.label}</Typography>
                </WeeklyRecurringCheckbox>
              }
              icon={
                <WeeklyRecurringCheckbox>
                  <Typography variant="default">{item.label}</Typography>
                </WeeklyRecurringCheckbox>
              }
            />
          )}
        />
      ))}
      <Box sx={{ mt: '16px' }}>
        <Controller
          name="recurring_pattern.repeat_interval"
          control={control}
          render={({ field, fieldState }) => (
            <MuiSmallNumberTextFiled
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              {...field}
              leftLabel="Repeat every"
              rightLabel="week(s)"
            />
          )}
        />
      </Box>

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

export default WeeklyCustomRecurring;
