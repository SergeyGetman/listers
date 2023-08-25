import React, { FC, memo, useCallback, useMemo } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TaskItemModel } from '../../../shared/models/tasks/taskItem.model';
import AdditionalInfo from '../../AdditionalInfo';
import MuiAvatarGroup from '../../avatars/MuiAvatarGroup';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import PlannerItemStatusesView from '../../plannerItemStatuses/PlannerItemStatusesView';
import { plannerItemStatusesConfig } from '../../../shared/configs/plannerItemStatuses.config';
import PaperActionMenu from '../../actionMenus/PaperActionMenu';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../shared/functions/typeGuardFormActionMenu';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import {
  PlannerItemAdditionalInfoContainer,
  PlannerItemContainer,
  PlannerItemMainContainer,
  PlannerItemTimeContainer,
  PlannerItemUsersContainer,
  PlannerStatusContainer,
  PlannerStatusContentBlock,
} from '../../../shared/styles/PlannerItemContainers';
import PlannerItemTimeBlock from '../../PlannerItemBlocks/PlannerItemTimeBlock';
import { ReactComponent as TaskIcon } from '../../../assets/Images/sidebar/roadmap.svg';
import PlannerItemMainBlock from '../../PlannerItemBlocks/PlannerItemMainBlock';
import { PlannerItemModelTypeEnum } from '../../../shared/enums/plannerItemModelType.enum';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import {
  archiveTask,
  changeTaskStatus,
  deleteTask,
  removeMyselfFromTask,
  updateUsersTask,
} from '../../../store/roadmap/roadmapThunk';
import {
  removePlannerListItem,
  updatePlannerListItemWithoutSplit,
} from '../../../store/planner/plannerSlice';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { choseRequestAction } from '../../../store/RightSidebar/Notifications/notificationsActions';
import { PackageEnum } from '../../../shared/enums/package.enum';
import { NotificationsActionsEnum } from '../../../shared/enums/notificationsEnum';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type PlannerTaskProps = {
  item: TaskItemModel;
  containerDate: string;
  handleOpenPlannerItem: (itemId: number, modelType: PlannerItemModelTypeEnum, isEdit?: boolean) => void;
};

