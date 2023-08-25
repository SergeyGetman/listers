/* eslint-disable no-console */

import React, { FC, memo, useCallback, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TaskItemModel } from '../../../../../shared/models/tasks/taskItem.model';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import ViewDescriptionContainer from '../../../../viewContainers/ViewDescriptionContainer';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import { changeTaskStatus } from '../../../../../store/roadmap/roadmapThunk';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import router from '../../../../../shared/services/router';
import { addedBacklogItem, removeBacklogItem } from '../../../../../store/backlog/backlogSlice';
import { addRoadmapItem, removeRoadmapItem } from '../../../../../store/roadmap/roadmapSlice';
import { addedCalendarItem, removeCalendarItem } from '../../../../../store/calendar/calendarSlice';
import { addPlannerListItem, removePlannerListItem } from '../../../../../store/planner/plannerSlice';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import RowWithTitleContainer from '../../../../containers/RowWithTitleContainer';
import StatusesPopover from '../../../../popovers/StatusesPopover';
import DateTimeView from '../../../../formElements/DateTimeView';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import ViewTaskModalTabsContainer from './components/ViewTaskModalTabsContainer';
import PlannerItemModalHeader from '../../../../headers/PlannerItemModalHeader';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
import StatuesItem from '../../../../popovers/StatusesPopover/components/StatuesItem';

type MainViewProps = {
  task: TaskItemModel;
  isEditor: boolean;
  isArchive: boolean;
  isStarterPackage: boolean;
  isFooterButton?: boolean;
  isDeclineLoading?: boolean;
  isAcceptLoading?: boolean;
  handleAccept?: () => void;
  handleDecline?: () => void;
  setUserNotifications: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  onClose: () => void;
  menuList: ActionMenuListModel;
};

