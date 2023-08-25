import React, { FC } from 'react';
import { Box } from '@mui/material';
import { bindPopover, bindTrigger, PopupState, usePopupState } from 'material-ui-popup-state/hooks';
import moment, { Moment } from 'moment';
import { PopoverStyled } from './DatePickerPopover.style';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import InlineDatepicker from './components/InlineDatepicker';
import RepeatSelectBlock from './components/RepeatSelectBlock';
import ReminderSelectBlock from './components/ReminderSelectBlock';
import FooterBlock from './components/FooterBlock';
import HeaderBlock from './components/HeaderBlock';
import { RecurringTypeEnum } from '../../../shared/enums/recurringType.enum';
import CustomRecurringBlock from './components/CustomRecurringBlock';
import { PaperActionMenuItemModel } from '../../../shared/models/paperActionMenuItem.model';

type DatePickerPopoverProps = {
  children?: React.ReactNode;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
  handleChangeDate?: (val: Moment | null) => void;
  handleChangeTime?: (val: Moment | null) => void;
  handleChangeAllDay?: (val: boolean) => void;
  handleChangeRangeStartDate?: (val?: Moment | null) => void;
  handleChangeRangeEndDate?: (val?: Moment | null) => void;
  handleChangeRangeStartTime?: (value: Moment | null) => void;
  handleChangeRangeEndTime?: (value: Moment | null) => void;
  handleChangeReminder?: (val: any) => void;
  selectedReminder?: any;
  reminderMenuList?: {
    item: PaperActionMenuItemModel;
    callback: () => void;
  }[];
  selectedDate?: Moment | null;
  selectedTime?: Moment | null;
  selectedRangeStartDate?: Moment | null;
  selectedRangeEndDate?: Moment | null;
  selectedRangeStartTime?: Moment | null;
  selectedRangeEndTime?: Moment | null;
  allDayValue?: boolean;
  isShowRepeat?: boolean;
  isShowReminder?: boolean;
  isShowAllDay?: boolean;
  isShowTimePicker?: boolean;
  isRange?: boolean;
  handleChangeRepeat?: (val: RecurringTypeEnum) => void;
  handleChangeRecurringCustomType?: (val: RecurringTypeEnum) => void;
  handleChangeRecurringRepeatInterval?: (val: number) => void;
  handleChangeRecurringEndDate?: (val: Moment | null) => void;
  handleChangeRecurringStartDate?: (val: number) => void;
  handelChangeRecurringRepeatByDays?: (val: string[]) => void;
  recurringFrequencyType?: RecurringTypeEnum;
  recurringRepeatInterval?: number;
  recurringCustomType?: RecurringTypeEnum;
  recurringEndDate?: Moment | null;
  recurringStartDate?: number | string | null;
  recurringRepeatByDays?: string[];
};

