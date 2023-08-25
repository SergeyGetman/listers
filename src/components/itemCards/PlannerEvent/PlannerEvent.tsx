import React, { FC, memo, useCallback, useMemo } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';
import { plannerItemStatusesConfig } from '../../../shared/configs/plannerItemStatuses.config';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../shared/functions/typeGuardFormActionMenu';
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
import AdditionalInfo from '../../AdditionalInfo';
import MuiAvatarGroup from '../../avatars/MuiAvatarGroup';
import PaperActionMenu from '../../actionMenus/PaperActionMenu';
import PlannerItemStatusesView from '../../plannerItemStatuses/PlannerItemStatusesView';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import { outOfDate } from '../../../shared/functions/outOfCurrentDate';
import { ReactComponent as EventIcon } from '../../../assets/Images/sidebar/events.svg';
import PlannerItemMainBlock from '../../PlannerItemBlocks/PlannerItemMainBlock';
import { PlannerItemModelTypeEnum } from '../../../shared/enums/plannerItemModelType.enum';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import {
  archiveEvent,
  changeEventStatus,
  deleteEvent,
  removeMyselfFromEvent,
  updateUsersEvent,
} from '../../../store/events/eventsThunk';

import {
  removePlannerListItem,
  updatePlannerListItemWithoutSplit,
} from '../../../store/planner/plannerSlice';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { EventItemModel } from '../../../shared/models/event/eventItem.model';
import { PackageEnum } from '../../../shared/enums/package.enum';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type PlannerEventProps = {
  item: EventItemModel;
  containerDate: string;
  handleOpenPlannerItem: (itemId: number, modelType: PlannerItemModelTypeEnum, isEditMode?: boolean) => void;
};
const PlannerEvent: FC<PlannerEventProps> = ({ item, containerDate, handleOpenPlannerItem }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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

  const isOutOfCurrentDate = useMemo(() => {
    return outOfDate(item.finished_at || '');
  }, [item.finished_at]);

  const currentTimeIsBeforeStartFinish = useMemo(() => {
    return (
      Moment().isBetween(
        Moment.utc(item.started_at, 'YYYY-MM-DD HH:mm:ss').local(),
        Moment.utc(item.finished_at, 'YYYY-MM-DD HH:mm:ss').local(),
      ) && item.current_user.status !== PlannerItemStatusesEnum.not_going
    );
  }, [item.current_user.status, item.started_at, item.finished_at]);

  const status = useMemo(() => {
    return currentTimeIsBeforeStartFinish
      ? PlannerItemStatusesEnum.in_progress
      : item.current_user.status || PlannerItemStatusesEnum.pending;
  }, [item.current_user.status, currentTimeIsBeforeStartFinish]);
  const isBlur = useMemo(() => {
    return (
      status !== PlannerItemStatusesEnum.missed &&
      status !== PlannerItemStatusesEnum.in_progress &&
      isOutOfCurrentDate
    );
  }, [status, isOutOfCurrentDate]);

  const isCreator = useMemo(() => {
    return item.current_user.role === AssignPeoplePermissionsEnum.creator;
  }, [item.current_user.role]);
  const isEditor = useMemo(() => {
    return item.current_user.role !== AssignPeoplePermissionsEnum.viewer;
  }, [item.current_user.role]);
  const isTabletDisplay = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangeStatus = useCallback(
    (selectedStatus: PlannerItemStatusesEnum) => {
      if (item.is_recurring) {
        modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
          props: {
            title: t('general.modals.confirmRecurringModal.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: (confirmation_status: string) =>
              Promise.resolve().then(() =>
                dispatch(
                  changeEventStatus({ eventId: item.id, status: selectedStatus, confirmation_status }),
                ).then((result) => {
                  if (changeEventStatus.fulfilled.match(result)) {
                    NotificationService.success(t('general.notifications.eventStatusUpdated'));

                    dispatch(updatePlannerListItemWithoutSplit(result.payload));
                  }
                }),
              ),
          },
        });
      } else {
        dispatch(changeEventStatus({ eventId: item.id, status: selectedStatus })).then((result) => {
          if (changeEventStatus.fulfilled.match(result)) {
            NotificationService.success(t('general.notifications.eventStatusUpdated'));
            dispatch(updatePlannerListItemWithoutSplit(result.payload));
          }
        });
      }
    },
    [dispatch, t, item.id, item.is_recurring],
  );

  const isOutOfDateStatusMenu = useMemo(() => {
    return [
      {
        item: plannerItemStatusesConfig.missed,
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.missed),
        isDisabled: false,
      },
      {
        item: plannerItemStatusesConfig.went,
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.went),
        isDisabled: false,
      },
      {
        item: plannerItemStatusesConfig.not_going,
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.not_going),
        isDisabled: false,
      },
    ];
  }, [handleChangeStatus]);

  const statusMenu = useMemo(() => {
    return [
      {
        item: plannerItemStatusesConfig.going,
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.going),
        isDisabled: false,
      },
      {
        item: plannerItemStatusesConfig.maybe,
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.maybe),
        isDisabled: false,
      },
      {
        item: plannerItemStatusesConfig.not_going,
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.not_going),
        isDisabled: false,
      },
    ];
  }, [handleChangeStatus]);

  const handleDeleteEvent = useCallback(() => {
    if (item?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.deleteRecurringItemModal.text', {
            type: t('general.event'),
          }),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(deleteEvent({ eventId: item.id, confirmation_status })).then((result) => {
                if (deleteEvent.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.event,
                    }),
                  );

                  NotificationService.success(t('general.notifications.eventDeleted'));
                }
              }),
            ),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.deleteEvent.title'),
          text: t('general.modals.deleteEvent.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve().then(() =>
              dispatch(deleteEvent({ eventId: item.id })).then((result) => {
                if (deleteEvent.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.event,
                    }),
                  );

                  NotificationService.success(t('general.notifications.eventDeleted'));
                }
              }),
            ),
        },
      });
    }
  }, [t, dispatch, item.id, item?.is_recurring]);

  const handleRemoveYourselfFromEvent = useCallback(() => {
    if (item?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.confirmRecurringModal.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(removeMyselfFromEvent({ eventId: item.id, confirmation_status })).then((result) => {
                if (removeMyselfFromEvent.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.event,
                    }),
                  );

                  NotificationService.success(t('general.notifications.removeFromEvent'));
                }
              }),
            ),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.removeYourselfFromEvent.title'),
          text: t('general.modals.removeYourselfFromEvent.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve().then(() =>
              dispatch(removeMyselfFromEvent({ eventId: item.id })).then((result) => {
                if (removeMyselfFromEvent.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.event,
                    }),
                  );

                  NotificationService.success(t('general.notifications.removeFromEvent'));
                }
              }),
            ),
        },
      });
    }
  }, [t, dispatch, item.id, item?.is_recurring]);

  const handleArchive = useCallback(() => {
    if (isCreator && item.users.length >= 1 && item.current_user.status) {
      modalObserver.addModal(ModalNamesEnum.confirmWithTwoVariantModal, {
        props: {
          title: t('general.modals.confirmArchiveEvent.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (is_full: boolean) =>
            Promise.resolve()
              .then(() => dispatch(archiveEvent({ is_full: is_full, eventId: item.id })))
              .then((result) => {
                if (archiveEvent.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.event,
                    }),
                  );

                  NotificationService.success(t('general.notifications.archiveEvent'));
                }
              }),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmArchiveEvent.title'),
          text: t('general.modals.confirmArchiveEvent.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve()
              .then(() => dispatch(archiveEvent({ is_full: isCreator, eventId: item.id })))
              .then((result) => {
                if (archiveEvent.fulfilled.match(result)) {
                  dispatch(
                    removePlannerListItem({
                      id: result.payload,
                      modelType: PlannerItemModelTypeEnum.event,
                    }),
                  );

                  NotificationService.success(t('general.notifications.archiveEvent'));
                }
              }),
        },
      });
    }
  }, [t, dispatch, item.id, isCreator, item.current_user.status, item.users.length]);

  const handleAccept = useCallback(() => {
    dispatch(changeEventStatus({ eventId: item?.id, status: PlannerItemStatusesEnum.going })).then((res) => {
      if (changeEventStatus.fulfilled.match(res)) {
        NotificationService.success(t('general.notifications.eventStatusUpdated'));
        dispatch(updatePlannerListItemWithoutSplit(res.payload));
      }
    });
  }, [t, item.id, dispatch]);

  const handleDecline = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.confirmDeclineModal, {
      props: {
        entityId: item?.id,
        title: t('general.modals.confirmDeclineEventModal.title'),
        description1: t('general.modals.confirmDeclineEventModal.description1'),
        description2: t('general.modals.confirmDeclineEventModal.description2'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(changeEventStatus({ eventId: item?.id, status: PlannerItemStatusesEnum.not_going })).then(
            (res) => {
              if (changeEventStatus.fulfilled.match(res)) {
                NotificationService.success(t('general.notifications.eventStatusUpdated'));
                dispatch(updatePlannerListItemWithoutSplit(res.payload));
              }
            },
          );
        },
      },
    });
  }, [t, item.id, dispatch]);

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
        callback: () => handleRemoveYourselfFromEvent(),
        isDisabled: false,
      },
      isCreator && {
        label: t('general.actionMenus.deleteEvent'),
        callback: () => handleDeleteEvent(),
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [
    isStarterPackage,
    isCreator,
    t,
    handleOpenPlannerItem,
    handleAccept,
    handleDecline,
    handleArchive,
    handleRemoveYourselfFromEvent,
    handleDeleteEvent,
    item.id,
    item.user_notifications,
    isEditor,
    item.model_type,
  ]);

  const handleOpenShareModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.shareModal, {
      props: {
        users: item?.users,
        owner: item?.owner,
        title: `Share "${item?.title}" event`,
        handleConfirm: (users: AssignPeopleSelectValueModel[]) =>
          Promise.resolve().then(() =>
            dispatch(updateUsersEvent({ users, eventId: item.id })).then((result) => {
              if (updateUsersEvent.fulfilled.match(result)) {
                dispatch(updatePlannerListItemWithoutSplit(result.payload));
                NotificationService.success(t('general.notifications.eventUpdated'));
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
          iconColor={theme.palette.case.warning.middle}
          statusMenu={isOutOfCurrentDate ? isOutOfDateStatusMenu : statusMenu}
          currentStatus={status}
          icon={<EventIcon />}
          title={item.title}
          description={item.description}
          isMobileDisplay={isMobileDisplay}
          isRecurring={item.is_recurring}
          site={item?.site}
          location={item?.location?.map}
          phone={item?.phone}
          modelType={item?.model_type}
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
          <PaperActionMenu
            menuList={isOutOfCurrentDate ? isOutOfDateStatusMenu : statusMenu}
            activeItem={status}
          >
            <Box
              sx={{
                mr: '40%',
                '&:hover': {
                  opacity: '0.7',
                },
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

export default memo(PlannerEvent);
