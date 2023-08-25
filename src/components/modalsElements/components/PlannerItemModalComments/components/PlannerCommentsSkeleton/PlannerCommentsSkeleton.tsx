import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { AvatarSizeEnum } from '../../../../../../shared/enums/avatarSize.enum';

const PlannerCommentsSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', p: '0 10px', mb: '24px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: '20px' }}>
        <Skeleton
          variant="circular"
          height={AvatarSizeEnum.small}
          width={AvatarSizeEnum.small}
          sx={{ mb: '2px' }}
        />
        <Skeleton variant="text" height={16} width={47} />
        <Skeleton variant="text" height={16} width={47} />
      </Box>
      <Box sx={{ width: '60%' }}>
        <Skeleton variant="text" height={20} width={150} />
        <Box sx={{ mt: '5px' }}>
          <Skeleton variant="text" height={20} width="100%" />
          <Skeleton variant="text" height={20} width="100%" />
          <Skeleton variant="text" height={20} width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default PlannerCommentsSkeleton;
