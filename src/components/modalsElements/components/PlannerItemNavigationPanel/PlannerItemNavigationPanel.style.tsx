import { TabList } from '@mui/lab';
import { styled, Tab } from '@mui/material';

export const PlannerItemNavigationTabs = styled(TabList)(({ theme }) => ({
  minHeight: '40px',
  maxHeight: '40px',
  position: 'sticky',
  top: '0',
  zIndex: 9,
  backgroundColor: theme.palette.case.neutral.n50,

  '& .MuiTabs-scroller': {
    overflow: 'visible !important',
    borderBottom: '1px solid #D1D7F0',
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiTabs-scroller': { minHeight: '40px' },
  },

  [theme.breakpoints.down('sm')]: {
    '& .MuiTabs-flexContainer': {
      padding: '0',
      display: 'flex',
      justifyContent: 'space-between',
    },
  },

  '& .MuiTabs-indicator': { background: theme.palette.case.primary.p700, height: '1px', bottom: '-1px' },
}));

export const PlannerItemNavigationTab = styled(Tab)(({ theme }) => ({
  maxHeight: '40px',
  minHeight: '40px',
  textTransform: 'capitalize',
  fontSize: '16px',
  padding: '8px 12px',
  color: theme.palette.case.neutral.n600,
  svg: {
    width: '24px !important',
    height: '24px !important',
  },

  [theme.breakpoints.down('sm')]: {
    minWidth: '40px',
  },

  '&.Mui-selected': {
    svg: {
      path: {
        fill: theme.palette.case.primary.p700,
      },
    },
    '&.MuiTab-textColorPrimary': {
      color: theme.palette.case.primary.p700,
    },
  },

  // [theme.breakpoints.down('sm')]: {
  //   width: '171px',
  // },
}));
