import { Box, styled } from '@mui/material';

export const RoadmapCardViewContainer = styled(Box)(() => ({
  height: '100%',

  '& .roadmap-card-view-scrollable': {
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

export const RoadmapViewScrollableContainer = styled(Box)(() => ({
  overflowY: 'scroll',
  display: 'flex',
  '@media (max-width: 700px)': {
    justifyContent: 'center',
  },
  flexGrow: 1,
  overflowX: 'hidden',
  height: '100%',
  width: '100%',
}));

export const RoadmapViewBottomGradientContainer = styled(Box)(() => ({
  position: 'fixed',
  width: '100%',
  height: '127px',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 68.22%)',
  bottom: 0,
  zIndex: 10,
  left: 0,
}));

export const RoadmapNoItemStubBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
  },
}));
