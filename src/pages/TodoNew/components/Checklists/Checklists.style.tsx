import { Box, styled } from '@mui/material';

export const TodoContainer = styled(Box)(() => ({
  overflow: 'auto',
  height: '100%',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  overflowX: 'hidden',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));
