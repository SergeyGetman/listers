import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { TaskItemModel } from '../../../../../shared/models/tasks/taskItem.model';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import MainView from '../MainView';
import MainEdit from '../MainEdit';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../../../shared/functions/typeGuardFormActionMenu';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import {
  archiveTask,
  changeTaskStatus,
  deleteTask,
  removeMyselfFromTask,
  unArchiveTask,
} from '../../../../../store/roadmap/roadmapThunk';
import { removeBacklogItem } from '../../../../../store/backlog/backlogSlice';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import router from '../../../../../shared/services/router';
import { removeRoadmapItem } from '../../../../../store/roadmap/roadmapSlice';
import { removeArchiveItem } from '../../../../../store/archive/archiveSlice';
import {
  removeCalendarItem,
  setUserNotificationCalendarItem,
} from '../../../../../store/calendar/calendarSlice';
import {
  removePlannerListItem,
  updatePlannerListItemWithoutSplit,
} from '../../../../../store/planner/plannerSlice';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import { choseRequestAction } from '../../../../../store/RightSidebar/Notifications/notificationsActions';
import { NotificationsActionsEnum } from '../../../../../shared/enums/notificationsEnum';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type ViewTaskModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  task: TaskItemModel;
  setIsShowUnsavedDataModal: (val: boolean) => void;
  isShowUnsavedDataModal: boolean;
};

