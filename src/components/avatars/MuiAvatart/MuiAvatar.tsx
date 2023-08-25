import React, { FC, memo, useCallback, useMemo } from 'react';
import { Avatar, Badge, useTheme } from '@mui/material';
import { ReactComponent as AddImageIcon } from '../../../assets/Images/newGarage/garage-main-item/Add.svg';
import { ReactComponent as OwnerIcon } from '../../../assets/Images/owner.svg';
import { ReactComponent as TaskIcon } from '../../../assets/Images/hubsIcons/task-icon.svg';
import { ReactComponent as EventIcon } from '../../../assets/Images/hubsIcons/event-icon.svg';
import { ReactComponent as TodoIcon } from '../../../assets/Images/hubsIcons/todo-icon.svg';
import { ReactComponent as GarageIcon } from '../../../assets/Images/hubsIcons/garage-icon.svg';
import { ReactComponent as NetworkIcon } from '../../../assets/Images/hubsIcons/network-icon.svg';
import { ReactComponent as BacklogIcon } from '../../../assets/Images/hubsIcons/backlog-icon.svg';
import { AddIconContainer, HubsAvatarBadge, OnlineAvatarBadge } from './MuiAvarar.style';
import useBgColor from '../../../shared/hooks/useBgColor';
import { AvatarSizeEnum } from '../../../shared/enums/avatarSize.enum';
import { NotificationsTypesEnum } from '../../../shared/enums/notificationsEnum';

export type MuiAvatarProps = {
  size?:
    | 'extraSmall'
    | 'small'
    | 'medium'
    | 'extraMedium'
    | 'large'
    | 'extraLarge'
    | 'chatGroupAvatar'
    | 'extraMediumV2';
  variant?: 'circular' | 'rounded';
  firstName: string | undefined;
  lastName: string | undefined;
  src: string | undefined;
  isOnline?: boolean;
  hubIcon?: NotificationsTypesEnum;
  isOwner?: boolean;
  customStyle?: object;
  id: number;
  isAddPhotoIcon?: boolean;
};

const MuiAvatar: FC<MuiAvatarProps> = ({
  size = 'small',
  variant = 'circular',
  firstName,
  lastName,
  src,
  isOnline = false,
  hubIcon,
  isOwner = false,
  customStyle = {},
  id,
  isAddPhotoIcon = false,
}) => {
  const theme = useTheme();
  const handleSetAvatarStyle = useMemo(() => {
    switch (size) {
      case 'extraSmall':
        return {
          width: AvatarSizeEnum.extraSmall,
          height: AvatarSizeEnum.extraSmall,
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 10,
          lineHeight: '22px',
          border: 'none',
          textTransform: 'uppercase',
        };
      case 'small':
        return {
          width: AvatarSizeEnum.small,
          height: AvatarSizeEnum.small,
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 17,
          lineHeight: '22px',
          border: 'none',
          textTransform: 'uppercase',
        };
      case 'medium':
        return {
          width: AvatarSizeEnum.medium,
          height: AvatarSizeEnum.medium,
          fontStyle: 'normal',
          border: 'none',
          fontWeight: 400,
          fontSize: 17,
          lineHeight: '22px',
          textTransform: 'capitalize',
        };
      case 'extraMedium':
        return {
          width: AvatarSizeEnum.extraMedium,
          height: AvatarSizeEnum.extraMedium,
          fontStyle: 'normal',
          border: 'none',
          fontWeight: 400,
          fontSize: 17,
          lineHeight: '22px',
          textTransform: 'capitalize',
        };
      case 'extraMediumV2':
        return {
          width: AvatarSizeEnum.extraMediumV2,
          height: AvatarSizeEnum.extraMediumV2,
          fontStyle: 'normal',
          border: 'none',
          fontWeight: 400,
          fontSize: 17,
          lineHeight: '22px',
          textTransform: 'capitalize',
        };
      case 'large':
        return {
          width: AvatarSizeEnum.large,
          height: AvatarSizeEnum.large,
          border: 'none',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: 30,
          lineHeight: '35px',
          textTransform: 'capitalize',
        };
      case 'chatGroupAvatar':
        return {
          width: AvatarSizeEnum.chatGroupAvatar,
          height: AvatarSizeEnum.chatGroupAvatar,
          border: 'none',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: 30,
          lineHeight: '35px',
          textTransform: 'capitalize',
        };
      case 'extraLarge':
        return {
          width: AvatarSizeEnum.extraLarge,
          height: AvatarSizeEnum.extraLarge,
          border: 'none',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: 30,
          lineHeight: '35px',
          textTransform: 'capitalize',
        };
      default:
        return {};
    }
  }, [size]);

  const handleSetName = useMemo(() => {
    if (size === 'small') {
      return firstName?.slice(0, 1);
    }
    return `${firstName?.slice(0, 1)}${lastName?.slice(0, 1)}`;
  }, [firstName, lastName, size]);

  const { bgColor } = useBgColor();

  const getAvatarFill = useMemo(() => {
    return { backgroundColor: !!src ? '' : `${bgColor(id)}CC` };
  }, [id, bgColor, src]);

  // TODO useMemo
  const renderHubIcon = useCallback((iconName?: NotificationsTypesEnum) => {
    // TODO change icons without background
    if (iconName === NotificationsTypesEnum.task) {
      return <TaskIcon />;
    }

    if (iconName === NotificationsTypesEnum.event) {
      return <EventIcon />;
    }

    if (iconName === NotificationsTypesEnum.garage) {
      return <GarageIcon />;
    }

    if (iconName === NotificationsTypesEnum.todo || iconName === NotificationsTypesEnum.note) {
      return <TodoIcon />;
    }

    if (iconName === NotificationsTypesEnum.userRequest) {
      return <NetworkIcon />;
    }

    if (iconName === NotificationsTypesEnum.backlog) {
      return <BacklogIcon />;
    }

    return '';
  }, []);

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      badgeContent={<OwnerIcon />}
      invisible={!isOwner}
    >
      <OnlineAvatarBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        size={size}
        invisible={!isOnline}
        sx={{ ...customStyle }}
      >
        <HubsAvatarBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={renderHubIcon(hubIcon)}
          size={size}
          invisible={!hubIcon}
        >
          <Avatar
            sx={{
              ...handleSetAvatarStyle,
              ...getAvatarFill,
              border: `2px solid ${
                isOwner ? theme.palette.case.neutral.n0 : theme.palette.case.neutral.n100
              }  !important`,
            }}
            sizes={size}
            variant={variant}
            src={!!src ? `${src}` : ''}
          >
            {handleSetName}
            {isAddPhotoIcon && (
              <AddIconContainer
                sx={{
                  ...handleSetAvatarStyle,
                }}
              >
                <AddImageIcon />
              </AddIconContainer>
            )}
          </Avatar>
        </HubsAvatarBadge>
      </OnlineAvatarBadge>
    </Badge>
  );
};

export default memo(MuiAvatar);
