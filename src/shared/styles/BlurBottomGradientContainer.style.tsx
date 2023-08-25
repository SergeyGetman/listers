import { Box, styled } from '@mui/material';

export const BlurBottomGradientContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    position: 'fixed',
    width: '100%',
    height: '127px',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 68.22%)',
    bottom: 0,
    zIndex: 10,
    left: 0,
  },
}));
