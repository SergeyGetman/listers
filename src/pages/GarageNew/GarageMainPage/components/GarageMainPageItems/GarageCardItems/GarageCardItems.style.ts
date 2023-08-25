import { Box, styled } from '@mui/material';

export const GarageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  marginTop: '24px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
  flexWrap: 'wrap',
  gap: '24px',

  [theme.breakpoints.down('md')]: {
    gap: '16px',
  },
  overflowY: 'auto',
}));

export const GarageSwiperContainer = styled('div')`
  width: 100%;
  height: 100%;

  .swiper-slide {
    box-sizing: border-box;
  }
  .swiper-pagination {
    position: relative;
    padding-top: 30px;
  }
  .swiper-pagination-bullet {
    height: 6px;
    width: 6px;
    background: #bfc4da;
  }
  .swiper-pagination-bullet-active {
    height: 8px;
    width: 8px;
    background: #2b324f;
  }
`;
