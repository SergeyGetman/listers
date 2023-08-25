import { Box, styled, Typography } from '@mui/material';

export const SecurityWipeDataContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '5px',
  border: `1px dashed ${theme.palette.case.neutral.n400}`,
  padding: '10px',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

export const SecurityWipeDataConfirmLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.6,
  },
}));
