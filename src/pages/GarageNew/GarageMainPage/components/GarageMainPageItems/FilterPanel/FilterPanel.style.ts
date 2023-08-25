import { Box, styled } from '@mui/material';
import theme from '../../../../../../theme/theme';

export const GarageFilterPanelContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    gap: '14px',
  },
  // marginBottom: '24px',
  // [theme.breakpoints.down('sm')]: {
  //   marginBottom: '16px',
  // },
}));

export const GarageFilterPanelDesktopContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '24px',

  [theme.breakpoints.down('lg')]: {
    marginBottom: '16px',
  },
}));
