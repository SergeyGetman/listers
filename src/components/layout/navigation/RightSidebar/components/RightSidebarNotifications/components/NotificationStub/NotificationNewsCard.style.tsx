import { Box, Typography, styled } from '@mui/material';

export const NotificationStubContainer = styled(Box)(() => ({
  marginTop: '40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));

export const NotificationTextContainer = styled(Typography)(({ theme }) => ({
  marginTop: '16px',
  color: theme.palette.case.neutral.n600,
  wordBreak: 'break-word',
}));
