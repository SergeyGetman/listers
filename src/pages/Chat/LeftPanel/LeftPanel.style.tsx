import { Box, styled } from '@mui/material';

export const ChatLeftPanelContainer = styled(Box)(({ theme }) => ({
  maxWidth: '350px',
  minWidth: '260px',
  height: '100%',
  width: '100%',
  flexShrink: 1,
  '& ::-webkit-scrollbar': {
    width: 0,
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    width: '100%',
  },
}));
