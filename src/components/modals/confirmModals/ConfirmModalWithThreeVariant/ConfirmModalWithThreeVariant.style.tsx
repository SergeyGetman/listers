import { Box, styled } from '@mui/material';

export const ConfirmModalWithThreeVariantContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  padding: '16px',
  dispatch: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));
