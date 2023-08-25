import { styled } from '@mui/material';

export const ThreadsContainer = styled('div')<{ isScroll: boolean }>(({ isScroll }) => ({
  marginTop: '20px',
  height: 'calc(100% - 104px)',
  overflowY: isScroll ? 'auto' : 'hidden',
  '& ::-webkit-scrollbar': {
    width: 0,
  },
}));
