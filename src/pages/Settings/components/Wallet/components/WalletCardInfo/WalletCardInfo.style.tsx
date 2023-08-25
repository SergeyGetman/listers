import { Box, styled, Typography } from '@mui/material';

export const WalletCardInfoHubmeek = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

export const WalletCardInfoDescription = styled(Typography)(({ theme }) => ({
  maxWidth: '260px !important',
  marginLeft: '50px !important',
  marginRight: '45px !important',
  [theme.breakpoints.down('lg')]: {
    marginLeft: '20px !important',
    marginRight: '20px !important',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none !important',
  },
}));

export const WalletCardInfoContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  paddingLeft: '5px',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    paddingLeft: '0',
  },
}));
