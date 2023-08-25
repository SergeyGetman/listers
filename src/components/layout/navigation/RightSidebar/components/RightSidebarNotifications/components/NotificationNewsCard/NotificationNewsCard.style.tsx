import { Link } from 'react-router-dom';
import { Box, styled } from '@mui/material';

export const NotificationNewsCardWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '359px',
  marginTop: '8px',

  ':hover': {
    background: theme.palette.case.neutral.n100,
    borderRadius: '8px',
  },

  ' a:hover': {
    opacity: '1',
  },
}));

export const NotificationNewsCardContainer = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isDefaultPointer',
})<{ isDefaultPointer: boolean }>(({ isDefaultPointer }) => ({
  textDecoration: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '359px',
  padding: '8px',
  borderRadius: '8px',
  cursor: isDefaultPointer ? 'default' : 'pointer',
}));

export const NotificationNewsCardRightBlock = styled(Box)(() => ({
  display: 'flex',
  width: '24px',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}));

export const NotificationNewsCardDescriptionContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '247px',
  paddingRight: '8px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));
