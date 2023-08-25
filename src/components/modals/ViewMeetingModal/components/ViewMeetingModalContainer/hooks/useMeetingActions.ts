import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { removeCalendarItem, updateCalendarItem } from '../../../../../../store/calendar/calendarSlice';
import { removeArchiveItem } from '../../../../../../store/archive/archiveSlice';
import { addPlannerListItem, removePlannerListItem } from '../../../../../../store/planner/plannerSlice';
import {
  archiveMeeting,
  changeMeetingStatus,
  deleteMeeting,
  removeMyselfFromMeeting,
  unArchiveMeeting,
} from '../../../../../../store/meetings/meetingsThunk';
import { choseRequestAction } from '../../../../../../store/RightSidebar/Notifications/notificationsActions';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';

import { NotificationService } from '../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';
import router from '../../../../../../shared/services/router';

import { PlannerItemModelTypeEnum } from '../../../../../../shared/enums/plannerItemModelType.enum';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';
import { NotificationsActionsEnum } from '../../../../../../shared/enums/notificationsEnum';
import { MeetingModel } from '../../../../../../shared/models/meeting/meeting.model';
import { PlannerItemStatusesEnum } from '../../../../../../shared/enums/plannerItemStatuses.enum';
import { AssignPeoplePermissionsEnum } from '../../../../../../shared/enums/assignPeoplePermissions.enum';

