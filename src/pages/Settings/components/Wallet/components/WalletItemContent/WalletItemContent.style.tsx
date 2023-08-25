import { Grid, styled } from '@mui/material';

export const WalletItemContentContainer = styled(Grid)(({ theme }) => ({
  paddingBottom: '10px',
  paddingLeft: '33px',
  [theme.breakpoints.down('xl')]: {
    paddingLeft: '25px ',
  },
  [theme.breakpoints.down('lg')]: {
    paddingLeft: '20px',
  },
  [theme.breakpoints.down('md')]: {
    paddingLeft: '13px',
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '0',
  },
}));

export const WalletItemContentRow = styled(Grid)(({ theme }) => ({
  width: '96.5%',
  margin: '0 0 20px',
  paddingBottom: '4px',
  borderBottom: `1px dashed ${theme.palette.case.neutral.n400}`,
  [theme.breakpoints.down('sm')]: {
    width: '93%',
    margin: '0 16px 10px 16px',
  },
}));
