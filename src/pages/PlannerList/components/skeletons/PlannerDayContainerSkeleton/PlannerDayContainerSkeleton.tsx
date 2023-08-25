import React from 'react';
import { Box, Divider, useTheme, Skeleton } from '@mui/material';
import PlannerItemSkeleton from '../PlannerItemSkeleton';

const PlannerDayContainerSkeleton = () => {
  const theme = useTheme();
  const skeletonArr = Array(1).fill({ name: '' });
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          mb: '11px',
          position: 'sticky',
          top: '0',
          zIndex: 3,
          paddingBottom: '5px',
          backgroundColor: theme.palette.case.neutral.n75,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: '0', mr: '10px' }}>
          <Skeleton variant="text" width="100px" height="20px" sx={{ mr: '10px' }} />
          <Skeleton
            variant="rectangular"
            width="60px"
            height="20px"
            sx={{ borderRadius: '20px', mr: '10px' }}
          />
          <Skeleton variant="text" width="30px" height="20px" sx={{ mr: '10px' }} />
          <Skeleton variant="rectangular" width="70px" height="20px" sx={{ borderRadius: '20px' }} />
        </Box>
        <Divider
          sx={{
            display: 'flex',
            flexGrow: '3',
            color: theme.palette.case.neutral.n400,
            borderStyle: 'dashed',
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {skeletonArr.map((item, index) => (
          <PlannerItemSkeleton key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default PlannerDayContainerSkeleton;
