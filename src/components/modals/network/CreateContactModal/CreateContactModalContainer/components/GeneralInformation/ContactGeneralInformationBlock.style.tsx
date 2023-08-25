import { Box, styled } from '@mui/material';

export const ContactMainBlockCheckboxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  maxHeight: '43px',
  marginTop: '20px',

  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
  },
}));
