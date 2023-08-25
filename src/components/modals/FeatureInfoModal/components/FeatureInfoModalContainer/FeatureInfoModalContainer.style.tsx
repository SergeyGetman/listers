import { Box, styled } from '@mui/material';

export const ModalContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '78vh',
  flexGrow: '1',
  overflow: 'auto',
  borderRadius: '8px 8px 0px 0px',
  [theme.breakpoints.down('sm')]: {
    height: '100vh',
    borderRadius: '0px',
  },
}));

export const ModalContentContainer = styled(Box)(({ theme }) => ({
  background: 'white',
  marginTop: '68px',
  height: 'calc(100% - 68px - 70px)',
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    width: '8px !important',
  },
  '::-webkit-scrollbar-track': {
    display: 'none',
  },

  [theme.breakpoints.down('sm')]: {
    marginTop: '48px',
    height: 'calc(100% - 48px - 70px)',
  },
}));
