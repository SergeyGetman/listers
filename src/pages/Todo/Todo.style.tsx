import { Box, styled } from '@mui/material';

export const TodoContainer = styled(Box)(() => ({
  height: '100%',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
  '& .todo-scrollable': {
    display: 'flex',
    height: '100%',
    width: '100%',
    paddingBottom: '100px',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    '@media (max-width: 700px)': {
      justifyContent: 'center',
    },
  },
  '& .infinite-scroll-component__outerdiv': {
    width: '100%',
  },
}));

export const TodoScrollableContainer = styled(Box)(() => ({
  overflowY: 'scroll',
  display: 'flex',
  outline: 'none',
  '@media (max-width: 700px)': {
    justifyContent: 'center',
  },
  paddingBottom: '100px',
  flexGrow: 1,
  overflowX: 'hidden',
  height: '100%',
  width: '100%',
}));
