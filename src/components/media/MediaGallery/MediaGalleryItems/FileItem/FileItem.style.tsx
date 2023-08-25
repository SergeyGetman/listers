import { Box, styled } from '@mui/material';

export const FileItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'opacity 0.2s ease-in-out',
  height: '105px',
  img: {
    width: '86px',
    height: '86px',
    borderRadius: '5px',
  },

  '&:hover': {
    opacity: 0.8,
  },
});
