import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Moment } from 'moment';

import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { RecurringTypeConfig } from '../../../../../shared/configs/selectors/recurringType.config';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import PlannerItemModalHeader from '../../../../headers/PlannerItemModalHeader';
import RowWithTitleContainer from '../../../../containers/RowWithTitleContainer';
import DatePickerPopover from '../../../../popovers/DatePickerPopover';
import MuiTooltip from '../../../../MuiTooltip';
import { ReminderTimeConfig } from '../../../../../shared/configs/selectors/reminderTime.config';
import { formatDateForView } from '../../../../../shared/utils/formatDateForView';
import { formatTimeForView } from '../../../../../shared/utils/formatTimeForView';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import EventTypeContainer from '../../../../formContainers/EventTypeContainer';
import MuiSelect from '../../../../formElements/MuiSelect';
import MuiCustomEditor from '../../../../formElements/MuiCustomEditor';
import EditMeetingModalTabsContainer from './components/EditMeetingModalTabsContainer';

import { DurationTimeConfig } from '../../../../../shared/configs/selectors/durationConfig';
import { getMeetingValidationSchema } from '../../../../../shared/validation/getMeetingValidationSchema';
import { createMeetingFormOnSubmitFormat } from '../../../../../shared/functions/createMeetingFormOnSubmitFormat';
import { updateMeetingItem } from '../../../../../store/meetings/meetingsThunk';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { EventModalFormModel } from '../../../../../shared/models/event/eventModalFormModel.model';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import { ReminderTimeEnum } from '../../../../../shared/enums/reminderTime.enum';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { MeetingModalFormModel } from '../../../../../shared/models/meeting/meetingModalFormModel.model';
import { CreateMeetingFormPayloadModel } from '../../../../../shared/models/meeting/createMeetingFormPayload.model';
import { DurationTimeEnum } from '../../../../../shared/enums/duration.enum';
import { MeetingModel } from '../../../../../shared/models/meeting/meeting.model';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { MediaType } from '../../../../../shared/models/media.model';
import { ReactComponent as SmallCalendar } from '../../../../../assets/Images/small-calendar.svg';
import { ReactComponent as ReminderIcon } from '../../../../../assets/Images/reminder-icon.svg';
import { ReactComponent as RepeatIcon } from '../../../../../assets/Images/repeat-icon.svg';
import { getInitialValue } from './utils';

const durationSelectOptions = [
  DurationTimeConfig[DurationTimeEnum.fifteen_minute_duration],
  DurationTimeConfig[DurationTimeEnum.thirty_minute_duration],
  DurationTimeConfig[DurationTimeEnum.forty_five_duration],
  DurationTimeConfig[DurationTimeEnum.one_hour_duration],
  DurationTimeConfig[DurationTimeEnum.two_hour_duration],
];

type MainMeetingEditProps = {
  event: MeetingModel;
  setIsShowUnsavedDataModal: (value: boolean) => void;
  onClose: (isForceClose?: boolean) => void;
  menuList: ActionMenuListModel;
  handleUpdateMeetingOnPage: (data: MeetingModel) => void;
};