const ViewTaskModalContainer: FC<ViewTaskModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
  isShowUnsavedDataModal,
  task,
}) => {
  const dispatch = useAppDispatch();
  const isEditor = useMemo(() => {
    return (
      task.current_user.role === AssignPeoplePermissionsEnum.editor ||
      task.current_user.role === AssignPeoplePermissionsEnum.creator
    );
  }, [task.current_user.role]);
  const [userNotifications, setUserNotifications] = useState<boolean>(!!task.user_notifications);
  const [isEditView, setIsEditView] = useState<boolean>(isEditor && !userNotifications);
  const [isAcceptLoading, setIsAcceptLoading] = useState<boolean>(false);
  const [isDeclineLoading, setIsDeclineLoading] = useState<boolean>(false);

  const location = useLocation();

  const { t } = useTranslation();

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

  const isCreator = useMemo(() => {
    return task.current_user.role === AssignPeoplePermissionsEnum.creator;
  }, [task.current_user.role]);
  const isArchive = useMemo(() => {
    return task.is_archive || task.current_user.is_archive;
  }, [task.is_archive, task.current_user.is_archive]);
  const isGlobalArchive = useMemo(() => {
    return task.is_archive;
  }, [task.is_archive]);

  const isShowUnArchiveBtn = (!isCreator && !isGlobalArchive && isArchive) || (isCreator && isArchive);

  const removeTaskFromPage = useCallback(
    (taskId: number) => {
      if (location.pathname === router.backlog.path) {
        dispatch(removeBacklogItem(taskId));
      } else if (location.pathname === router.roadmap.path) {
        dispatch(removeRoadmapItem(taskId));
      } else if (location.pathname === router.calendar.path) {
        dispatch(removeCalendarItem(taskId));
      } else if (location.pathname === `${router.settings.path}/${router.settings.children.archive.path}`) {
        dispatch(removeArchiveItem(taskId));
      } else if (location.pathname === router.journal.path) {
        dispatch(
          removePlannerListItem({
            id: taskId,
            modelType: PlannerItemModelTypeEnum.task,
          }),
        );
      }
    },
    [location.pathname, dispatch],
  );

  const handleDeleteTask = useCallback(() => {
    if (task?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.deleteRecurringItemModal.text', {
            type: t('general.task'),
          }),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(deleteTask({ taskId: task?.id, confirmation_status })).then((result) => {
                if (deleteTask.fulfilled.match(result)) {
                  removeTaskFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.taskDeleted'));
                }
              }),
            ),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.deleteTask.title'),
          text: t('general.modals.deleteTask.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve().then(() =>
              dispatch(deleteTask({ taskId: task?.id })).then((result) => {
                if (deleteTask.fulfilled.match(result)) {
                  removeTaskFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.taskDeleted'));
                }
              }),
            ),
        },
      });
    }
  }, [t, removeTaskFromPage, dispatch, onClose, task?.id, task?.is_recurring]);

  const handleRemoveYourselfFromTask = useCallback(() => {
    if (task?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.confirmRecurringModal.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(removeMyselfFromTask({ taskId: task?.id, confirmation_status })).then((result) => {
                if (removeMyselfFromTask.fulfilled.match(result)) {
                  removeTaskFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.removeFromTask'));
                }
              }),
            ),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.removeYourselfFromTask.title'),
          text: t('general.modals.removeYourselfFromTask.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve().then(() =>
              dispatch(removeMyselfFromTask({ taskId: task?.id })).then((result) => {
                if (removeMyselfFromTask.fulfilled.match(result)) {
                  removeTaskFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.removeFromTask'));
                }
              }),
            ),
        },
      });
    }
  }, [t, removeTaskFromPage, dispatch, onClose, task?.id, task?.is_recurring]);

  const handleArchive = useCallback(() => {
    if (
      isCreator &&
      ((task?.users.length >= 1 && !task?.current_user.status) ||
        (task?.users.length > 1 && task?.current_user.status))
    ) {
      modalObserver.addModal(ModalNamesEnum.confirmWithTwoVariantModal, {
        props: {
          title: t('general.modals.confirmArchiveTask.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (is_full: boolean) =>
            Promise.resolve()
              .then(() => dispatch(archiveTask({ is_full: is_full, taskId: task?.id })))
              .then((result) => {
                if (archiveTask.fulfilled.match(result)) {
                  removeTaskFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.archiveTask'));
                }
              }),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmArchiveTask.title'),
          text: t('general.modals.confirmArchiveTask.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve()
              .then(() => dispatch(archiveTask({ is_full: isCreator, taskId: task?.id })))
              .then((result) => {
                if (archiveTask.fulfilled.match(result)) {
                  removeTaskFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.archiveTask'));
                }
              }),
        },
      });
    }
  }, [
    t,
    dispatch,
    onClose,
    task?.id,
    isCreator,
    task.current_user.status,
    task.users.length,
    removeTaskFromPage,
  ]);

  const handleUnArchive = useCallback(() => {
    if (isCreator && isGlobalArchive) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmUnArchiveTask.title'),
          text: t('general.modals.confirmUnArchiveTask.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve()
              .then(() => dispatch(unArchiveTask({ is_full: true, taskId: task?.id })))
              .then((result) => {
                if (unArchiveTask.fulfilled.match(result)) {
                  dispatch(removeArchiveItem(result.payload));
                }
                onClose();
                NotificationService.success(t('general.notifications.unArchiveTask'));
              }),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmUnArchiveTask.title'),
          text: t('general.modals.confirmUnArchiveTask.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve()
              .then(() => dispatch(unArchiveTask({ is_full: false, taskId: task?.id })))
              .then((result) => {
                if (unArchiveTask.fulfilled.match(result)) {
                  dispatch(removeArchiveItem(result.payload));
                }
                onClose();
                NotificationService.success(t('general.notifications.unArchiveTask'));
              }),
        },
      });
    }
  }, [t, dispatch, onClose, task?.id, isCreator, isGlobalArchive]);

  const handleChangeMainView = useCallback((val: boolean) => {
    setIsEditView(val);
  }, []);

  const menuList: ActionMenuListModel = useMemo(() => {
    return [
      isShowUnArchiveBtn && {
        label: t('general.actionMenus.unArchive'),
        callback: () => handleUnArchive(),
        tooltipTitle: 'Upgrade',
        disableCallback: handleOpenUpgradePackageModal,
        isDisabled: isStarterPackage,
      },
      !isArchive && {
        label: t('general.actionMenus.archive'),
        callback: () => handleArchive(),
        tooltipTitle: 'Upgrade',
        disableCallback: handleOpenUpgradePackageModal,
        isDisabled: isStarterPackage,
      },
      !isCreator && {
        label: t('general.actionMenus.removeYourself'),
        callback: () => handleRemoveYourselfFromTask(),
        isDisabled: false,
      },
      isCreator && {
        label: t('general.actionMenus.deleteTask'),
        callback: () => handleDeleteTask(),
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [
    t,
    handleDeleteTask,
    handleRemoveYourselfFromTask,
    handleArchive,
    handleUnArchive,
    isArchive,
    isCreator,
    isShowUnArchiveBtn,
    isStarterPackage,
  ]);

  const handleAccept = useCallback(() => {
    setIsAcceptLoading(true);
    dispatch(
      choseRequestAction({ action: NotificationsActionsEnum.accept, id: task?.user_notifications?.id }),
    ).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        dispatch(
          changeTaskStatus({
            taskId: task?.id,
            status:
              task.global_status === PlannerItemStatusesEnum.backlog
                ? PlannerItemStatusesEnum.backlog
                : PlannerItemStatusesEnum.todo,
            is_common: task.global_status === PlannerItemStatusesEnum.backlog ? true : false,
          }),
        ).then((res) => {
          if (changeTaskStatus.fulfilled.match(res)) {
            if (location.pathname === router.journal.path) {
              dispatch(updatePlannerListItemWithoutSplit(res.payload));
            }

            if (location.pathname === router.calendar.path) {
              dispatch(setUserNotificationCalendarItem({ id: res.payload.id, isStarterPackage }));
            }
          }
        });

        NotificationService.success(t('general.notifications.taskStatusUpdated'));

        setUserNotifications(false);
      }
      setIsAcceptLoading(false);
    });
  }, [
    t,
    task?.global_status,
    task?.user_notifications?.id,
    task?.id,
    dispatch,
    isStarterPackage,
    location.pathname,
  ]);

  const handleDecline = useCallback(() => {
    setIsDeclineLoading(true);

    modalObserver.addModal(ModalNamesEnum.confirmDeclineModal, {
      props: {
        entityId: task?.id,
        title: t('general.modals.confirmDeclineTaskModal.title'),
        description1: t('general.modals.confirmDeclineTaskModal.description1'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(
            choseRequestAction({
              action: NotificationsActionsEnum.decline,
              id: task?.user_notifications?.id,
            }),
          ).then((result) => {
            if (choseRequestAction.fulfilled.match(result)) {
              if (location.pathname === router.journal.path) {
                dispatch(
                  removePlannerListItem({
                    id: task?.id,
                    modelType: PlannerItemModelTypeEnum.task,
                  }),
                );
              }

              if (location.pathname === router.calendar.path) {
                dispatch(removeCalendarItem(task?.id));
              }
              NotificationService.success(t('general.notifications.removeFromTask'));
              onClose();
            }
            setIsDeclineLoading(false);
          });
        },
      },
    });
  }, [onClose, t, task.id, task?.user_notifications?.id, dispatch, location.pathname]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isEditView ? (
        <MainEdit
          setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
          onClose={onClose}
          task={task}
          isShowUnsavedDataModal={isShowUnsavedDataModal}
          currentUserId={profileData?.data?.id}
          menuList={menuList}
          handleChangeMainView={handleChangeMainView}
        />
      ) : (
        <MainView
          isStarterPackage={isStarterPackage}
          isArchive={isArchive}
          task={task}
          menuList={menuList}
          onClose={onClose}
          isEditor={isEditor}
          setUserNotifications={setUserNotifications}
          isFooterButton={userNotifications}
          handleAccept={handleAccept}
          isAcceptLoading={isAcceptLoading}
          isDeclineLoading={isDeclineLoading}
          handleDecline={handleDecline}
        />
      )}
    </Box>
  );
};

export default memo(ViewTaskModalContainer);
