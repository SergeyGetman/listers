import { Box, styled } from '@mui/material';

export const CheckboxContainer = styled(Box)(() => ({
  marginRight: '8px',
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '16px',
}));

export const ModalFooterContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  width: '100%',
  padding: '16px',
  bottom: 0,
}));
