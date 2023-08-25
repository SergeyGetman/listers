import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import Moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import momentTZ from 'moment-timezone';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import EventTypeContainer from '../../../../formContainers/EventTypeContainer';
import { MediaType } from '../../../../../shared/models/media.model';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { getCreateEventValidationSchema } from '../../../../../shared/validation/getCreateEventValidationSchema';
import { createEventFormOnSubmitFormat } from '../../../../../shared/functions/createEventFormOnSubmitFormat';
import { EventModalFormModel } from '../../../../../shared/models/event/eventModalFormModel.model';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import router from '../../../../../shared/services/router';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { createEventItem } from '../../../../../store/events/eventsThunk';
import { addedEventItem } from '../../../../../store/events/eventsSlice';
import { EventRoleConfig } from '../../../../../shared/configs/eventRole.config';
import { addedCalendarItem } from '../../../../../store/calendar/calendarSlice';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';
import { addPlannerListItem } from '../../../../../store/planner/plannerSlice';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import { getWeekDayEnumFromNumber } from '../../../../../shared/functions/getWeekDayEnumFromNumber';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import PlannerItemModalHeader from '../../../../headers/PlannerItemModalHeader';
import { ReminderTimeEnum } from '../../../../../shared/enums/reminderTime.enum';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import RowWithTitleContainer from '../../../../containers/RowWithTitleContainer';
import DatePickerPopover from '../../../../popovers/DatePickerPopover';
import { ReactComponent as SmallCalendar } from '../../../../../assets/Images/small-calendar.svg';
import MuiTooltip from '../../../../MuiTooltip';
import { RecurringTypeConfig } from '../../../../../shared/configs/selectors/recurringType.config';
import { ReactComponent as RepeatIcon } from '../../../../../assets/Images/repeat-icon.svg';
import { formatDateForView } from '../../../../../shared/utils/formatDateForView';
import { formatTimeForView } from '../../../../../shared/utils/formatTimeForView';
import { ReminderTimeConfig } from '../../../../../shared/configs/selectors/reminderTime.config';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import MuiCustomEditor from '../../../../formElements/MuiCustomEditor';
import MuiCurrencyTextFiled from '../../../../formElements/MuiCurrencyTextFiled';
import MuiSelect from '../../../../formElements/MuiSelect';
import CreateEventModalTabsContainer from '../CreateEventModalTabsContainer';
import { MoneyActionConfig } from '../../../../../shared/configs/moneyEction.config';
import { MoneyActionEnum } from '../../../../../shared/enums/moneyAction.enum';
import { ReactComponent as ReminderIcon } from '../../../../../assets/Images/reminder-icon.svg';

type CreateEventModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
  createDate?: null | string;
};

