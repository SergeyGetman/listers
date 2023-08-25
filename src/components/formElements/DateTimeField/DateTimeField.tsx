import React, { FC, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DateField, TimeField } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { DateTimeInputContainer } from './DateTimeFileld.style';
import { createTimeConfig } from '../../../shared/utils/generateTimeConfig';
import PaperActionMenu from '../../actionMenus/PaperActionMenu';

type DateTimeFieldProps = {
  onChangeDatePicker?: (val: { value: Moment | null }) => void;
  datePickerValue?: Moment | null;
  onChangeTimePicker?: (val: { value: Moment | null }) => void;
  timePickerValue?: Moment | null;
  isShowTimePicker?: boolean;
  dateFieldPlaceholder?: string;
};
const DateTimeField: FC<DateTimeFieldProps> = ({
  onChangeDatePicker,
  onChangeTimePicker,
  timePickerValue,
  datePickerValue,
  isShowTimePicker,
  dateFieldPlaceholder,
}) => {
  const theme = useTheme();
  const isValue = !!timePickerValue || !!datePickerValue;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFocusedDateFiled, setIsFocusedDateFiled] = useState<boolean>(false);

  const handleChangeTimeFromMenu = (val: string) => {
    onChangeTimePicker?.({ value: moment(val, 'hh:mm A') });
  };
  const timeItems = createTimeConfig(handleChangeTimeFromMenu);
  const handleFocusChange = (focused: boolean) => {
    setIsFocused(focused);
  };
  return (
    <DateTimeInputContainer
      isShowTimePicker={isShowTimePicker}
      isFocusedDateFiled={isFocusedDateFiled}
      isFocused={isFocused}
      isStartIcon={false}
      isValue={isValue}
      size="small"
    >
      <DateField // @ts-ignore
        placeholder={dateFieldPlaceholder}
        format="MM/DD/YY"
        value={datePickerValue ? moment(datePickerValue) : null}
        onChange={(newValue: Moment | null) => onChangeDatePicker?.({ value: newValue })}
        onFocus={() => {
          handleFocusChange(true);
          setIsFocusedDateFiled(true);
        }}
        onBlur={() => {
          handleFocusChange(false);
          setIsFocusedDateFiled(false);
        }}
      />

      {isShowTimePicker && (
        <>
          {timePickerValue ? (
            <Typography color={theme.palette.case.neutral.n500} sx={{ m: '1px 8px 0 3px' }} variant="t14r">
              at
            </Typography>
          ) : (
            <Box
              sx={{
                borderLeft: `1px solid ${theme.palette.case.neutral.n300}`,
                height: '20px',
                m: '0 8px 0 3px',
              }}
            />
          )}
        </>
      )}

      {isShowTimePicker && (
        <PaperActionMenu
          isFullHeightContainer
          activeItem={timePickerValue ? timePickerValue?.format('hh:mm A') : ''}
          menuList={timeItems}
        >
          <TimeField // @ts-ignore
            placeholder="Add time"
            value={timePickerValue ? moment(timePickerValue) : null}
            onChange={(newValue) => onChangeTimePicker?.({ value: newValue })}
            onFocus={() => handleFocusChange(true)}
            onBlur={() => handleFocusChange(false)}
          />
        </PaperActionMenu>
      )}
    </DateTimeInputContainer>
  );
};

export default DateTimeField;
