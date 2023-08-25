import React from 'react';
import { Box, Skeleton } from '@mui/material';

const UserProfileModalContentSkeleton = () => {
  return (
    <Box sx={{ height: '100%', pb: '100px' }}>
      <Skeleton variant="rectangular" width="100%" height="65px" />
      <Skeleton variant="rectangular" width="100%" height="111px" sx={{ mt: '16px' }} />
      <Box sx={{ p: '0 10px' }}>
        <Box sx={{ mt: '20px' }}>
          <Skeleton variant="rectangular" width="100%" height="70px" sx={{ borderRadius: '10px' }} />
        </Box>
        <Box sx={{ mt: '16px' }}>
          <Skeleton variant="rectangular" width="100%" height="70px" sx={{ borderRadius: '10px' }} />
        </Box>
        <Box sx={{ mt: '16px' }}>
          <Skeleton variant="rectangular" width="100%" height="70px" sx={{ borderRadius: '10px' }} />
        </Box>
        <Box sx={{ mt: '16px' }}>
          <Skeleton variant="rectangular" width="100%" height="70px" sx={{ borderRadius: '10px' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileModalContentSkeleton;
