import { Box, styled } from '@mui/material';

export const GeneralSettingsContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  maxWidth: '960px',
  overflow: 'auto',
  scrollbarWidth: 'none',
  paddingBottom: '50px',
  justifyContent: 'space-around',
  alignItems: 'flex-start',

  flexWrap: 'wrap',
  '@media (max-width: 620px)': {
    justifyContent: 'center',
  },
}));

export const GeneralSettingsColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '460px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));
