import React from 'react';
import { Box, Skeleton } from '@mui/material';

const EditNetworkConnectionContainerSkeleton = () => {
  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box sx={{ position: 'sticky' }}>
        <Skeleton variant="rectangular" height={65} />
      </Box>
      <Box sx={{ p: '0 10px' }}>
        <Box sx={{ mt: '30px' }}>
          <Skeleton variant="rectangular" height={88} />
        </Box>
        <Box sx={{ mt: '16px' }}>
          <Skeleton variant="rectangular" height={225} />
        </Box>
        <Box sx={{ mt: '16px' }}>
          <Skeleton variant="rectangular" height={100} />
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', bottom: '0px', width: '100%' }}>
        <Skeleton variant="rectangular" height={80} />
      </Box>
    </Box>
  );
};

export default EditNetworkConnectionContainerSkeleton;
