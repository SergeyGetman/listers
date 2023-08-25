import { Box, styled } from '@mui/material';

export const NetworkMobileHeaderContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  height: '54px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
  width: '100%',
  backgroundColor: theme.palette.case.contrast.white,
  boxShadow: theme.palette.case.shadow.small,
  zIndex: 1,
}));
