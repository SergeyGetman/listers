import { Box, Typography, styled } from '@mui/material';

export const NetworkBlockInfoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  background: theme.palette.case.neutral.n0,
  borderRadius: '8px',
  overflow: 'hidden',

  [theme.breakpoints.down('lg')]: {
    background: 'initial',
    border: 'initial',
  },
}));

export const NetworkBlockInfoSkeletonContainer = styled(Box)(({ theme }) => ({
  padding: '16px 24px 0 24px',

  [theme.breakpoints.down('lg')]: {
    padding: '16px 0',
  },
}));

export const NetworkBlockInfoHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
  height: '54px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
  background: theme.palette.case.neutral.n0,
  borderRadius: '8px',

  [theme.breakpoints.down('lg')]: {
    padding: '0',
  },
}));

export const NetworkBlockInfoHeaderNameContainer = styled(Typography)(() => ({
  width: '400px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const NetworkBlockInfoContentContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const NetworkBlockInfoContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  border: `1px solid ${theme.palette.case.neutral.n100}`,
  background: theme.palette.case.neutral.n0,
  borderRadius: '8px',

  [theme.breakpoints.down('lg')]: {
    margin: '0',
  },
}));

export const NetworkBlockInfoCardContent = styled(Box)(({ theme }) => ({
  padding: '16px 24px 64px 24px',
  overflowY: 'scroll',
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('lg')]: {
    padding: '0',
  },
}));
