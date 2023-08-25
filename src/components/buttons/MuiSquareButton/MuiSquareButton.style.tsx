import { Box, styled } from '@mui/material';

type MuiSquareButtonContainerProps = {
  size: 'small' | 'medium';
  color: 'primary' | 'secondary';
  variant: 'text' | 'outlined' | 'contained';
};

export const MuiSquareButtonContainer = styled(Box)<MuiSquareButtonContainerProps>(
  ({ size, theme, variant }) => ({
    '& .squareBtn': {
      width: size === 'small' ? '32px' : '38px',
      minWidth: 'auto',
      maxWidth: size === 'small' ? '32px' : '38px',
      height: size === 'small' ? '32px' : '38px',
      padding: '0',

      color: variant !== 'contained' ? theme.palette.case.primary.p500 : theme.palette.case.contrast.white,

      svg: {
        maxWidth: '16px',
        maxHeight: '16px',
      },

      '&:hover': {
        color: variant !== 'contained' ? theme.palette.case.primary.p800 : theme.palette.case.contrast.white,
      },

      '&: disabled': {
        pointerEvents: 'none !important',
        borderColor: theme.palette.case.neutral.n400,
        color: theme.palette.case.neutral.n400,

        [theme.breakpoints.down('sm')]: {
          '&:hover': {
            borderColor: theme.palette.case.neutral.n400,
            color: theme.palette.case.neutral.n400,
            backgroundColor: theme.palette.case.neutral.n400,
            boxShadow: 'none',
          },
        },
      },
    },
  }),
);
