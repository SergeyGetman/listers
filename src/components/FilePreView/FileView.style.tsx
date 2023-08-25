import { Box, styled } from '@mui/material';

export const FileViewContainer = styled(Box)(() => ({}));

export const FileViewPhoto = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
  img: {
    width: '40px',
    height: '40px',
    borderRadius: '5px',
  },
}));
