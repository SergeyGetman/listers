import { Box, styled } from '@mui/material';

export const SettingsContainer = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));
