import { Box, styled } from '@mui/material';

export const MediaModalViewContainer = styled(Box)(({ theme }) => ({
  padding: '5px',
  [theme.breakpoints.up('xl')]: {
    maxHeight: '573px',
    height: '60vh',
  },
  [theme.breakpoints.down('xl')]: {
    maxHeight: '573px',
    height: '50vh',
  },
  [theme.breakpoints.down('md')]: {
    maxHeight: '500px',
    height: '50vh',
  },
  [theme.breakpoints.down('sm')]: {
    height: '300px',
  },
}));

export const MediaModalViewFooter = styled(Box)(({ theme }) => ({
  height: '77px',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  [theme.breakpoints.down('md')]: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const MediaModalViewItemContent = styled(Box)(() => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  '.react-transform-wrapper': {
    width: '100%',
    height: '100%',
  },
  '.react-transform-component': {
    width: '100%',
    height: '100%',
  },
}));
