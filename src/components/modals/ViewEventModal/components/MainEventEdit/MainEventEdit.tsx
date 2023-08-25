import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Moment } from 'moment';

import PlannerItemModalHeader from '../../../../headers/PlannerItemModalHeader';
import RowWithTitleContainer from '../../../../containers/RowWithTitleContainer';
import DatePickerPopover from '../../../../popovers/DatePickerPopover';
import MuiTooltip from '../../../../MuiTooltip';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import EventTypeContainer from '../../../../formContainers/EventTypeContainer';
import MuiCurrencyTextFiled from '../../../../formElements/MuiCurrencyTextFiled';
import MuiSelect from '../../../../formElements/MuiSelect';
import MuiCustomEditor from '../../../../formElements/MuiCustomEditor';
import EditEventModalTabsContainer from './components/EditEventModalTabsContainer';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { getCreateEventValidationSchema } from '../../../../../shared/validation/getCreateEventValidationSchema';
import { createEventFormOnSubmitFormat } from '../../../../../shared/functions/createEventFormOnSubmitFormat';
import { updateEventItem } from '../../../../../store/events/eventsThunk';
import { updatedEventItem } from '../../../../../store/events/eventsSlice';
import { updateCalendarItem } from '../../../../../store/calendar/calendarSlice';
import { addPlannerListItem, removePlannerListItem } from '../../../../../store/planner/plannerSlice';
import { RecurringTypeConfig } from '../../../../../shared/configs/selectors/recurringType.config';
import { ReminderTimeConfig } from '../../../../../shared/configs/selectors/reminderTime.config';
import { MoneyActionConfig } from '../../../../../shared/configs/moneyEction.config';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import router from '../../../../../shared/services/router';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { getInitialValue } from './utils';
import { formatDateForView } from '../../../../../shared/utils/formatDateForView';
import { formatTimeForView } from '../../../../../shared/utils/formatTimeForView';

import { ReactComponent as SmallCalendar } from '../../../../../assets/Images/small-calendar.svg';
import { ReactComponent as RepeatIcon } from '../../../../../assets/Images/repeat-icon.svg';
import { ReactComponent as ReminderIcon } from '../../../../../assets/Images/reminder-icon.svg';

import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import { EventItemModel } from '../../../../../shared/models/event/eventItem.model';
import { MediaType } from '../../../../../shared/models/media.model';
import { MoneyActionEnum } from '../../../../../shared/enums/moneyAction.enum';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import { ReminderTimeEnum } from '../../../../../shared/enums/reminderTime.enum';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';
import { EventModalFormModel } from '../../../../../shared/models/event/eventModalFormModel.model';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';

const feeInOut = [MoneyActionConfig[MoneyActionEnum.income], MoneyActionConfig[MoneyActionEnum.outcome]];

