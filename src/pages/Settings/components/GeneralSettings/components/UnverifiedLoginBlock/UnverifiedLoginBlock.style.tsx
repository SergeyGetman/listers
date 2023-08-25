import { Box, styled, Typography } from '@mui/material';

export const UnverifiedLoginContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '5px',
  border: `1px dashed ${theme.palette.case.neutral.n400}`,
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
  whiteSpace: 'pre-line',
}));

export const UnverifiedLoginResendLink = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isDisabled',
})<{ isDisabled: boolean }>(({ isDisabled, theme }) => ({
  color: isDisabled ? theme.palette.case.contrast.gray4 : theme.palette.case.main.blue.high,
  cursor: 'pointer',
  marginLeft: '15px',
  pointerEvents: isDisabled ? 'none' : 'initial',
  '&:hover': {
    opacity: 0.6,
  },
}));
