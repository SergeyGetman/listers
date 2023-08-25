import { Box, styled } from '@mui/material';

type DateTimeInputContainerProps = {
  size: 'small' | 'medium';
  isError?: boolean;
  isFocused: boolean;
  isDisabled?: boolean;
  isValue: boolean;
  isStartIcon: boolean;
  isShrink?: boolean;
  isShowTimePicker?: boolean;
  isFocusedDateFiled?: boolean;
};

export const DateTimeInputContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isError' &&
    prop !== 'isFocused' &&
    prop !== 'isDisabled' &&
    prop !== 'isValue' &&
    prop !== 'isStartIcon' &&
    prop !== 'size' &&
    prop !== 'isShowTimePicker' &&
    prop !== 'isFocusedDateFiled',
})<DateTimeInputContainerProps>(
  ({ isError, isFocused, isDisabled, isValue, isStartIcon, theme, isShowTimePicker, isFocusedDateFiled }) => {
    let backgroundColor = theme.palette.case.neutral.n50;
    let borderColor = theme.palette.case.neutral.n300;
    let color = theme.palette.case.neutral.n700;
    if (isDisabled) {
      backgroundColor = theme.palette.case.neutral.n100;
      color = theme.palette.case.neutral.n400;
    } else if (isError) {
      borderColor = theme.palette.case.red.r300;
      backgroundColor = isFocused ? theme.palette.case.neutral.n0 : theme.palette.case.neutral.n50;
    } else if (isFocused) {
      backgroundColor = theme.palette.case.neutral.n0;
      borderColor = theme.palette.case.primary.p400;
    } else if (isValue) {
      backgroundColor = theme.palette.case.neutral.n0;
    }
    return {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      height: '36px',
      padding: isStartIcon ? '18px 33px' : '0 8px',
      fontSize: 14,
      lineHeight: '20px',
      border: '1px solid',
      color: color,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      '&:hover': {
        borderColor: isDisabled || isFocused ? borderColor : theme.palette.case.neutral.n500,
        backgroundColor: isDisabled || isFocused ? backgroundColor : theme.palette.case.neutral.n0,
        '& input': {
          backgroundColor:
            isDisabled || isFocused ? backgroundColor : ` ${theme.palette.case.neutral.n0} !important`,
        },
      },

      '& .MuiFormControl-root:first-of-type': {
        '& input': {
          width: isShowTimePicker ? '' : '100%',
          textTransform: isFocusedDateFiled ? 'lowercase' : '',
        },
      },
      '& .MuiFormControl-root': {
        height: '100%',
      },

      '& .MuiInputBase-root': {
        height: '100%',
        border: 'none',
        padding: '0',
        '& fieldset': {
          display: 'none',
        },
        '& input': {
          width: '63px',
          height: '100%',
          color: color,
          backgroundColor: backgroundColor,
        },
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
    };
  },
);
