import React, { FC, memo, useMemo } from 'react';
import { useAppSelector } from '../../../shared/hooks/redux';
import MuiAvatar, { MuiAvatarProps } from '../MuiAvatart/MuiAvatar';

const AvatarContainer: FC<MuiAvatarProps> = ({ ...props }) => {
  const onlineUsers = useAppSelector((state) => state.common.online);
  const userId = useAppSelector((state) => state.profile.data);

  const isOnline = useMemo(() => {
    const user = onlineUsers.findIndex((item) => item === props.id);
    if (props.variant === 'rounded') return false;
    if (userId && userId.id === props.id) return false;

    return user !== -1;
  }, [onlineUsers, props.id, props.variant, userId]);

  return <MuiAvatar {...props} isOnline={isOnline} />;
};

export default memo(AvatarContainer);
