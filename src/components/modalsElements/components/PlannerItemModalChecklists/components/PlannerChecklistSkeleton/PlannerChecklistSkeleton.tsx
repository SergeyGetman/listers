import React from 'react';
import { Box, Skeleton } from '@mui/material';

const PlannerChecklistSkeleton = () => {
  const skeletonArr = Array(6).fill('');

  return (
    <Box>
      {skeletonArr.map((item, index) => (
        <Box sx={{ height: '43px', mb: '16px' }} key={index}>
          <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height={43} />
        </Box>
      ))}
    </Box>
  );
};

export default PlannerChecklistSkeleton;
