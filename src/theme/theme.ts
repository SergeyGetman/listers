import { createTheme } from '@mui/material/styles';
import breakpoints from './breakpoints';
import { palette } from './palette';
import typography from './typography';
// TODO get text property from typography config
const theme = createTheme({
  palette,
  breakpoints,
  typography,
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          height: '20px',
          lineHeight: '20px',
          fontWeight: '600',
          marginBottom: '4px',
          position: 'initial',
          color: palette.case.neutral.n700,
          transform: 'translate(0px, 0px)',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(0px, 0px)',
          },
          '&.Mui-disabled': {
            color: palette.case.neutral.n700,
          },
          '&.Mui-focused': {
            color: palette.case.neutral.n700,
          },
          '&.Mui-error': {
            color: palette.case.neutral.n700,
          },
        },
        sizeSmall: {
          fontSize: 12,
          transform: 'translate(0px, 0px)',

          '&.MuiInputLabel-shrink': {
            transform: 'translate(0px, 0px)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: '6px', borderRadius: '4px', backgroundColor: palette.case.neutral.n300 },
        bar: { backgroundColor: palette.case.primary.p600, borderRadius: '4px' },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          fontSize: 14,
          color: palette.case.neutral.n700,
          '&::before ': {
            top: 0,
            borderTop: `1px solid ${palette.case.neutral.n100}`,
          },
          '&::after': {
            top: 0,
            borderTop: `1px solid ${palette.case.neutral.n100}`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: palette.case.neutral.n200,
          backgroundColor: palette.case.neutral.n50,
          padding: '8px',

          input: {
            zIndex: 2,
            padding: 0,
          },

          '& .MuiInputBase-inputAdornedStart': {
            marginLeft: '8px',
          },
          '& .MuiInputBase-inputAdornedEnd': {
            marginRight: '0px',
          },

          '&:hover  .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.case.neutral.n300,
            backgroundColor: palette.case.neutral.n0,
            transition: 'all 0.3s',
          },

          '&.Mui-focused  .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
            fontSize: 13,
            borderColor: palette.case.primary.p600,
            backgroundColor: palette.case.neutral.n0,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            top: 0,
            fontSize: '14px',
            borderColor: palette.case.neutral.n200,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.case.red.r300,
            backgroundColor: palette.case.neutral.n0,
          },

          '& .MuiSelect-icon': {
            zIndex: 10,
            marginRight: '6px',
            width: '20px',
            height: '20px',
            color: palette.case.neutral.n700,
          },
          '& .MuiSelect-select': {
            zIndex: 1,
          },
          '& .MuiInputAdornment-root': {
            zIndex: 10,
          },

          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.case.neutral.n200,
            backgroundColor: palette.case.neutral.n75,
            color: palette.case.neutral.n300,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.case.neutral.n200,
              backgroundColor: palette.case.neutral.n75,
              color: palette.case.neutral.n300,
            },
          },

          '& legend': {
            height: '0px',
            width: '0px',
          },
        },
        sizeSmall: {
          '& .MuiOutlinedInput-notchedOutline': {
            fontSize: '14px',
            borderColor: palette.case.neutral.n200,
          },
          '&.Mui-focused  .MuiOutlinedInput-notchedOutline': {
            fontSize: '14px',
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '7.66px 0px',
          input: {
            padding: 0,
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 36,
          input: {
            fontSize: 14,
            lineHeight: '20px',
            color: palette.case.neutral.n700,

            '&::placeholder': {
              opacity: 1,
              fontSize: 14,
              lineHeight: '20px',
              color: palette.case.neutral.n400,
            },
          },
          textarea: {
            zIndex: 10,
            fontSize: 14,
            lineHeight: '20px',
            color: palette.case.neutral.n700,

            '&::placeholder': {
              opacity: 1,
              fontSize: 14,
              lineHeight: '20px',
              color: palette.case.neutral.n400,
            },
          },
        },

        adornedStart: {
          svg: {
            zIndex: 10,
            flexShrink: '0',
            width: '16px',
            height: '16px',
            path: {
              fill: palette.case.neutral.n500,
            },
          },
        },
        adornedEnd: {
          svg: {
            zIndex: 10,
            flexShrink: '0',
            width: '16px',
            height: '16px',
            path: {
              fill: palette.case.neutral.n500,
            },
          },
        },
        multiline: {
          height: 'auto',
          minHeight: 36,
        },
        sizeSmall: {
          height: 35,
          input: {
            fontSize: 12,
            lineHeight: '20px',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginTop: 3,
          lineHeight: '16px',
          fontSize: 11,
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          height: '36px',
          border: `1px solid ${palette.case.neutral.n200}`,
          borderRadius: '5px',
          textTransform: 'capitalize',
          fontWeight: '500',
          color: palette.case.neutral.n700,
          fontSize: '14px',
          padding: '10px 21px',
          lineHeight: '20',
          '&:hover': {
            backgroundColor: palette.case.primary.p100,
            border: `1px solid ${palette.case.primary.p100}`,
          },
          '&.Mui-selected': {
            border: `1px solid ${palette.case.primary.p600}`,
            backgroundColor: palette.case.primary.p600,
            color: palette.case.contrast.white,
            '&:hover': {
              backgroundColor: palette.case.primary.p600,
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          height: 36,
          fontWeight: 500,
          lineHeight: '22px',
          fontSize: 14,
          svg: {
            width: 20,
            height: 20,
          },
        },
        startIcon: {
          fontSize: '20px !important',
          width: 20,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          marginLeft: '0',
          '& > *:first-child': {
            fontSize: '20px !important',
          },
        },
        endIcon: {
          width: 20,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          marginRight: '0',
        },

        sizeLarge: {
          height: 40,
          padding: '8px 16px',
        },
        sizeMedium: {
          height: 36,
          padding: '6px 16px',
        },
        sizeSmall: {
          height: 32,
          padding: '4px 12px',
          '& .MuiButton-startIcon': {
            width: 16,
            height: 16,
          },
          '& .MuiButton-endIcon': {
            width: 16,
            height: 16,
          },

          svg: {
            width: '16px !important',
            height: '15px !important',
          },
        },

        contained: {
          color: palette.case.contrast.white,
          boxShadow: 'none',
          '&: disabled': {
            backgroundColor: palette.case.neutral.n400,
            color: palette.case.neutral.n100,
            svg: {
              path: {
                fill: palette.case.neutral.n100,
              },
            },
          },
        },

        containedPrimary: {
          backgroundColor: palette.case.primary.p600,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: palette.case.primary.p800,
          },
        },
        containedError: {
          backgroundColor: palette.case.red.r600,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: palette.case.red.r800,
          },
        },
        containedSecondary: {
          backgroundColor: palette.case.neutral.n600,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: palette.case.neutral.n800,
          },
        },

        outlinedPrimary: {
          borderColor: palette.case.primary.p600,
          backgroundColor: palette.case.contrast.white,
          color: palette.case.primary.p600,
          '&:hover': {
            backgroundColor: palette.case.contrast.white,
            borderColor: palette.case.primary.p800,
            color: palette.case.primary.p800,
          },

          '&: disabled': {
            borderColor: palette.case.neutral.n400,
            color: palette.case.neutral.n400,
            svg: {
              path: {
                fill: palette.case.neutral.n400,
              },
            },
          },
        },
        outlinedError: {
          borderColor: palette.case.red.r600,
          color: palette.case.red.r600,

          '&:hover': {
            color: palette.case.contrast.white,
            backgroundColor: palette.case.red.r600,
            borderColor: palette.case.red.r600,
            boxShadow: 'none',
          },
          '&: disabled': {
            borderColor: palette.case.neutral.n400,
            color: palette.case.neutral.n400,
            svg: {
              path: {
                fill: palette.case.neutral.n400,
              },
            },
          },
        },
        outlinedSecondary: {
          borderColor: palette.case.neutral.n500,
          color: palette.case.neutral.n500,

          '&:hover': {
            color: palette.case.contrast.white,
            backgroundColor: palette.case.neutral.n500,
            borderColor: palette.case.neutral.n500,
            boxShadow: 'none',
          },
          '&: disabled': {
            borderColor: palette.case.neutral.n400,
            color: palette.case.neutral.n400,
            svg: {
              path: {
                fill: palette.case.neutral.n400,
              },
            },
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        colorPrimary: {
          color: palette.case.primary.p600,
        },
        sizeLarge: {
          width: 36,
          height: 36,
          svg: {
            width: 20,
            height: 20,
          },
        },
        sizeMedium: {
          width: 32,
          height: 32,
          padding: 0,
          svg: {
            width: 20,
            height: 20,
          },
        },
        sizeSmall: {
          width: 24,
          height: 24,
          svg: {
            width: 16,
            height: 16,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        rounded: {
          borderRadius: 5,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        label: {
          fontSize: 14,
          marginLeft: 8,
          lineHeight: '20px',
          color: palette.case.neutral.n600,
          '&.Mui-disabled': {
            color: palette.case.neutral.n400,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          color: palette.case.neutral.n400,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 36,
          height: 20,
          padding: 0,
        },

        switchBase: {
          padding: 2,
          color: 'white',
          '&.Mui-checked': {
            color: palette.case.contrast.white,
            transform: 'translateX(16px)',
            '& + .MuiSwitch-track': {
              backgroundColor: palette.primary.main,
              opacity: 1,
            },
          },
          '&.Mui-disabled': {
            '& + .MuiSwitch-track': {
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 16,
          height: 16,
          boxShadow: 'none',
        },
        track: {
          borderRadius: 40 / 2,
          opacity: 1,
          backgroundColor: palette.case.neutral.n400,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: `${palette.case.neutral.n800}99`,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: `${palette.case.neutral.n400}99`,
        },
      },
    },
  },
});

export default theme;
