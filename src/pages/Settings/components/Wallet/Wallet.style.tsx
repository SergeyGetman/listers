import { Box, styled } from '@mui/material';

export const WalletContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  overflowY: 'auto',
  scrollbarWidth: 'none',
}));
