import { Box, styled } from '@mui/material';

export const NetworkPageContainer = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  scrollbarWidth: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));

export const NetworkListItemContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const NetworkCardsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  scrollbarWidth: 'none',
}));
