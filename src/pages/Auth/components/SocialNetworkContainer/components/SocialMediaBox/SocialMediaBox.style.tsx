import { Box, styled } from '@mui/material';

export const ButtonBase = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  position: 'relative',
  zIndex: '1',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '8px',
  justifyContent: 'center',
  border: '1px solid #E6E8F0',
  backgroundColor: theme.palette.case.contrast.white,
  '&:hover': {
    transition: 'all 0.3s',
    boxShadow: theme.palette.case.shadow.small,
  },
}));
