import { Box, styled, Typography } from '@mui/material';

export const PayDateInputViewContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '36px',
  borderLeft: `2px dashed ${theme.palette.primary.main}`,
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '7px',
}));

export const PayDateInputViewLabel = styled(Typography)(() => ({
  lineHeight: 0,
  paddingTop: '21px',
}));

export const PayDateInputViewDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.contrast.black,
  lineHeight: 0,
  paddingTop: '10px',
}));