const MainView: FC<MainViewProps> = ({
  task,
  isFooterButton = false,
  isEditor,
  isDeclineLoading,
  isAcceptLoading,
  isStarterPackage,
  handleAccept,
  isArchive,
  handleDecline,
  setUserNotifications,
  onClose,
  menuList,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const status = useMemo(() => {
    return task?.current_user?.status ? task?.current_user?.status : task?.global_status;
  }, [task?.current_user?.status, task?.global_status]);
  const tags = task?.tags?.length > 0 ? task?.tags[0]?.name : null;
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);
  const onChangeStatus = useCallback(
    (
      taskId: number,
      statusValue: PlannerItemStatusesEnum,
      is_common?: boolean,
      setIsLoading?: (val: boolean) => void,
    ) => {
      if (task.current_user.status === statusValue) {
        return;
      }

      if (setIsLoading && !isArchive) {
        setIsLoading(true);
      }

      dispatch(changeTaskStatus({ taskId, status: statusValue, is_common }))
        .then((result) => {
          if (changeTaskStatus.fulfilled.match(result)) {
            NotificationService.success(t('general.notifications.taskStatusUpdated'));
            setUserNotifications(false);
            modalObserver.updateModalProps(ModalNamesEnum.viewTaskModal, {
              props: {
                data: result.payload,
              },
            });

            if (location.pathname === router.backlog.path) {
              if (statusValue === PlannerItemStatusesEnum.backlog) {
                dispatch(addedBacklogItem(result.payload));
              } else {
                dispatch(removeBacklogItem(taskId));
              }
            } else if (location.pathname === router.roadmap.path) {
              if (statusValue === PlannerItemStatusesEnum.backlog) {
                dispatch(removeRoadmapItem(taskId));
              } else {
                dispatch(removeRoadmapItem(taskId));
                dispatch(addRoadmapItem(result.payload));
              }
            } else if (location.pathname === router.calendar.path) {
              if (statusValue === PlannerItemStatusesEnum.backlog) {
                dispatch(removeCalendarItem(result.payload.id));
              } else {
                dispatch(removeCalendarItem(result.payload.id));
                dispatch(addedCalendarItem({ data: result.payload, isStarterPackage }));
              }
            } else if (location.pathname === router.journal.path) {
              if (statusValue === PlannerItemStatusesEnum.backlog) {
                dispatch(
                  removePlannerListItem({
                    id: result.payload.id,
                    modelType: PlannerItemModelTypeEnum.task,
                  }),
                );
              } else {
                dispatch(
                  removePlannerListItem({ modelType: PlannerItemModelTypeEnum.task, id: result.payload.id }),
                );
                dispatch(addPlannerListItem(result.payload));
              }
            }
          }
        })
        .finally(() => {
          if (setIsLoading) {
            setIsLoading(false);
          }
        });
    },
    [
      task.current_user.status,
      isArchive,
      dispatch,
      t,
      setUserNotifications,
      location.pathname,
      isStarterPackage,
    ],
  );

  const handleChangeStatus = useCallback(
    (value: PlannerItemStatusesEnum, setIsLoading?: (val: boolean) => void) => {
      if (task.current_user.status === PlannerItemStatusesEnum.backlog || !task.current_user.status) {
        onChangeStatus(task.id, value, true, setIsLoading);
        return;
      }

      if (value === PlannerItemStatusesEnum.backlog) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.confirmChangeStatusOnBacklog.title'),
            text: t('general.modals.confirmChangeStatusOnBacklog.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () =>
              Promise.resolve().then(() => onChangeStatus(task.id, value, true, setIsLoading)),
          },
        });
        return;
      }

      if (isEditor && task.users.length >= 2 && !isStarterPackage) {
        modalObserver.addModal(ModalNamesEnum.confirmWithTwoVariantModal, {
          props: {
            title: t('general.modals.confirmChangeStatusForAllUsersOrYourself.title'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: (is_common: boolean) =>
              Promise.resolve().then(() => onChangeStatus(task.id, value, is_common, setIsLoading)),
          },
        });
        return;
      }

      onChangeStatus(task.id, value, false, setIsLoading);
    },
    [task.current_user.status, task.users.length, task.id, isEditor, isStarterPackage, onChangeStatus, t],
  );

  // const handleChangeAssignUserStatus = useCallback(
  //   ({
  //     userStatus,
  //     userId,
  //     setIsShowChangeStatusLoader,
  //   }: {
  //     userStatus: PlannerItemStatusesEnum;
  //     userId: number;
  //     setIsShowChangeStatusLoader: (val: boolean) => void;
  //   }) => {
  //     modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
  //       props: {
  //         title: t('general.modals.confirmChangeStatusForAssignUser.title'),
  //         text: t('general.modals.confirmChangeStatusForAssignUser.text'),
  //         cancelBtnText: t('general.buttons.cancel'),
  //         confirmBtnText: t('general.buttons.confirm'),
  //         handleConfirm: () =>
  //           Promise.resolve()
  //             .then(() => setIsShowChangeStatusLoader(true))
  //             .then(() =>
  //               dispatch(changeStatusForAssignPeople({ taskId: task.id, status: userStatus, userId })).then(
  //                 (result) => {
  //                   if (changeStatusForAssignPeople.fulfilled.match(result)) {
  //                     NotificationService.success(t('general.notifications.taskUserStatusUpdated'));
  //                     modalObserver.updateModalProps(ModalNamesEnum.viewTaskModal, {
  //                       props: {
  //                         data: result.payload,
  //                       },
  //                     });
  //                     if (location.pathname === router.backlog.path) {
  //                       dispatch(updateBacklogItem(result.payload));
  //                     }
  //                   }
  //                 },
  //               ),
  //             )
  //             .finally(() => setIsShowChangeStatusLoader(false)),
  //       },
  //     });
  //   },
  //   [dispatch, t, task.id, location.pathname],
  // );
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
  return (
    <Box>
      <PlannerItemModalHeader
        title={task.title}
        onClose={onClose}
        tag={tags}
        isShowTag
        isShowPriority
        priority={task.priority}
        headerMenuList={menuList}
      />
      <Box sx={{ p: { xs: '0 16px', sm: '0 24px' }, overflowX: 'hidden', height: '100%' }}>
        <Box sx={{ mt: '24px' }}>
          <RowWithTitleContainer title="Status">
            <StatusesPopover selectedStatus={status} statusesMenu={statusesMenu}>
              <StatuesItem selectedStatus={status} />
            </StatusesPopover>
          </RowWithTitleContainer>
        </Box>
        {task.due_dated_at && (
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer title="Due by">
              <DateTimeView
                startDate={task.due_dated_at}
                startTime={task.due_dated_at}
                isAllDay={task.is_all_day_due_date}
                isLate={task.current_user.is_late}
                isShowReminder={!!task.notify_before}
                reminder={task.notify_before}
              />
            </RowWithTitleContainer>
          </Box>
        )}
        {task.started_at && (
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer
              alignItems="flexStart"
              titlePadding={isSmallDisplay ? '4px' : ' 0 '}
              title="When"
            >
              <DateTimeView
                startDate={task.started_at}
                startTime={task.started_at}
                finishDate={task.finished_at}
                finishTime={task.finished_at}
                isRange
                isShowRecurring={task.is_recurring}
                recurringPattern={task.recurring_pattern}
                isAllDay={task.is_all_day}
              />
            </RowWithTitleContainer>
          </Box>
        )}
        <Box sx={{ mt: '24px' }}>
          <RowWithTitleContainer title="For">
            <MuiAvatarGroup
              maxItemView={4}
              size="small"
              isShowAddUserBtn={false}
              isContainOwnerInUsers
              handleConfirmSharePopup={() => true}
              users={task.users}
              onClickShare={() => true}
              owner={task.owner}
            />
          </RowWithTitleContainer>
        </Box>
        {task.description && (
          <Box sx={{ mt: '40px' }}>
            <ViewDescriptionContainer description={task.description} />
          </Box>
        )}

        <Box sx={{ width: '100%', mt: '24px', paddingBottom: '150px' }}>
          <ViewTaskModalTabsContainer
            location={task.location}
            entityId={task.id}
            attachments={task.documents}
          />
        </Box>

        {isFooterButton && (
          <ModalFooter
            position="absolute"
            isBorderTop
            isShowBackGround
            middleBtnProps={{
              isShow: true,
              isLoadingBtn: true,
              loading: isDeclineLoading,
              label: t('general.buttons.decline'),
              variant: 'outlined',
              onClick: handleDecline,
              isStopPropagation: false,
              type: 'button',
            }}
            rightBtnProps={{
              isShow: true,
              isLoadingBtn: true,
              loading: isAcceptLoading,
              label: t('general.buttons.accept'),
              variant: 'contained',
              isStopPropagation: false,
              onClick: handleAccept,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default memo(MainView);
