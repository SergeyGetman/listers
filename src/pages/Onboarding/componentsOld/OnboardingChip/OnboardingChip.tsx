import { Typography } from '@mui/material';
import React, { FC } from 'react';

type Props = { color: string; children: React.ReactNode };
const OnboardingChip: FC<Props> = ({ color, children }) => {
  return (
    <Typography
      noWrap
      variant="subtitle1"
      sx={{ background: color, p: '0 10px', borderRadius: '14px' }}
      fontWeight={700}
      component="span"
    >
      {children}
    </Typography>
  );
};

export default OnboardingChip;
