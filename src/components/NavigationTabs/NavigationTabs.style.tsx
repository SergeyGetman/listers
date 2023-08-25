import { Box, styled, Tab, Tabs } from '@mui/material';
import theme from '../../theme/theme';

export const TabConteiner = styled(Tab, {
  shouldForwardProp: (prop: string) => !['minWidthTabs'].includes(prop),
})<{ minWidthTabs?: string }>(({ minWidthTabs }) => ({
  maxHeight: '40px',
  minHeight: '40px',
  textTransform: 'capitalize',
  fontSize: '16px',
  padding: '8px 12px',
  minWidth: minWidthTabs,
  '&.MuiTab-labelIcon': {
    svg: {
      width: '20px !important',
      height: '20px !important',
    },
  },

  '&.Mui-selected': {
    svg: {
      path: {
        // TODO add new color
        fill: '#359721',
      },
    },
    '&.MuiTab-textColorPrimary': {
      color: '#359721',
    },
  },
}));

export const TabsContainer = styled(Tabs)(() => ({
  minHeight: '40px',
  maxHeight: '40px',

  '& .MuiTabs-scroller': {
    overflow: 'visible !important',
    borderBottom: '1px solid #D1D7F0',
  },
  // TODO add new color
  [theme.breakpoints.up('sm')]: {
    '& .MuiTabs-scroller': { minHeight: '40px' },
  },

  [theme.breakpoints.down('sm')]: {
    '& .MuiTabs-flexContainer': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 27px',
    },
  },

  '& .MuiTabs-indicator': { background: '#359721', height: '1px', bottom: '-1px' },
}));

export const NavigationContainer = styled(Box)(() => ({
  maxHeight: '100%',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '0 auto 16px auto',
  },
}));
