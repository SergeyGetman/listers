import { Box, styled } from '@mui/material';

type ReactSelectLabelProps = {
  size: 'small' | 'medium';
  isError?: boolean;
  isFocused: boolean;
  isDisabled?: boolean;
  isValue: boolean;
  isStartIcon: boolean;
  isShrink?: boolean;
};
export const MuiTimePickerInput = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isError' &&
    prop !== 'isFocused' &&
    prop !== 'isDisabled' &&
    prop !== 'isValue' &&
    prop !== 'isStartIcon' &&
    prop !== 'size',
})<ReactSelectLabelProps>(({ size, isError, isFocused, isDisabled, isValue, isStartIcon, theme }) => {
  let backgroundColor = theme.palette.case.neutral.n50;
  let borderColor = theme.palette.case.neutral.n300;
  let color = theme.palette.case.neutral.n700;
  if (isDisabled) {
    backgroundColor = theme.palette.case.neutral.n100;
    color = theme.palette.case.neutral.n400;
  } else if (isError) {
    borderColor = theme.palette.case.red.r300;
    backgroundColor = isFocused ? theme.palette.case.neutral.n0 : theme.palette.case.neutral.n50;
  } else if (isValue) {
    backgroundColor = theme.palette.case.neutral.n0;
  } else if (isFocused) {
    backgroundColor = theme.palette.case.neutral.n0;
    borderColor = theme.palette.case.primary.p400;
  }

  return {
    position: 'relative',
    input: {
      padding: isStartIcon ? '18px 33px' : '18px 12px',
      fontSize: 14,
      lineHeight: '20px',
      color: color,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      '&:hover': {
        borderColor: isDisabled || isFocused ? borderColor : theme.palette.case.neutral.n500,
        backgroundColor: isDisabled || isFocused ? backgroundColor : theme.palette.case.neutral.n0,
      },
      cursor: isDisabled ? 'default !important' : 'pointer',
      borderRadius: '5px',
      '&:focus': {
        outline: 'none !important',
      },
      '&::placeholder': {
        color: theme.palette.case.neutral.n400,
        transition: 'all .2s ease-in-out',
      },
    },
    '& .rc-time-picker': {
      width: '100%',
      height: '100%',
    },
    '& .rc-time-picker-clear': {
      top: size === 'small' ? '7px' : '10px',
    },
    '& .rc-time-picker-clear-icon': {
      '&::after': {
        fontSize: 15,
      },
    },
  };
});
