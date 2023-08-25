import React, { FC } from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

type ProfileSkeletonProps = {
  isMobileDisplay: boolean;
};

const ProfileSkeleton: FC<ProfileSkeletonProps> = ({ isMobileDisplay }) => {
  return isMobileDisplay ? (
    <Box sx={{ height: '100%', pb: '100px' }}>
      <Skeleton variant="rectangular" width="100%" height="120px" sx={{ borderRadius: '10px' }} />
      <Box sx={{ mt: '16px' }}>
        <Skeleton variant="rectangular" width="100%" height="90px" sx={{ borderRadius: '10px' }} />
      </Box>
      <Box sx={{ mt: '16px' }}>
        <Skeleton variant="rectangular" width="100%" height="90px" sx={{ borderRadius: '10px' }} />
      </Box>
      <Box sx={{ mt: '16px' }}>
        <Skeleton variant="rectangular" width="100%" height="90px" sx={{ borderRadius: '10px' }} />
      </Box>
      <Box sx={{ mt: '16px' }}>
        <Skeleton variant="rectangular" width="100%" height="90px" sx={{ borderRadius: '10px' }} />
      </Box>
    </Box>
  ) : (
    <Box sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" width="100%" height="200px" sx={{ borderRadius: '10px' }} />
      <Grid
        container
        columnSpacing="20px"
        sx={{ pb: '100px', width: '100%', mt: '20px', ml: '0 !important' }}
      >
        <Grid xs={6} item sx={{ paddingLeft: '0 !important' }}>
          <Skeleton variant="rectangular" width="100%" height="200px" sx={{ borderRadius: '10px' }} />
          <Box sx={{ mt: '30px', pb: '100px' }}>
            <Skeleton variant="rectangular" width="100%" height="200px" sx={{ borderRadius: '10px' }} />
          </Box>
        </Grid>
        <Grid xs={6} item>
          <Skeleton variant="rectangular" width="100%" height="200px" sx={{ borderRadius: '10px' }} />
          <Box sx={{ mt: '30px' }}>
            <Skeleton variant="rectangular" width="100%" height="200px" sx={{ borderRadius: '10px' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileSkeleton;
