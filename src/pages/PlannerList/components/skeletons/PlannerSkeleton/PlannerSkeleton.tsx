import React from 'react';
import { Box } from '@mui/material';
import PlannerDayContainerSkeleton from '../PlannerDayContainerSkeleton';

const PlannerSkeleton = () => {
  const skeletonArr = Array(7).fill({ name: '' });
  return (
    <Box
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'scroll',
        flexGrow: '3',
      }}
    >
      {skeletonArr.map((item, index) => (
        <PlannerDayContainerSkeleton key={index} />
      ))}
    </Box>
  );
};

export default PlannerSkeleton;
