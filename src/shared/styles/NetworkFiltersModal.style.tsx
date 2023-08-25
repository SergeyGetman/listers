import { Box, styled } from '@mui/material';

export const NetworkFilterModalContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
}));

export const NetworkFilterInputContainer = styled(Box)(() => ({
  '@media (max-width: 400px)': {
    width: '375px',
  },
  overflowX: 'hidden',
}));
