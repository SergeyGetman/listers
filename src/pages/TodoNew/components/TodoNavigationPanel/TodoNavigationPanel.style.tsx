import { Box, styled } from '@mui/material';
import theme from '../../../../theme/theme';

export const TodoNavigationPanelContainer = styled(Box)(() => ({
  width: '100%',
  flexShrink: '0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginBottom: '24px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '16px',
  },
}));

export const TodoNavigationPanelDesktopContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '24px',

  [theme.breakpoints.down('lg')]: {
    marginBottom: '16px',
  },
}));

export const TodoNavigationPanelMobileContentContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const TodoNavigationPanelContentContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));
