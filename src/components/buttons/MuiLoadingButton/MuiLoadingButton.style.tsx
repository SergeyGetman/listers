import { styled } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { palette } from '../../../theme/palette';

export const MuiCustomLoadingButton = styled(LoadingButton)(() => ({
  '&.MuiButton-textPrimary': {
    svg: {
      path: {
        fill: palette.case.primary.p700,
      },
    },
    '&:hover': {
      svg: {
        path: {
          fill: palette.case.primary.p700,
        },
      },
    },
  },
  '&.MuiButton-containedPrimary': {
    svg: {
      path: {
        fill: palette.case.neutral.n0,
      },
    },
  },
  '&.MuiButton-outlinedPrimary': {
    svg: {
      path: {
        fill: palette.case.primary.p600,
      },
    },
    '&:hover': {
      svg: {
        path: {
          fill: palette.case.primary.p800,
        },
      },
    },
  },
}));
