import { Box, styled } from '@mui/material';

export const StyledBaseContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  backgroundColor: theme.palette.case.neutral.n50,
  boxShadow: theme.palette.case.shadow.container,
}));
