import React, { FC } from 'react';
import { Box, Checkbox, FormControlLabel, useTheme } from '@mui/material';
import ButtonDatepicker from '../../../../../../formElements/ButtonDatepicker';
import { RecurringWeeklyDaysConfig } from '../../../../../../../shared/configs/selectors/recurringWeeklyDays.config';
import { RecurringWeeklyDaysEnum } from '../../../../../../../shared/enums/recurringWeeklyDays.enum';
type WeeklyRecurringBlockProps = {
  recurringEndDate?: any;
  recurringRepeatByDays?: any;
  handelChangeRecurringRepeatByDays?: (val: any) => void;
  handleChangeRecurringEndDate?: (val: any) => void;
};
const WeeklyRecurringBlock: FC<WeeklyRecurringBlockProps> = ({
  recurringEndDate,
  recurringRepeatByDays,
  handelChangeRecurringRepeatByDays,
  handleChangeRecurringEndDate,
}) => {
  const theme = useTheme();
  const recurringWeeklyDaysOptions = [
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.MO],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.TU],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.WE],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.TH],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.FR],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.SA],
    RecurringWeeklyDaysConfig[RecurringWeeklyDaysEnum.SU],
  ];
  const handleWeeklyDaysChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!recurringRepeatByDays) return;
    const daysSet = new Set(recurringRepeatByDays);
    const value = e.target.value;

    if (checked) {
      if (recurringRepeatByDays.length === 6) {
        return;
      }
      if (handelChangeRecurringRepeatByDays) {
        handelChangeRecurringRepeatByDays(Array.from(daysSet.add(value)));
      }
    } else {
      if (recurringRepeatByDays.length === 1) {
        return;
      }
      daysSet.delete(value);
      if (handelChangeRecurringRepeatByDays) {
        handelChangeRecurringRepeatByDays(Array.from(daysSet));
      }
    }
  };
  return (
    <Box mt="10px">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {recurringWeeklyDaysOptions.map((item, index) => (
          <FormControlLabel
            key={index}
            label={item.label[0]}
            labelPlacement="bottom"
            sx={{
              '& .MuiFormControlLabel-label': {
                pt: '2px',
                m: '0',
                color: theme.palette.case.neutral.n600,
                fontSize: '14px',
              },
            }}
            control={
              <Checkbox
                value={item.value}
                color="primary"
                onChange={handleWeeklyDaysChange}
                checked={recurringRepeatByDays?.indexOf(item.value) !== -1}
              />
            }
          />
        ))}
      </Box>
      <Box mt="4px">
        <ButtonDatepicker onChange={handleChangeRecurringEndDate} value={recurringEndDate} />
      </Box>
    </Box>
  );
};

export default WeeklyRecurringBlock;