const DatePickerPopover: FC<DatePickerPopoverProps> = ({
  children,
  anchorOriginHorizontal = 'center',
  anchorOriginVertical = 'bottom',
  transformOriginHorizontal = 'center',
  transformOriginVertical = 'top',
  handleChangeRecurringCustomType,
  handleChangeRecurringRepeatInterval,
  handleChangeDate,
  handleChangeTime,
  allDayValue,
  isShowRepeat,
  isShowAllDay,
  isShowReminder,
  handleChangeAllDay,
  isShowTimePicker,
  isRange,
  selectedDate,
  selectedRangeEndDate,
  selectedRangeEndTime,
  selectedRangeStartTime,
  selectedRangeStartDate,
  selectedTime,
  handleChangeRangeStartDate,
  handleChangeRangeEndDate,
  handleChangeRangeStartTime,
  handleChangeRangeEndTime,
  handleChangeReminder,
  selectedReminder,
  handleChangeRepeat,
  recurringFrequencyType,
  recurringRepeatInterval,
  recurringCustomType,
  recurringEndDate,
  handleChangeRecurringEndDate,
  recurringStartDate,
  handleChangeRecurringStartDate,
  recurringRepeatByDays,
  handelChangeRecurringRepeatByDays,
  reminderMenuList,
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'datePickerPopover',
  });

  const onChangeSelectedDate = (e: { value: Moment | null }) => {
    handleChangeDate?.(e.value);
  };

  const onChangeRangeSelectedDate = (e: [Moment | null | undefined, Moment | null | undefined]) => {
    handleChangeRangeStartDate?.(e[0]);
    handleChangeRangeEndDate?.(e[1]);
  };

  const onChangeRageStartTime = (e: { value: Moment | null }) => {
    handleChangeRangeStartTime?.(e.value);
  };

  const onChangeRageEndTime = (e: { value: Moment | null }) => {
    handleChangeRangeEndTime?.(e.value);
  };
  const onChangeSelectedTime = (e: { value: Moment | null }) => {
    handleChangeTime?.(e.value);
  };

  const onChangeAllDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeAllDay?.(e.target.checked);
  };

  const handleClickAwayPopup = (closeCallback: () => void, event?: React.MouseEvent): void => {
    closeCallback();
    event?.stopPropagation();
  };

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Box sx={{ display: 'inline-block' }} {...bindTrigger(popupState)}>
        {children}
      </Box>

      <PopoverStyled
        {...bindPopover({
          ...popupState,
          close: (e: React.MouseEvent) => handleClickAwayPopup(popupState.close, e),
        } as PopupState)}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
        isShowRecurringBlock={isShowRepeat && recurringFrequencyType === RecurringTypeEnum.CUSTOM}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '16px 12px 0px 12px' }}>
          <HeaderBlock
            isShowAllDay={isShowAllDay}
            isRange={isRange}
            handleChangeSelectedRageStartTime={onChangeRageStartTime}
            handleChangeSelectedRageEndTime={onChangeRageEndTime}
            isShowTimePicker={isShowTimePicker}
            handleChangeSelectedDate={onChangeSelectedDate}
            handleChangeRangeSelectedDate={onChangeRangeSelectedDate}
            handleChangeSelectedTime={onChangeSelectedTime}
            handleChangeAllDay={onChangeAllDay}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedRangeEndDate={selectedRangeEndDate}
            selectedRangeEndTime={selectedRangeEndTime}
            selectedRangeStartDate={selectedRangeStartDate}
            selectedRangeStartTime={selectedRangeStartTime}
            allDayValue={allDayValue}
          />
          <Box sx={{ mt: '12px' }}>
            <InlineDatepicker
              value={
                isRange
                  ? [
                      selectedRangeStartDate
                        ? selectedRangeStartDate.isValid()
                          ? selectedRangeStartDate
                          : null
                        : null,
                      selectedRangeEndDate
                        ? selectedRangeEndDate.isValid()
                          ? selectedRangeEndDate
                          : null
                        : null,
                    ]
                  : selectedDate === null
                  ? moment({
                      year: 2021,
                      month: 15,
                      day: 1,
                      hour: 12,
                      minute: 0,
                      second: 0,
                    })
                  : selectedDate
              }
              isRange={isRange}
              handleChangeData={onChangeSelectedDate}
              handleChangeRangeData={onChangeRangeSelectedDate}
            />
          </Box>
          {(isShowRepeat || isShowReminder) && (
            <Box display="flex" justifyContent="space-between" mt="18px">
              {isShowRepeat && handleChangeRepeat && recurringFrequencyType ? (
                <RepeatSelectBlock repeat={recurringFrequencyType} setRepeat={handleChangeRepeat} />
              ) : (
                <Box />
              )}
              {isShowReminder && handleChangeReminder && (
                <ReminderSelectBlock reminder={selectedReminder} menuList={reminderMenuList} />
              )}
            </Box>
          )}
        </Box>
        {isShowRepeat && recurringFrequencyType === RecurringTypeEnum.CUSTOM && (
          <CustomRecurringBlock
            recurringType={recurringCustomType}
            repeatInterval={recurringRepeatInterval}
            handleChangeRecurringCustomType={handleChangeRecurringCustomType}
            handleChangeRecurringRepeatInterval={handleChangeRecurringRepeatInterval}
            handleChangeRecurringEndDate={handleChangeRecurringEndDate}
            recurringEndDate={recurringEndDate}
            recurringStartDate={recurringStartDate}
            handleChangeRecurringStartDate={handleChangeRecurringStartDate}
            recurringRepeatByDays={recurringRepeatByDays}
            handelChangeRecurringRepeatByDays={handelChangeRecurringRepeatByDays}
          />
        )}
        <FooterBlock
          isShowRecurring={isShowRepeat && recurringFrequencyType === RecurringTypeEnum.CUSTOM}
          handleClose={() => handleClickAwayPopup(popupState.close)}
        />
      </PopoverStyled>
    </Box>
  );
};

export default DatePickerPopover;
