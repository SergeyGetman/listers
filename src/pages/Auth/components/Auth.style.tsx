import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  width: '100%',
  height: '100vh',
  maxWidth: '420px',
  padding: '40px 0 40px 0',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ContantBox = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  maxWidth: '420px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '343px',
  },
}));

export const BottomBoxContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '244px',
  height: '40px',
}));
