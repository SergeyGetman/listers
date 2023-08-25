import { Menu, MenuItem, styled } from '@mui/material';

export const ActionMenuBase = styled(Menu)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    [theme.breakpoints.up('sm')]: {
      backgroundColor: 'transparent',
    },
  },
  '& .MuiMenu-paper': {
    boxShadow: theme.palette.case.shadow.big,
    padding: '10px',
    backgroundColor: theme.palette.case.background,
    '& .MuiList-root': {
      padding: 0,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'transparent',
      width: '100%',
      maxWidth: '100%',
      top: 'auto !important',
      bottom: '10px',
      left: '0px !important',
      right: '0px !important',
      padding: '0 10px',
    },
  },
}));

export const ActionMenuBaseItem = styled(MenuItem)(({ theme }) => ({
  boxShadow: 'none',
  borderRadius: '5px',
  width: '106px',
  height: '26px',
  fontSize: theme.typography.extra_small.fontSize,
  lineHeight: theme.typography.extra_small.lineHeight,
  fontWeight: theme.typography.extra_small.fontWeight,
  padding: '10px',
  backgroundColor: theme.palette.case.background,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: '10px',
  },
  '&:hover': {
    backgroundColor: theme.palette.case.neutral.n100,
    color: theme.palette.case.contrast.black,
  },
  '&.Mui-disabled': {
    opacity: 1,
    backgroundColor: theme.palette.case.background,
    color: theme.palette.case.neutral.n400,
    cursor: 'not-allowed !important',
  },
}));