type UseMeetingActionsProps = {
  onClose: (isForceClose?: boolean) => void;
  meeting: MeetingModel;
};
const useMeetingActions = ({ onClose, meeting }: UseMeetingActionsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isAcceptLoading, setIsAcceptLoading] = useState<boolean>(false);
  const [isDeclineLoading, setIsDeclineLoading] = useState<boolean>(false);
  const [userNotifications, setUserNotifications] = useState<boolean>(!!meeting.user_notifications);
  const isCreator = meeting.current_user.role === AssignPeoplePermissionsEnum.creator;
  const isArchive = meeting.is_archive || meeting.current_user.is_archive;
  const isGlobalArchive = meeting.is_archive;
  const isShowUnArchiveBtn = (!isCreator && !isGlobalArchive && isArchive) || (isCreator && isArchive);
  const isEditor =
    meeting.current_user.role === AssignPeoplePermissionsEnum.editor ||
    meeting.current_user.role === AssignPeoplePermissionsEnum.creator;

  const removeMeetingFromPage = useCallback(
    (id: number) => {
      if (location.pathname === router.calendar.path) {
        dispatch(removeCalendarItem(id));
      } else if (location.pathname === `${router.settings.path}/${router.settings.children.archive.path}`) {
        dispatch(removeArchiveItem(id));
      } else if (location.pathname === router.journal.path) {
        dispatch(
          removePlannerListItem({
            id: id,
            modelType: PlannerItemModelTypeEnum.meet,
          }),
        );
      }
    },
    [location.pathname, dispatch],
  );

  const handleDeleteMeeting = () => {
    if (meeting.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.deleteRecurringItemModal.text', {
            type: t('general.event'),
          }),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(deleteMeeting({ meetingId: meeting.id, confirmation_status })).then((result) => {
                if (deleteMeeting.fulfilled.match(result)) {
                  removeMeetingFromPage(result.payload);
                  onClose(true);
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
              dispatch(deleteMeeting({ meetingId: meeting.id })).then((result) => {
                if (deleteMeeting.fulfilled.match(result)) {
                  removeMeetingFromPage(result.payload);
                  onClose(true);
                  NotificationService.success(t('general.notifications.eventDeleted'));
                }
              }),
            ),
        },
      });
    }
  };

  const handleUnArchive = () => {
    if (isCreator && isGlobalArchive) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmUnArchiveMeet.title'),
          text: t('general.modals.confirmUnArchiveMeet.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve()
              .then(() => dispatch(unArchiveMeeting({ is_full: true, meetingId: meeting.id })))
              .then((result) => {
                if (unArchiveMeeting.fulfilled.match(result)) {
                  dispatch(removeArchiveItem(result.payload));
                }
                onClose();
                NotificationService.success(t('general.notifications.unArchiveMeet'));
              }),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmUnArchiveMeet.title'),
          text: t('general.modals.confirmUnArchiveMeet.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve()
              .then(() => dispatch(unArchiveMeeting({ is_full: false, meetingId: meeting.id })))
              .then((result) => {
                if (unArchiveMeeting.fulfilled.match(result)) {
                  dispatch(removeArchiveItem(result.payload));
                }
                onClose();
                NotificationService.success(t('general.notifications.unArchiveMeet'));
              }),
        },
      });
    }
  };

  const handleArchive = () => {
    if (isCreator && meeting.users.length >= 1 && meeting.current_user.status) {
      modalObserver.addModal(ModalNamesEnum.confirmWithTwoVariantModal, {
        props: {
          title: t('general.modals.confirmArchiveMeet.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (is_full: boolean) =>
            Promise.resolve()
              .then(() => dispatch(archiveMeeting({ is_full: is_full, meetingId: meeting.id })))
              .then((result) => {
                if (archiveMeeting.fulfilled.match(result)) {
                  removeMeetingFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.archiveMeet'));
                }
              }),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmArchiveMeet.title'),
          text: t('general.modals.confirmArchiveMeet.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve()
              .then(() => dispatch(archiveMeeting({ is_full: isCreator, meetingId: meeting.id })))
              .then((result) => {
                if (archiveMeeting.fulfilled.match(result)) {
                  removeMeetingFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.archiveMeet'));
                }
              }),
        },
      });
    }
  };

  const handleRemoveYourselfFromEvent = () => {
    if (meeting?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.confirmRecurringModal.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(removeMyselfFromMeeting({ meetingId: meeting.id, confirmation_status })).then(
                (result) => {
                  if (removeMyselfFromMeeting.fulfilled.match(result)) {
                    removeMeetingFromPage(result.payload);
                    onClose();
                    NotificationService.success(t('general.notifications.removeFromEvent'));
                  }
                },
              ),
            ),
        },
      });
    } else {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.removeYourselfFromMeet.title'),
          text: t('general.modals.removeYourselfFromMeet.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            Promise.resolve().then(() =>
              dispatch(removeMyselfFromMeeting({ meetingId: meeting.id })).then((result) => {
                if (removeMyselfFromMeeting.fulfilled.match(result)) {
                  removeMeetingFromPage(result.payload);
                  onClose();
                  NotificationService.success(t('general.notifications.removeFromMeet'));
                }
              }),
            ),
        },
      });
    }
  };

  const handleUpdateMeetingOnPage = useCallback(
    (value: MeetingModel) => {
      if (location.pathname === router.calendar.path) {
        dispatch(updateCalendarItem(value));
      } else if (location.pathname === router.journal.path) {
        dispatch(removePlannerListItem({ modelType: PlannerItemModelTypeEnum.meet, id: value.id }));
        dispatch(addPlannerListItem(value));
      }
    },
    [dispatch, location.pathname],
  );

  const changeStatus = ({
    selectedStatus,
    confirmation_status,
    setIsLoading,
  }: {
    selectedStatus: PlannerItemStatusesEnum;
    setIsLoading?: (val: boolean) => void;
    confirmation_status?: string;
  }) => {
    dispatch(
      changeMeetingStatus({
        meetingId: meeting.id,
        status: selectedStatus,
        confirmation_status,
      }),
    )
      .then((result) => {
        if (changeMeetingStatus.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.meetingStatusUpdated'));
          modalObserver.updateModalProps(ModalNamesEnum.viewEventModal, {
            props: {
              data: result.payload,
            },
          });
          handleUpdateMeetingOnPage(result.payload);
          setUserNotifications(false);
        }
      })
      .finally(() => {
        setIsLoading?.(false);
      });
  };

  const handleChangeStatus = ({
    selectedStatus,
    setIsLoading,
    isPending,
  }: {
    selectedStatus: PlannerItemStatusesEnum;
    setIsLoading?: (val: boolean) => void;
    isPending?: boolean;
  }) => {
    if (meeting.current_user.status === selectedStatus) {
      return;
    }
    if (meeting.is_recurring && !isPending) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.confirmRecurringModal.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() => changeStatus({ confirmation_status, selectedStatus, setIsLoading })),
        },
      });
    } else {
      setIsLoading?.(true);
      changeStatus({ selectedStatus, setIsLoading });
    }
  };

  const handleAccept = () => {
    handleChangeStatus({
      setIsLoading: setIsAcceptLoading,
      selectedStatus: PlannerItemStatusesEnum.going,
      isPending: true,
    });
  };

  const handleDecline = () => {
    modalObserver.addModal(ModalNamesEnum.confirmDeclineModal, {
      props: {
        entityId: meeting?.id,
        title: t('general.modals.confirmDeclineMeetModal.title'),
        description1: t('general.modals.confirmDeclineMeetModal.description1'),
        description2: t('general.modals.confirmDeclineMeetModal.description2'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(
            choseRequestAction({
              action: NotificationsActionsEnum.notGoing,
              id: meeting?.user_notifications?.id,
            }),
          ).then((result) => {
            if (choseRequestAction.fulfilled.match(result)) {
              handleChangeStatus({
                setIsLoading: setIsDeclineLoading,
                selectedStatus: PlannerItemStatusesEnum.not_going,
                isPending: true,
              });
              onClose(true);
            }
          });
        },
      },
    });
  };

  return {
    handleRemoveYourselfFromEvent,
    handleDeleteMeeting,
    handleUnArchive,
    handleArchive,
    handleChangeStatus,
    handleDecline,
    handleAccept,
    handleUpdateMeetingOnPage,
    isArchive,
    isAcceptLoading,
    isDeclineLoading,
    isEditor,
    isCreator,
    isShowUnArchiveBtn,
    userNotifications,
  };
};

export default useMeetingActions;
