import React, { forwardRef } from 'react';
import { Box } from '@mui/material';
import MuiBaseTextFiled from '../MuiBaseTextFiled';
import CopyButton from '../../buttons/CopyButton';

type PhoneNumberCustomProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  isShrink?: boolean;
  isError?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  helperText?: string;
  size?: 'small' | 'medium';
  [x: string]: any;
};

const sx = {
  '& .MuiOutlinedInput-root': {
    paddingLeft: '38px',
  },
};

const PhoneNumberCustom = forwardRef<HTMLHeadingElement, PhoneNumberCustomProps>((props, ref) => {
  const {
    isDisabled,
    isError,
    isFullWidth,
    isRequired,
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
  const isCustomHasValue = value ? value?.length > 2 : false;
  return (
    <Box>
      <MuiBaseTextFiled
        {...args}
        variant="outlined"
        label={label}
        value={value}
        ref={ref}
        endAdornment={value ? <CopyButton content="ssss" /> : null}
        isFullWidth={isFullWidth}
        isDisabled={isDisabled}
        isRequired={isRequired}
        placeholder={placeholder}
        helperText={helperText}
        isCustomHasValue={isCustomHasValue}
        isError={isError}
        errorMessage={errorMessage}
        size={size}
        sx={sx}
        inputProps={{
          readOnly: isReadOnly,
        }}
      />
    </Box>
  );
});

export default PhoneNumberCustom;
