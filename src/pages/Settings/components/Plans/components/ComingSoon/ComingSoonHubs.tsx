import React from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { planComingSoonTableColumnConfig } from '../../config';

const ComingSoonHubs = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container sx={{ border: `1px solid ${theme.palette.case.neutral.n100}`, borderRadius: '8px' }}>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.case.neutral.n200}`, padding: '8px 16px' }}>
          <Typography variant="large">Coming soon</Typography>
        </Box>
      </Grid>
      <Grid container columnSpacing="52px" rowSpacing="24px" p="16px">
        {planComingSoonTableColumnConfig.map((item, index) => (
          <Grid xs={isMobile ? 6 : undefined} item key={index}>
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: theme.palette.primary.main,
                  marginRight: '8px',
                }}
              />
              <Box>
                <Typography variant="large_bolt">{item}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ComingSoonHubs;
