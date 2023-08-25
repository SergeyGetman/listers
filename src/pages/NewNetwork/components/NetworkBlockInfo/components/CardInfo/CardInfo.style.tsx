import { Box, styled } from '@mui/material';

export const CardInfoContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.case.neutral.n100}`,
  borderRadius: '8px',
  marginBottom: '16px',
  background: theme.palette.case.neutral.n0,
}));

export const CardInfoTitleContainer = styled(Box)(() => ({
  margin: '16px 16px 4px 16px',
}));

export const CardInfoContant = styled(Box)(() => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  margin: '16px 0',
  padding: '0 16px',
  filter: 'blur(4px)',
  pointerEvents: 'none',
}));
