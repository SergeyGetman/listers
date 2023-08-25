import { Box, Skeleton } from '@mui/material';
import React from 'react';

const PaymentContainerSkeleton = () => {
  return (
    <Box>
      <Skeleton height={65} variant="rectangular" />
      <Box sx={{ mt: '30px', p: '0 10px' }}>
        <Box sx={{ mt: '30px' }}>
          <Skeleton sx={{ borderRadius: '10px' }} height={160} width={364} variant="rectangular" />
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentContainerSkeleton;
