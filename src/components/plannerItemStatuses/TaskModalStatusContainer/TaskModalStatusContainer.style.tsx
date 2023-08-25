import { Box, styled } from '@mui/material';

export const StatusItemContainer = styled(Box)(({ theme }) => ({
  marginRight: '16px',
  [theme.breakpoints.down('sm')]: {
    marginRight: '7px',
  },
}));
