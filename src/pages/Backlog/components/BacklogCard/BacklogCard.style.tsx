import { Box, styled } from '@mui/material';

export const BacklogItemContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: '10px',
  backgroundColor: theme.palette.case.contrast.white,
  boxShadow: theme.palette.case.shadow.big,
  cursor: 'pointer',
  borderRadius: '5px',
  '&:hover': {
    boxShadow: theme.palette.case.shadow.small,
  },
}));
