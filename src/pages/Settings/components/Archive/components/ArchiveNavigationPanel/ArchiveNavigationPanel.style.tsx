import { Box, styled } from '@mui/material';

export const ArchiveNavigationPanelContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  marginBottom: '10px',
  padding: '5px 0 0 5px',
}));

export const ArchiveNavigationPanelTabsContainer = styled(Box)(() => ({
  display: 'flex',
  flexShrink: 0,
  flexGrow: 0,
}));

export const ArchiveNavigationPanelTabItem = styled(Box)(({ theme }) => ({
  marginRight: '16px',
  svg: {
    marginBottom: '2px',
    path: {
      fill: theme.palette.case.contrast.black,
    },
  },
}));

export const ArchiveNavigationPanelSearchContainer = styled(Box)(({ theme }) => ({
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
