import React from 'react';
import { Box, Skeleton } from '@mui/material';

const WalletSkeleton = () => {
  const skeletonArr = Array(4).fill({ name: '' });

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
      {skeletonArr.map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height="90px"
          width="1000px"
          sx={{ mb: '16px', borderRadius: '5px' }}
        />
      ))}
    </Box>
  );
};

export default WalletSkeleton;
