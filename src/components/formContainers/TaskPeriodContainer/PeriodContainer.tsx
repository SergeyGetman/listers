import React, { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Box, Collapse } from '@mui/material';
import { Control, Controller, UseFormSetValue, useWatch } from 'react-hook-form';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import MuiCheckbox from '../../formElements/MuiCheckbox';
import MuiDatePicker from '../../formElements/MuiDatePicker';
import MuiTimePicker from '../../formElements/MuiTimePicker';
import RecurringFormContainer from '../RecurringFormContainer';

type PeriodContainerProps = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  isShowRangeDate: boolean;
  isShowDueDate?: boolean;
  isShowRecurring?: boolean;
  isDisabledRecurring?: boolean;
  isShowDueTime?: boolean;
  placeholder?: string;
};

const PeriodContainer: FC<PeriodContainerProps> = ({
  isShowRangeDate,
  control,
  setValue,
  isShowDueDate = true,
  isShowDueTime = false,
  isShowRecurring = true,
  placeholder,
  isDisabledRecurring,
}) => {
  const { t } = useTranslation();
  const [disabledDueTimeValue, setDisabledDueTimeValue] = useState<null | string | Date>();
  const [disabledStartTimeValue, setDisabledStartTimeValue] = useState<null | string | Date>();
  const [disabledFinishTimeValue, setDisabledFinishTimeValue] = useState<null | string | Date>();

  const due_time = useWatch({
    control,
    name: 'due_time',
  });

  const start_time = useWatch({
    control,
    name: 'start_time',
  });
  const finish_time = useWatch({
    control,
    name: 'finish_time',
  });

  const finish_date = useWatch({
    control,
    name: 'finish_date',
  });

  const start_date = useWatch({
    control,
    name: 'start_date',
  });
  const is_all_day = useWatch({
    control,
    name: 'is_all_day',
  });
  const is_all_day_due_date = useWatch({
    control,
    name: 'is_all_day_due_date',
  });

  const handleChangeAllDayDueDateCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setValue('is_all_day_due_date', value, { shouldValidate: true });
    if (value) {
      setDisabledDueTimeValue(due_time);
      setValue('due_time', null, { shouldValidate: true });
    } else {
      setValue('due_time', disabledDueTimeValue, { shouldValidate: true });
      setDisabledDueTimeValue(null);
    }
  };

  const handleChangeAllDayCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    setValue('is_all_day', value, { shouldValidate: true });

    if (value) {
      setDisabledStartTimeValue(start_time);
      setDisabledFinishTimeValue(finish_time);

      setValue('start_time', null, { shouldValidate: true });
      setValue('finish_time', null, { shouldValidate: true });
    } else {
      setValue('start_time', disabledStartTimeValue, { shouldValidate: true });
      setValue('finish_time', disabledFinishTimeValue, { shouldValidate: true });

      setDisabledStartTimeValue(null);
      setDisabledFinishTimeValue(null);
    }
  };

  const handleStartDateChange = (val: Date) => {
    setValue('start_date', val, { shouldValidate: true });
    if (finish_date && Moment(finish_date).diff(Moment(val), 'days') <= 0) {
      setValue('finish_date', val, { shouldValidate: true });
      if (isShowDueDate) {
        setValue('due_date', val, { shouldValidate: true });
      }
      if (!is_all_day) {
        const startAt = Moment(
          `${Moment(val).format('MM/DD/YYYY')} ${Moment(start_time).format('HH:mm:ss')}`,
        ).format('MM/DD/YYYY');

        const finishedAt = Moment(
          `${Moment(val).format('MM/DD/YYYY')} ${Moment(finish_time).format('HH:mm:ss')}`,
        )
          .add(1, 'hour')
          .format('MM/DD/YYYY');

        const startTime = Moment(start_time).format('HH:mm:ss');
        const finishTime = Moment(finish_time).format('HH:mm:ss');

        if (start_time && finish_time) {
          if (Moment(startTime, 'HH:mm:ss').diff(Moment(finishTime, 'HH:mm:ss'), 'hour') <= 0) {
            setValue('finish_time', Moment(start_time).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'), {
              shouldValidate: true,
            });
            if (isShowDueDate) {
              setValue('finish_time', Moment(due_time).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'), {
                shouldValidate: true,
              });
            }

            if (Moment(startAt, 'MM/DD/YYYY').diff(Moment(finishedAt, 'MM/DD/YYYY'), 'day') < 0) {
              setValue('finish_date', Moment(val).add(1, 'day').toDate(), { shouldValidate: true });
              if (isShowDueDate) {
                setValue('due_date', Moment(val).add(1, 'day').toDate(), { shouldValidate: true });
              }
            }
          }
        }
      }
    }
  };

  const handleEndDateChange = (val: Date) => {
    setValue('finish_date', val, { shouldValidate: true });
    if (isShowDueDate) {
      setValue('due_date', val, { shouldValidate: true });
    }
    if (
      start_date &&
      Moment(Moment(start_date).format('MM/DD/YYYY')).diff(Moment(val).format('MM/DD/YYYY'), 'days') >= 0
    ) {
      setValue('start_date', val, { shouldValidate: true });
      if (!is_all_day) {
        const startAt = Moment(`${Moment(val).format('MM/DD/YYYY')} ${Moment(start_time).format('HH:mm:ss')}`)
          .subtract(1, 'hour')
          .format('MM/DD/YYYY');

        const finishAt = Moment(
          `${Moment(val).format('MM/DD/YYYY')} ${Moment(finish_time).format('HH:mm:ss')}`,
        ).format('MM/DD/YYYY');

        const startTime = Moment(start_time).format('HH:mm:ss');
        const finishTime = Moment(finish_time).format('HH:mm:ss');

        if (start_time && finish_time) {
          if (Moment(startTime, 'HH:mm:ss').diff(Moment(finishTime, 'HH:mm:ss'), 'hour') >= 0) {
            setValue('start_time', Moment(start_time).subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'), {
              shouldValidate: true,
            });

            if (Moment(startAt, 'MM/DD/YYYY').diff(Moment(finishAt, 'MM/DD/YYYY'), 'day') < 0) {
              setValue('start_date', Moment(val).subtract(1, 'day').toDate(), { shouldValidate: true });
            }
          }
        }
      }
    }
  };

  const handleStartTimeChange = (val: Date) => {
    setValue('start_time', val, { shouldValidate: true });
    if (Moment(start_date).format('YYYY-MM-DD') === Moment(finish_date).format('YYYY-MM-DD')) {
      const startTime = Moment(val).format('YYYY-MM-DD HH:mm:ss');
      const finishTime = Moment(finish_time).format('YYYY-MM-DD HH:mm:ss');

      if (Moment(startTime).diff(Moment(finishTime), 'minutes') >= 0) {
        setValue('finish_time', Moment(val).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'), {
          shouldValidate: true,
        });
        if (isShowDueDate) {
          setValue('due_time', Moment(val).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'), {
            shouldValidate: true,
          });
        }
      }
    }
  };

  const handleEndTimeChange = (val: Date) => {
    setValue('finish_time', val, { shouldValidate: true });
    if (isShowDueDate) {
      setValue('due_time', val, { shouldValidate: true });
    }
    if (Moment(start_date).format('YYYY-MM-DD') === Moment(finish_date).format('YYYY-MM-DD')) {
      const startTime = Moment(start_time).format('YYYY-MM-DD HH:mm:ss');
      const finishTime = Moment(val).format('YYYY-MM-DD HH:mm:ss');
      if (Moment(finishTime).diff(Moment(startTime), 'minutes') <= 0) {
        setValue('start_time', Moment(val).subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'), {
          shouldValidate: true,
        });
      }
    }
  };

  return (
    <MuiDotAccordion
      label={t('general.containers.period')}
      isDisabledExpand
      isDefaultExpand
      isShowInfoDialog
      isShowAccordionSummery={isShowRangeDate}
    >
      <Collapse in={isShowRangeDate}>
        <Box sx={{ mb: isShowDueDate ? '16px' : '0' }}>
          <Box sx={{ width: '100%' }}>
            <Controller
              name="is_all_day"
              control={control}
              render={({ field }) => (
                <MuiCheckbox
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeAllDayCheckbox(e)}
                  label={t('general.fieldNames.allDay')}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              mt: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ width: '50%' }}>
              <Controller
                name="start_date"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiDatePicker
                    {...field}
                    isFullWidth={false}
                    onChange={(e: Date) => handleStartDateChange(e)}
                    label={t('general.fieldNames.starts')}
                    placeholder={t('general.placeholders.select_date')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                  />
                )}
              />
            </Box>

            <Box sx={{ width: '48%', ml: '16px' }}>
              {!is_all_day && (
                <Controller
                  name="start_time"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiTimePicker
                      {...field}
                      isDisabled={is_all_day}
                      onChange={(e: Date) => handleStartTimeChange(e)}
                      label={t('general.fieldNames.time')}
                      placeholder={t('general.placeholders.select_time')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                    />
                  )}
                />
              )}
            </Box>
          </Box>

          <Box
            sx={{
              width: '100%',
              mt: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ width: '50%' }}>
              <Controller
                name="finish_date"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiDatePicker
                    {...field}
                    isFullWidth={false}
                    onChange={(e: Date) => handleEndDateChange(e)}
                    label={t('general.fieldNames.ends')}
                    placeholder={t('general.placeholders.select_date')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ width: '48%', ml: '16px' }}>
              {!is_all_day && (
                <Controller
                  name="finish_time"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiTimePicker
                      {...field}
                      isDisabled={is_all_day}
                      label={t('general.fieldNames.time')}
                      placeholder={t('general.placeholders.select_time')}
                      onChange={(e: Date) => handleEndTimeChange(e)}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                    />
                  )}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Collapse>

      {isShowDueDate && (
        <Box>
          <Collapse sx={{ width: '100%' }} in={isShowDueTime}>
            <Box sx={{ width: '100%', mb: '16px' }}>
              <Controller
                name="is_all_day_due_date"
                control={control}
                render={({ field }) => (
                  <MuiCheckbox
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeAllDayDueDateCheckbox(e)
                    }
                    label={t('general.fieldNames.allDay')}
                  />
                )}
              />
            </Box>
          </Collapse>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ width: '50%' }}>
              <Controller
                name="due_date"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiDatePicker
                    isFullWidth={false}
                    label={t('general.fieldNames.dueDate')}
                    placeholder={t('general.placeholders.select_date')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                    {...field}
                  />
                )}
              />
            </Box>
            <Collapse sx={{ width: '48%', ml: '16px' }} in={isShowDueTime}>
              <Box sx={{ width: '100%' }}>
                {!is_all_day_due_date && (
                  <Controller
                    name="due_time"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiTimePicker
                        isDisabled={is_all_day_due_date}
                        label={t('general.fieldNames.dueTime')}
                        placeholder={t('general.placeholders.select_time')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        {...field}
                      />
                    )}
                  />
                )}
              </Box>
            </Collapse>
          </Box>
        </Box>
      )}
      {isShowRecurring && (
        <RecurringFormContainer
          isDisabledRecurring={isDisabledRecurring}
          placeholder={placeholder}
          setValue={setValue}
          control={control}
        />
      )}
    </MuiDotAccordion>
  );
};

export default memo(PeriodContainer);
