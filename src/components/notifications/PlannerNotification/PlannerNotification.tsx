import React, { forwardRef } from 'react';
import { Typography, useTheme } from '@mui/material';
import { baseNotificationConfig } from '../BaseNotification/baseNotificationConfig';
import {
  PlannerNotificationContainer,
  PlannerNotificationLeftBlock,
  PlannerNotificationRightBlock,
} from './PlannerNotification.style';
type PlannerNotificationType = {
  onClose: (key: number) => void;
  notificationKey: number;
  msg?: string;
  title?: string;
  userName?: string;
};

const PlannerNotification = forwardRef<HTMLHeadingElement, PlannerNotificationType>(
  ({ msg = '', onClose, title = 'New updates', userName = '', notificationKey }, ref) => {
    const selectedItem = baseNotificationConfig.update;
    const theme = useTheme();
    return (
      <PlannerNotificationContainer ref={ref} onClick={() => onClose(notificationKey)}>
        <PlannerNotificationLeftBlock iconColor={selectedItem.iconColor} bgColor={selectedItem.bgColor}>
          <selectedItem.icon />
        </PlannerNotificationLeftBlock>
        <PlannerNotificationRightBlock>
          <Typography variant="default_bolt">{title}</Typography>
          <Typography sx={{ wordBreak: 'break-word' }} variant="default">
            {`${msg}  `}
            <Typography variant="default" sx={{ color: theme.palette.case.neutral.n400 }}>
              {userName}
            </Typography>
          </Typography>
        </PlannerNotificationRightBlock>
      </PlannerNotificationContainer>
    );
  },
);

export default PlannerNotification;
