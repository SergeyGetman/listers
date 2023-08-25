import { Box, styled } from '@mui/material';

export const BlockCarInform = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: '2px',
  },
}));
