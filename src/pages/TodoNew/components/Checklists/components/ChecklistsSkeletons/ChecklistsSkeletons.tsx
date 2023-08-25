import React from 'react';
import { Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';

const ChecklistsSkeletons = () => {
  const theme = useTheme();

  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const skeletonArray = Array(4).fill('');

  return (
    <Grid
      container
      rowSpacing={{ xs: '16px', sm: '24px' }}
      columnSpacing="24px"
      sx={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '& ::-webkit-scrollbar': {
          width: '0px !important',
        },
        '@media (max-width: 650px)': { justifyContent: 'center' },
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'center',
        },
      }}
    >
      {skeletonArray.map((_, index: number) =>
        isMobileDisplay ? (
          <Grid
            sx={{
              '@media (min-width: 0px)': { width: '100%' },
              '@media (min-width: 650px)': { width: '50%' },
              '@media (min-width: 1200px)': { width: '33.33%' },
              '@media (min-width: 1650px)': { width: '25%' },
            }}
            item
            key={index}
          >
            <Skeleton
              sx={{
                width: '100%',
                minWidth: '300px',
                maxWidth: '650px',
                height: '48px',
                borderRadius: '5px 5px 0px 0px',
              }}
              variant="rectangular"
            />
          </Grid>
        ) : (
          <Grid
            sx={{
              '@media (min-width: 0px)': { width: '100%' },
              '@media (min-width: 650px)': { width: '50%' },
              '@media (min-width: 1200px)': { width: '33.33%' },
              '@media (min-width: 1650px)': { width: '25%' },
            }}
            item
            key={index}
          >
            <Skeleton
              sx={{
                width: '100%',
                minWidth: '300px',
                maxWidth: '650px',
                height: '348px',
                borderRadius: '5px',
              }}
              variant="rectangular"
            />
          </Grid>
        ),
      )}
    </Grid>
  );
};

export default ChecklistsSkeletons;
