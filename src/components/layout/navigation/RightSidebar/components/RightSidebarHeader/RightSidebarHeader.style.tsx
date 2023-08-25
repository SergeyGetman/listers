import { Box, styled } from '@mui/material';

export const RightSidebarHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '10px 10px 10px 10px',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflow: 'hidden',
  flexShrink: 0,
  boxShadow: theme.palette.case.shadow.small,
}));
