import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Box, Typography, useTheme } from '@mui/material';
const ProgressBarWithLabel = (props: LinearProgressProps & { value: number; hintText?: string }) => {
  const theme = useTheme();
  const { hintText, value, ...args } = props;
  // TODO need Typography from DS
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <Typography
          sx={{ color: theme.palette.case.primary.p700, fontWeight: '500' }}
          variant="default"
        >{`${Math.round(value)}%`}</Typography>
        {hintText ? (
          <Typography sx={{ color: theme.palette.case.neutral.n500, fontWeight: '500' }} variant="default">
            {hintText}
          </Typography>
        ) : (
          <></>
        )}
      </Box>
      <Box sx={{ width: '100%' }}>
        {args ? (
          <LinearProgress sx={{ width: '100%' }} variant="determinate" value={value} {...args} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default ProgressBarWithLabel;
