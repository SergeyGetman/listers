import { Grid, styled } from '@mui/material';

export const AuthPageImgGridItem = styled(Grid)(({ theme }) => ({
  img: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '50%',
    height: '100vh',
    objectFit: 'cover',
    opacity: '0.8',
    [theme.breakpoints.up('xl')]: {
      display: 'block',
    },
    [theme.breakpoints.down('xl')]: {
      display: 'none',
    },
  },
}));
