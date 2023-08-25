import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Moment from 'moment';
import ClearIcon from '@mui/icons-material/Clear';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimePicker from 'rc-time-picker';
import ErrorMessage from '../ErrorMessage';
import 'rc-time-picker/assets/index.css';
import { MuiTimePickerInput } from './MuiTimePicker.style';
import InputLabel from '../InputLabel';

type MuiTimePickerProps = {
  isDisabled?: boolean;
  isRequired?: boolean;
  isShrink?: boolean;
  isError?: boolean;
  label?: string;
  placeholder?: string;
  value?: Moment.Moment | string;
  format?: string;
  errorMessage?: string;
  size?: 'small' | 'medium';
  onChange?: any;
  isToUpperCase?: boolean;
  isShowHint?: boolean;
  maxHintValue?: number;
  [x: string]: any;
};

const MuiTimePicker = forwardRef<HTMLHeadingElement, MuiTimePickerProps>((props, ref) => {
  const {
    isDisabled,
    isError,
    isRequired,
    errorMessage,
    isShrink,
    label,
    placeholder,
    isToUpperCase = false,
    isShowHint = false,
    maxHintValue = 72,
    value,
    format = 'hh:mm A',
    size = 'medium',
  } = props;
  const theme = useTheme();
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState<any>(value);

  const handleOpenDropdown = useCallback(() => {
    setIsOpenDropdown(true);
    setDropdownValue(value);
  }, [value]);

  const handleCloseDropdown = useCallback(() => {
    setIsOpenDropdown(false);
    props?.onChange(dropdownValue);
  }, [props, dropdownValue]);

  const handleChangeDropdownValue = useCallback(
    (val: any) => {
      if (val === null) {
        props?.onChange(null);
      }
      setDropdownValue(val);
    },
    [props],
  );

  const currentValue = useMemo(() => {
    return isOpenDropdown
      ? typeof value === 'string'
        ? Moment(dropdownValue)
        : dropdownValue
      : typeof value === 'string'
      ? Moment(value)
      : value
      ? value
      : undefined;
  }, [dropdownValue, isOpenDropdown, value]);
  return (
    <MuiTimePickerInput
      isError={isError}
      isFocused={isOpenDropdown}
      isShrink={isShrink}
      isDisabled={isDisabled}
      isStartIcon
      isValue={!!value}
      ref={ref}
      size={size}
    >
      <InputLabel
        label={isToUpperCase ? label?.toUpperCase() : label}
        isShowHint={isShowHint}
        isRequired={isRequired}
        currentHintValue={0}
        maxHintValue={maxHintValue}
      />
      <TimePicker
        onChange={handleChangeDropdownValue}
        disabled={isDisabled}
        use12Hours
        placeholder={placeholder}
        value={currentValue}
        minuteStep={5}
        onOpen={handleOpenDropdown}
        onClose={handleCloseDropdown}
        format={format}
        defaultOpenValue={Moment().minutes(0).add(1, 'h')}
        showSecond={false}
        inputReadOnly
        clearIcon={
          <ClearIcon
            sx={{
              position: 'absolute',
              top: '11px',
              right: '12px',
              cursor: 'pointer',
              '&:hover': {
                opacity: '0.7',
              },
              height: '16px',
              width: '16px',
              color: theme.palette.case.neutral.n700,
            }}
          />
        }
      />
      <ErrorMessage isShow={isError} message={errorMessage} />

      <Box
        sx={{
          position: 'absolute',
          top: '33px',
          left: 8,
          svg: {
            width: '20px',
            height: '20px',
            path: {
              fill: theme.palette.case.neutral.n700,
            },
          },
        }}
      >
        <AccessTimeIcon />
      </Box>
    </MuiTimePickerInput>
  );
});

export default MuiTimePicker;
