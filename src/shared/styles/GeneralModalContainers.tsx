import { Box, styled } from '@mui/material';

export const GeneralModalContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

export const GeneralModalContentContainer = styled(Box)(() => ({
  width: '100%',
  flexGrow: '1',
  height: '100%',
  overflow: 'auto',
  padding: '30px 10px 150px 10px',
}));
