import { Box, Typography, styled } from '@mui/material';

export const ModalBlockContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  ':first-child': {
    paddingTop: '24px',
  },
  ':last-child': {
    paddingBottom: '24px',
  },
  padding: '32px 24px 0 24px',
  [theme.breakpoints.down('sm')]: {
    padding: ' 24px 16px',
  },
}));

export const ModalBlockText = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  color: theme.palette.case.neutral.n900,
  paddingBottom: '24px',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '16px',
  },
}));

export const ModalBlockTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.neutral.n900,
  paddingBottom: '8px',
}));
