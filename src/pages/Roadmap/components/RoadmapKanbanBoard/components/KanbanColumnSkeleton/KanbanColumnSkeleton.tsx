import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

const KanbanColumnSkeleton = () => {
  const skeletonArr = Array(12).fill({ name: '' });
  const columnArr = Array(3).fill({ name: '' });
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
        width: '100% !important',
        height: '100%',
      }}
      container
    >
      {columnArr.map((_, i) => (
        <Grid
          key={i}
          item
          sx={{
            height: '100%',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: '320px !important',
            maxWidth: '320px !important',
          }}
          xs={4}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '3px' }}>
            <Skeleton sx={{ borderRadius: '50%' }} variant="circular" height="26px" width="26px" />
            <Skeleton
              sx={{ ml: '10px', borderRadius: '5px' }}
              variant="rectangular"
              height="26"
              width="60px"
            />
          </Box>
          <Box sx={{ mt: '20px' }}>
            {skeletonArr.map((item, index) => (
              <Box key={index} sx={{ mb: '20px', width: '320px', height: '190px' }}>
                <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height="100%" width="100%" />
              </Box>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default KanbanColumnSkeleton;
