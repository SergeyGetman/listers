import { Box, styled } from '@mui/material';

export const InviteUserItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  borderLeft: 'none',
  borderRight: 'none',
  '&:first-of-type': {
    borderTop: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'initial',
    border: 'none',
  },
}));

export const InviteUserItemContent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 0',
}));

export const InviteUserItemSelectContainer = styled(Box)(({ theme }) => ({
  width: '230px',
  marginRight: '50px',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
    marginRight: '16px',
  },
}));
