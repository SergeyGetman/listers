import { IconButton, styled } from '@mui/material';
type MuiCustomIconButtonProps = {
  isSelected: boolean;
};
export const MuiCustomIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<MuiCustomIconButtonProps>(({ theme, isSelected }) => ({
  '&.MuiIconButton-sizeLarge': {
    width: 38,
    height: 38,

    svg: {
      width: 20,
      height: 20,
    },
  },

  '&.MuiIconButton-sizeMedium': {
    width: 32,
    height: 32,
    svg: {
      width: 16,
      height: 16,
    },
  },

  '&.MuiIconButton-sizeSmall': {
    padding: '0',
    width: 24,
    height: 24,
    svg: {
      width: 16,
      height: 16,
    },
  },
  '&.default-mui-icon-button': {
    '&.MuiIconButton-colorPrimary': {
      border: 'none',
      backgroundColor: isSelected ? theme.palette.case.neutral.n200 : 'transparent',
      svg: {
        path: {
          fill: isSelected ? theme.palette.case.neutral.n900 : theme.palette.case.neutral.n500,
        },
      },
      '&:hover': {
        transition: 'all 0.3s',
        backgroundColor: theme.palette.case.neutral.n200,
      },
      '&: disabled': {
        backgroundColor: theme.palette.case.neutral.n200,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n400,
          },
        },
      },
    },
  },
  '&.white-mui-icon-button': {
    '&.MuiIconButton-colorPrimary': {
      border: 'none',
      backgroundColor: theme.palette.case.contrast.white,
      svg: {
        path: {
          fill: theme.palette.case.neutral.n700,
        },
      },
      '&:hover': {
        transition: 'all 0.3s',
        backgroundColor: theme.palette.case.contrast.white,
        svg: {
          path: {
            fill: theme.palette.case.primary.p600,
          },
        },
      },
      '&: disabled': {
        borderColor: theme.palette.case.neutral.n400,
        color: theme.palette.case.neutral.n400,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n400,
          },
        },
      },
    },
  },
  '&.outlined-mui-icon-button': {
    '&.MuiIconButton-colorPrimary': {
      border: '1px solid',
      borderColor: theme.palette.case.primary.p600,
      backgroundColor: theme.palette.case.contrast.white,
      svg: {
        path: {
          fill: theme.palette.case.primary.p600,
        },
      },
      '&:hover': {
        transition: 'all 0.3s',
        backgroundColor: theme.palette.case.contrast.white,
        borderColor: theme.palette.case.primary.p800,
      },
      '&: disabled': {
        borderColor: theme.palette.case.neutral.n400,
        color: theme.palette.case.neutral.n400,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n400,
          },
        },
      },
    },
  },

  '&.contained-mui-icon-button': {
    '&.MuiIconButton-colorPrimary': {
      backgroundColor: theme.palette.case.primary.p600,
      svg: {
        path: {
          fill: theme.palette.case.neutral.n0,
        },
      },
      '&:hover': {
        transition: 'all 0.3s',
        backgroundColor: theme.palette.case.primary.p800,
      },

      '&: disabled': {
        borderColor: theme.palette.case.neutral.n400,
        backgroundColor: theme.palette.case.neutral.n400,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n0,
          },
        },
      },
    },
  },
}));
