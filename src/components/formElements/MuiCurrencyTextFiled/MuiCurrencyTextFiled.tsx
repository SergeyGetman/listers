import React, { forwardRef } from 'react';
import { Box } from '@mui/material';
import NumberFormatCustom from './NumberFormatCustom';
import MuiBaseTextFiled from '../MuiBaseTextFiled';
import { ReactComponent as DollarIcon } from '../../../assets/Images/dollar-icon.svg';

type MuiCurrencyTextFiledProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  isShrink?: boolean;
  isError?: boolean;
  label?: string;
  placeholder?: string;
  value?: number;
  helperText?: string;
  errorMessage?: string;
  size?: 'small' | 'medium';
  [x: string]: any;
};

const MuiCurrencyTextFiled = forwardRef<HTMLHeadingElement, MuiCurrencyTextFiledProps>((props, ref) => {
  const {
    isDisabled,
    isError,
    isFullWidth = true,
    isRequired,
    isReadOnly,
    errorMessage,
    isShrink,
    label,
    placeholder,
    helperText,
    value,
    size,
    ...args
  } = props;
  return (
    <Box
      sx={{
        label: {
          pointerEvents: isReadOnly ? 'none' : 'initial',
        },
      }}
    >
      <MuiBaseTextFiled
        {...args}
        sx={{ pointerEvents: isReadOnly ? 'none' : 'initial' }}
        variant="outlined"
        label={label}
        inputRef={ref}
        fullWidth={isFullWidth}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
        required={isRequired}
        value={typeof value === 'number' ? value / 100 : value === null ? '' : value}
        isError={isError}
        placeholder={placeholder}
        helperText={helperText}
        size={size}
        inputProps={{
          readOnly: isReadOnly,
          inputComponent: NumberFormatCustom,
          startAdornment: <DollarIcon />,
        }}
      />
    </Box>
  );
});

export default MuiCurrencyTextFiled;
