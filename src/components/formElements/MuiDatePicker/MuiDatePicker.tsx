import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Box } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerCustom from './DatePickerCustom';

type MuiDatePickerProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  isShrink?: boolean;
  isClearable?: boolean;
  isError?: boolean;
  isRange?: boolean;
  label?: string;
  placeholder?: string;
  // TODO find solution any
  value?: any;
  helperText?: string;
  errorMessage?: string;
  size?: 'small' | 'medium';
  onChange: (date: Date | [Date | null, Date | null] | null) => void;
  isButton?: boolean;
  [x: string]: any;
};

const MuiDatePicker = forwardRef<HTMLHeadingElement, MuiDatePickerProps>((props, ref) => {
  const {
    isDisabled,
    isError,
    isFullWidth = true,
    isClearable = true,
    onChange,
    isRange,
    isRequired,
    isReadOnly = false,
    errorMessage,
    isShrink,
    label,
    placeholder,
    helperText,
    value,
    size,
    isButton,
    ...args
  } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      <DatePicker
        {...args}
        disabledKeyboardNavigation
        onChangeRaw={(e) => e.preventDefault()}
        peekNextMonth
        isClearable={isClearable && !isDisabled}
        disabled={isDisabled}
        excludeScrollbar
        highlightDates={[new Date()]}
        selectsRange={isRange}
        showMonthDropdown
        showYearDropdown
        placeholderText={placeholder}
        selected={isRange ? null : value}
        startDate={value && isRange ? value[0] : null}
        endDate={value && isRange ? value[1] : null}
        calendarStartDay={1}
        dropdownMode="select"
        onChange={(e) => onChange(e)}
        customInput={
          <DatePickerCustom
            label={label}
            ref={ref}
            isButton={isButton}
            errorMessage={errorMessage}
            fullWidth={isFullWidth}
            isDisabled={isDisabled}
            isRequired={isRequired}
            isError={isError}
            helperText={helperText}
            size={size}
            isShrink={isShrink}
            isReadOnly={isReadOnly}
          />
        }
      />
    </Box>
  );
});

export default MuiDatePicker;
