import { Box, styled } from '@mui/material';

type SwiperNextBtnProps = {
  isFirstImage: boolean;
};

type SwiperPrevBtnProps = {
  isLastImage: boolean;
};

export const SwiperContainer = styled(Box)({
  position: 'relative',
  height: '100%',

  '.swiper': {
    height: '100%',
  },

  '.swiper-button-disabled': {
    display: 'none',
  },

  '.swiper-wrapper': {
    display: 'flex',
    alignItems: 'center',
  },
});

export const SwiperNextBtn = styled(Box, {
  shouldForwardProp: (prop: string) => !['isFirstImage'].includes(prop),
})<SwiperNextBtnProps>(({ isFirstImage }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translate(0,-50%)',
  zIndex: 1,
  left: '15px',
  opacity: isFirstImage ? 0 : 1,
  '& .swiper-button-disabled': {
    background: 'red',
  },
}));

export const SwiperPrevBtn = styled(Box, {
  shouldForwardProp: (prop: string) => !['isLastImage'].includes(prop),
})<SwiperPrevBtnProps>(({ isLastImage }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translate(0,-50%)',
  zIndex: 1,
  right: '15px',
  opacity: isLastImage ? 0 : 1,
  '& .swiper-button-disabled': {
    display: 'none',
  },
}));
