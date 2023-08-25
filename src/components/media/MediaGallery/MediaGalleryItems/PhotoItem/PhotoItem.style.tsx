import { Box, styled } from '@mui/material';

export const PhotoItemContainer = styled(Box)({
  img: {
    width: '86px',
    height: '86px',
    borderRadius: '5px',
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': {
      img: {
        opacity: 0.7,
      },
      span: {
        opacity: 0.7,
      },
    },
  },
});
