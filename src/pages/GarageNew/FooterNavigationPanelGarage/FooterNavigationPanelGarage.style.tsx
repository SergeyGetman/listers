import { Box, styled } from '@mui/material';

export const FooterNavigationPanel = styled(Box)(({ theme }) => ({
  padding: '16px 0',
  backgroundColor: theme.palette.case.neutral.n0,
  borderTop: `1px solid ${theme.palette.case.neutral.n300}`,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
