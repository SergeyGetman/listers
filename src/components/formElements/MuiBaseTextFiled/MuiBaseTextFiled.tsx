import React, { forwardRef, useMemo, useState } from 'react';
import { Box, InputAdornment, InputLabelProps, OutlinedInputProps, TextField, useTheme } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';
import ErrorMessage from '../ErrorMessage';
import MuiButton from '../../buttons/MuiButton';
import { MuiButtonProps } from '../../buttons/MuiButton/MuiButton';
import InputLabel from '../InputLabel';

type MuiBaseTextFiledProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  type?: string;
  isError?: boolean;
  isShrink?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  size?: 'small' | 'medium';
  value: string;
  onChange?: (val: React.ChangeEvent<HTMLInputElement>) => void;
  isShowPasswordIcons?: boolean;
  endAdornment?: React.ReactNode;
  inputProps?: Partial<OutlinedInputProps>;
  withButton?: boolean;
  isToUpperCase?: boolean;
  buttonProps?: MuiButtonProps;
  inputLabelProps?: Partial<InputLabelProps>;
  isShowHint?: boolean;
  maxHintValue?: number;
  isCustomHasValue?: boolean;
  maxLength?: number;
  isClearable?: boolean;
  [x: string]: any;
};

const MuiBaseTextFiled = forwardRef<HTMLHeadingElement, MuiBaseTextFiledProps>((props, ref) => {
  const {
    isDisabled,
    isError,
    isFullWidth = true,
    isShowPasswordIcons = true,
    isRequired,
    isClearable,
    isReadOnly,
    isShrink,
    isToUpperCase = false,
    isShowHint = false,
    maxHintValue = 72,
    label,
    value,
    placeholder,
    helperText,
    onChange,
    withButton,
    buttonProps,
    errorMessage,
    size,
    type = 'text',
    endAdornment,
    inputProps,
    inputLabelProps,
    isCustomHasValue = true,
    ...args
  } = props;
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const handleClearValue = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (onChange) {
      const fakeEvent = {
        target: {
          value: '',
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(fakeEvent);
    }
  };

  const style = useMemo(() => {
    if (withButton) {
      return {
        '.input-root': {
          p: '8px 0px 8px 10px',
        },
        '.button-root': {
          borderRadius: '0px 5px 5px 0',
        },
      };
    }
    return undefined;
  }, [withButton]);

  return (
    <Box
      sx={{
        ...style,
        width: '100%',
        '& .MuiOutlinedInput-root': {
          backgroundColor: !!value && !isDisabled && isCustomHasValue ? theme.palette.case.neutral.n0 : '',
        },
      }}
    >
      <InputLabel
        label={isToUpperCase ? label?.toUpperCase() : label}
        isShowHint={isShowHint}
        isRequired={isRequired}
        currentHintValue={value?.length}
        maxHintValue={maxHintValue}
      />
      <TextField
        {...args}
        variant="outlined"
        label=""
        value={value}
        inputRef={ref}
        autoComplete="new-password"
        type={type === 'password' ? (showPassword ? 'password' : 'text') : type}
        fullWidth={isFullWidth}
        disabled={isDisabled}
        required={isRequired}
        error={isError}
        placeholder={placeholder}
        helperText={helperText}
        size={size}
        onChange={onChange}
        InputProps={{
          ...inputProps,
          readOnly: isReadOnly,
          classes: { root: 'input-root' },
          autoComplete: 'new-password',
          endAdornment: withButton ? (
            <InputAdornment position="end">
              <Box sx={{ zIndex: 10 }}>
                <MuiButton label={buttonProps?.label || ''} {...buttonProps} />
              </Box>
            </InputAdornment>
          ) : type === 'password' && isShowPasswordIcons ? (
            showPassword ? (
              <VisibilityOffIcon
                sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <VisibilityIcon
                sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              />
            )
          ) : endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : isClearable && !!value ? (
            <InputAdornment position="end">
              <ClearIcon
                onClick={handleClearValue}
                onTouchStart={handleClearValue}
                sx={{
                  position: 'relative',
                  zIndex: '100',
                  width: '20px',
                  height: '16px',
                  display: 'flex',
                  cursor: 'pointer !important',
                  '&:hover': {
                    opacity: '0.7',
                  },

                  color: `${
                    isDisabled ? theme.palette.case.neutral.n500 : theme.palette.case.neutral.n700
                  } !important`,
                }}
              />
            </InputAdornment>
          ) : null,
        }}
        InputLabelProps={{
          shrink: true,
          ...inputLabelProps,
        }}
      />
      {errorMessage ? <ErrorMessage isShow={isError} message={errorMessage} /> : <></>}
    </Box>
  );
});

export default MuiBaseTextFiled;