const CreateEventModalContainer: FC<CreateEventModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
  createDate,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const calendarFilters = useAppSelector(({ calendar }) => calendar.filters);
  const plannerFilters = useAppSelector(({ planner }) => planner.filters);
  const { connections, data } = useAppSelector(({ profile }) => profile);
  const { checklistData } = useAppSelector(({ checklists }) => checklists);
  const { notesData } = useAppSelector(({ notes }) => notes);
  const dispatch = useAppDispatch();

  const profileData = useAppSelector(({ profile }) => profile);

  const isStarterPackage = useMemo(() => {
    return (
      profileData?.data?.subscription?.package === PackageEnum.starter ||
      !profileData?.data?.subscription?.package
    );
  }, [profileData?.data?.subscription?.package]);
  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {});
  };
  const creator = useMemo(() => {
    return {
      ...connections?.find((item: ItemUserModel) => item.id === data.id),
      value: data.id,
      role: AssignPeoplePermissionsEnum.editor,
      label: data.full_name ? data.full_name : `${data.first_name} ${data.last_name}`,
    };
  }, [connections, data.id, data.full_name, data.first_name, data.last_name]);

  const location = useLocation();
  const { t } = useTranslation();
  const [assignPeopleList, setAssignPeopleList] = useState<ItemUserModel[]>(creator ? [creator] : []);
  const initialValues = {
    title: '',
    fee: null,
    money_action: undefined,
    documents: [],
    notify_before: ReminderTimeEnum.one_hour_before,
    is_all_day: false,
    start_date: createDate ? Moment(createDate) : Moment(),
    start_time: Moment(),
    finish_date:
      +Moment().format('HH') >= 23
        ? createDate
          ? Moment(createDate).add(1, 'day')
          : Moment().add(1, 'day')
        : createDate
        ? Moment(createDate)
        : Moment(),
    finish_time: Moment().add(1, 'hour'),
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
    type: undefined,
    role: { value: EventRoleConfig.host.value, label: EventRoleConfig.host.label },
    country: '',
    is_recurring: false,
    recurring_pattern: {
      frequency_type: RecurringTypeEnum.NONE,
      end_date: null,
      is_endless: false,
      recurring_type: RecurringTypeEnum.DAILY,
      repeat_by_days: [
        getWeekDayEnumFromNumber(createDate ? Moment(createDate).isoWeekday() : Moment().isoWeekday()),
      ],
      timezone_name: momentTZ.tz.guess(true),
      repeat_by_months: null,
      repeat_interval: 1,
      start_date: Moment(createDate).format('DD'),
    },
  };

  const { handleSubmit, formState, control, watch, setValue, setError, trigger } =
    useForm<EventModalFormModel>({
      defaultValues: initialValues,
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

  const onSubmit = (val: EventModalFormModel) => {
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
    const submitData = createEventFormOnSubmitFormat({
      data: val,
      currentUserId: data.id,
      users: assignPeopleList,
      checklists,
      notes,
    });

    dispatch(createEventItem(submitData))
      .then((result) => {
        if (createEventItem.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.eventAdded'));
          if (location.pathname === router.events.path) {
            dispatch(addedEventItem(result.payload));
          } else if (location.pathname === router.calendar.path) {
            if (
              calendarFilters.entities === null ||
              calendarFilters.entities?.includes(PlannerItemModelTypeEnum.event)
            ) {
              dispatch(addedCalendarItem({ data: result.payload, isStarterPackage }));
            }
          } else if (location.pathname === router.journal.path) {
            if (
              plannerFilters.entities === null ||
              plannerFilters.entities?.includes(PlannerItemModelTypeEnum.event)
            ) {
              dispatch(addPlannerListItem(result.payload));
            }
          }

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

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  const handleChangeTag = (val: TagsEnum) => {
    setValue('tag_id', val);
  };

  const handleChangeFrequency = (val: any) => {
    setValue('recurring_pattern.repeat_interval', 1, { shouldValidate: true });
    setValue('recurring_pattern.frequency_type', val, { shouldValidate: true });
  };

  const handleChangeRecurringCustomType = (val: any) => {
    setValue('recurring_pattern.recurring_type', val, { shouldValidate: true });
  };
  const handelChangeRecurringRepeatByDays = (val: any) => {
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

  const handleChangeRangeStartDate = (val: any) => {
    setValue('start_date', val, { shouldValidate: true });
  };
  const handleChangeRangeEndDate = (val: any) => {
    setValue('finish_date', val, { shouldValidate: true });
  };
  const handleChangeRecurringEndDate = (val: any) => {
    setValue('recurring_pattern.end_date', val, { shouldValidate: true });
  };
  const handleChangeRecurringStartDate = (val: any) => {
    setValue('recurring_pattern.start_date', val, { shouldValidate: true });
  };

  const handleChangeRangeStartTime = (val: any) => {
    setValue('start_time', val, { shouldValidate: true });
  };
  const handleChangeRangeEndTime = (val: any) => {
    setValue('finish_time', val, { shouldValidate: true });
  };
  const handleChangeReminder = (val: ReminderTimeEnum | null) => {
    setValue('notify_before', val, { shouldValidate: true });
  };

  const handleChangeFee = (val: any) => {
    const value = val.target.value;
    if (!value) {
      setValue('money_action', null, { shouldValidate: true });
    }
    setValue('fee', value, { shouldValidate: true });
  };

  const handleChangeAllDay = (val: any) => {
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

  const reminderMenuList = isAllDay
    ? [
        {
          item: ReminderTimeConfig[ReminderTimeEnum.never_remind],
          callback: () => handleChangeReminder(ReminderTimeEnum.never_remind),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.on_a_day_of_event],
          callback: () => handleChangeReminder(ReminderTimeEnum.on_a_day_of_event),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.one_day_before],
          callback: () => handleChangeReminder(ReminderTimeEnum.one_day_before),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.two_days_before],
          callback: () => handleChangeReminder(ReminderTimeEnum.two_days_before),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.one_week_before],
          callback: () => handleChangeReminder(ReminderTimeEnum.one_week_before),
        },
      ]
    : [
        {
          item: ReminderTimeConfig[ReminderTimeEnum.never_remind],
          callback: () => handleChangeReminder(ReminderTimeEnum.never_remind),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.five_minute_before],
          callback: () => handleChangeReminder(ReminderTimeEnum.five_minute_before),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.ten_minute_before],
          callback: () => handleChangeReminder(ReminderTimeEnum.ten_minute_before),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.fifteen_minute_before],
          callback: () => handleChangeReminder(ReminderTimeEnum.fifteen_minute_before),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.thirty_minute_before],
          callback: () => handleChangeReminder(ReminderTimeEnum.thirty_minute_before),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.one_hour_before],
          callback: () => handleChangeReminder(ReminderTimeEnum.one_hour_before),
        },
      ];

  const handleAddAttachments = useCallback(
    (newMedia: MediaType[]) => {
      setValue('documents', newMedia);
    },
    [setValue],
  );

  const feeInOut = [MoneyActionConfig[MoneyActionEnum.income], MoneyActionConfig[MoneyActionEnum.outcome]];

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
        title={t('general.header.newEvent')}
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
                        onChange={(e: any) => handleChangeFee(e)}
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
            <CreateEventModalTabsContainer
              attachments={documents}
              handleAddAttachment={handleAddAttachments}
              entityType={DocumentsEntityTypeEnum.task_document}
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

export default CreateEventModalContainer;
