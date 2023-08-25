import { Box, styled } from '@mui/material';

export const ChatRightPanelHeaderContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isGlobalHeader'].includes(prop),
})<{ isGlobalHeader: boolean }>(({ theme, isGlobalHeader }) => ({
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.case.contrast.white,
  borderRadius: isGlobalHeader ? 'none' : '5px 5px 0 0',
  flexGrow: 0,
  boxShadow: isGlobalHeader ? 'none' : theme.palette.case.shadow.big,
  [theme.breakpoints.down('md')]: {
    padding: '0 0 0 15px',
  },
}));
