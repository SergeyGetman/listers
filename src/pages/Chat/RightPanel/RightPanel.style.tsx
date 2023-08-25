import { Box, styled } from '@mui/material';

export const ChatRightPanelContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '5px',
  marginBottom: '20px',
  marginLeft: '15px',
  flexShrink: 1,
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  scrollBehavior: 'smooth',
  backgroundColor: theme.palette.case.contrast.white,

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    marginLeft: '0px',
  },

  [theme.breakpoints.up('md')]: {
    minWidth: '350px',
  },
}));

export const MessagesContainer = styled(Box)({
  '& ::-webkit-scrollbar': {
    width: '0px',
  },
  flexGrow: 1,
  padding: '0 10px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});
