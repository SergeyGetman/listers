import React, { FC, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { ScheduleEventContainer, ScheduleEventOllDay } from './ScheduleEvent.style';
import { PlannerItemStatusesEnum } from '../../../../shared/enums/plannerItemStatuses.enum';
import { PlannerItemModelTypeEnum } from '../../../../shared/enums/plannerItemModelType.enum';
type ScheduleEventProps = {
  data: any;
};
const ScheduleEvent: FC<ScheduleEventProps> = ({ data }) => {
  const theme = useTheme();

  const isUserNotification = useMemo(() => {
    return !!data?.original?.userNotification;
  }, [data?.original?.userNotification]);

  return data.allDay ? (
    isUserNotification ? (
      <Box sx={{ backgroundColor: data.color, borderRadius: '5px' }}>
        <ScheduleEventOllDay isPending={isUserNotification} color={data.color}>
          <Typography
            sx={{ color: theme.palette.case.contrast.white, lineHeight: '15px' }}
            noWrap
            variant="small"
          >
            {data.title}
          </Typography>
        </ScheduleEventOllDay>
      </Box>
    ) : (
      <ScheduleEventOllDay isPending={isUserNotification} color={data.color}>
        <Typography
          sx={{ color: theme.palette.case.contrast.white, lineHeight: '15px' }}
          noWrap
          variant="small"
        >
          {data.title}
        </Typography>
      </ScheduleEventOllDay>
    )
  ) : (
    <ScheduleEventContainer
      isMeybe={
        data?.original?.current_user?.status === PlannerItemStatusesEnum.maybe ||
        (data?.original?.model_type === PlannerItemModelTypeEnum.task && isUserNotification)
      }
      isPending={isUserNotification && data?.original?.model_type === PlannerItemModelTypeEnum.event}
      color={data?.color}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              color: theme.palette.case.contrast.black,
              lineHeight: '15px',
              width: '100%',
              minWidth: '50px',
            }}
            noWrap
            variant="small"
          >
            {data.title}
          </Typography>
          {data?.original?.is_recurring ? (
            <Box
              sx={{
                svg: {
                  mt: '2px',
                  width: '16px',
                  height: '16px',
                  path: {
                    fill: theme.palette.case.neutral.n500,
                  },
                },
              }}
            >
              <AutorenewIcon />
            </Box>
          ) : (
            <></>
          )}
        </Box>

        <Typography sx={{ color: theme.palette.case.neutral.n700 }} noWrap variant="extra_small">
          {data.start} - {data.end}
        </Typography>
      </Box>
    </ScheduleEventContainer>
  );
};

export default ScheduleEvent;
