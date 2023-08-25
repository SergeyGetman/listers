import { Box, Skeleton } from '@mui/material';
import React from 'react';
import theme from '../../../theme/theme';

const skeletonWrapper = {
  width: 'calc(25% - 18px)',

  [theme.breakpoints.down('lg')]: {
    width: 'calc(33% - 14px)',
  },
  [theme.breakpoints.down('md')]: {
    width: 'calc(50% - 12px)',
  },

  [theme.breakpoints.between(1651, 2000)]: {
    width: 'calc(20% - 20px);',
  },
  [theme.breakpoints.between(1500, 1650)]: {
    width: 'calc(25% - 18px);',
  },
  [theme.breakpoints.between(1024, 1270)]: {
    width: 'calc(33% - 14px);',
  },
  [theme.breakpoints.between(1270, 1390)]: {
    width: 'calc(33% - 13px);',
  },
  [theme.breakpoints.between(767, 920)]: {
    width: 'calc(50% - 12px);',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
};
const skeleton = {
  maxWidth: '650px',
  borderRadius: '5px',
  height: '502px',
};

export const renderSkeleton = (count: number) => {
  return Array(count)
    .fill('')
    .map((_, index) => (
      <Box sx={skeletonWrapper} key={index}>
        <Skeleton key={index} sx={skeleton} variant="rectangular" />
      </Box>
    ));
};
