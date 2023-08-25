import { Box, styled } from '@mui/material';

export const StubContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '714px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const StubLine = styled(Box)(() => ({
  width: '100%',
  height: '1px',
  background: '#F2EDED',
}));
