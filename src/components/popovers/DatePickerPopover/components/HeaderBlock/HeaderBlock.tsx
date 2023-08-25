import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Moment } from 'moment/moment';
import MuiSwitch from '../../../../formElements/MuiSwitch';
import DateTimeField from '../../../../formElements/DateTimeField';

type HeaderBlockProps = {
  handleChangeSelectedDate?: (val: { value: Moment | null }) => void;
  handleChangeRangeSelectedDate?: (val: [Moment | null | undefined, Moment | null | undefined]) => void;
  handleChangeSelectedTime?: (val: { value: Moment | null }) => void;
  handleChangeSelectedRageStartTime?: (value: { value: Moment | null }) => void;
  handleChangeSelectedRageEndTime?: (value: { value: Moment | null }) => void;
  handleChangeAllDay?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  isShowAllDay?: boolean;
  isShowTimePicker?: boolean;
  allDayValue?: boolean;
  selectedDate?: Moment | null;
  selectedTime?: Moment | null;
  selectedRangeStartDate?: Moment | null;
  selectedRangeEndDate?: Moment | null;
  selectedRangeStartTime?: Moment | null;
  selectedRangeEndTime?: Moment | null;
  isRange?: boolean;
};
const HeaderBlock: FC<HeaderBlockProps> = ({
  handleChangeSelectedDate,
  handleChangeRangeSelectedDate,
  handleChangeSelectedTime,
  handleChangeSelectedRageStartTime,
  handleChangeSelectedRageEndTime,
  isShowAllDay,
  handleChangeAllDay,
  isShowTimePicker,
  allDayValue,
  selectedDate,
  selectedTime,
  selectedRangeStartDate,
  selectedRangeEndDate,
  selectedRangeStartTime,
  selectedRangeEndTime,
  isRange,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      {isShowAllDay ? (
        <Box mt="10px">
          <MuiSwitch label="All-day" checked={allDayValue} onChange={handleChangeAllDay} />
        </Box>
      ) : (
        <Box />
      )}
      {isRange ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ width: '170px' }}>
            <DateTimeField
              onChangeTimePicker={handleChangeSelectedRageStartTime}
              timePickerValue={selectedRangeStartTime}
              onChangeDatePicker={(e: { value: Moment | null }) =>
                handleChangeRangeSelectedDate?.([e.value, selectedRangeEndDate])
              }
              datePickerValue={selectedRangeStartDate}
              isShowTimePicker={isShowTimePicker}
              dateFieldPlaceholder={isShowTimePicker ? 'Add date' : 'Select start date'}
            />
          </Box>
          <Box sx={{ width: '170px', mt: '8px' }}>
            <DateTimeField
              onChangeTimePicker={handleChangeSelectedRageEndTime}
              timePickerValue={selectedRangeEndTime}
              onChangeDatePicker={(e: { value: Moment | null }) =>
                handleChangeRangeSelectedDate?.([selectedRangeStartDate, e.value])
              }
              datePickerValue={selectedRangeEndDate}
              isShowTimePicker={isShowTimePicker}
              dateFieldPlaceholder={isShowTimePicker ? 'Add date' : 'Select end date'}
            />
          </Box>
        </Box>
      ) : (
        <Box sx={{ width: '170px' }}>
          <DateTimeField
            onChangeTimePicker={handleChangeSelectedTime}
            timePickerValue={selectedTime}
            onChangeDatePicker={handleChangeSelectedDate}
            datePickerValue={selectedDate}
            isShowTimePicker={isShowTimePicker}
            dateFieldPlaceholder="Select date"
          />
        </Box>
      )}
    </Box>
  );
};

export default HeaderBlock;
