import { Box, styled } from '@mui/material';

export const ModalContainer = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  dispatch: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
}));

export const ModalContant = styled(Box)(() => ({
  width: '100%',
  padding: '24px 32px',
  margin: 'auto',
}));
