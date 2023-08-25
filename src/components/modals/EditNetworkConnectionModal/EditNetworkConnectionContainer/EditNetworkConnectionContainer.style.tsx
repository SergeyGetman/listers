import { Box, styled } from '@mui/material';

export const EditNetworkConnectionRoleInput = styled(Box)(({ theme }) => ({
  width: '300px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '355px',
  },
}));

export const EditNetworkConnectionFormContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));