const PlannerTask: FC<PlannerTaskProps> = ({ item, containerDate, handleOpenPlannerItem }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(({ profile }) => profile);
  const isStarterPackage = useMemo(() => {
    return (
      profileData?.data?.subscription?.package === PackageEnum.starter ||
      !profileData?.data?.subscription?.package
    );
  }, [profileData?.data?.subscription?.package]);

  const isUnread = useMemo(() => {
    return (
      item.current_user.is_unread_documents ||
      item.current_user.is_unread_comments ||
      item.current_user.is_unread_photos
    );
  }, [
    item.current_user.is_unread_documents,
    item.current_user.is_unread_comments,
    item.current_user.is_unread_photos,
  ]);

  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {});
  };

  const currentStatus = useMemo(() => {
    return item.current_user.status || item.global_status || PlannerItemStatusesEnum.todo;
  }, [item.current_user.status, item.global_status]);
  const status = useMemo(() => {
    return item.current_user.is_late && currentStatus !== PlannerItemStatusesEnum.done
      ? PlannerItemStatusesEnum.late
      : currentStatus;
  }, [currentStatus, item.current_user.is_late]);

  const isCreator = useMemo(() => {
    return item.current_user.role === AssignPeoplePermissionsEnum.creator;
  }, [item.current_user.role]);
  const isEditor = useMemo(() => {
    return item.current_user.role !== AssignPeoplePermissionsEnum.viewer;
  }, [item.current_user.role]);
  const isTabletDisplay = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const isBlur = useMemo(() => {
    return status === PlannerItemStatusesEnum.done;
  }, [status]);

  const onChangeStatus = useCallback(
    (taskId: number, statusValue: PlannerItemStatusesEnum, is_common?: boolean) => {
      return dispatch(changeTaskStatus({ taskId, status: statusValue, is_common })).then((result) => {
        if (changeTaskStatus.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.taskStatusUpdated'));
          dispatch(updatePlannerListItemWithoutSplit(result.payload));
        }
      });
    },
    [dispatch, t],
  );

  const handleChangeStatus = useCallback(
    (value: PlannerItemStatusesEnum) => {
      if (item.current_user.status === PlannerItemStatusesEnum.backlog || !item.current_user.status) {
        onChangeStatus(item.id, value, true);
        return;
      }

      if (value === PlannerItemStatusesEnum.backlog) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.confirmChangeStatusOnBacklog.title'),
            text: t('general.modals.confirmChangeStatusOnBacklog.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () => Promise.resolve().then(() => onChangeStatus(item.id, value, true)),
          },
        });

        return;
      }

      if (isEditor && item.users.length >= 2 && !isStarterPackage) {
        modalObserver.addModal(ModalNamesEnum.confirmWithTwoVariantModal, {
          props: {
            title: t('general.modals.confirmChangeStatusForAllUsersOrYourself.title'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: (is_common: boolean) =>
              Promise.resolve().then(() => onChangeStatus(item.id, value, is_common)),
          },
        });
        return;
      }

      onChangeStatus(item.id, value, false);
    },
    [isEditor, item.id, item.users.length, onChangeStatus, t, item.current_user.status, isStarterPackage],
  );

  const statusMenu = useMemo(() => {
    return [
      {
        item: plannerItemStatusesConfig.todo,
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.todo),
        isDisabled: false,
      },
      {
        item: plannerItemStatusesConfig.in_progress,
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.in_progress),
        isDisabled: false,
      },
      {
        item: plannerItemStatusesConfig.done,
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.done),
        isDisabled: false,
      },
    ];
  }, [handleChangeStatus]);

  const handleArchive = useCallback(() => {
    if (
      isCreator &&
      ((item.users.length >= 1 && !item.current_user.status) ||
        (item.users.length > 1 && item.current_user.status))
    ) {
      modalObserver.addModal(ModalNamesEnum.confirmWithTwoVariantModal, {
        props: {
          title: t('general.modals.confirmArchiveTask.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (is_full: boolean) =>
            Promise.resolve()
              .then(() => dispatch(archiveTask({ is_full: is_full, taskId: item.id })))
              .then((result) => {
                if (archiveTask.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.task,
                    }),
                  );

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
              .then(() => dispatch(archiveTask({ is_full: isCreator, taskId: item.id })))
              .then((result) => {
                if (archiveTask.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.task,
                    }),
                  );

                  NotificationService.success(t('general.notifications.archiveTask'));
                }
              }),
        },
      });
    }
  }, [t, dispatch, item.id, isCreator, item.current_user.status, item.users.length]);

  const handleRemoveYourselfFromTask = useCallback(() => {
    if (item?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.confirmRecurringModal.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(removeMyselfFromTask({ taskId: item.id, confirmation_status })).then((result) => {
                if (removeMyselfFromTask.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.task,
                    }),
                  );
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
              dispatch(removeMyselfFromTask({ taskId: item.id })).then((result) => {
                if (removeMyselfFromTask.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.task,
                    }),
                  );
                  NotificationService.success(t('general.notifications.removeFromTask'));
                }
              }),
            ),
        },
      });
    }
  }, [t, dispatch, item.id, item?.is_recurring]);

  const handleDeleteTask = useCallback(() => {
    if (item?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.deleteRecurringItemModal.text', {
            type: t('general.task'),
          }),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(deleteTask({ taskId: item.id, confirmation_status })).then((result) => {
                if (deleteTask.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.task,
                    }),
                  );

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
              dispatch(deleteTask({ taskId: item.id })).then((result) => {
                if (deleteTask.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.task,
                    }),
                  );

                  NotificationService.success(t('general.notifications.taskDeleted'));
                }
              }),
            ),
        },
      });
    }
  }, [t, dispatch, item.id, item?.is_recurring]);

  const handleAccept = useCallback(() => {
    dispatch(
      choseRequestAction({ action: NotificationsActionsEnum.accept, id: item?.user_notifications?.id }),
    ).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        onChangeStatus(item?.id, PlannerItemStatusesEnum.todo, false);
      }
    });
  }, [onChangeStatus, item.id, item?.user_notifications?.id, dispatch]);

  const handleDecline = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.confirmDeclineModal, {
      props: {
        entityId: item?.id,
        title: t('general.modals.confirmDeclineTaskModal.title'),
        description1: t('general.modals.confirmDeclineTaskModal.description1'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(choseRequestAction({ action: 'decline', id: item?.user_notifications?.id })).then(
            (result) => {
              if (choseRequestAction.fulfilled.match(result)) {
                dispatch(
                  removePlannerListItem({
                    id: item?.id,
                    modelType: PlannerItemModelTypeEnum.task,
                  }),
                );
                NotificationService.success(t('general.notifications.removeFromTask'));
              }
            },
          );
        },
      },
    });
  }, [t, item.id, item?.user_notifications?.id, dispatch]);

  const menuList: ActionMenuListModel = useMemo(() => {
    if (!!item?.user_notifications) {
      return [
        {
          label: t('general.actionMenus.view'),
          callback: () => handleOpenPlannerItem(item.id, item.model_type),
          isDisabled: false,
        },
        {
          label: t('general.actionMenus.accept'),
          callback: () => {
            handleAccept();
          },
          isDisabled: false,
        },
        {
          label: t('general.actionMenus.decline'),
          callback: () => {
            handleDecline();
          },
          isDisabled: false,
        },
      ].filter(typeGuardFormActionMenu);
    }
    return [
      {
        label: t('general.actionMenus.view'),
        callback: () => handleOpenPlannerItem(item.id, item.model_type),
        isDisabled: false,
      },

      isEditor && {
        label: t('general.actionMenus.edit'),
        callback: () => handleOpenPlannerItem(item.id, item.model_type, true),
        tooltipTitle: 'Upgrade',
        disableCallback: handleOpenUpgradePackageModal,
        isDisabled: isStarterPackage,
      },
      {
        label: t('general.actionMenus.archive'),
        callback: () => handleArchive(),
        tooltipTitle: 'Upgrade',
        disableCallback: handleOpenUpgradePackageModal,
        isDisabled: isStarterPackage,
      },
      !isCreator && {
        label: t('general.actionMenus.removeYourself'),
        callback: () => handleRemoveYourselfFromTask(),
      },
      isCreator && {
        label: t('general.actionMenus.deleteTask'),
        callback: () => handleDeleteTask(),
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [
    handleArchive,
    handleAccept,
    handleDecline,
    handleRemoveYourselfFromTask,
    handleDeleteTask,
    item.id,
    item.user_notifications,
    item.model_type,
    handleOpenPlannerItem,
    isCreator,
    isEditor,
    isStarterPackage,
    t,
  ]);

  const handleOpenShareModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.shareModal, {
      props: {
        users: item?.users,
        owner: item?.owner,
        disableRemoveYourself: false,
        title: `Share "${item?.title}" task`,
        handleConfirm: (users: AssignPeopleSelectValueModel[]) =>
          Promise.resolve().then(() =>
            dispatch(updateUsersTask({ users, taskId: item.id })).then((result) => {
              if (updateUsersTask.fulfilled.match(result)) {
                if (!!result.payload.current_user.status) {
                  dispatch(updatePlannerListItemWithoutSplit(result.payload));
                } else {
                  dispatch(
                    removePlannerListItem({
                      modelType: PlannerItemModelTypeEnum.task,
                      id: result.payload.id,
                    }),
                  );
                }
                NotificationService.success(t('general.notifications.taskUpdated'));
              }
            }),
          ),
      },
    });
  }, [dispatch, item?.id, item?.owner, item?.title, item?.users, t]);

  return (
    <PlannerItemContainer
      isPending={!!item?.user_notifications}
      isUnread={isUnread}
      onClick={() => handleOpenPlannerItem(item.id, item.model_type)}
      isBlur={isBlur}
    >
      <PlannerItemTimeContainer>
        <PlannerItemTimeBlock
          containerDate={containerDate}
          isAllDay={item.is_all_day}
          statedAt={item.started_at || ''}
          finishedAt={item.finished_at || ''}
        />
      </PlannerItemTimeContainer>
      <PlannerItemMainContainer>
        <PlannerItemMainBlock
          status={status}
          statusMenu={statusMenu}
          currentStatus={currentStatus}
          icon={<TaskIcon />}
          iconColor={theme.palette.case.main.purple.high}
          dueDate={item.due_dated_at || ''}
          isLate={item.current_user.is_late}
          title={item.title}
          isAllDay={item.is_all_day}
          description={item.description}
          priority={item.priority}
          isShowDueDate
          isShowPriority
          isRecurring={item.is_recurring}
          containerDate={containerDate}
          isMobileDisplay={isMobileDisplay}
          site={item?.site}
          location={item?.location?.map}
          address={item?.location?.address}
        />
      </PlannerItemMainContainer>
      <PlannerItemAdditionalInfoContainer>
        <AdditionalInfo
          document_count={item.document_count}
          is_unread_documents={item.current_user.is_unread_documents}
          photo_count={item.photo_count}
          comment_count={item.comment_count}
          is_unread_comments={item.current_user.is_unread_comments}
          is_unread_photos={item.current_user.is_unread_photos}
        />
      </PlannerItemAdditionalInfoContainer>
      <PlannerItemUsersContainer>
        <MuiAvatarGroup
          onClickShare={() => handleOpenShareModal()}
          isShowAddUserBtn={isEditor && !isStarterPackage}
          isContainOwnerInUsers={false}
          users={item?.users}
          owner={item.owner}
        />
      </PlannerItemUsersContainer>
      <PlannerStatusContainer>
        <PlannerStatusContentBlock>
          <Box sx={{ width: 2 }} />
          <PaperActionMenu menuList={statusMenu} activeItem={currentStatus}>
            <Box
              sx={{
                mr: '40%',
              }}
            >
              <PlannerItemStatusesView size={isTabletDisplay ? 'small' : 'large'} variant={status} />
            </Box>
          </PaperActionMenu>
          {!isMobileDisplay && <BaseActionMenu iconSize="medium" menuList={menuList || []} />}
        </PlannerStatusContentBlock>
      </PlannerStatusContainer>
    </PlannerItemContainer>
  );
};

export default memo(PlannerTask);
