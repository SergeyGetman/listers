import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Moment from 'moment/moment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactComponent as SmallCalendar } from '../../../assets/Images/small-calendar.svg';
import { formatDateForView } from '../../../shared/utils/formatDateForView';
import { formatTimeForView } from '../../../shared/utils/formatTimeForView';
import MuiTooltip from '../../MuiTooltip';
import { ReminderTimeConfig } from '../../../shared/configs/selectors/reminderTime.config';
import { ReminderTimeEnum } from '../../../shared/enums/reminderTime.enum';
import { ReactComponent as ReminderIcon } from '../../../assets/Images/reminder-icon.svg';
import { RecurringPatternModal } from '../../../shared/models/recurringPatternModal';
import { getRecurringItemRepeatText } from '../../../shared/functions/getRecurringItemRpeatText';
import { ReactComponent as RepeatIcon } from '../../../assets/Images/repeat-icon.svg';

type DateTimeViewProps = {
  startDate?: string;
  startTime?: string;
  finishDate?: string;
  finishTime?: string;
  isAllDay?: boolean;
  isRange?: boolean;
  isShowRecurring?: boolean;
  isShowReminder?: boolean;
  isLate?: boolean;
  recurringPattern?: RecurringPatternModal;
  reminder?: ReminderTimeEnum;
};
const DateTimeView: FC<DateTimeViewProps> = ({
  startDate,
  startTime,
  finishDate,
  finishTime,
  isAllDay,
  isRange,
  isShowRecurring,
  isShowReminder,
  isLate,
  recurringPattern,
  reminder,
}) => {
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);
  const recurringText =
    isShowRecurring && recurringPattern ? getRecurringItemRepeatText(recurringPattern) : '';
  const formatStartDate = startDate ? formatDateForView(Moment(startDate)) : null;
  const formatStartTime = isAllDay ? 'all day' : startTime ? formatTimeForView(Moment(startTime)) : null;
  const formatFinishDate = finishDate ? formatDateForView(Moment(finishDate)) : null;
  const formatFinishTime = isAllDay ? 'all day' : finishTime ? formatTimeForView(Moment(finishTime)) : null;
  return (
    <Box
      display="flex"
      alignItems={isSmallDisplay ? 'flex-start' : 'center'}
      flexDirection={isSmallDisplay ? 'column' : 'row'}
      sx={{
        svg: {
          width: '16px',
          height: '16px',
          mb: '2px',
          path: {
            fill: isLate ? theme.palette.case.red.r500 : theme.palette.case.neutral.n500,
          },
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <SmallCalendar />
        <Typography
          ml="6px"
          color={isLate ? theme.palette.case.red.r500 : theme.palette.case.neutral.n800}
          variant="t14r"
        >
          {formatStartDate}
        </Typography>

        <Typography
          m="0 4px"
          color={isLate ? theme.palette.case.red.r500 : theme.palette.case.neutral.n500}
          variant="t14r"
        >
          {isAllDay ? 'during' : 'at'}
        </Typography>

        <Typography
          color={isLate ? theme.palette.case.red.r500 : theme.palette.case.neutral.n800}
          variant="t14r"
        >
          {formatStartTime}
        </Typography>
      </Box>
      <Box
        mt={isSmallDisplay ? '4px' : '0px'}
        ml={isSmallDisplay ? '22px' : '0'}
        display="flex"
        alignItems="center"
      >
        {isRange && (
          <>
            {!isSmallDisplay && (
              <Box m="0 8px">
                <Typography
                  color={isLate ? theme.palette.case.red.r500 : theme.palette.case.neutral.n500}
                  variant="t14r"
                >
                  -
                </Typography>
              </Box>
            )}

            <Typography
              color={isLate ? theme.palette.case.red.r500 : theme.palette.case.neutral.n800}
              variant="t14r"
            >
              {formatFinishDate}
            </Typography>

            <Typography
              m="0 4px"
              color={isLate ? theme.palette.case.red.r500 : theme.palette.case.neutral.n500}
              variant="t14r"
            >
              {isAllDay ? 'during' : 'at'}
            </Typography>

            <Typography
              color={isLate ? theme.palette.case.red.r500 : theme.palette.case.neutral.n800}
              variant="t14r"
            >
              {formatFinishTime}
            </Typography>
          </>
        )}

        {isShowReminder && (
          <Box
            sx={{
              ml: '12px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MuiTooltip
              color="dark"
              title={ReminderTimeConfig[reminder || ReminderTimeEnum.never_remind].label}
            >
              <ReminderIcon />
            </MuiTooltip>
          </Box>
        )}

        {isShowRecurring && (
          <Box
            sx={{
              ml: '12px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MuiTooltip color="dark" title={recurringText}>
              <RepeatIcon />
            </MuiTooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DateTimeView;
