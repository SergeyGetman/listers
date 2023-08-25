import { Box, styled } from '@mui/material';

export const WelcomeHubmeeBox = styled(Box)(() => ({
  width: '100%',
  height: '100vh',
  maxWidth: '420px',
  padding: '40px 0 40px 0',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const WelcomeHubmeeContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  maxWidth: '420px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '343px',
  },
}));

export const WelcomeHubmeeSocialNetworkBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
}));

export const SocialNetworkBoxVariants = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',
  maxWidth: '224px',
  marginTop: '24px',
}));
