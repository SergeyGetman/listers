import { Box, styled, Typography } from '@mui/material';

export const PlansItemContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '310px',
  background: theme.palette.case.background,
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  boxShadow: theme.palette.case.shadow.huge,
  borderRadius: '20px',
  padding: '40px 35px 30px',
  margin: '0 20px 20px',

  [theme.breakpoints.down('md')]: {
    width: '320px',
    margin: 'initial',
    minHeight: '480px',
    boxShadow: theme.palette.case.shadow.big,
  },

  '&:hover': {
    boxShadow: theme.palette.case.shadow.hugeHover,
  },
}));

export const PlansLabel = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '-8px',
  right: 'calc(100% - 70%)',
  background: theme.palette.case.main.purple.high,
  borderRadius: '5px',
  padding: '0 27px',
  color: theme.palette.case.contrast.white,
  lineHeight: '27px',
}));
