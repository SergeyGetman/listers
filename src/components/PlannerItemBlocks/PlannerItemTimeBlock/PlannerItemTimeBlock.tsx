/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, memo, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
type PlannerItemTimeBlockProps = {
  statedAt: string;
  finishedAt: string;
  isAllDay: boolean;
  containerDate: string;
};

const PlannerItemTimeBlock: FC<PlannerItemTimeBlockProps> = ({
  statedAt,
  finishedAt,
  containerDate,
  isAllDay,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const getPlannerItemTimeContent = useMemo(() => {
    const startedAtTheSameAsContainerDate =
      containerDate === Moment.utc(statedAt, 'YYYY-MM-DD HH:mm:ss').local().format('MMMM DD, YYYY');
    const finishedAtTheSameAsContainerDate =
      containerDate === Moment.utc(finishedAt, 'YYYY-MM-DD HH:mm:ss').local().format('MMMM DD, YYYY');

    if (startedAtTheSameAsContainerDate && finishedAtTheSameAsContainerDate) {
      return (
        <Box>
          {isAllDay ? (
            <Typography
              noWrap
              sx={{ color: theme.palette.case.contrast.black, textTransform: 'uppercase' }}
              variant="small"
            >
              {t('general.fieldNames.allDay')}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: theme.palette.case.contrast.black }} variant="small">
                {Moment.utc(statedAt, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')}
              </Typography>
              <Typography noWrap sx={{ color: theme.palette.case.neutral.n500 }} variant="small">
                {Moment.utc(finishedAt, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')}
              </Typography>
            </Box>
          )}
        </Box>
      );
    }

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
          {startedAtTheSameAsContainerDate ? (
            <>
              {isAllDay ? (
                <Typography
                  noWrap
                  sx={{ color: theme.palette.case.contrast.black, textTransform: 'uppercase' }}
                  variant="small"
                >
                  {t('general.fieldNames.allDay')}
                </Typography>
              ) : (
                <Typography noWrap sx={{ color: theme.palette.case.contrast.black }} variant="small">
                  {Moment.utc(statedAt, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')}
                </Typography>
              )}
            </>
          ) : (
            <Box
              sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}
            >
              <AccessAlarmRoundedIcon
                sx={{ color: theme.palette.primary.main, width: 16, height: 16, pb: '2px', mr: '2px' }}
              />
              <Typography
                noWrap
                sx={{ color: theme.palette.case.contrast.black, textTransform: 'uppercase' }}
                variant="small"
              >
                {Moment.utc(statedAt, 'YYYY-MM-DD HH:mm:ss').local().format('DD MMM')}
              </Typography>
            </Box>
          )}
          {finishedAtTheSameAsContainerDate ? (
            <>
              {isAllDay ? (
                <Typography noWrap sx={{ color: theme.palette.case.neutral.n500 }} variant="small_large">
                  {t('general.fieldNames.allDay')}
                </Typography>
              ) : (
                <Typography noWrap sx={{ color: theme.palette.case.neutral.n500 }} variant="small">
                  {Moment.utc(finishedAt, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')}
                </Typography>
              )}
            </>
          ) : (
            <Box
              sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}
            >
              <AccessAlarmRoundedIcon
                sx={{ color: theme.palette.case.neutral.n500, width: 16, height: 16, pb: '2px', mr: '2px' }}
              />
              <Typography noWrap sx={{ color: theme.palette.case.neutral.n500 }} variant="small">
                {Moment.utc(finishedAt, 'YYYY-MM-DD HH:mm:ss').local().format('DD MMM')}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  }, [statedAt, finishedAt, isAllDay, containerDate]);
  return <Box>{getPlannerItemTimeContent}</Box>;
};

export default memo(PlannerItemTimeBlock);
