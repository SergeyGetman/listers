import { Box, styled } from '@mui/material';

export const RightSidebarChecklistItemContainer = styled(Box)(() => ({
  display: 'flex',
  height: 'calc(100% - 125px)',
  padding: '0 10px 30px 10px',
  flexDirection: 'column',
  marginTop: '16px',
  overflow: 'auto',
  '::-webkit-scrollbar': {
    width: '0',
  },
}));
