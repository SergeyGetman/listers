import { Box, styled } from '@mui/material';

export const BacklogNavigationPanelContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isData'].includes(prop),
})<{ isData: boolean }>(({ isData }) => ({
  display: 'flex',
  width: '100%',
  marginBottom: isData ? '10px' : 0,
  paddingLeft: '5px',
}));

export const BacklogNavigationPanelTabsContainer = styled(Box)(() => ({
  display: 'flex',
  flexShrink: 0,
  flexGrow: 0,
}));

export const BacklogNavigationPanelTabItem = styled(Box)(() => ({
  marginRight: '16px',
}));

export const BacklogNavigationPanelSearchContainer = styled(Box)(({ theme }) => ({
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
