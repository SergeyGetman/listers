import { Box, styled } from '@mui/material';

export const PhotoCropContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',

  '.css-9tdh2j': {
    borderBottomRightRadius: '8px !important',
    borderBottomLeftRadius: '8px !important',
  },
});

export const PhotoCropContent = styled(Box)(({ theme }) => ({
  padding: '16px',
  flexGrow: 1,
  img: {
    maxHeight: '500px',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '330px',
    },
  },
}));
