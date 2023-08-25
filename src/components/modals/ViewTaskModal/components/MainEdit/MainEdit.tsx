import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Collapse, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { htmlToSlate } from 'slate-serializers';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { getTaskValidationSchema } from '../../../../../shared/validation/getTaskValidationSchema';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { TaskItemModel } from '../../../../../shared/models/tasks/taskItem.model';
import TaskTitleContainer from '../../../../formContainers/TaskTitleContainer';
import { PlannerItemPriorityEnum } from '../../../../../shared/enums/plannerItemPriority.enum';
import { MediaType } from '../../../../../shared/models/media.model';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { createTaskFormOnSubmitFormat } from '../../../../../shared/functions/createTaskFormOnSubmitFormat';
import { updateTaskItem } from '../../../../../store/roadmap/roadmapThunk';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import router from '../../../../../shared/services/router';
import { updateBacklogItem } from '../../../../../store/backlog/backlogSlice';
import { updateRoadmapItem } from '../../../../../store/roadmap/roadmapSlice';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import { removeCalendarItem, updateCalendarItem } from '../../../../../store/calendar/calendarSlice';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';
import { addPlannerListItem, removePlannerListItem } from '../../../../../store/planner/plannerSlice';
import { RecurringTypeConfig } from '../../../../../shared/configs/selectors/recurringType.config';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import PlannerItemModalHeader from '../../../../headers/PlannerItemModalHeader';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import RowWithTitleContainer from '../../../../containers/RowWithTitleContainer';
import StatusesPopover from '../../../../popovers/StatusesPopover';
import DatePickerPopover from '../../../../popovers/DatePickerPopover';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import { ReactComponent as SmallCalendar } from '../../../../../assets/Images/small-calendar.svg';
import MuiTooltip from '../../../../MuiTooltip';
import { ReminderTimeConfig } from '../../../../../shared/configs/selectors/reminderTime.config';
import { ReminderTimeEnum } from '../../../../../shared/enums/reminderTime.enum';
import { ReactComponent as ReminderIcon } from '../../../../../assets/Images/reminder-icon.svg';
import MuiSwitch from '../../../../formElements/MuiSwitch';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import { ReactComponent as RepeatIcon } from '../../../../../assets/Images/repeat-icon.svg';
import { formatDateForView } from '../../../../../shared/utils/formatDateForView';
import { formatTimeForView } from '../../../../../shared/utils/formatTimeForView';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import MuiCustomEditor from '../../../../formElements/MuiCustomEditor';
import EditTaskModalTabsContainer from './EditTaskModalTabsContainer';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
import StatuesItem from '../../../../popovers/StatusesPopover/components/StatuesItem';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { tagsConfig } from '../../../../../shared/configs/tags.config';

type MainEditProps = {
  handleChangeMainView: (value: boolean) => void;
  task: TaskItemModel;
  setIsShowUnsavedDataModal: (value: boolean) => void;
  isShowUnsavedDataModal: boolean;
  onClose: () => void;
  currentUserId?: number;
  menuList: ActionMenuListModel;
};

