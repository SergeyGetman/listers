import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactComponent as KeyIcon } from '../../../assets/Images/key.svg';
type AuthKeyStubProps = {
  title: string;
  isShowIcon?: boolean;
};
// TODO storybook

const AuthKeyStub: FC<AuthKeyStubProps> = ({ title, isShowIcon = true }) => {
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant={isSmallDisplay ? 'h2' : 'h1'}>{title}</Typography>
      {isShowIcon && (
        <Box sx={{ mt: '16px', display: { xs: 'none', sm: 'block' } }}>
          <KeyIcon />
        </Box>
      )}
    </Box>
  );
};

export default AuthKeyStub;
