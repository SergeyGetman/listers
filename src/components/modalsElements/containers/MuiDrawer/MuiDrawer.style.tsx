import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

export const MuiDrawerContainer = styled(Box)({
  position: 'relative',
  height: '100%',
  overflowX: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const MuiDrawerContent = styled(Box)({
  padding: '0 10px',
  flexGrow: 1,
});
