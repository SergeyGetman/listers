import { Box, styled } from '@mui/material';

export const NetworkSharingModalForm = styled('form')(() => ({
  height: '100%',
  overflow: 'inherit',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));

export const NetworkSharingModalContentContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));
