import { Box, styled } from '@mui/material';

export const ContactMainBlockItemContainer = styled(Box)(({ theme }) => ({
  marginTop: '24px',

  [theme.breakpoints.down('sm')]: {
    marginTop: '40px',
  },
}));
