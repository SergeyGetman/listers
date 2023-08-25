import { Box, styled } from '@mui/material';

export const RightSidebarNotesItemContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: 'calc(100% - 280px)',
  padding: '0 10px 30px 10px',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '16px',
  overflow: 'auto',
  '::-webkit-scrollbar': {
    width: '0',
  },
}));
