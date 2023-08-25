import { Box, styled } from '@mui/material';

export const PlannerItemMainBlockContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: ' 100%',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingRight: '10px',
  [theme.breakpoints.down('md')]: {
    paddingRight: '0',
  },
}));

export const PlannerItemRecurringIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-3px',
  right: '-3px',
  zIndex: '2',
  borderRadius: '50%',
  backgroundColor: theme.palette.case.neutral.n50,
  svg: {
    width: '12px',
    height: '12px',
    path: {
      fill: theme.palette.case.neutral.n500,
    },
  },
}));

export const PlannerItemMainBlockContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '20px',
  overflow: 'hidden',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  '& p': {
    margin: '0',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& pre': { margin: '0' },
  '& ol': { margin: '0', pl: '16px' },
  '& a': { color: theme.palette.case.main.blue.high, '&:hover': { opacity: '0.7' } },
  '& span': {
    backgroundColor: 'transparent !important',
    color: `${theme.palette.case.neutral.n500} !important`,
    fontSize: `${theme.typography.default.fontSize} !important`,
  },
}));
