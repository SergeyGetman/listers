import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Collapse, Typography, useMediaQuery, useTheme } from '@mui/material';
import momentTZ from 'moment-timezone';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Moment from 'moment';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import { PlannerItemPriorityEnum } from '../../../../../shared/enums/plannerItemPriority.enum';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { createTaskItem } from '../../../../../store/roadmap/roadmapThunk';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import router from '../../../../../shared/services/router';
import { addedBacklogItem } from '../../../../../store/backlog/backlogSlice';
import { createTaskFormOnSubmitFormat } from '../../../../../shared/functions/createTaskFormOnSubmitFormat';
import TaskTitleContainer from '../../../../formContainers/TaskTitleContainer';
import { getTaskValidationSchema } from '../../../../../shared/validation/getTaskValidationSchema';
import { MediaType } from '../../../../../shared/models/media.model';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { TaskModalFormModel } from '../../../../../shared/models/tasks/TaskModalForm.model';
import { addRoadmapItem } from '../../../../../store/roadmap/roadmapSlice';
import { addedCalendarItem } from '../../../../../store/calendar/calendarSlice';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';
import { addPlannerListItem } from '../../../../../store/planner/plannerSlice';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import { getWeekDayEnumFromNumber } from '../../../../../shared/functions/getWeekDayEnumFromNumber';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import { deleteChecklistItem, removeChecklist } from '../../../../../store/todo/Checklists/checklistsSlice';
import {
  convertChecklistItemToTask,
  convertChecklistToTask,
} from '../../../../../store/todo/Checklists/checklistsThunk';
import PlannerItemModalHeader from '../../../../headers/PlannerItemModalHeader';
import StatusesPopover from '../../../../popovers/StatusesPopover';
import RowWithTitleContainer from '../../../../containers/RowWithTitleContainer';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import MuiCustomEditor from '../../../../formElements/MuiCustomEditor';
import DatePickerPopover from '../../../../popovers/DatePickerPopover';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import MuiSwitch from '../../../../formElements/MuiSwitch';
import { ReminderTimeEnum } from '../../../../../shared/enums/reminderTime.enum';
import { ReactComponent as ReminderIcon } from '../../../../../assets/Images/reminder-icon.svg';
import MuiTooltip from '../../../../MuiTooltip';
import { ReminderTimeConfig } from '../../../../../shared/configs/selectors/reminderTime.config';
import { formatDateForView } from '../../../../../shared/utils/formatDateForView';
import { formatTimeForView } from '../../../../../shared/utils/formatTimeForView';
import { ReactComponent as RepeatIcon } from '../../../../../assets/Images/repeat-icon.svg';
import { RecurringTypeConfig } from '../../../../../shared/configs/selectors/recurringType.config';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import { ReactComponent as SmallCalendar } from '../../../../../assets/Images/small-calendar.svg';
import CreateTaskModalTabsContainer from '../CreateTaskModalTabsContainer';
import { resetNotesData } from '../../../../../store/notes/notesSlice';
import { resetChecklistsData } from '../../../../../store/checklists/checklistsSlice';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
import StatuesItem from '../../../../popovers/StatusesPopover/components/StatuesItem';

type CreateTaskModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
  isBacklog?: boolean;
  createDate?: null | string;
  isConvertChecklistToTask?: boolean;
  isConvertChecklistItemToTask?: boolean;
  convertItem?: any;
  description?: string;
  handleDeleteChecklistItem?: () => void;
  title?: string;
};

