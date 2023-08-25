import { Box, styled } from '@mui/material';

export const GaragePeopleCoveredStyle = styled(Box)(({ theme }) => ({
  padding: '28px 16px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
