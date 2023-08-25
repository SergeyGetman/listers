import { List, styled } from '@mui/material';

export const RightSidebarNavigationList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '66px',
  height: '100%',
  backgroundColor: theme.palette.case.neutral.n50,
  padding: '10px 5px 0 5px',
}));
