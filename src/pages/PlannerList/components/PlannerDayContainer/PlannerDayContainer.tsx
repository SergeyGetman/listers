import React, { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import DayInfoContainer from '../DayInfoContainer';
import { PlannerDayBox } from './PlannerDayContainer.style';

type PlannerDayContainerProps = {
  currentUserFirstName?: string;
  date: string;
  isAddTodayId?: boolean;
  isFormatDate?: boolean;
  taskCount?: number;
  eventCount?: number;
  children: React.ReactNode;
};
const PlannerDayContainer: FC<PlannerDayContainerProps> = ({
  currentUserFirstName,
  date,
  isFormatDate = false,
  isAddTodayId = false,
  eventCount,
  taskCount,
  children,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isToday = useMemo(() => {
    return isAddTodayId || Moment().format('dddd, MMM DD') === Moment(date).format('dddd, MMM DD');
  }, [isAddTodayId, date]);
  const dayDate = useMemo(() => {
    return isFormatDate ? Moment(date).format('dddd, MMM DD') : date;
  }, [isFormatDate, date]);
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box id={isToday ? 'today' : ''} sx={{ minHeight: '100px' }}>
      <PlannerDayBox>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: isMobileDisplay ? '100%' : 'auto',
            flexShrink: '0',
          }}
        >
          {isToday && !isMobileDisplay && (
            <Typography sx={{ color: theme.palette.case.neutral.n400, mr: '10px' }} variant="label_middle">
              {t('general.hello')} {currentUserFirstName ? currentUserFirstName : ''}
            </Typography>
          )}
          {isToday && (
            <Box sx={{ mr: '10px' }}>
              <DayInfoContainer
                isMobileDisplay={isMobileDisplay}
                color={theme.palette.primary.main}
                content={t('general.fieldNames.today')}
              />
            </Box>
          )}

          <Typography
            noWrap
            sx={{ color: theme.palette.case.neutral.n700, mr: '10px' }}
            variant="small_large"
          >
            {dayDate}
          </Typography>
          {isMobileDisplay && (
            <Divider
              sx={{
                display: 'flex',
                flexGrow: '3',
                color: theme.palette.case.neutral.n400,
                borderStyle: 'dashed',
              }}
            />
          )}
          {!!taskCount && (
            <Box sx={{ m: isMobileDisplay ? '0 0 0 10px' : '0 10px 0 0' }}>
              <DayInfoContainer
                isMobileDisplay={isMobileDisplay}
                color={theme.palette.case.main.purple.middle}
                content={`${taskCount} ${
                  taskCount > 1 ? t('general.fieldNames.tasks') : t('general.fieldNames.task')
                }   `}
              />
            </Box>
          )}
          {!!eventCount && !!taskCount && (
            <Typography
              sx={{
                color: theme.palette.case.neutral.n700,
                m: isMobileDisplay ? '0 0 0 10px' : '0 10px 0 0 ',
              }}
              variant="small_large"
            >
              {t('general.and')}
            </Typography>
          )}
          {!!eventCount && (
            <Box sx={{ m: isMobileDisplay ? '0 0 0 10px' : '0 10px 0 0' }}>
              <DayInfoContainer
                isMobileDisplay={isMobileDisplay}
                color={theme.palette.case.warning.middle}
                content={`${eventCount} ${
                  eventCount > 1 ? t('general.fieldNames.events') : t('general.fieldNames.event')
                }   `}
              />
            </Box>
          )}
        </Box>
        {!isMobileDisplay && (
          <Divider
            sx={{
              display: 'flex',
              flexGrow: '3',
              color: theme.palette.case.neutral.n400,
              borderStyle: 'dashed',
            }}
          />
        )}
      </PlannerDayBox>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>{children}</Box>
    </Box>
  );
};

export default memo(PlannerDayContainer);
