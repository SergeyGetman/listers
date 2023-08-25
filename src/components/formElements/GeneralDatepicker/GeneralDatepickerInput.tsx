import React, { forwardRef } from 'react';
import { isBoolean } from 'lodash';
import { Box } from '@mui/material';
import MuiBaseTextFiled from '../MuiBaseTextFiled';
import { ReactComponent as SmallCalendar } from '../../../assets/Images/small-calendar.svg';
import MuiIconButton from '../../buttons/iconButtons/MuiIconButton';

type GeneralDatepickerInputProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  isShrink?: boolean;
  isError?: boolean;
  label?: string;
  placeholder?: string;
  value?: any;
  isShowPopup?: boolean;
  errorMessage?: string;
  helperText?: string;
  isButton?: boolean;
  size?: 'small' | 'medium';
  [x: string]: any;
};

const GeneralDatepickerInput = forwardRef<HTMLHeadingElement, GeneralDatepickerInputProps>((props, ref) => {
  const {
    isDisabled,
    isError,
    isFullWidth = true,
    isRequired,
    isReadOnly,
    isShrink,
    label,
    placeholder,
    helperText,
    errorMessage,
    value,
    size,
    isShowPopup,
    isButton,
    ...args
  } = props;

  if (isButton) {
    return (
      <Box ref={ref}>
        <MuiIconButton
          ref={ref}
          isStopPropagation={false}
          {...args}
          variant="default"
          size="medium"
          color="primary"
        >
          <SmallCalendar />
        </MuiIconButton>
      </Box>
    );
  }

  return (
    <MuiBaseTextFiled
      {...args}
      variant="outlined"
      label={label}
      ref={ref}
      value={value}
      fullWidth={isFullWidth}
      disabled={isDisabled}
      required={isRequired}
      error={isError}
      isReadOnly={isReadOnly}
      placeholder={placeholder}
      helperText={helperText}
      size={size}
      sx={{
        '& .MuiOutlinedInput-root': {
          padding: '0px',
        },
        svg: {
          left: '9px',
          position: 'absolute',
        },
        input: {
          padding: '0px 0px 0px 35px !important',
          margin: '0px !important',
          height: '100%',
          width: '100%',
        },
      }}
      focused={isBoolean(isShowPopup) ? isShowPopup : undefined}
      inputProps={{
        readOnly: true,
        startAdornment: <SmallCalendar />,
      }}
    />
  );
});

export default GeneralDatepickerInput;
