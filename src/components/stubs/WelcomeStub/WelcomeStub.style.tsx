import { Box, Button, styled } from '@mui/material';

export const WelcomeStubContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'auto',
  width: '100%',
}));

export const WelcomeStubContainerSlide = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  textAlign: 'center',
  display: 'flex',
  '& .mySwiper': {
    display: 'flex',
    flexDirection: 'column',
    '& .swiper-wrapper': {
      boxSizing: 'border-box',
      maxWidth: '1000px',
    },
    '& .swiper-pagination': {
      width: '100%',
      position: 'relative',
      marginTop: '20px',
      bottom: '0',
      [theme.breakpoints.down('sm')]: { marginTop: '10px' },

      '& .swiper-pagination-bullet': {
        background: theme.palette.case.main.blue.high,
      },
    },
    '& .swiper-slide': {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      padding: '0 50px',
      alignItem: 'center',
    },
  },
}));

export const WelcomeStubSlideImg = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  position: 'relative',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: '350px',
  },
  '& .profile-bg-stub': {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      height: '100%',
    },
  },
}));

export const WelcomeStubLastSlide = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '100px 0 57px',
  [theme.breakpoints.down('sm')]: {
    padding: '30px 0 43px',
    height: '360px',
    width: '250',
  },

  svg: {
    width: '140px',
    marginBottom: '25px',
    [theme.breakpoints.down('sm')]: { width: '121px', marginBottom: '45px' },
  },
}));

export const WelcomeStubButtonSkip = styled(Button)(({ theme }) => ({
  padding: '5px',
  height: '20px',
  marginTop: '16px',
  color: theme.palette.case.main.blue.middle,
  '&:hover': {
    background: 'none',
    color: theme.palette.case.main.blue.middle,
    textDecoration: 'underline !important',
  },
}));