const MainEdit: FC<MainEditProps> = ({
  task,
  setIsShowUnsavedDataModal,
  onClose,
  currentUserId,
  menuList,
}) => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isCommonChangeStatus, setIsCommonChangeStatus] = useState<boolean>(false);

  const [status, setStatus] = useState<PlannerItemStatusesEnum>(
    task.current_user.status ? task.current_user.status : task.global_status,
  );
  const creator = useMemo(() => {
    return {
      ...task?.owner,
      value: task.owner.id,
      role: AssignPeoplePermissionsEnum.editor,
      label: task.owner.full_name ? task.owner.full_name : `${task.owner.first_name} ${task.owner.last_name}`,
    };
  }, [task?.owner]);

  const formatUsersToOptions = useMemo(() => {
    return transformToAssignUserSelectValueWithRole(task.users, task.owner.id);
  }, [task.users, task.owner.id]);

  const [assignPeopleList, setAssignPeopleList] = useState<ItemUserModel[]>(formatUsersToOptions);

  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);

  const initialValues = {
    documents: task.documents,
    tag_id: task?.tags[0]?.name ? tagsConfig[task?.tags[0].name || TagsEnum.none]?.id : TagsEnum.none,
    priority: task.priority ? task.priority : PlannerItemPriorityEnum.none,
    title: task?.title,
    is_all_day_due_date: task?.is_all_day_due_date,
    is_all_day: task?.is_all_day,
    notify_before: task?.notify_before ? task?.notify_before : ReminderTimeEnum.never_remind,
    start_date: task?.started_at ? Moment.utc(task?.started_at).local() : null,
    start_time: task?.started_at ? (task?.is_all_day ? null : Moment.utc(task?.started_at).local()) : null,
    finish_date: task?.finished_at ? Moment.utc(task?.finished_at).local() : null,
    finish_time: task?.finished_at ? (task?.is_all_day ? null : Moment.utc(task.finished_at).local()) : null,
    due_date: task?.due_dated_at ? Moment.utc(task?.due_dated_at).local() : null,
    due_time: task?.due_dated_at
      ? task?.is_all_day_due_date
        ? null
        : Moment.utc(task?.due_dated_at).local()
      : null,
    description: task?.description
      ? htmlToSlate(task.description)
      : [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
    physicalAddress: task?.location?.address ? task.location : undefined,
    meeting_id: task?.meeting_id ? task?.meeting_id : '',
    site: task?.site ? task?.site : '',
    login: task?.login ? task?.login : '',
    password: task?.password ? task?.password : '',
    is_recurring: task?.is_recurring,
    is_show_time_frame: task?.started_at,
    recurring_pattern: {
      frequency_type: task?.recurring_pattern?.frequency_type
        ? task?.recurring_pattern?.frequency_type
        : RecurringTypeEnum.NONE,
      end_date: task?.recurring_pattern?.end_date ? Moment(task?.recurring_pattern?.end_date) : null,
      is_endless: task?.recurring_pattern?.is_endless,
      recurring_type: task?.recurring_pattern?.recurring_type
        ? task?.recurring_pattern?.recurring_type
        : null,
      repeat_by_days: task?.recurring_pattern?.repeat_by_days ? task?.recurring_pattern?.repeat_by_days : [],
      repeat_by_months: null,
      repeat_interval: task?.recurring_pattern?.repeat_interval
        ? task?.recurring_pattern?.repeat_interval
        : 1,
      start_date: task?.recurring_pattern?.start_date
        ? Moment(task?.recurring_pattern?.start_date).format('DD')
        : null,
    },
  };

  const { handleSubmit, formState, control, setValue, setError, watch, trigger } = useForm<any>({
    defaultValues: initialValues,
    resolver: yupResolver(getTaskValidationSchema(status)),
  });

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
  const handleUpdateListItem = useCallback(
    (value: TaskItemModel) => {
      if (location.pathname === router.backlog.path) {
        dispatch(updateBacklogItem(value));
      } else if (location.pathname === router.roadmap.path) {
        dispatch(updateRoadmapItem(value));
      } else if (location.pathname === router.calendar.path) {
        if (!!value.current_user.status) {
          dispatch(updateCalendarItem(value));
        } else {
          dispatch(removeCalendarItem(value.id));
        }
      } else if (location.pathname === router.journal.path) {
        if (!!value.current_user.status) {
          dispatch(removePlannerListItem({ modelType: PlannerItemModelTypeEnum.task, id: value.id }));
          dispatch(addPlannerListItem(value));
        } else {
          dispatch(removePlannerListItem({ modelType: PlannerItemModelTypeEnum.task, id: value.id }));
        }
      }
    },
    [dispatch, location.pathname],
  );

  const handleChangeStatusForCurrentUserInList = (newStatus: PlannerItemStatusesEnum) => {
    const formattedAssignPeopleList = assignPeopleList.map((item) => {
      if (item.id === currentUserId) {
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

  const onSubmit = useCallback(
    (val: any) => {
      if (assignPeopleList.length === 0) {
        return val;
      }
      setIsShowConfirmLoader(true);

      const submitData = createTaskFormOnSubmitFormat({
        data: val,
        status: task.global_status,
        users: assignPeopleList,
      });

      if (task.is_recurring) {
        modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
          props: {
            title: t('general.modals.confirmRecurringModal.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: (confirmation_status: string) =>
              Promise.resolve().then(() =>
                dispatch(
                  updateTaskItem({
                    params: { ...submitData, status: [{ is_common: isCommonChangeStatus, status }] },
                    taskId: task.id,
                    confirmation_status,
                  }),
                )
                  .then((result) => {
                    if (updateTaskItem.fulfilled.match(result)) {
                      NotificationService.success(t('general.notifications.taskUpdated'));
                      modalObserver.updateModalProps(ModalNamesEnum.viewTaskModal, {
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
                    onClose();
                  }),
              ),
          },
        });
      } else {
        dispatch(
          updateTaskItem({
            params: { ...submitData, status: [{ is_common: isCommonChangeStatus, status }] },
            taskId: task.id,
          }),
        )
          .then((result) => {
            if (updateTaskItem.fulfilled.match(result)) {
              NotificationService.success(t('general.notifications.taskUpdated'));
              modalObserver.updateModalProps(ModalNamesEnum.viewTaskModal, {
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
            onClose();
          });
      }

      return true;
    },
    [
      assignPeopleList,
      dispatch,
      handleUpdateListItem,
      isCommonChangeStatus,
      onClose,
      setError,
      setIsShowUnsavedDataModal,
      status,
      t,
      task.global_status,
      task.id,
      task.is_recurring,
    ],
  );

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

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

  const handleAddAttachments = useCallback(
    (newMedia: MediaType[]) => {
      setValue('documents', newMedia);
    },
    [setValue],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onChangeStatus = useCallback(
    (value: PlannerItemStatusesEnum) => {
      if (status === PlannerItemStatusesEnum.backlog || !task.current_user.status) {
        handleChangeStatus(value);
        return;
      }

      if (value === PlannerItemStatusesEnum.backlog) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.confirmChangeStatusOnBacklog.title'),
            text: t('general.modals.confirmChangeStatusOnBacklog.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () => handleChangeStatus(value),
          },
        });
        return;
      }

      if (assignPeopleList.length >= 2) {
        modalObserver.addModal(ModalNamesEnum.confirmWithTwoVariantModal, {
          props: {
            title: t('general.modals.confirmChangeStatusForAllUsersOrYourself.title'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: (is_common: boolean) => {
              setIsCommonChangeStatus(is_common);
              handleChangeStatus(value);
            },
          },
        });
        return;
      }

      handleChangeStatus(value);
    },
    [handleChangeStatus, t, task.current_user.status, assignPeopleList, status],
  );

  const handleChangePriority = (val: any) => {
    setValue('priority', val);
  };
  const handleChangeTag = (val: any) => {
    setValue('tag_id', val);
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
    setValue('recurring_pattern.repeat_interval', '1', { shouldValidate: true });
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

  const statusesMenu = [
    {
      item: plannerItemStatusesConfig[PlannerItemStatusesEnum.backlog],
      callback: () => onChangeStatus(plannerItemStatusesConfig[PlannerItemStatusesEnum.backlog].id),
    },
    {
      item: plannerItemStatusesConfig[PlannerItemStatusesEnum.todo],
      callback: () => onChangeStatus(plannerItemStatusesConfig[PlannerItemStatusesEnum.todo].id),
    },
    {
      item: plannerItemStatusesConfig[PlannerItemStatusesEnum.in_progress],
      callback: () => onChangeStatus(plannerItemStatusesConfig[PlannerItemStatusesEnum.in_progress].id),
    },
    {
      item: plannerItemStatusesConfig[PlannerItemStatusesEnum.done],
      callback: () => onChangeStatus(plannerItemStatusesConfig[PlannerItemStatusesEnum.done].id),
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
    <Box>
      <PlannerItemModalHeader
        title={task.title}
        tag={tag}
        setTag={handleChangeTag}
        setPriority={handleChangePriority}
        priority={priority}
        onClose={onClose}
        isEdit
        isShowTag
        isShowPriority
        headerMenuList={menuList}
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ p: { xs: '0 16px', sm: '0 24px' }, overflowX: 'hidden', height: '100%' }}>
          <Box sx={{ mt: '24px' }}>
            <TaskTitleContainer control={control} />
          </Box>
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer title="Status">
              <StatusesPopover selectedStatus={status} statusesMenu={statusesMenu}>
                <StatuesItem selectedStatus={status} />
              </StatusesPopover>
            </RowWithTitleContainer>
          </Box>
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer title="Due by">
              <Box width="100%">
                <DatePickerPopover
                  isRange={false}
                  selectedDate={dueDateValue}
                  selectedTime={dueTimeValue}
                  allDayValue={isAllDayDueDateValue}
                  isShowAllDay
                  handleChangeAllDay={handleChangeAllDayDueDate}
                  handleChangeTime={handleChangeDueTime}
                  handleChangeDate={handleChangeDueDate}
                  isShowTimePicker={!isAllDayDueDateValue}
                  isShowReminder
                  reminderMenuList={reminderMenuList}
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
            <EditTaskModalTabsContainer
              entityId={task.id}
              attachments={documents}
              control={control}
              handleAddAttachment={handleAddAttachments}
              entityType={DocumentsEntityTypeEnum.task_document}
            />
          </Box>

          <ModalFooter
            position="absolute"
            isBorderTop
            isShowBackGround
            middleBtnProps={{
              isShow: true,
              isLoadingBtn: true,
              label: t('general.buttons.cancel'),
              variant: 'outlined',
              color: 'secondary',
              size: 'medium',
              onClick: onClose,
              isStopPropagation: false,
              type: 'button',
            }}
            rightBtnProps={{
              isShow: true,
              isLoadingBtn: true,
              loading: isShowConfirmLoader,
              label: t('general.buttons.update'),
              variant: 'contained',
              size: 'medium',
              isStopPropagation: false,
              type: 'submit',
            }}
          />
        </Box>
      </form>
    </Box>
  );
};

export default MainEdit;
