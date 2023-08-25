import { Box, styled } from '@mui/material';

export const EmptyFileContainer = styled(Box)(({ theme }) => ({
  width: '195px',
  background: theme.palette.case.neutral.n75,
  pointerEvents: 'none',
  borderRadius: '8px',
}));