const CreateTaskModalContainer: FC<CreateTaskModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
  isBacklog,
  createDate,
  isConvertChecklistToTask,
  isConvertChecklistItemToTask,
  convertItem,
  handleDeleteChecklistItem,
  title,
}) => {
  const location = useLocation();
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const profileData = useAppSelector(({ profile }) => profile);
  const calendarFilters = useAppSelector(({ calendar }) => calendar.filters);
  const plannerFilters = useAppSelector(({ planner }) => planner.filters);
  const { checklistData } = useAppSelector(({ checklists }) => checklists);
  const { notesData } = useAppSelector(({ notes }) => notes);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);

  const [status, setStatus] = useState<PlannerItemStatusesEnum>(
    isBacklog ? PlannerItemStatusesEnum.backlog : PlannerItemStatusesEnum.todo,
  );

  const isStarterPackage = useMemo(() => {
    return (
      profileData?.data?.subscription?.package === PackageEnum.starter ||
      !profileData?.data?.subscription?.package
    );
  }, [profileData?.data?.subscription?.package]);

  const formatUsersToOptions = useMemo(() => {
    return convertItem?.users
      ? transformToAssignUserSelectValueWithRole(convertItem?.users, profileData?.data.id)
      : [];
  }, [convertItem?.users, profileData?.data.id]);

  const creator = useMemo(() => {
    return {
      ...profileData?.connections?.find((item: ItemUserModel) => item.id === profileData?.data.id),
      value: profileData?.data.id,
      status,
      role: AssignPeoplePermissionsEnum.editor,
      label: profileData?.data.full_name
        ? profileData?.data.full_name
        : `${profileData?.data.first_name} ${profileData?.data.last_name}`,
    };
  }, [profileData?.connections, profileData?.data, status]);

  const [assignPeopleList, setAssignPeopleList] = useState<ItemUserModel[]>(
    creator ? [creator, ...formatUsersToOptions] : [...formatUsersToOptions],
  );

  const initialValues = {
    documents: convertItem?.documents ? convertItem?.documents : [],
    tag_id: TagsEnum.none,
    priority: PlannerItemPriorityEnum.none,
    title: title,
    is_all_day_due_date: !!isBacklog,
    is_all_day: false,
    start_date: createDate ? Moment(createDate) : Moment(),
    start_time: Moment(),
    finish_date:
      +Moment().format('HH') >= 23
        ? createDate
          ? Moment(createDate)
          : Moment()
        : createDate
        ? Moment(createDate)
        : Moment().add(1, 'day'),
    finish_time: Moment().add(1, 'hour'),
    due_date: isBacklog
      ? null
      : +Moment().format('HH') >= 23
      ? createDate
        ? Moment(createDate).add(1, 'day')
        : Moment().add(1, 'day')
      : createDate
      ? Moment(createDate)
      : Moment(),
    due_time: isBacklog ? null : Moment().add(1, 'hour'),
    is_show_time_frame: !isBacklog,
    description: [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
    physicalAddress: undefined,
    site: '',
    login: '',
    notify_before: ReminderTimeEnum.one_hour_before,
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
  const { handleSubmit, formState, control, setValue, setError, watch, trigger } =
    useForm<TaskModalFormModel>({
      defaultValues: initialValues,
      resolver: yupResolver(getTaskValidationSchema(status)),
    });

  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {});
  };

  const {
    notify_before: notifyBefore,
    documents,
    priority,
    tag_id: tag,
    due_date: dueDateValue,
    due_time: dueTimeValue,
    is_all_day_due_date: isAllDayDueDateValue,
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
    is_show_time_frame: isShowTimeFrame,
  } = watch();

  const dueDateFieldValue =
    dueDateValue || dueTimeValue
      ? `${formatDateForView(dueDateValue)}${
          !dueTimeValue || isAllDayDueDateValue ? '' : ' at '
        }${formatTimeForView(dueTimeValue, isAllDayDueDateValue)}`
      : '';

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

  const onSubmit = (val: TaskModalFormModel) => {
    if (assignPeopleList.length === 0) {
      return val;
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

    const submitData = createTaskFormOnSubmitFormat({
      data: val,
      tag,
      status,
      users: assignPeopleList,
      checklists,
      notes,
    });

    if (isConvertChecklistToTask) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.convertChecklistToTask.title'),
          text: t('general.modals.convertChecklistToTask.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve().then(() =>
              dispatch(convertChecklistToTask({ checklistId: convertItem?.id, ...submitData })).then(
                (result) => {
                  if (convertChecklistToTask.fulfilled.match(result)) {
                    onClose(true);
                    dispatch(removeChecklist(convertItem?.id));
                    NotificationService.success(t('general.notifications.checklistConverted'));
                  }
                },
              ),
            ),
        },
      });
    } else if (isConvertChecklistItemToTask) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.convertChecklistItemToTask.title'),
          text: t('general.modals.convertChecklistItemToTask.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve().then(() =>
              dispatch(
                convertChecklistItemToTask({
                  checklistId: convertItem?.checklistId,
                  checklistItemId: convertItem?.id,
                  ...submitData,
                }),
              ).then((result) => {
                if (convertChecklistItemToTask.fulfilled.match(result)) {
                  onClose(true);
                  dispatch(
                    deleteChecklistItem({
                      checklistId: convertItem?.checklistId,
                      checklistItemId: convertItem?.id,
                    }),
                  );
                  NotificationService.success(t('general.notifications.checklistConverted'));
                }
              }),
            ),
        },
      });
    } else {
      setIsShowConfirmLoader(true);

      dispatch(createTaskItem(submitData))
        .then((result) => {
          if (createTaskItem.fulfilled.match(result)) {
            if (handleDeleteChecklistItem) {
              handleDeleteChecklistItem();
            }
            NotificationService.success(t('general.notifications.taskAdded'));
            if (location.pathname === router.backlog.path) {
              if (submitData.global_status === PlannerItemStatusesEnum.backlog) {
                dispatch(addedBacklogItem(result.payload));
              }
            } else if (location.pathname === router.roadmap.path) {
              if (submitData.global_status !== PlannerItemStatusesEnum.backlog) {
                dispatch(addRoadmapItem(result.payload));
              }
            } else if (location.pathname === router.calendar.path) {
              if (
                calendarFilters.entities === null ||
                calendarFilters.entities?.includes(PlannerItemModelTypeEnum.task)
              ) {
                if (
                  !!result.payload.current_user.status &&
                  submitData.global_status !== PlannerItemStatusesEnum.backlog
                ) {
                  dispatch(addedCalendarItem({ data: result.payload, isStarterPackage }));
                }
              }
            } else if (location.pathname === router.journal.path) {
              if (
                plannerFilters.entities === null ||
                plannerFilters.entities?.includes(PlannerItemModelTypeEnum.task)
              ) {
                if (
                  !!result.payload.current_user.status &&
                  submitData.global_status !== PlannerItemStatusesEnum.backlog
                ) {
                  dispatch(addPlannerListItem(result.payload));
                }
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
    }
    return true;
  };

  const handleAddAttachments = useCallback(
    (newMedia: MediaType[]) => {
      setValue('documents', newMedia);
    },
    [setValue],
  );

  const handleChangePriority = (val: any) => {
    setValue('priority', val);
  };
  const handleChangeTag = (val: any) => {
    setValue('tag_id', val);
  };

  const handleChangeStatusForCurrentUserInList = (newStatus: PlannerItemStatusesEnum) => {
    const formattedAssignPeopleList = assignPeopleList.map((item) => {
      if (item.id === profileData?.data?.id) {
        return {
          ...item,
          status: newStatus,
        };
      }
      return item;
    });
    setAssignPeopleList(formattedAssignPeopleList);
  };
  const handleChangeStatusForAllUsersInList = (newStatus: PlannerItemStatusesEnum) => {
    const formattedAssignPeopleList = assignPeopleList.map((item) => {
      return {
        ...item,
        status: newStatus,
      };
    });
    setAssignPeopleList(formattedAssignPeopleList);
  };

  const handleChangeStatus = (newStatus: PlannerItemStatusesEnum) => {
    if (newStatus === PlannerItemStatusesEnum.backlog) {
      handleChangeStatusForAllUsersInList(newStatus);
      setStatus(newStatus);
      setValue('is_show_time_frame', false, { shouldValidate: true });
    } else if (status === PlannerItemStatusesEnum.backlog && !isShowTimeFrame) {
      handleChangeStatusForAllUsersInList(PlannerItemStatusesEnum.todo);
      setStatus(newStatus);
      setValue('is_show_time_frame', true, { shouldValidate: true });
    } else {
      handleChangeStatusForCurrentUserInList(newStatus);
      setStatus(newStatus);
    }
  };

  const handleClearDueDateDueTime = () => {
    setValue('due_date', null, { shouldValidate: true });
    setValue('due_time', null, { shouldValidate: true });
  };
  const handleClearStartDateStartTime = () => {
    setValue('start_time', null, { shouldValidate: true });
    setValue('start_date', null, { shouldValidate: true });
  };
  const handleClearEndDateEndTime = () => {
    setValue('finish_date', null, { shouldValidate: true });
    setValue('finish_time', null, { shouldValidate: true });
  };
  const handleChangeDueDate = (val: any) => {
    setValue('due_date', val, { shouldValidate: true });
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
  const handleChangeDueTime = (val: any) => {
    setValue('due_time', val, { shouldValidate: true });
  };

  const handleChangeAllDay = (val: any) => {
    setValue('is_all_day', val, { shouldValidate: true });
  };

  const handleChangeReminder = (val: ReminderTimeEnum | null) => {
    setValue('notify_before', val, { shouldValidate: true });
  };

  const handleChangeAllDayDueDate = (val: any) => {
    setValue('is_all_day_due_date', val, { shouldValidate: true });
    if (notifyBefore && notifyBefore !== ReminderTimeEnum.never_remind) {
      if (val) {
        handleChangeReminder(ReminderTimeEnum.on_a_day_of_task);
      } else {
        handleChangeReminder(ReminderTimeEnum.one_hour_before);
      }
    }
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

  const handleChangeIsShowTimeFrame = (val: any) => {
    const newValue = val?.target?.checked;
    if (newValue && status === PlannerItemStatusesEnum.backlog) {
      handleChangeStatus(PlannerItemStatusesEnum.todo);
    } else if (!newValue && status !== PlannerItemStatusesEnum.backlog) {
      handleChangeStatus(PlannerItemStatusesEnum.backlog);
    }
    setValue('is_show_time_frame', newValue);
  };

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
    return () => {
      dispatch(resetNotesData());
      dispatch(resetChecklistsData());
    };
  }, [dispatch, formState.isDirty, setIsShowUnsavedDataModal]);

  useEffect(() => {
    trigger('due_time');
  }, [isAllDayDueDateValue, trigger]);

  useEffect(() => {
    trigger('finish_time');
    trigger('start_time');
  }, [isAllDay, trigger]);

  useEffect(() => {
    trigger('finish_date');
  }, [recurringFrequencyType, recurringCustomType, trigger]);

  const statusesMenu = [
    {
      item: plannerItemStatusesConfig[PlannerItemStatusesEnum.backlog],
      callback: () => handleChangeStatus(plannerItemStatusesConfig[PlannerItemStatusesEnum.backlog].id),
    },
    {
      item: plannerItemStatusesConfig[PlannerItemStatusesEnum.todo],
      callback: () => handleChangeStatus(plannerItemStatusesConfig[PlannerItemStatusesEnum.todo].id),
    },
    {
      item: plannerItemStatusesConfig[PlannerItemStatusesEnum.in_progress],
      callback: () => handleChangeStatus(plannerItemStatusesConfig[PlannerItemStatusesEnum.in_progress].id),
    },
    {
      item: plannerItemStatusesConfig[PlannerItemStatusesEnum.done],
      callback: () => handleChangeStatus(plannerItemStatusesConfig[PlannerItemStatusesEnum.done].id),
    },
  ];

  const reminderMenuList = isAllDayDueDateValue
    ? [
        {
          item: ReminderTimeConfig[ReminderTimeEnum.never_remind],
          callback: () => handleChangeReminder(ReminderTimeEnum.never_remind),
        },
        {
          item: ReminderTimeConfig[ReminderTimeEnum.on_a_day_of_task],
          callback: () => handleChangeReminder(ReminderTimeEnum.on_a_day_of_task),
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

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <PlannerItemModalHeader
        title="Create Task"
        tag={tag}
        setTag={handleChangeTag}
        setPriority={handleChangePriority}
        priority={priority}
        onClose={onClose}
        handleClickUpgradePackage={handleOpenUpgradePackageModal}
        isShowUpgradePackagesBtn={isStarterPackage}
        isEdit
        isShowTag
        isShowPriority
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: '100%' }}>
        <Box sx={{ p: { xs: '0 16px', sm: '0 24px' }, overflowX: 'hidden', height: '100%' }}>
          <Box sx={{ mt: '30px' }}>
            <TaskTitleContainer control={control} />
          </Box>
          <Box sx={{ mt: '20px' }}>
            <RowWithTitleContainer title="Status">
              <StatusesPopover statusesMenu={statusesMenu} selectedStatus={status}>
                <StatuesItem selectedStatus={status} />
              </StatusesPopover>
            </RowWithTitleContainer>
          </Box>

          <Box sx={{ mt: '20px' }}>
            <RowWithTitleContainer title="Due by">
              <Box width="100%">
                <DatePickerPopover
                  isRange={false}
                  selectedDate={dueDateValue}
                  selectedTime={dueTimeValue}
                  allDayValue={isAllDayDueDateValue}
                  isShowAllDay
                  reminderMenuList={reminderMenuList}
                  handleChangeAllDay={handleChangeAllDayDueDate}
                  handleChangeTime={handleChangeDueTime}
                  handleChangeDate={handleChangeDueDate}
                  isShowTimePicker={!isAllDayDueDateValue}
                  isShowReminder
                  selectedReminder={notifyBefore}
                  handleChangeReminder={handleChangeReminder}
                >
                  <Box display="flex" alignItems="flex-start">
                    <Box sx={{ maxWidth: '190px', width: '100%', minWidth: '190px' }}>
                      <MuiBaseTextFiled
                        isFullWidth
                        isReadOnly
                        isClearable
                        onChange={handleClearDueDateDueTime}
                        placeholder={t('general.placeholders.select_date')}
                        isError={!!formState?.errors?.due_date || !!formState?.errors?.due_time}
                        errorMessage={
                          formState?.errors?.due_date?.message || formState?.errors?.due_time?.message
                        }
                        value={dueDateFieldValue}
                        inputProps={{
                          startAdornment: <SmallCalendar />,
                        }}
                      />
                    </Box>
                    {dueDateFieldValue && notifyBefore && notifyBefore !== ReminderTimeEnum.never_remind && (
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
          </Box>

          <Box sx={{ mt: '24px' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: '12px' }}>
              <Typography variant="h3" color={theme.palette.case.neutral.n800}>
                Do you need a time frame?
              </Typography>
              <Controller
                name="is_show_time_frame"
                control={control}
                render={({ field }) => (
                  <MuiSwitch
                    label="Yes"
                    checked={field.value}
                    {...field}
                    onChange={handleChangeIsShowTimeFrame}
                  />
                )}
              />
            </Box>
            <Collapse in={isShowTimeFrame}>
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
                    handleChangeTime={handleChangeDueTime}
                    handleChangeDate={handleChangeDueDate}
                    handleChangeRangeStartDate={handleChangeRangeStartDate}
                    handleChangeRangeEndDate={handleChangeRangeEndDate}
                    handleChangeRangeStartTime={handleChangeRangeStartTime}
                    handleChangeRangeEndTime={handleChangeRangeEndTime}
                    isShowTimePicker={!isAllDay}
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
                              formState?.errors?.finish_date?.message ||
                              formState?.errors?.finish_time?.message
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
                      handleChangeAllDay={handleChangeAllDay}
                      handleChangeTime={handleChangeDueTime}
                      handleChangeDate={handleChangeDueDate}
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
                              formState?.errors?.finish_date?.message ||
                              formState?.errors?.finish_time?.message
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
                      </Box>
                    </DatePickerPopover>
                  </Box>
                </RowWithTitleContainer>
              )}
            </Collapse>
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
                isCanOwnerChangeYourPermission
                isShowStatusesForViewer={false}
                isCanChangeStatus={status !== PlannerItemStatusesEnum.backlog}
                defaultStatusFroNewUsers={
                  status !== PlannerItemStatusesEnum.backlog
                    ? PlannerItemStatusesEnum.todo
                    : PlannerItemStatusesEnum.backlog
                }
              />
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
                  placeholder={t('general.placeholders.write_task_description')}
                  isShowHint
                  maxHintValue={5000}
                  {...field}
                />
              )}
            />
          </Box>

          <Box sx={{ width: '100%', mt: '24px', paddingBottom: '150px' }}>
            <CreateTaskModalTabsContainer
              attachments={documents}
              control={control}
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

export default memo(CreateTaskModalContainer);
