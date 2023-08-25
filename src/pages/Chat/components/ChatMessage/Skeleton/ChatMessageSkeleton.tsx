import React, { FC } from 'react';
import { Box, Skeleton } from '@mui/material';
import { AvatarSizeEnum } from '../../../../../shared/enums/avatarSize.enum';

type Props = {
  size?: 'small' | 'medium';
};

const ChatMessageSkeleton: FC<Props> = ({ size = 'medium' }) => {
  return size === 'small' ? (
    <Box sx={{ p: '10px', display: 'flex', width: '100%' }}>
      <Box>
        <Skeleton variant="circular" height={AvatarSizeEnum.small} width={AvatarSizeEnum.small} />
      </Box>
      <Box sx={{ width: '60%', ml: '10px' }}>
        <Skeleton variant="text" height={20} width={150} />
        <Box sx={{ mt: '5px' }}>
          <Skeleton variant="text" height={20} width="100%" />
          <Skeleton variant="text" height={20} width="100%" />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box sx={{ p: '10px', display: 'flex', width: '100%' }}>
      <Box>
        <Skeleton variant="circular" height={AvatarSizeEnum.medium} width={AvatarSizeEnum.medium} />
      </Box>
      <Box sx={{ width: '60%', ml: '15px', mt: '5px' }}>
        <Skeleton variant="text" height={20} width={150} />
        <Box sx={{ mt: '5px' }}>
          <Skeleton variant="text" height={20} width="100%" />
          <Skeleton variant="text" height={20} width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessageSkeleton;
