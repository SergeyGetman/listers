import { Box, styled } from '@mui/material';

export const ContactMainBlockCheckboxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  maxHeight: '36px',
  marginTop: '20px',

  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
  },
}));

export const ContactMainBlockContainer = styled(Box)(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const ContactMainBlockAvatarContainer = styled(Box)(({ theme }) => ({
  marginRight: '24px',
  [theme.breakpoints.down('sm')]: {
    margin: '0 0 16px 0',
  },
}));
