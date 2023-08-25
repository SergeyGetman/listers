import React, { forwardRef } from 'react';
import { Typography } from '@mui/material';
import {
  BaseNotificationContainer,
  BaseNotificationLeftBlock,
  BaseNotificationRightBlock,
} from './BaseNotification.style';
import { baseNotificationConfig } from './baseNotificationConfig';

type BaseNotificationType = {
  onClose: (key: number) => void;
  notificationKey: number;
  msg: string;
  title?: string;
  variant: 'success' | 'error' | 'info' | 'update' | 'maintenance';
};

const BaseNotification = forwardRef<HTMLHeadingElement, BaseNotificationType>(
  ({ msg, onClose, variant, title, notificationKey }, ref) => {
    const selectedItem = baseNotificationConfig[variant];
    return (
      <BaseNotificationContainer ref={ref} onClick={() => onClose(notificationKey)}>
        <BaseNotificationLeftBlock iconColor={selectedItem.iconColor} bgColor={selectedItem.bgColor}>
          <selectedItem.icon />
        </BaseNotificationLeftBlock>
        <BaseNotificationRightBlock>
          <Typography sx={{ fontWeight: 700, lineHeight: '21px' }} variant="default_bolt">
            {title}
          </Typography>
          <Typography sx={{ lineHeight: '19px' }} variant="default">
            {msg}
          </Typography>
        </BaseNotificationRightBlock>
      </BaseNotificationContainer>
    );
  },
);

export default BaseNotification;
