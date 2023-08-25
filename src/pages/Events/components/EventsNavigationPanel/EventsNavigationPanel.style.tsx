import { Box, styled } from '@mui/material';

export const EventsNavigationPanelContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isData'].includes(prop),
})<{ isData: boolean }>(({ isData }) => ({
  display: 'flex',
  width: '100%',
  marginBottom: isData ? '10px' : 0,
  paddingLeft: '5px',
}));

export const EventsNavigationPanelTabsContainer = styled(Box)(() => ({
  display: 'flex',
  flexShrink: 0,
  flexGrow: 0,
}));

export const EventsNavigationPanelTabItem = styled(Box)(() => ({
  marginRight: '16px',
}));

export const EventsNavigationPanelSearchContainer = styled(Box)(({ theme }) => ({
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
