import { Box, styled } from '@mui/material';

export const FooterStyleGarage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '66px',
  marginTop: 'auto',
  padding: '75px 5px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
