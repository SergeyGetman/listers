import React from 'react';
import { Skeleton } from '@mui/material';

const PlannerItemSkeleton = () => {
  return (
    <Skeleton variant="rectangular" width="100%" height="60px" sx={{ mb: '16px', borderRadius: '5px' }} />
  );
};

export default PlannerItemSkeleton;