type MainEventEditProps = {
  event: EventItemModel;
  setIsShowUnsavedDataModal: (value: boolean) => void;
  onClose: (isForceClose?: boolean) => void;
  menuList: ActionMenuListModel;
};
const MainEventEdit: FC<MainEventEditProps> = ({ event, setIsShowUnsavedDataModal, onClose, menuList }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);

  const creator = {
    ...event?.owner,
    value: event.owner.id,
    role: AssignPeoplePermissionsEnum.editor,
    label: event.owner.full_name
      ? event.owner.full_name
      : `${event.owner.first_name} ${event.owner.last_name}`,
  };

  const formatUsersToOptions = transformToAssignUserSelectValueWithRole(event.users, event.owner.id);

  const [assignPeopleList, setAssignPeopleList] = useState<ItemUserModel[]>([
    creator,
    ...formatUsersToOptions,
  ]);

  const { handleSubmit, formState, control, setValue, setError, watch, trigger } = useForm<any>({
    defaultValues: getInitialValue(event),
    resolver: yupResolver(getCreateEventValidationSchema()),
  });

  const {
    notify_before: notifyBefore,
    tag_id: tag,
    documents,
    fee,
    finish_date: finishDateValue,
    finish_time: finishTimeValue,
    start_date: startDateValue,
    recurring_pattern: {
      frequency_type: recurringFrequencyType,
      repeat_interval: recurringRepeatInterval,
      recurring_type: recurringCustomType,
      end_date: recurringEndDate,
      repeat_by_days: recurringRepeatByDays,
      start_date: recurringStartDate,
    },
    start_time: startTimeValue,
    is_all_day: isAllDay,
  } = watch();

  const finishDateFieldValue =
    finishDateValue || finishTimeValue
      ? `${formatDateForView(finishDateValue)}${
          !finishTimeValue || isAllDay ? '' : ' at '
        }${formatTimeForView(finishTimeValue, isAllDay)}`
      : '';

  const startDateFieldValue =
    startDateValue || startTimeValue
      ? `${formatDateForView(startDateValue)}${!startTimeValue || isAllDay ? '' : ' at '}${formatTimeForView(
          startTimeValue,
          isAllDay,
        )}`
      : '';

  const handleUpdateListItem = useCallback(
    (value: EventItemModel) => {
      if (location.pathname === router.events.path) {
        dispatch(updatedEventItem(value));
      } else if (location.pathname === router.calendar.path) {
        dispatch(updateCalendarItem(value));
      } else if (location.pathname === router.journal.path) {
        dispatch(removePlannerListItem({ modelType: PlannerItemModelTypeEnum.event, id: value.id }));
        dispatch(addPlannerListItem(value));
      }
    },
    [dispatch, location.pathname],
  );

  const onSubmit = (val: EventModalFormModel) => {
    if (assignPeopleList.length === 0) {
      return val;
    }
    setIsShowConfirmLoader(true);

    const submitData = createEventFormOnSubmitFormat({
      data: val,
      currentUserId: event.owner.id,
      users: assignPeopleList,
    });
    if (event.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.confirmRecurringModal.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(updateEventItem({ params: submitData, eventId: event.id, confirmation_status }))
                .then((result) => {
                  if (updateEventItem.fulfilled.match(result)) {
                    NotificationService.success(t('general.notifications.eventUpdated'));
                    modalObserver.updateModalProps(ModalNamesEnum.viewEventModal, {
                      props: {
                        data: result.payload,
                      },
                    });
                    handleUpdateListItem(result.payload);

                    setIsShowUnsavedDataModal(false);
                  } else {
                    errorsHandler(result, setError);
                  }
                })
                .finally(() => {
                  setIsShowConfirmLoader(false);
                  onClose(true);
                }),
            ),
        },
      });
    } else {
      dispatch(updateEventItem({ params: submitData, eventId: event.id }))
        .then((result) => {
          if (updateEventItem.fulfilled.match(result)) {
            NotificationService.success(t('general.notifications.eventUpdated'));
            modalObserver.updateModalProps(ModalNamesEnum.viewEventModal, {
              props: {
                data: result.payload,
              },
            });
            handleUpdateListItem(result.payload);

            setIsShowUnsavedDataModal(false);
          } else {
            errorsHandler(result, setError);
          }
        })
        .finally(() => {
          setIsShowConfirmLoader(false);
          onClose(true);
        });
    }

    return true;
  };

  const handleChangeTag = (val: TagsEnum) => {
    setValue('tag_id', val);
  };

  const handleChangeFrequency = (val: RecurringTypeEnum) => {
    setValue('recurring_pattern.repeat_interval', '1', { shouldValidate: true });
    setValue('recurring_pattern.frequency_type', val, { shouldValidate: true });
  };

  const handleChangeRecurringCustomType = (val: RecurringTypeEnum) => {
    setValue('recurring_pattern.recurring_type', val, { shouldValidate: true });
  };
  const handelChangeRecurringRepeatByDays = (val: string[]) => {
    setValue('recurring_pattern.repeat_by_days', val, { shouldValidate: true });
  };
  const handleChangeRecurringRepeatInterval = (val: any) => {
    setValue('recurring_pattern.repeat_interval', val, { shouldValidate: true });
  };

  const handleClearStartDateStartTime = () => {
    setValue('start_time', null, { shouldValidate: true });
    setValue('start_date', null, { shouldValidate: true });
  };
  const handleClearEndDateEndTime = () => {
    setValue('finish_date', null, { shouldValidate: true });
    setValue('finish_time', null, { shouldValidate: true });
  };

  const handleChangeRangeStartDate = (val?: Moment | null) => {
    setValue('start_date', val, { shouldValidate: true });
  };
  const handleChangeRangeEndDate = (val?: Moment | null) => {
    setValue('finish_date', val, { shouldValidate: true });
  };
  const handleChangeRecurringEndDate = (val: Moment | null) => {
    setValue('recurring_pattern.end_date', val, { shouldValidate: true });
  };
  const handleChangeRecurringStartDate = (val: number) => {
    setValue('recurring_pattern.start_date', val, { shouldValidate: true });
  };

  const handleChangeRangeStartTime = (val: Moment | null) => {
    setValue('start_time', val, { shouldValidate: true });
  };
  const handleChangeRangeEndTime = (val: Moment | null) => {
    setValue('finish_time', val, { shouldValidate: true });
  };
  const handleChangeReminder = (val: ReminderTimeEnum | null) => {
    setValue('notify_before', val, { shouldValidate: true });
  };

  const handleChangeFee = (val: React.ChangeEvent<HTMLInputElement>) => {
    const value = val.target.value;
    if (!value) {
      setValue('money_action', null, { shouldValidate: true });
    }
    setValue('fee', value, { shouldValidate: true });
  };

  const handleAddAttachments = useCallback(
    (newMedia: MediaType[]) => {
      setValue('documents', newMedia);
    },
    [setValue],
  );

  const handleChangeAllDay = (val: boolean) => {
    setValue('is_all_day', val, { shouldValidate: true });
    if (notifyBefore && notifyBefore !== ReminderTimeEnum.never_remind) {
      if (val) {
        handleChangeReminder(ReminderTimeEnum.on_a_day_of_task);
      } else {
        handleChangeReminder(ReminderTimeEnum.one_hour_before);
      }
    }
  };

  useEffect(() => {
    trigger('finish_time');
    trigger('start_time');
  }, [isAllDay, trigger]);

  useEffect(() => {
    trigger('finish_date');
  }, [recurringFrequencyType, recurringCustomType, trigger]);

  const getReminderMenuItem = (reminderEnumValue: ReminderTimeEnum) => {
    return {
      item: ReminderTimeConfig[reminderEnumValue],
      callback: () => handleChangeReminder(reminderEnumValue),
    };
  };

  const reminderOptions = isAllDay
    ? [
        ReminderTimeEnum.never_remind,
        ReminderTimeEnum.on_a_day_of_event,
        ReminderTimeEnum.one_day_before,
        ReminderTimeEnum.two_days_before,
        ReminderTimeEnum.one_week_before,
      ]
    : [
        ReminderTimeEnum.never_remind,
        ReminderTimeEnum.five_minute_before,
        ReminderTimeEnum.ten_minute_before,
        ReminderTimeEnum.fifteen_minute_before,
        ReminderTimeEnum.thirty_minute_before,
        ReminderTimeEnum.one_hour_before,
      ];

  const reminderMenuList = reminderOptions.map(getReminderMenuItem);
  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  return (
    <Box>
      <PlannerItemModalHeader
        title={event.title}
        tag={tag}
        setTag={handleChangeTag}
        onClose={onClose}
        isEdit
        isShowTag
        headerMenuList={menuList}
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: '100%' }}>
        <Box sx={{ p: { xs: '0 16px', sm: '0 24px' }, overflowX: 'hidden', height: '100%' }}>
          <Box sx={{ mt: '30px' }}>
            <RowWithTitleContainer title="Title">
              <Box sx={{ width: '100%' }}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      placeholder={t('general.placeholders.enter_title')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      type="text"
                      {...field}
                    />
                  )}
                />
              </Box>
            </RowWithTitleContainer>
          </Box>
          <Box mt="24px">
            {isMobile ? (
              <Box sx={{ width: '100%' }}>
                <DatePickerPopover
                  isRange
                  selectedRangeStartDate={startDateValue}
                  selectedRangeStartTime={startTimeValue}
                  selectedRangeEndDate={finishDateValue}
                  selectedRangeEndTime={finishTimeValue}
                  allDayValue={isAllDay}
                  isShowAllDay
                  isShowRepeat
                  handleChangeAllDay={handleChangeAllDay}
                  handleChangeRangeStartDate={handleChangeRangeStartDate}
                  handleChangeRangeEndDate={handleChangeRangeEndDate}
                  handleChangeRangeStartTime={handleChangeRangeStartTime}
                  handleChangeRangeEndTime={handleChangeRangeEndTime}
                  isShowTimePicker={!isAllDay}
                  isShowReminder
                  selectedReminder={notifyBefore}
                  handleChangeReminder={handleChangeReminder}
                  reminderMenuList={reminderMenuList}
                  handleChangeRepeat={handleChangeFrequency}
                  recurringFrequencyType={recurringFrequencyType}
                  recurringRepeatInterval={recurringRepeatInterval}
                  recurringCustomType={recurringCustomType}
                  handleChangeRecurringCustomType={handleChangeRecurringCustomType}
                  handleChangeRecurringRepeatInterval={handleChangeRecurringRepeatInterval}
                  handleChangeRecurringEndDate={handleChangeRecurringEndDate}
                  recurringEndDate={recurringEndDate}
                  recurringStartDate={recurringStartDate}
                  handleChangeRecurringStartDate={handleChangeRecurringStartDate}
                  handelChangeRecurringRepeatByDays={handelChangeRecurringRepeatByDays}
                  recurringRepeatByDays={recurringRepeatByDays}
                >
                  <Box sx={{ mb: '20px' }}>
                    <RowWithTitleContainer title="When">
                      <Box sx={{ maxWidth: '190px', width: '100%', minWidth: '190px' }}>
                        <MuiBaseTextFiled
                          isFullWidth
                          isReadOnly
                          isClearable
                          onChange={handleClearStartDateStartTime}
                          isError={!!formState?.errors?.start_date || !!formState?.errors?.start_time}
                          errorMessage={
                            formState?.errors?.start_date?.message || formState?.errors?.start_time?.message
                          }
                          placeholder={t('general.placeholders.select_date')}
                          value={startDateFieldValue}
                          inputProps={{
                            startAdornment: <SmallCalendar />,
                          }}
                        />
                      </Box>
                    </RowWithTitleContainer>
                  </Box>
                  <RowWithTitleContainer title="When">
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box sx={{ maxWidth: '190px', width: '100%', minWidth: '190px' }}>
                        <MuiBaseTextFiled
                          isFullWidth
                          isReadOnly
                          isClearable
                          onChange={handleClearEndDateEndTime}
                          isError={!!formState?.errors?.finish_date || !!formState?.errors?.finish_time}
                          errorMessage={
                            formState?.errors?.finish_date?.message || formState?.errors?.finish_time?.message
                          }
                          placeholder={t('general.placeholders.select_date')}
                          value={finishDateFieldValue}
                          inputProps={{
                            startAdornment: <SmallCalendar />,
                          }}
                        />
                      </Box>
                      {recurringFrequencyType && recurringFrequencyType !== RecurringTypeEnum.NONE && (
                        <Box
                          sx={{
                            ml: '12px',
                            cursor: 'pointer',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <MuiTooltip
                            color="dark"
                            title={
                              RecurringTypeConfig[
                                watch('recurring_pattern.frequency_type') || RecurringTypeEnum.NONE
                              ].label
                            }
                          >
                            <RepeatIcon />
                          </MuiTooltip>
                        </Box>
                      )}
                      {notifyBefore && notifyBefore !== ReminderTimeEnum.never_remind && (
                        <Box
                          sx={{
                            ml: '12px',
                            cursor: 'pointer',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <MuiTooltip
                            color="dark"
                            title={ReminderTimeConfig[notifyBefore || ReminderTimeEnum.never_remind].label}
                          >
                            <ReminderIcon />
                          </MuiTooltip>
                        </Box>
                      )}
                    </Box>
                  </RowWithTitleContainer>
                </DatePickerPopover>
              </Box>
            ) : (
              <RowWithTitleContainer title="When">
                <Box sx={{ width: '100%' }}>
                  <DatePickerPopover
                    isRange
                    selectedRangeStartDate={startDateValue}
                    selectedRangeStartTime={startTimeValue}
                    selectedRangeEndDate={finishDateValue}
                    selectedRangeEndTime={finishTimeValue}
                    allDayValue={isAllDay}
                    isShowAllDay
                    isShowRepeat
                    isShowReminder
                    selectedReminder={notifyBefore}
                    handleChangeReminder={handleChangeReminder}
                    reminderMenuList={reminderMenuList}
                    handleChangeAllDay={handleChangeAllDay}
                    handleChangeRangeStartDate={handleChangeRangeStartDate}
                    handleChangeRangeEndDate={handleChangeRangeEndDate}
                    handleChangeRangeStartTime={handleChangeRangeStartTime}
                    handleChangeRangeEndTime={handleChangeRangeEndTime}
                    isShowTimePicker={!isAllDay}
                    handleChangeRepeat={handleChangeFrequency}
                    recurringFrequencyType={recurringFrequencyType}
                    handleChangeRecurringEndDate={handleChangeRecurringEndDate}
                    recurringEndDate={recurringEndDate}
                    recurringRepeatInterval={recurringRepeatInterval}
                    recurringCustomType={recurringCustomType}
                    handleChangeRecurringCustomType={handleChangeRecurringCustomType}
                    handleChangeRecurringRepeatInterval={handleChangeRecurringRepeatInterval}
                    recurringStartDate={recurringStartDate}
                    handleChangeRecurringStartDate={handleChangeRecurringStartDate}
                    handelChangeRecurringRepeatByDays={handelChangeRecurringRepeatByDays}
                    recurringRepeatByDays={recurringRepeatByDays}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box sx={{ maxWidth: '190px', width: '100%', minWidth: '190px' }}>
                        <MuiBaseTextFiled
                          isFullWidth
                          isReadOnly
                          isClearable
                          onChange={handleClearStartDateStartTime}
                          isError={!!formState?.errors?.start_date || !!formState?.errors?.start_time}
                          errorMessage={
                            formState?.errors?.start_date?.message || formState?.errors?.start_time?.message
                          }
                          placeholder={t('general.placeholders.select_date')}
                          value={startDateFieldValue}
                          inputProps={{
                            startAdornment: <SmallCalendar />,
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          m: '0 4px',
                          color: theme.palette.case.neutral.n200,
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        -
                      </Box>
                      <Box sx={{ maxWidth: '190px', width: '100%', minWidth: '190px' }}>
                        <MuiBaseTextFiled
                          isFullWidth
                          isReadOnly
                          isClearable
                          onChange={handleClearEndDateEndTime}
                          isError={!!formState?.errors?.finish_date || !!formState?.errors?.finish_time}
                          errorMessage={
                            formState?.errors?.finish_date?.message || formState?.errors?.finish_time?.message
                          }
                          placeholder={t('general.placeholders.select_date')}
                          value={finishDateFieldValue}
                          inputProps={{
                            startAdornment: <SmallCalendar />,
                          }}
                        />
                      </Box>
                      {recurringFrequencyType && recurringFrequencyType !== RecurringTypeEnum.NONE && (
                        <Box
                          sx={{
                            ml: '12px',
                            cursor: 'pointer',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <MuiTooltip
                            color="dark"
                            title={
                              RecurringTypeConfig[
                                watch('recurring_pattern.frequency_type') || RecurringTypeEnum.NONE
                              ].label
                            }
                          >
                            <RepeatIcon />
                          </MuiTooltip>
                        </Box>
                      )}
                      {notifyBefore && notifyBefore !== ReminderTimeEnum.never_remind && (
                        <Box
                          sx={{
                            ml: '12px',
                            cursor: 'pointer',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <MuiTooltip
                            color="dark"
                            title={ReminderTimeConfig[notifyBefore || ReminderTimeEnum.never_remind].label}
                          >
                            <ReminderIcon />
                          </MuiTooltip>
                        </Box>
                      )}
                    </Box>
                  </DatePickerPopover>
                </Box>
              </RowWithTitleContainer>
            )}
            <Box sx={{ mt: '24px' }}>
              <RowWithTitleContainer title="For">
                <MuiAvatarGroup
                  maxItemView={4}
                  size="small"
                  isContainOwnerInUsers
                  handleConfirmSharePopup={setAssignPeopleList}
                  users={assignPeopleList}
                  isShowAddUserBtn
                  isShowStatusesForViewer
                  onClickShare={() => true}
                  owner={creator}
                />
              </RowWithTitleContainer>
            </Box>
            <Box sx={{ mt: '24px' }}>
              <EventTypeContainer setValue={setValue} control={control} />
            </Box>
            <Box sx={{ mt: '24px' }}>
              <RowWithTitleContainer title="Fee">
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <Box sx={{ maxWidth: '190px', width: '100%', minWidth: '190px' }}>
                    <Controller
                      name="fee"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiCurrencyTextFiled
                          {...field}
                          onChange={handleChangeFee}
                          placeholder={t('general.placeholders.enter_fee')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ maxWidth: '190px', width: '100%', minWidth: '190px', ml: '12px' }}>
                    <Controller
                      name="money_action"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiSelect
                          {...field}
                          isDisabled={!fee}
                          isSearchable
                          options={feeInOut}
                          isRequired
                          isClearable
                          isError={!!fieldState?.error?.message}
                          helpText={fieldState?.error?.message}
                          placeholder={t('general.placeholders.add_to_budget')}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </RowWithTitleContainer>
            </Box>

            <Box sx={{ mt: '40px' }}>
              <Typography variant="h3" color={theme.palette.case.neutral.n800}>
                Description
              </Typography>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <MuiCustomEditor
                    placeholder={t('general.placeholders.write_event_description')}
                    isShowHint
                    maxHintValue={5000}
                    {...field}
                  />
                )}
              />
            </Box>
            <Box sx={{ width: '100%', mt: '24px', paddingBottom: '150px' }}>
              <EditEventModalTabsContainer
                entityId={event.id}
                attachments={documents}
                handleAddAttachment={handleAddAttachments}
                entityType={DocumentsEntityTypeEnum.event_document}
              />
            </Box>
          </Box>

          <ModalFooter
            position="absolute"
            isBorderTop
            middleBtnProps={{
              isShow: true,
              isLoadingBtn: true,
              label: t('general.buttons.cancel'),
              size: 'medium',
              color: 'secondary',
              variant: 'outlined',
              onClick: () => true,
              isStopPropagation: false,
              type: 'button',
            }}
            rightBtnProps={{
              isShow: true,
              isLoadingBtn: true,
              size: 'medium',
              loading: isShowConfirmLoader,
              label: t('general.buttons.update'),
              variant: 'contained',
              isStopPropagation: false,
              type: 'submit',
            }}
          />
        </Box>
      </form>
    </Box>
  );
};

export default MainEventEdit;
