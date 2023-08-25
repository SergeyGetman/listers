import React from 'react';
import { Box, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { NetworkBlockInfoContainer, NetworkBlockInfoSkeletonContainer } from '../NetworkBlockInfo.style';

const NetworkBlockInfoSkeleton = () => {
  const theme = useTheme();

  const isTabletDisplay = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <NetworkBlockInfoContainer>
      {!isTabletDisplay && (
        <Skeleton sx={{ borderRadius: '8px', padding: '0 24px' }} variant="rectangular" height={54} />
      )}
      <NetworkBlockInfoSkeletonContainer>
        {Array(3)
          .fill('')
          .map((_, skeletonIndex) => (
            <Box sx={{ mb: '16px' }} key={skeletonIndex}>
              <Skeleton sx={{ borderRadius: '8px' }} variant="rectangular" height={135} />
            </Box>
          ))}
      </NetworkBlockInfoSkeletonContainer>
    </NetworkBlockInfoContainer>
  );
};

export default NetworkBlockInfoSkeleton;
