import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Moment } from 'moment/moment';
import RepeatIntervalSelect from './components/RepeatIntervalSelect';
import RecurringTypeSelect from './components/RecurringTypeSelect';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import DailyRecurringBlock from './components/DailyRecurringBlock';
import MonthlyRecurringBlock from './components/MonthlyRecurringBlock';
import WeeklyRecurringBlock from './components/WeeklyRecurringBlock';

type CustomRecurringBlockProps = {
  repeatInterval?: number;
  recurringType?: RecurringTypeEnum;
  handleChangeRecurringCustomType?: (val: RecurringTypeEnum) => void;
  handleChangeRecurringRepeatInterval?: (val: number) => void;
  handleChangeRecurringStartDate?: (val: number) => void;
  handelChangeRecurringRepeatByDays?: (val: string[]) => void;
  recurringRepeatByDays?: string[];
  recurringStartDate?: number | string | null;
  recurringEndDate?: Moment | null;
  handleChangeRecurringEndDate?: any;
};
const CustomRecurringBlock: FC<CustomRecurringBlockProps> = ({
  repeatInterval,
  recurringType,
  handleChangeRecurringCustomType,
  handleChangeRecurringRepeatInterval,
  handelChangeRecurringRepeatByDays,
  recurringRepeatByDays,
  handleChangeRecurringStartDate,
  handleChangeRecurringEndDate,
  recurringEndDate,
  recurringStartDate,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', mt: '8px', p: '12px 24px', backgroundColor: theme.palette.case.neutral.n75 }}>
      <Box display="flex" width="100%" alignItems="center">
        <Typography variant="t14r" color={theme.palette.case.neutral.n600}>
          Every
        </Typography>
        <RepeatIntervalSelect
          repeatInterval={repeatInterval}
          handleChangeRecurringRepeatInterval={handleChangeRecurringRepeatInterval}
        />
        <RecurringTypeSelect
          recurringType={recurringType}
          handleChangeRecurringCustomType={handleChangeRecurringCustomType}
        />
      </Box>

      <Box>
        {recurringType === RecurringTypeEnum.DAILY && (
          <DailyRecurringBlock
            recurringEndDate={recurringEndDate}
            handleChangeRecurringEndDate={handleChangeRecurringEndDate}
          />
        )}
        {recurringType === RecurringTypeEnum.WEEKLY && (
          <WeeklyRecurringBlock
            recurringEndDate={recurringEndDate}
            recurringRepeatByDays={recurringRepeatByDays}
            handelChangeRecurringRepeatByDays={handelChangeRecurringRepeatByDays}
            handleChangeRecurringEndDate={handleChangeRecurringEndDate}
          />
        )}
        {recurringType === RecurringTypeEnum.MONTHLY && (
          <MonthlyRecurringBlock
            recurringEndDate={recurringEndDate}
            handleChangeRecurringEndDate={handleChangeRecurringEndDate}
            handleChangeRecurringStartDate={handleChangeRecurringStartDate}
            recurringStartDate={recurringStartDate}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomRecurringBlock;
