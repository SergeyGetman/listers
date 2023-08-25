import { Box, styled } from '@mui/material';

type GallerySwiperNextBtnProps = {
  isFirstImage: boolean;
};

type GallerySwiperPrevBtnProps = {
  isLastImage: boolean;
};

export const GallerySwiperContainer = styled(Box)({
  position: 'relative',
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

export const GallerySwiperNextBtn = styled(Box, {
  shouldForwardProp: (prop: string) => !['isFirstImage'].includes(prop),
})<GallerySwiperNextBtnProps>(({ isFirstImage }) => ({
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

export const GallerySwiperPrevBtn = styled(Box, {
  shouldForwardProp: (prop: string) => !['isLastImage'].includes(prop),
})<GallerySwiperPrevBtnProps>(({ isLastImage }) => ({
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
