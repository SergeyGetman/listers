import { Box, styled } from '@mui/material';

export const EventStatusItemContainer = styled(Box)(({ theme }) => ({
  marginRight: '16px',
  [theme.breakpoints.down('sm')]: {
    marginRight: '7px',
  },
}));
