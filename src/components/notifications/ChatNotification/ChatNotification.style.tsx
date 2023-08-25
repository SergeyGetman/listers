import { Box, ButtonBase, styled } from '@mui/material';

export const ChatNotificationContainer = styled(Box)(({ theme }) => ({
  maxWidth: '319px',
  minWidth: '319px',
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.case.background,
  minHeight: '60px',
  borderRadius: '5px',
  boxShadow: theme.palette.case.shadow.big,
  zIndex: 2000,
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

export const ChatNotificationLeftBlock = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.case.main.gey.light,
  height: '100%',
  width: '44px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexShrink: 0,
  borderRadius: '5px 0 0 5px',
  svg: {
    width: '24px',
    height: '24px',
  },
}));

export const ChatNotificationSendButton = styled(ButtonBase)(() => ({
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: 'transparent',
}));
