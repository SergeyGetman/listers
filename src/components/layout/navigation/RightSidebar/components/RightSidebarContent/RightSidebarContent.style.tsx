import { Box, styled } from '@mui/material';

export const RightSidebarContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  boxShadow: '-5px 0 8px 0 rgb(0 0 0 / 5%)',
  backgroundColor: theme.palette.case.background,
  height: '100%',
  zIndex: 3,
  position: 'relative',
}));
