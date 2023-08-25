import { styled } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.case.neutral.n600,
  border: `1px solid ${theme.palette.case.neutral.n300}`,
  width: '100%',
  fontSize: '14px',
  fontWeight: 500,
  height: '48px',
  borderRadius: '4px',
  svg: {
    path: {
      fill: theme.palette.case.neutral.n600,
    },
  },

  '&: hover': {
    color: theme.palette.case.neutral.n600,
    backgroundColor: theme.palette.case.neutral.n300,
    borderColor: theme.palette.case.neutral.n300,
    svg: {
      path: {
        fill: theme.palette.case.neutral.n600,
      },
    },
  },
  '&: disabled': {
    background: theme.palette.case.neutral.n100,
    color: theme.palette.case.neutral.n400,
    border: 'none',
    svg: {
      path: {
        fill: theme.palette.case.neutral.n400,
      },
    },
  },
}));