const MainMeetingEdit: FC<MainMeetingEditProps> = ({
  event,
  setIsShowUnsavedDataModal,
  handleUpdateMeetingOnPage,
  onClose,
  menuList,
}) => {
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

  const { handleSubmit, formState, control, setValue, setError, watch, trigger } =
    useForm<MeetingModalFormModel>({
      defaultValues: getInitialValue(event),
      resolver: yupResolver(getMeetingValidationSchema()),
    });

  const {
    notify_before: notifyBefore,
    tag_id: tag,
    documents,
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

  const startDateFieldValue =
    startDateValue || startTimeValue
      ? `${formatDateForView(startDateValue)}${!startTimeValue || isAllDay ? '' : ' at '}${formatTimeForView(
          startTimeValue,
          isAllDay,
        )}`
      : '';

  const handleUpdateMeeting = ({
    submitData,
    confirmation_status,
  }: {
    submitData: CreateMeetingFormPayloadModel;
    confirmation_status?: string;
  }) => {
    dispatch(updateMeetingItem({ params: submitData, meetingId: event.id, confirmation_status }))
      .then((result) => {
        if (updateMeetingItem.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.meetingUpdated'));
          handleUpdateMeetingOnPage(result.payload);
          setIsShowUnsavedDataModal(false);
          onClose(true);
        } else {
          errorsHandler(result, setError);
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });
  };

  const onSubmit = (val: EventModalFormModel) => {
    if (assignPeopleList.length === 0) {
      return val;
    }
    setIsShowConfirmLoader(true);

    const submitData = createMeetingFormOnSubmitFormat({
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
            Promise.resolve().then(() => handleUpdateMeeting({ submitData, confirmation_status })),
        },
      });
    } else {
      handleUpdateMeeting({ submitData });
    }

    return true;
  };

  const handleChangeTag = (val: TagsEnum) => {
    setValue('tag_id', val);
  };

  const handleChangeFrequency = (val: RecurringTypeEnum) => {
    setValue('recurring_pattern.repeat_interval', 1, { shouldValidate: true });
    setValue('recurring_pattern.frequency_type', val, { shouldValidate: true });
  };

  const handleChangeRecurringCustomType = (val: RecurringTypeEnum) => {
    setValue('recurring_pattern.recurring_type', val, { shouldValidate: true });
  };
  const handelChangeRecurringRepeatByDays = (val: string[]) => {
    setValue('recurring_pattern.repeat_by_days', val, { shouldValidate: true });
  };
  const handleChangeRecurringRepeatInterval = (val: number) => {
    setValue('recurring_pattern.repeat_interval', val, { shouldValidate: true });
  };

  const handleClearStartDateStartTime = () => {
    setValue('start_time', null, { shouldValidate: true });
    setValue('start_date', null, { shouldValidate: true });
  };

  const handleChangeStartDate = (val: Moment | null) => {
    setValue('start_date', val, { shouldValidate: true });
  };

  const handleChangeRecurringEndDate = (val: Moment | null) => {
    setValue('recurring_pattern.end_date', val, { shouldValidate: true });
  };
  const handleChangeRecurringStartDate = (val: number) => {
    setValue('recurring_pattern.start_date', val, { shouldValidate: true });
  };

  const handleChangeStartTime = (val: Moment | null) => {
    setValue('start_time', val, { shouldValidate: true });
  };

  const handleChangeReminder = (val: ReminderTimeEnum | null) => {
    setValue('notify_before', val, { shouldValidate: true });
  };

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

  const handleAddAttachments = useCallback(
    (newMedia: MediaType[]) => {
      setValue('documents', newMedia);
    },
    [setValue],
  );

  const getReminderMenuItem = (reminderEnumValue: ReminderTimeEnum) => {
    return {
      item: ReminderTimeConfig[reminderEnumValue],
      callback: () => handleChangeReminder(reminderEnumValue),
    };
  };

  const reminderOptions = isAllDay
    ? [
        ReminderTimeEnum.never_remind,
        ReminderTimeEnum.on_a_day_of_meeting,
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
    trigger('start_time');
  }, [isAllDay, trigger]);

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  const datePickerPopoverProps = {
    selectedDate: startDateValue,
    selectedTime: startTimeValue,
    allDayValue: isAllDay,
    isShowAllDay: true,
    isShowRepeat: true,
    handleChangeAllDay: handleChangeAllDay,
    handleChangeDate: handleChangeStartDate,
    handleChangeTime: handleChangeStartTime,
    isShowTimePicker: !isAllDay,
    isShowReminder: true,
    selectedReminder: notifyBefore,
    handleChangeReminder: handleChangeReminder,
    reminderMenuList: reminderMenuList,
    handleChangeRepeat: handleChangeFrequency,
    recurringFrequencyType: recurringFrequencyType,
    recurringRepeatInterval: recurringRepeatInterval,
    recurringCustomType: recurringCustomType,
    handleChangeRecurringCustomType: handleChangeRecurringCustomType,
    handleChangeRecurringRepeatInterval: handleChangeRecurringRepeatInterval,
    handleChangeRecurringEndDate: handleChangeRecurringEndDate,
    recurringEndDate: recurringEndDate,
    recurringStartDate: recurringStartDate,
    handleChangeRecurringStartDate: handleChangeRecurringStartDate,
    handelChangeRecurringRepeatByDays: handelChangeRecurringRepeatByDays,
    recurringRepeatByDays: recurringRepeatByDays,
  };

  return (
    <Box>
      <PlannerItemModalHeader
        onClose={onClose}
        isEdit
        tag={tag}
        setTag={handleChangeTag}
        isShowTag
        title={event.title}
        headerMenuList={menuList}
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: '100%' }}>
        <Box sx={{ p: { xs: '0 16px', sm: '0 24px' }, overflowX: 'hidden', height: '100%' }}>
          <Box sx={{ mt: '24px' }}>
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
              <Box>
                <RowWithTitleContainer title="When">
                  <Box sx={{ width: '100%' }}>
                    <DatePickerPopover {...datePickerPopoverProps}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Box sx={{ width: '190px' }}>
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
                <Box sx={{ mt: '12px' }}>
                  <RowWithTitleContainer title="Duration">
                    <Box width="120px">
                      <Controller
                        name="duration"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiSelect
                            {...field}
                            isSearchable
                            options={durationSelectOptions}
                            isRequired
                            isError={!!fieldState?.error?.message}
                            helpText={fieldState?.error?.message}
                            placeholder={t('general.placeholders.select_duration')}
                          />
                        )}
                      />
                    </Box>
                  </RowWithTitleContainer>
                </Box>
              </Box>
            ) : (
              <RowWithTitleContainer title="When">
                <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                  <DatePickerPopover {...datePickerPopoverProps}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box sx={{ width: '190px' }}>
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
                      <Box ml="12px" width="120px" onClick={(e) => e.stopPropagation()}>
                        <Controller
                          name="duration"
                          control={control}
                          render={({ field, fieldState }) => (
                            <MuiSelect
                              {...field}
                              isSearchable
                              options={durationSelectOptions}
                              isRequired
                              isError={!!fieldState?.error?.message}
                              helpText={fieldState?.error?.message}
                              placeholder={t('general.placeholders.select_duration')}
                            />
                          )}
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
          </Box>
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer title="For">
              <MuiAvatarGroup
                maxItemView={4}
                size="small"
                isContainOwnerInUsers
                handleConfirmSharePopup={setAssignPeopleList}
                users={assignPeopleList}
                isShowAddUserBtn
                onClickShare={() => true}
                owner={creator}
              />
            </RowWithTitleContainer>
          </Box>
          <Box sx={{ mt: '24px' }}>
            <EventTypeContainer setValue={setValue} control={control} />
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
                  placeholder={t('general.placeholders.write_meeting_description')}
                  isShowHint
                  maxHintValue={5000}
                  {...field}
                />
              )}
            />
          </Box>
          <Box sx={{ width: '100%', mt: '24px', paddingBottom: '150px' }}>
            <EditMeetingModalTabsContainer
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
      </form>
    </Box>
  );
};

export default MainMeetingEdit;
