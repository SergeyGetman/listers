import React, { forwardRef } from 'react';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import PhoneNumberCustom from './PhoneNumberCustom';

import './sytle.scss';
export type MuiPhoneNumberTextProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  isShrink?: boolean;
  isError?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  helperText?: string;
  defaultCountry?: string;
  errorMessage?: string;
  isToUpperCase?: boolean;
  onChange: (values?: string, country?: string) => void;
  size?: 'small' | 'medium';
  [x: string]: any;
};

const MuiPhoneNumberTextFiled = forwardRef<HTMLHeadingElement, MuiPhoneNumberTextProps>((props, ref) => {
  const {
    isDisabled,
    isError,
    isFullWidth = true,
    isRequired,
    isReadOnly,
    isToUpperCase = false,
    isShrink,
    label,
    placeholder,
    helperText,
    errorMessage,
    value,
    onChange,
    size = 'medium',
    ...args
  } = props;

  return (
    <PhoneInput
      {...args}
      defaultCountry="US"
      className={label ? '' : 'phone-number-input_without-label'}
      inputRef={ref}
      international
      label={isToUpperCase ? label?.toUpperCase() : label}
      errorMessage={errorMessage}
      fullWidth={isFullWidth}
      isDisabled={isDisabled}
      isRequired={isRequired}
      value={value}
      isError={isError}
      placeholder={placeholder}
      helperText={helperText}
      size={size}
      isShrink={isShrink}
      isReadOnly={isReadOnly}
      onChange={(phone) => {
        const country = phone ? parsePhoneNumber(phone)?.country : '';
        return phone ? onChange(phone, country) : onChange('', '');
      }}
      inputComponent={PhoneNumberCustom}
      isFullWidth={isFullWidth}
    />
  );
});

export default MuiPhoneNumberTextFiled;
