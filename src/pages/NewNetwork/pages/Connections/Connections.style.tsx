import { Box, styled } from '@mui/material';

export const NetworkPageContainer = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  scrollbarWidth: 'none',
  overflowY: 'hidden',

  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));

export const NetworkListPcContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  overflow: 'auto',
}));

export const NetworkListItemColumn = styled(Box)(({ theme }) => ({
  width: '45%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginRight: '24px',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    marginRight: '0',
  },
}));

export const NetworkBlockInfoColumn = styled(Box)(({ theme }) => ({
  width: '55%',
  height: '98%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    height: '100%',
  },
}));
