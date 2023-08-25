import { Box, styled } from '@mui/material';
import theme from '../../../../theme/theme';

export const NetworkNavigationPanelContainer = styled(Box)(() => ({
  flexShrink: '0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginBottom: '24px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '16px',
  },
}));
