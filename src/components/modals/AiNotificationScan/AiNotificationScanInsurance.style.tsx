import { Box, styled, Typography } from '@mui/material';

export const TitleBlockInsureNotification = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '48px',
  margin: '16px 0',
  borderRadius: '8px',
  border: '2px solid theme.palette.case.neutral.n100',
  background: theme.palette.case.neutral.n0,
  boxShadow: '0px 2px 8px 0px rgba(38, 44, 74, 0.08)',
  width: '95%',
  [theme.breakpoints.down('sm')]: {
    height: '72px',
    marginTop: '100px',
  },
}));

export const BlockNearAtention = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.case.blue.b300,
  width: '8px',
  borderRadius: '30px 0 0 30px',
}));

export const TitleInsideBlock = styled(Typography)(() => ({
  margin: '12px',
  textAlign: 'center',
  height: '24px',
}));

export const IConAiNotification = styled(Box)(({ theme }) => ({
  height: '24px',
  width: '24px',
  margin: '12px',

  color: theme.palette.case.blue.b500,
}));

export const BlockOnClose = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: '12px',
  marginLeft: 'auto',
  height: '16px',
  width: '16px',
  color: theme.palette.case.neutral.n500,
  cursor: 'pointer',
}));
