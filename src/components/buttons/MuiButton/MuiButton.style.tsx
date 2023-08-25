import { styled, Button } from '@mui/material';

export const MuiCustomButton = styled(Button)(({ theme }) => ({
  '&.text-mui-button': {
    '&.MuiButton-textSecondary': {
      padding: '8px',
      borderRadius: '4px',
      backgroundColor: 'transparent',
      color: theme.palette.case.neutral.n600,
      svg: {
        path: {
          fill: theme.palette.case.neutral.n600,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.case.neutral.n100,
        color: theme.palette.case.neutral.n700,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n700,
          },
        },
      },
      '&: disabled': {
        color: theme.palette.case.neutral.n400,
        backgroundColor: theme.palette.case.neutral.n100,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n400,
          },
        },
      },
    },
    '&.MuiButton-textPrimary': {
      padding: '8px',
      borderRadius: '4px',
      backgroundColor: 'transparent',
      color: theme.palette.case.primary.p600,
      svg: {
        path: {
          fill: theme.palette.case.primary.p600,
        },
      },
      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.case.primary.p800,
        svg: {
          path: {
            fill: theme.palette.case.primary.p800,
          },
        },
      },
      '&: disabled': {
        color: theme.palette.case.neutral.n500,
        backgroundColor: 'transparent',
        svg: {
          path: {
            fill: theme.palette.case.neutral.n500,
          },
        },
      },
    },
    '&.MuiButton-textError': {
      padding: '8px',
      borderRadius: '4px',
      backgroundColor: 'transparent',
      color: theme.palette.case.red.r600,
      svg: {
        path: {
          fill: theme.palette.case.red.r600,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.case.red.r100,
        color: theme.palette.case.red.r700,
        svg: {
          path: {
            fill: theme.palette.case.red.r700,
          },
        },
      },
      '&: disabled': {
        color: theme.palette.case.neutral.n400,
        backgroundColor: theme.palette.case.neutral.n100,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n400,
          },
        },
      },
    },
  },

  '&.tertiary-mui-button': {
    '&.MuiButton-textPrimary': {
      backgroundColor: theme.palette.case.primary.p50,
      color: theme.palette.case.primary.p600,
      svg: {
        path: {
          fill: theme.palette.case.primary.p600,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.case.primary.p100,
        color: theme.palette.case.primary.p800,
        svg: {
          path: {
            fill: theme.palette.case.primary.p800,
          },
        },
      },
      '&: disabled': {
        color: theme.palette.case.neutral.n400,
        backgroundColor: theme.palette.case.neutral.n100,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n400,
          },
        },
      },
    },
    '&.MuiButton-textSecondary': {
      backgroundColor: theme.palette.case.neutral.n50,
      color: theme.palette.case.neutral.n600,
      svg: {
        path: {
          fill: theme.palette.case.neutral.n600,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.case.neutral.n100,
        color: theme.palette.case.neutral.n800,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n800,
          },
        },
      },
      '&: disabled': {
        color: theme.palette.case.neutral.n400,
        backgroundColor: theme.palette.case.neutral.n100,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n400,
          },
        },
      },
    },
    '&.MuiButton-textError': {
      backgroundColor: theme.palette.case.red.r50,
      color: theme.palette.case.red.r600,
      svg: {
        path: {
          fill: theme.palette.case.red.r600,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.case.red.r100,
        color: theme.palette.case.red.r800,
        svg: {
          path: {
            fill: theme.palette.case.red.r800,
          },
        },
      },
      '&: disabled': {
        color: theme.palette.case.neutral.n400,
        backgroundColor: theme.palette.case.neutral.n100,
        svg: {
          path: {
            fill: theme.palette.case.neutral.n400,
          },
        },
      },
    },
  },

  '&.contained-mui-button': {
    '&.MuiButton-root': {
      svg: {
        path: {
          fill: theme.palette.case.contrast.white,
        },
      },
    },
  },
  '&.outlined-mui-button': {
    '&.MuiButton-outlinedPrimary': {
      svg: {
        path: {
          fill: theme.palette.case.primary.p600,
        },
      },
      '&:hover': {
        svg: {
          path: {
            fill: theme.palette.case.primary.p800,
          },
        },
      },
    },
    '&.MuiButton-outlinedSecondary': {
      svg: {
        path: {
          fill: theme.palette.case.neutral.n500,
        },
      },
      '&:hover': {
        svg: {
          path: {
            fill: theme.palette.case.neutral.n0,
          },
        },
      },
    },
    '&.MuiButton-outlinedError': {
      svg: {
        path: {
          fill: theme.palette.case.red.r600,
        },
      },
      '&:hover': {
        svg: {
          path: {
            fill: theme.palette.case.red.r800,
          },
        },
      },
    },
  },
}));
