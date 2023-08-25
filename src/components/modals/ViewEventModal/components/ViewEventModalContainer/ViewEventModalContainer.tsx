import React, { FC, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { EventItemModel } from '../../../../../shared/models/event/eventItem.model';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../../../shared/functions/typeGuardFormActionMenu';
import MainEventView from '../MainEventView';
import MainEventEdit from '../MainEventEdit';
import router from '../../../../../shared/services/router';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import {
  archiveEvent,
  changeEventStatus,
  deleteEvent,
  removeMyselfFromEvent,
  unArchiveEvent,
} from '../../../../../store/events/eventsThunk';
import { removeEventItem } from '../../../../../store/events/eventsSlice';
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
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import { choseRequestAction } from '../../../../../store/RightSidebar/Notifications/notificationsActions';
import { NotificationsActionsEnum } from '../../../../../shared/enums/notificationsEnum';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';

type ViewEventModalContainerProps = {
  onClose: (isForceClose?: boolean) => void;
  event: EventItemModel;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};
const ViewEventModalContainer: FC<ViewEventModalContainerProps> = ({
  onClose,
  event,
  setIsShowUnsavedDataModal,
}) => {
  const dispatch = useAppDispatch();
  const isEditor = useMemo(() => {
    return (
      event.current_user.role === AssignPeoplePermissionsEnum.editor ||
      event.current_user.role === AssignPeoplePermissionsEnum.creator
    );
  }, [event.current_user.role]);
  const [isAcceptLoading, setIsAcceptLoading] = useState<boolean>(false);
  const [isDeclineLoading, setIsDeclineLoading] = useState<boolean>(false);
  const [userNotifications, setUserNotifications] = useState<boolean>(!!event.user_notifications);
  const [isEditView] = useState<boolean>(isEditor);

  const location = useLocation();
  const { t } = useTranslation();

  const isCreator = useMemo(() => {
    return event.current_user.role === AssignPeoplePermissionsEnum.creator;
  }, [event.current_user.role]);
  const isArchive = useMemo(() => {
    return event.is_archive || event.current_user.is_archive;
  }, [event.is_archive, event.current_user.is_archive]);
  const isGlobalArchive = useMemo(() => {
    return event.is_archive;
  }, [event.is_archive]);

  const isShowUnArchiveBtn = useMemo(() => {
    return (!isCreator && !isGlobalArchive && isArchive) || (isCreator && isArchive);
  }, [isCreator, isGlobalArchive, isArchive]);

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

  const removeEventFromPage = useCallback(
    (eventId: number) => {
      if (location.pathname === router.events.path) {
        dispatch(removeEventItem(eventId));
      } else if (location.pathname === router.calendar.path) {
        dispatch(removeCalendarItem(eventId));
      } else if (location.pathname === `${router.settings.path}/${router.settings.children.archive.path}`) {
        dispatch(removeArchiveItem(eventId));
      } else if (location.pathname === router.journal.path) {
        dispatch(
          removePlannerListItem({
            id: eventId,
            modelType: PlannerItemModelTypeEnum.event,
          }),
        );
      }
    },
    [location.pathname, dispatch],
  );

  const handleDeleteEvent = useCallback(() => {
    if (event?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.deleteRecurringItemModal.text', {
            type: t('general.event'),
          }),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(deleteEvent({ eventId: event.id, confirmation_status })).then((result) => {
                if (deleteEvent.fulfilled.match(result)) {
                  removeEventFromPage(result.payload);
                  onClose();
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
              dispatch(deleteEvent({ eventId: event.id })).then((result) => {
                if (deleteEvent.fulfilled.match(result)) {
                  removeEventFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.eventDeleted'));
                }
              }),
            ),
        },
      });
    }
  }, [t, removeEventFromPage, dispatch, onClose, event.id, event?.is_recurring]);

  const handleChangeEventStatus = useCallback(
    ({ eventId, status }: { eventId: number; status: PlannerItemStatusesEnum }) => {
      dispatch(changeEventStatus({ eventId, status })).then((res) => {
        if (changeEventStatus.fulfilled.match(res)) {
          modalObserver.updateModalProps(ModalNamesEnum.viewEventModal, {
            props: {
              data: res.payload,
            },
          });
          if (location.pathname === router.journal.path) {
            dispatch(updatePlannerListItemWithoutSplit(res.payload));
          }

          if (location.pathname === router.calendar.path) {
            dispatch(setUserNotificationCalendarItem({ id: res.payload.id, isStarterPackage }));
          }

          NotificationService.success(t('general.notifications.eventStatusUpdated'));

          setUserNotifications(false);
        }
        setIsAcceptLoading(false);
      });
    },
    [t, dispatch, isStarterPackage, location.pathname],
  );

  const handleAccept = useCallback(() => {
    setIsAcceptLoading(true);
    handleChangeEventStatus({ eventId: event?.id, status: PlannerItemStatusesEnum.going });
  }, [event?.id, handleChangeEventStatus]);

  const handleDecline = useCallback(() => {
    setIsDeclineLoading(true);

    modalObserver.addModal(ModalNamesEnum.confirmDeclineModal, {
      props: {
        entityId: event?.id,
        title: t('general.modals.confirmDeclineEventModal.title'),
        description1: t('general.modals.confirmDeclineEventModal.description1'),
        description2: t('general.modals.confirmDeclineEventModal.description2'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(
            choseRequestAction({
              action: NotificationsActionsEnum.notGoing,
              id: event?.user_notifications?.id,
            }),
          ).then((result) => {
            if (choseRequestAction.fulfilled.match(result)) {
              handleChangeEventStatus({ eventId: event?.id, status: PlannerItemStatusesEnum.not_going });
              onClose();
            }
            setIsDeclineLoading(false);
          });
        },
      },
    });
  }, [onClose, handleChangeEventStatus, t, event.id, event?.user_notifications?.id, dispatch]);

  const handleRemoveYourselfFromEvent = useCallback(() => {
    if (event?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.confirmRecurringModal.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(removeMyselfFromEvent({ eventId: event.id, confirmation_status })).then((result) => {
                if (removeMyselfFromEvent.fulfilled.match(result)) {
                  removeEventFromPage(result.payload);
                  onClose();
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
              dispatch(removeMyselfFromEvent({ eventId: event.id })).then((result) => {
                if (removeMyselfFromEvent.fulfilled.match(result)) {
                  removeEventFromPage(result.payload);

                  onClose();
                  NotificationService.success(t('general.notifications.removeFromEvent'));
                }
              }),
            ),
        },
      });
    }
  }, [t, removeEventFromPage, dispatch, onClose, event.id, event?.is_recurring]);

  const handleArchive = useCallback(() => {
    if (isCreator && event.users.length >= 1 && event.current_user.status) {
      modalObserver.addModal(ModalNamesEnum.confirmWithTwoVariantModal, {
        props: {
          title: t('general.modals.confirmArchiveEvent.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (is_full: boolean) =>
            Promise.resolve()
              .then(() => dispatch(archiveEvent({ is_full: is_full, eventId: event.id })))
              .then((result) => {
                if (archiveEvent.fulfilled.match(result)) {
                  removeEventFromPage(result.payload);
                  onClose();
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
              .then(() => dispatch(archiveEvent({ is_full: isCreator, eventId: event.id })))
              .then((result) => {
                if (archiveEvent.fulfilled.match(result)) {
                  removeEventFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.archiveEvent'));
                }
              }),
        },
      });
    }
  }, [
    t,
    removeEventFromPage,
    dispatch,
    onClose,
    event.id,
    isCreator,
    event.current_user.status,
    event.users.length,
  ]);

  const handleUnArchive = useCallback(() => {
    if (isCreator && isGlobalArchive) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmUnArchiveEvent.title'),
          text: t('general.modals.confirmUnArchiveEvent.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve()
              .then(() => dispatch(unArchiveEvent({ is_full: true, eventId: event.id })))
              .then((result) => {
                if (unArchiveEvent.fulfilled.match(result)) {
                  dispatch(removeArchiveItem(result.payload));
                }
                onClose();
                NotificationService.success(t('general.notifications.unArchiveEvent'));
              }),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmUnArchiveEvent.title'),
          text: t('general.modals.confirmUnArchiveEvent.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve()
              .then(() => dispatch(unArchiveEvent({ is_full: false, eventId: event.id })))
              .then((result) => {
                if (unArchiveEvent.fulfilled.match(result)) {
                  dispatch(removeArchiveItem(result.payload));
                }
                onClose();
                NotificationService.success(t('general.notifications.unArchiveEvent'));
              }),
        },
      });
    }
  }, [t, dispatch, onClose, event.id, isCreator, isGlobalArchive]);

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
    handleArchive,
    handleDeleteEvent,
    handleRemoveYourselfFromEvent,
    handleUnArchive,
    isStarterPackage,
    isArchive,
    isCreator,
    isShowUnArchiveBtn,
    t,
  ]);

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
        <MainEventEdit
          setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
          event={event}
          menuList={menuList}
          onClose={onClose}
        />
      ) : (
        <MainEventView
          event={event}
          menuList={menuList}
          onClose={onClose}
          isArchive={isArchive}
          isFooterButton={userNotifications}
          handleAccept={handleAccept}
          isAcceptLoading={isAcceptLoading}
          isDeclineLoading={isDeclineLoading}
          handleDecline={handleDecline}
          setUserNotifications={setUserNotifications}
        />
      )}
    </Box>
  );
};

export default ViewEventModalContainer;
