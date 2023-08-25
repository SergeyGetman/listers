import { Box, styled } from '@mui/material';

export const EventsContainer = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
  '& .events-scrollable': {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: '100px',
    '@media (max-width: 700px)': {
      justifyContent: 'center',
    },
  },
  '& .infinite-scroll-component__outerdiv': {
    width: '100%',
  },
}));

export const EventScrollableContainer = styled(Box)(() => ({
  overflowY: 'auto',
  display: 'flex',
  '@media (max-width: 700px)': {
    justifyContent: 'center',
  },
  flexGrow: 1,
  overflowX: 'hidden',
  height: '100%',
  width: '100%',
  scrollbarWidth: 'none',
}));

export const EventBottomGradientContainer = styled(Box)(() => ({
  position: 'fixed',
  width: '100%',
  height: '127px',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 68.22%)',
  bottom: 0,
  zIndex: 10,
  left: 0,
}));

export const EventListNoItemStubBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
  },
}));
