import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Moment } from 'moment';
import ButtonDatepicker from '../../../../../../formElements/ButtonDatepicker';
import OnDaySelect from '../OnDaySelect';
type MonthlyRecurringBlockProps = {
  recurringEndDate?: Moment | null;
  handleChangeRecurringEndDate?: (val: Moment | null) => void;
  handleChangeRecurringStartDate?: (val: number) => void;
  recurringStartDate?: number | string | null;
};
const MonthlyRecurringBlock: FC<MonthlyRecurringBlockProps> = ({
  recurringEndDate,
  handleChangeRecurringEndDate,
  handleChangeRecurringStartDate,
  recurringStartDate,
}) => {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" mt="12px">
      <Box display="flex" alignItems="center">
        <Typography variant="t14r" color={theme.palette.case.neutral.n600}>
          on day
        </Typography>
        <OnDaySelect onDay={recurringStartDate} handleChangeOnDay={handleChangeRecurringStartDate} />
      </Box>
      <Box mt="4px">
        <ButtonDatepicker onChange={handleChangeRecurringEndDate} value={recurringEndDate} />
      </Box>
    </Box>
  );
};

export default MonthlyRecurringBlock;
