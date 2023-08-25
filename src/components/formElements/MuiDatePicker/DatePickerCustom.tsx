import React, { forwardRef } from 'react';
import { ReactComponent as SmallCalendar } from '../../../assets/Images/small-calendar.svg';
import MuiBaseTextFiled from '../MuiBaseTextFiled';
import MuiIconButton from '../../buttons/iconButtons/MuiIconButton';

type DatePickerCustomProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  isShrink?: boolean;
  isButton?: boolean;
  isError?: boolean;
  label?: string;
  placeholder?: string;
  value?: any;
  errorMessage?: string;
  helperText?: string;
  size?: 'small' | 'medium';
  [x: string]: any;
};

const DatePickerCustom = forwardRef<HTMLHeadingElement, DatePickerCustomProps>((props, ref) => {
  const {
    isDisabled,
    isError,
    isFullWidth = true,
    isRequired,
    isButton,
    isReadOnly,
    isShrink,
    label,
    placeholder,
    helperText,
    errorMessage,
    value,
    size,
    ...args
  } = props;
  return isButton ? (
    <MuiIconButton ref={ref} {...args} variant="default" size="medium" color="primary">
      <SmallCalendar />
    </MuiIconButton>
  ) : (
    <MuiBaseTextFiled
      {...args}
      variant="outlined"
      label={label}
      value={value}
      sx={{
        '& .MuiInputBase-root': {
          paddingRight: '30px !important',
          cursor: isDisabled ? 'default !important' : 'pointer',
          '& input': {
            cursor: isDisabled ? 'default !important' : 'pointer',
          },
        },
      }}
      inputRef={ref}
      fullWidth={isFullWidth}
      isDisabled={isDisabled}
      required={isRequired}
      isError={isError}
      errorMessage={errorMessage}
      placeholder={placeholder}
      helperText={helperText}
      size={size}
      inputProps={{
        readOnly: true,
        startAdornment: <SmallCalendar />,
      }}
    />
  );
});

export default DatePickerCustom;
