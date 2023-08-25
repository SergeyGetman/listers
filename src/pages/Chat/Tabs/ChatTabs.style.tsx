import { Grid, styled, Typography, Box } from '@mui/material';

type ChatTabTypographyType = {
  active: boolean;
};

type ChatTabMuiChipBoxType = {
  isShow: boolean;
};

export const ChatTabTypography = styled(Typography)<ChatTabTypographyType>(({ theme, active }) => ({
  cursor: 'pointer',
  color: active ? theme.palette.primary.main : 'initial',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const ChatTabItem = styled(Box)(({ theme }) => ({
  height: 22,
  width: '100%',
  maxWidth: '50%',
  a: {
    textDecoration: 'none',
    color: theme.palette.case.contrast.black,
  },
}));

export const ChatTabContainer = styled(Grid)(({ theme }) => ({
  maxWidth: '320px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    width: '100%',
  },
}));

export const ChatTabMuiChipBox = styled(Box, {
  shouldForwardProp: (prop: string) => !['isShow'].includes(prop),
})<ChatTabMuiChipBoxType>(({ isShow }) => ({
  height: '16px',
  minWidth: '16px',
  marginLeft: '3px',
  display: isShow ? 'none' : 'block',
}));
