import { IconButton, styled } from '@mui/material';

export const BigCircularButton = styled(IconButton)(({ theme }) => ({
  '&.MuiIconButton-root': {
    '&: disabled': {
      backgroundColor: theme.palette.case.neutral.n400,
    },
  },
  '&.MuiIconButton-sizeLarge': {
    width: 68,
    height: 68,
    transition: '0.3s',
    svg: {
      width: 22,
      height: 22,
    },
    '&:hover': {
      boxShadow: '0px 0px 0px 13px rgba(93,203,66,0.2)',
    },
  },

  '&.MuiIconButton-sizeMedium': {
    width: 32,
    height: 32,
    svg: {
      width: 14,
      height: 14,
    },
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0px 0px 0px 6px rgba(93,203,66,0.2)',
    },
  },

  '&.MuiIconButton-colorPrimary': {
    backgroundColor: theme.palette.case.primary.p500,
    color: theme.palette.case.contrast.white,
  },
}));
