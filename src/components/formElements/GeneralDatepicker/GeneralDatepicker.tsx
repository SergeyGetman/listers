import React, { forwardRef, useState } from 'react';
import { Box } from '@mui/material';
import { Datepicker } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import * as moment from 'moment/moment';
import GeneralDatepickerInput from './GeneralDatepickerInput';
import InlineDatePickerHeader from '../../popovers/DatePickerPopover/components/InlineDatepicker/components/InlineDatePickerHeader';
type GeneralDatepickerProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  isShrink?: boolean;
  isError?: boolean;
  isRange?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  helperText?: string;
  isButton?: boolean;
  errorMessage?: string;
  size?: 'small' | 'medium';
  onChange: (date: Date | [Date | null, Date | null] | null) => void;
  [x: string]: any;
};

const GeneralDatepicker = forwardRef<HTMLHeadingElement, GeneralDatepickerProps>((props) => {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const {
    isDisabled,
    isError,
    isFullWidth = true,
    isRange,
    isRequired,
    isReadOnly = false,
    isButton,
    errorMessage,
    isShrink,
    label,
    placeholder,
    helperText,
    value,
    size,
    onChange,
    ...args
  } = props;

  const onOpenPopup = () => {
    setIsShowPopup(true);
  };
  const onClosePopup = () => {
    setIsShowPopup(false);
  };

  const handleChange = (val: any) => {
    onChange(val.value);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Datepicker
        {...args}
        themeVariant="light"
        moment={moment}
        onChange={handleChange}
        onOpen={onOpenPopup}
        onClose={onClosePopup}
        defaultValue={value}
        focusOnClose={false}
        renderCalendarHeader={InlineDatePickerHeader}
        dayNamesMin={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        controls={['calendar']}
        theme="ios"
        returnFormat="moment"
        dateFormat="DD/MM/YYYY"
        touchUi={false}
        inputComponent={GeneralDatepickerInput}
        inputProps={{
          label,
          errorMessage,
          fullWidth: isFullWidth,
          isDisabled,
          isReadOnly,
          isButton,
          isRequired,
          isError,
          placeholder,
          helperText,
          size,
          isShowPopup,
        }}
      />
    </Box>
  );
});

export default GeneralDatepicker;
