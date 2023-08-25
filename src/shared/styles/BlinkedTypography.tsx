import { styled, Typography } from '@mui/material';

export const BlinkedTypography = styled(Typography)(({ theme }) => ({
  '-webkit-animation': 'blink 3s linear infinite',
  animation: 'blink 3s linear infinite',
  '@-webkit-keyframes blink': {
    '0%': { color: theme.palette.case.neutral.n400 },
    '50%': { color: theme.palette.case.neutral.n200 },
    '100%': { color: theme.palette.case.neutral.n400 },
  },
  '@keyframes blink': {
    '0%': { color: theme.palette.case.neutral.n400 },
    '50%': { color: theme.palette.case.neutral.n200 },
    '100%': { color: theme.palette.case.neutral.n400 },
  },
}));
