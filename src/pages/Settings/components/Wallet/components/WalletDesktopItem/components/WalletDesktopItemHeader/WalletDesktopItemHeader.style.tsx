import { Grid, styled } from '@mui/material';

export const WalletDesktopItemHeaderStatus = styled(Grid, {
  shouldForwardProp: (prop: string) => !['isHideBorder'].includes(prop),
})<{ isHideBorder?: boolean }>(({ theme, isHideBorder = false }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: `1px dashed ${theme.palette.case.neutral.n400}`,
  height: '45px',
  svg: {
    width: '16px',
    height: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    borderRight: isHideBorder ? 'none' : `1px dashed ${theme.palette.case.neutral.n400}`,
  },
}));
