import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import moment, { Moment } from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import momentTZ from 'moment-timezone';

import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import EventTypeContainer from '../../../../formContainers/EventTypeContainer';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import MuiCustomEditor from '../../../../formElements/MuiCustomEditor';
import CreateMeetingModalTabsContainer from '../CreateMeetingModalTabsContainer';
import MuiSelect from '../../../../formElements/MuiSelect';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { addedCalendarItem } from '../../../../../store/calendar/calendarSlice';
import { addPlannerListItem } from '../../../../../store/planner/plannerSlice';
import { getWeekDayEnumFromNumber } from '../../../../../shared/functions/getWeekDayEnumFromNumber';
import PlannerItemModalHeader from '../../../../headers/PlannerItemModalHeader';
import RowWithTitleContainer from '../../../../containers/RowWithTitleContainer';
import DatePickerPopover from '../../../../popovers/DatePickerPopover';
import MuiTooltip from '../../../../MuiTooltip';
import { formatDateForView } from '../../../../../shared/utils/formatDateForView';
import { formatTimeForView } from '../../../../../shared/utils/formatTimeForView';
import { ReminderTimeConfig } from '../../../../../shared/configs/selectors/reminderTime.config';
import { DurationTimeConfig } from '../../../../../shared/configs/selectors/durationConfig';
import { RecurringTypeConfig } from '../../../../../shared/configs/selectors/recurringType.config';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import router from '../../../../../shared/services/router';

import { getMeetingValidationSchema } from '../../../../../shared/validation/getMeetingValidationSchema';
import { createMeetingItem } from '../../../../../store/meetings/meetingsThunk';
import { createMeetingFormOnSubmitFormat } from '../../../../../shared/functions/createMeetingFormOnSubmitFormat';
import { ReactComponent as SmallCalendar } from '../../../../../assets/Images/small-calendar.svg';
import { ReactComponent as ReminderIcon } from '../../../../../assets/Images/reminder-icon.svg';
import { ReactComponent as RepeatIcon } from '../../../../../assets/Images/repeat-icon.svg';

import { MeetingModel } from '../../../../../shared/models/meeting/meeting.model';
import { MediaType } from '../../../../../shared/models/media.model';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { MeetingModalFormModel } from '../../../../../shared/models/meeting/meetingModalFormModel.model';
import { DurationTimeEnum } from '../../../../../shared/enums/duration.enum';
import { ReminderTimeEnum } from '../../../../../shared/enums/reminderTime.enum';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';

const durationSelectOptions = [
  DurationTimeConfig[DurationTimeEnum.fifteen_minute_duration],
  DurationTimeConfig[DurationTimeEnum.thirty_minute_duration],
  DurationTimeConfig[DurationTimeEnum.forty_five_duration],
  DurationTimeConfig[DurationTimeEnum.one_hour_duration],
  DurationTimeConfig[DurationTimeEnum.two_hour_duration],
];

type CreateMeetingModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
  createDate?: null | string;
};

