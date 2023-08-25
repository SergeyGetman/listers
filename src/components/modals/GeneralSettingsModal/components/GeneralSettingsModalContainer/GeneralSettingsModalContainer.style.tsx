import { Box, styled } from '@mui/material';

export const GeneralSettingsModalContent = styled(Box)(() => ({
  width: '100%',
  padding: '30px 10px 0px 10px',
}));

export const GeneralSettingsModalContentRow = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));
export const GeneralSettingsModalModalNewEmailBox = styled(Box)(({ theme }) => ({
  width: '53%',
  marginRight: '16px',
  [theme.breakpoints.down('sm')]: {
    marginRight: '0px',
    marginBottom: '16px',
    width: '100%',
  },
}));
