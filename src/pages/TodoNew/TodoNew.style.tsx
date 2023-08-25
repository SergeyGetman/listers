import { Box, styled } from '@mui/material';

export const TodoPageContainer = styled(Box)(() => ({
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));
