import { Box, styled } from '@mui/material';

export const RoadmapContainer = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  msOverflowStyle: 'none',

  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },

  '& .backlog-list': {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '@media (max-width: 700px)': {
      justifyContent: 'center',
    },
  },
}));
