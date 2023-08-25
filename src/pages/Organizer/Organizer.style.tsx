import { Box, styled } from '@mui/material';

export const OrganizerContainer = styled(Box)(() => ({
  height: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    width: '0px !important',
  },
}));
