import { Box, styled } from '@mui/material';

export const UserProfileModalContent = styled(Box)(() => ({
  width: '100%',
  overflow: 'auto',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));

export const UserProfileModalCardsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 10px',
}));
