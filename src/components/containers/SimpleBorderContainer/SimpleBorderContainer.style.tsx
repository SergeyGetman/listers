import { Box, styled } from '@mui/material';

export const StyleSimpleBorderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '8px',
  padding: '16px',
  backgroundColor: theme.palette.case.neutral.n0,
  border: `1px solid ${theme.palette.case.neutral.n200}`,
}));
