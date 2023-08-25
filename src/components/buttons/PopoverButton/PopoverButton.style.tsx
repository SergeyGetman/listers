import { styled, Button } from '@mui/material';

type ItemStatusBtnProps = {
  isSelected?: boolean;
  isHideTextOnMobile: boolean;
  isPrimaryText?: boolean;
  isIconBtn?: boolean;
  isContacts?: boolean;
  startIconColor?: string;
  endIconColor?: string;
};

export const PopoverButtonItem = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'isSelected' &&
    prop !== 'isHideTextOnMobile' &&
    prop !== 'isPrimaryText' &&
    prop !== 'isContacts' &&
    prop !== 'isIconBtn' &&
    prop !== 'startIconColor' &&
    prop !== 'endIconColor',
})<ItemStatusBtnProps>(
  ({ theme, isHideTextOnMobile, isPrimaryText, isIconBtn, startIconColor, endIconColor }) => ({
    padding: '8px',
    fontWeight: '400',
    lineHeight: '13px',
    flexShrink: '0',

    fontSize: isIconBtn ? '0px' : '13px',
    '& .MuiButton-startIcon': {
      margin: isIconBtn ? '0px' : '',
      svg: {
        path: {
          fill: startIconColor ?? '',
        },
      },
    },

    '& .MuiButton-endIcon': {
      svg: {
        path: {
          fill: endIconColor ?? '',
        },
      },
    },
    minWidth: isIconBtn ? '20px' : '',

    [theme.breakpoints.down('sm')]: {
      fontSize: isIconBtn || isHideTextOnMobile ? '0px' : '13px',
      '& .MuiButton-startIcon': {
        margin: isIconBtn || isHideTextOnMobile ? '0px' : '',
      },
      minWidth: isIconBtn || isHideTextOnMobile ? '20px' : '',
    },

    '&.MuiButton-outlined': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.case.neutral.n100,
      color: isPrimaryText ? theme.palette.primary.main : theme.palette.case.neutral.n700,

      '&:hover': {
        [theme.breakpoints.up('sm')]: {
          backgroundColor: theme.palette.case.primary.p100,
          borderColor: theme.palette.case.primary.p100,
          boxShadow: 'none',
        },
        [theme.breakpoints.down('sm')]: {
          svg: {
            path: {
              transition: '0.3s',
              fill: '',
            },
          },
        },
      },
    },

    '&.MuiButton-contained': {
      border: `1px solid ${theme.palette.case.primary.p500}`,
      backgroundColor: theme.palette.case.primary.p500,
      svg: {
        path: {
          transition: '0.3s',
          fill: theme.palette.case.contrast.white,
        },
      },
      '&:hover': {
        [theme.breakpoints.up('sm')]: {
          borderColor: theme.palette.case.primary.p500,
          backgroundColor: theme.palette.case.primary.p500,
        },
      },
    },

    '&: disabled': {
      borderColor: theme.palette.case.neutral.n400,
      backgroundColor: theme.palette.case.neutral.n400,
      color: theme.palette.case.contrast.white,
      svg: {
        path: {
          fill: theme.palette.case.contrast.white,
        },
      },
    },
  }),
);
