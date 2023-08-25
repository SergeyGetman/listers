import { Box, styled } from '@mui/material';

export const RoadmapNavigationPanelContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
}));

export const RoadmapNavigationPanelTabsContainer = styled(Box)(() => ({
  display: 'flex',
  flexShrink: 0,
  flexGrow: 0,
}));

export const RoadmapNavigationPanelTabItem = styled(Box)(({ theme }) => ({
  marginRight: '16px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    button: {
      width: '100%',
    },
  },
  [theme.breakpoints.down('md')]: {
    '&:last-of-type': {
      marginRight: '0',
    },
  },
}));

export const RoadmapNavigationPanelSearchContainer = styled(Box)(({ theme }) => ({
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: '16px',
  },
}));