const CreateMeetingModalContainer: FC<CreateMeetingModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
  createDate,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const calendarFilters = useAppSelector(({ calendar }) => calendar.filters);
  const plannerFilters = useAppSelector(({ planner }) => planner.filters);
  const { connections, data } = useAppSelector(({ profile }) => profile);
  const { checklistData } = useAppSelector(({ checklists }) => checklists);
  const { notesData } = useAppSelector(({ notes }) => notes);

  const isStarterPackage =
    data?.subscription?.package === PackageEnum.starter || !data?.subscription?.package;

  const creator = {
    ...connections?.find((item: ItemUserModel) => item.id === data.id),
    value: data.id,
    role: AssignPeoplePermissionsEnum.editor,
    label: data.full_name ? data.full_name : `${data.first_name} ${data.last_name}`,
  };

  const [assignPeopleList, setAssignPeopleList] = useState<ItemUserModel[]>(creator ? [creator] : []);

  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {});
  };
  const initialValues = {
    title: '',
    documents: [],
    duration: DurationTimeConfig[DurationTimeEnum.fifteen_minute_duration],
    notify_before: ReminderTimeEnum.one_hour_before,
    is_all_day: false,
    start_date: createDate ? moment(createDate) : moment(),
    start_time: moment(),
    description: [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
    physicalAddress: undefined,
    site: '',
    phone: '',
    tag_id: TagsEnum.none,
    country: '',
    is_recurring: false,
    recurring_pattern: {
      frequency_type: RecurringTypeEnum.NONE,
      end_date: null,
      is_endless: false,
      recurring_type: RecurringTypeEnum.DAILY,
      repeat_by_days: [
        getWeekDayEnumFromNumber(createDate ? moment(createDate).isoWeekday() : moment().isoWeekday()),
      ],
      timezone_name: momentTZ.tz.guess(true),
      repeat_by_months: null,
      repeat_interval: 1,
      start_date: moment(createDate).format('DD'),
    },
  };

  const handleAddItemToList = (meet: MeetingModel) => {
    if (location.pathname === router.calendar.path) {
      if (
        calendarFilters.entities === null ||
        calendarFilters.entities?.includes(PlannerItemModelTypeEnum.meet)
      ) {
        dispatch(addedCalendarItem({ data: meet, isStarterPackage }));
      }
    } else if (location.pathname === router.journal.path) {
      if (
        plannerFilters.entities === null ||
        plannerFilters.entities?.includes(PlannerItemModelTypeEnum.meet)
      ) {
        dispatch(addPlannerListItem(meet));
      }
    }
  };

  const { handleSubmit, formState, control, watch, setValue, setError, trigger } =
    useForm<MeetingModalFormModel>({
      defaultValues: initialValues,
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

  const onSubmit = (val: MeetingModalFormModel) => {
    if (assignPeopleList.length === 0) {
      return true;
    }
    const checklists = checklistData
      ? checklistData.map((item) => {
          return {
            id: item.id,
          };
        })
      : [];
    const notes = notesData?.data
      ? notesData?.data.map((item: any) => {
          return {
            id: item.id,
          };
        })
      : [];

    setIsShowConfirmLoader(true);
    const submitData = createMeetingFormOnSubmitFormat({
      data: val,
      currentUserId: data.id,
      users: assignPeopleList,
      checklists,
      notes,
    });

    dispatch(createMeetingItem(submitData))
      .then((result) => {
        if (createMeetingItem.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.meetingAdded'));
          handleAddItemToList(result.payload);
          onClose(true);
        } else {
          errorsHandler(result, setError);
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });
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
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <PlannerItemModalHeader
        isShowUpgradePackagesBtn={isStarterPackage}
        handleClickUpgradePackage={handleOpenUpgradePackageModal}
        onClose={onClose}
        isEdit
        tag={tag}
        setTag={handleChangeTag}
        isShowTag
        title={t('general.header.newMeeting')}
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
            <CreateMeetingModalTabsContainer
              attachments={documents}
              handleAddAttachment={handleAddAttachments}
              entityType={DocumentsEntityTypeEnum.event_document}
            />
          </Box>
        </Box>
        <ModalFooter
          position="absolute"
          isBorderTop
          isShowBackGround
          middleBtnProps={{
            isShow: true,
            label: t('general.buttons.cancel'),
            variant: 'outlined',
            color: 'secondary',
            size: 'medium',
            onClick: () => onClose(),
            type: 'button',
            isStopPropagation: false,
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: isShowConfirmLoader,
            label: t('general.buttons.create'),
            variant: 'contained',
            size: 'medium',
            onClick: () => (isStarterPackage ? handleOpenUpgradePackageModal() : true),
            type: isStarterPackage ? 'button' : 'submit',
            isStopPropagation: false,
          }}
        />
      </form>
    </Box>
  );
};

export default CreateMeetingModalContainer;
