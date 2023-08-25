import { Menu, MenuItem, styled } from '@mui/material';

type ActionMenuFromPlusItemProps = {
  open?: boolean;
};

export const ActionMenuFromPlus = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
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

export const ActionMenuFromPlusItem = styled(MenuItem)<ActionMenuFromPlusItemProps>(({ theme }) => ({
  boxShadow: 'none',
  borderRadius: '5px',
  width: '120px',
  height: '36px',
  marginBottom: '10px',
  fontSize: '11px',
  lineHeight: '11px',
  fontWeight: '400',
  padding: '10px',
  backgroundColor: theme.palette.case.background,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '100%',
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
