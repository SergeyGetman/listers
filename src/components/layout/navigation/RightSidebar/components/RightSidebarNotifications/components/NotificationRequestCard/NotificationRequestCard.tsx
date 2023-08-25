import { Box, Typography } from '@mui/material';
import Moment from 'moment';
import { useLocation } from 'react-router';
import React, { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MuiAvatar from '../../../../../../../avatars/MuiAvatart/MuiAvatar';
import { PlannerItemStatusesEnum } from '../../../../../../../../shared/enums/plannerItemStatuses.enum';
import { choseRequestAction } from '../../../../../../../../store/RightSidebar/Notifications/notificationsActions';
import { useAppDispatch } from '../../../../../../../../shared/hooks/redux';
import {
  NotificationRequestCardButtonContainer,
  NotificationRequestCardButtonsContainer,
  NotificationRequestCardContainer,
  NotificationRequestCardWrapper,
} from './NotificationRequestCard.styled';
import {
  NotificationsActionsEnum,
  NotificationsTypesEnum,
} from '../../../../../../../../shared/enums/notificationsEnum';
import { ModalNamesEnum } from '../../../../../../../../shared/enums/modalNames.enum';
import ActionButton from '../../../../../../../buttons/ActionButton';
import { deleteNetworkRequest, deleteNetworkUser } from '../../../../../../../../store/network/networkSlice';
import { NotificationService } from '../../../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../../../../../../shared/locales/i18n';
import { PlannerItemModelTypeEnum } from '../../../../../../../../shared/enums/plannerItemModelType.enum';
import router from '../../../../../../../../shared/services/router';
import {
  addPlannerListItem,
  removePlannerListItem,
} from '../../../../../../../../store/planner/plannerSlice';
import { removeRoadmapItem } from '../../../../../../../../store/roadmap/roadmapSlice';
import { removeEventItem } from '../../../../../../../../store/events/eventsSlice';
import {
  deleteRequestItem,
  setRequestStatus,
} from '../../../../../../../../store/RightSidebar/Notifications/notificationsSlice';
import { changeEventStatus } from '../../../../../../../../store/events/eventsThunk';
import { changeTaskStatus } from '../../../../../../../../store/roadmap/roadmapThunk';
import { removeCalendarItem, updateCalendarItem } from '../../../../../../../../store/calendar/calendarSlice';
import modalObserver from '../../../../../../../../shared/utils/observers/modalObserver';
import {
  removeChecklist,
  setChecklistUserNotification,
} from '../../../../../../../../store/todo/Checklists/checklistsSlice';
import { setNoteUserNotification } from '../../../../../../../../store/todo/Notes/notesSlice';

type Props = {
  requestDescription: string;
  type: NotificationsTypesEnum;
  user: {
    firstName: string;
    id: number;
    lastName: string;
    src?: string;
  };
  id: number;
  status?: boolean;
  entityId: number;
  actions: string[];
  startedAt: string;
  action: string;
  isAllDay: boolean;
  requestCardBorderColor: string;
  newsLink: string;
  globalStatus: string;
  handleClickOnCard: () => void;
  location: { address: string; map: { lat: number; lng: number } };
};

// TODO storybook
const NotificationRequestCard: FC<Props> = ({
  actions,
  action,
  location,
  requestCardBorderColor,
  id,
  requestDescription,
  user,
  startedAt,
  globalStatus,
  status,
  isAllDay,
  type,
  newsLink,
  handleClickOnCard,
  entityId,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const pageLocation = useLocation();

  const handleClickOnButton = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const removeItem = useCallback(
    ({ itemType, itemId }: { itemType: NotificationsTypesEnum; itemId: number }) => {
      // TODO switch
      if (itemType === NotificationsTypesEnum.todo && pageLocation.pathname === `${router.todo.path}`) {
        dispatch(removeChecklist(itemId));
      } else if (itemType === NotificationsTypesEnum.task && pageLocation.pathname === router.journal.path) {
        dispatch(removePlannerListItem({ id: itemId, modelType: PlannerItemModelTypeEnum.task }));
      } else if (pageLocation.pathname === router.calendar.path) {
        dispatch(removeCalendarItem(itemId));
      } else if (
        itemType === NotificationsTypesEnum.task &&
        pageLocation.pathname === `${router.roadmap.path}`
      ) {
        dispatch(removeRoadmapItem(itemId));
      } else if (
        itemType === NotificationsTypesEnum.event &&
        pageLocation.pathname === `${router.events.path}`
      ) {
        dispatch(removeEventItem(itemId));
      } else if (itemType === NotificationsTypesEnum.event && pageLocation.pathname === router.journal.path) {
        dispatch(removePlannerListItem({ id: itemId, modelType: PlannerItemModelTypeEnum.event }));
      }
    },
    [dispatch, pageLocation],
  );

  const handleClickRequestButton = (payload: {
    id: number;
    userId?: number;
    action: string;
    entityId: number;
    type: NotificationsTypesEnum;
    globalStatus: PlannerItemStatusesEnum;
  }) => {
    // TODO refactor function
    if (
      (payload.action === NotificationsActionsEnum.notGoing ||
        payload.action === NotificationsActionsEnum.decline) &&
      type === NotificationsTypesEnum.event
    ) {
      modalObserver.addModal(ModalNamesEnum.confirmDeclineModal, {
        props: {
          entityId: entityId,
          title: t('general.modals.confirmDeclineEventModal.title'),
          description1: t('general.modals.confirmDeclineEventModal.description1'),
          description2: t('general.modals.confirmDeclineEventModal.description2'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(choseRequestAction(payload)).then((result) => {
              if (choseRequestAction.fulfilled.match(result)) {
                dispatch(deleteRequestItem(payload.id));
                removeItem({ itemType: type, itemId: entityId });
              }
            });
          },
        },
      });
    } else if (payload.action === NotificationsActionsEnum.decline && type === NotificationsTypesEnum.task) {
      modalObserver.addModal(ModalNamesEnum.confirmDeclineModal, {
        props: {
          entityId: entityId,
          title: t('general.modals.confirmDeclineTaskModal.title'),
          description1: t('general.modals.confirmDeclineTaskModal.description1'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(choseRequestAction(payload)).then((result) => {
              if (choseRequestAction.fulfilled.match(result)) {
                dispatch(deleteRequestItem(payload.id));
                removeItem({ itemType: type, itemId: entityId });
              }
            });
          },
        },
      });
    } else if (
      payload.action === NotificationsActionsEnum.decline &&
      type === NotificationsTypesEnum.userRequest
    ) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('network.confirmMessages.cancel'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(choseRequestAction(payload)).then((result) => {
              if (choseRequestAction.fulfilled.match(result)) {
                dispatch(deleteRequestItem(payload.id));
                if (action === 'contact_shared') {
                  dispatch(deleteNetworkRequest(payload.entityId));
                } else {
                  dispatch(deleteNetworkUser(payload.userId ? payload.userId : id));
                }
                NotificationService.success(i18next.t('network.toasts.requestCanceled'));
              }
            });
          },
        },
      });
    } else if (payload.action === NotificationsActionsEnum.going && type === NotificationsTypesEnum.event) {
      dispatch(changeEventStatus({ eventId: entityId, status: PlannerItemStatusesEnum.going })).then(
        (res) => {
          if (changeEventStatus.fulfilled.match(res)) {
            NotificationService.success(t('general.notifications.eventStatusUpdated'));
            if (pageLocation.pathname === router.calendar.path) {
              dispatch(updateCalendarItem(res.payload));
            } else {
              dispatch(removePlannerListItem({ id: entityId, modelType: PlannerItemModelTypeEnum.event }));
              dispatch(addPlannerListItem(res.payload));
            }
          }
        },
      );
    } else if (payload.action === NotificationsActionsEnum.accept && type === NotificationsTypesEnum.task) {
      dispatch(choseRequestAction(payload)).then((result) => {
        if (choseRequestAction.fulfilled.match(result)) {
          dispatch(
            changeTaskStatus({
              taskId: entityId,
              status:
                globalStatus === PlannerItemStatusesEnum.backlog
                  ? PlannerItemStatusesEnum.backlog
                  : PlannerItemStatusesEnum.todo,
              is_common: globalStatus === PlannerItemStatusesEnum.backlog ? true : false,
            }),
          ).then((res) => {
            if (changeTaskStatus.fulfilled.match(res)) {
              NotificationService.success(t('general.notifications.taskStatusUpdated'));

              if (pageLocation.pathname === router.calendar.path) {
                dispatch(updateCalendarItem(res.payload));
              } else {
                dispatch(removePlannerListItem({ id: entityId, modelType: PlannerItemModelTypeEnum.task }));
                dispatch(addPlannerListItem(res.payload));
              }
            }
          });
        }
      });
    } else if (payload.action === NotificationsActionsEnum.maybe && type === NotificationsTypesEnum.event) {
      dispatch(changeEventStatus({ eventId: entityId, status: PlannerItemStatusesEnum.maybe })).then(
        (res) => {
          if (changeEventStatus.fulfilled.match(res)) {
            NotificationService.success(t('general.notifications.eventStatusUpdated'));
            if (pageLocation.pathname === router.calendar.path) {
              dispatch(updateCalendarItem(res.payload));
            } else {
              dispatch(removePlannerListItem({ id: entityId, modelType: PlannerItemModelTypeEnum.event }));
              dispatch(addPlannerListItem(res.payload));
            }
          }
        },
      );
    } else {
      dispatch(choseRequestAction(payload)).then((result) => {
        if (choseRequestAction.fulfilled.match(result)) {
          dispatch(deleteRequestItem(payload.id));
          if (payload.action === NotificationsActionsEnum.accept && type === NotificationsTypesEnum.todo) {
            dispatch(setChecklistUserNotification({ id: entityId }));
          }
          if (payload.action === NotificationsActionsEnum.accept && type === NotificationsTypesEnum.note) {
            dispatch(setNoteUserNotification({ id: entityId }));
          }
          if (
            payload.action === NotificationsActionsEnum.notGoing ||
            payload.action === NotificationsActionsEnum.decline
          ) {
            removeItem({ itemType: type, itemId: entityId });
          }
        }
      });
    }
  };

  return (
    <NotificationRequestCardWrapper
      onClick={() => {
        handleClickOnCard();
      }}
    >
      <NotificationRequestCardContainer borderColor={requestCardBorderColor} to={newsLink}>
        <Box sx={{ marginRight: '12px' }}>
          <MuiAvatar
            firstName={user.firstName}
            id={user.id}
            lastName={user.lastName}
            src={user.src}
            size="medium"
            variant="circular"
            hubIcon={
              globalStatus === NotificationsTypesEnum.backlog
                ? NotificationsTypesEnum.backlog
                : (type as NotificationsTypesEnum)
            }
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: '285px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography
              dangerouslySetInnerHTML={{ __html: requestDescription }}
              sx={{ wordBreak: 'break-word' }}
              variant="default"
            />
          </Box>

          {type === NotificationsTypesEnum.event && (
            <>
              <Box sx={{ marginTop: '4px', display: 'flex' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <DateRangeIcon
                    sx={(theme) => ({ width: '18px', color: theme.palette.case.neutral.n500 })}
                  />

                  <Box>
                    <Typography
                      sx={(theme) => ({ color: theme.palette.case.neutral.n500, marginLeft: '4px' })}
                      variant="default"
                    >
                      {!!startedAt
                        ? Moment.utc(startedAt, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY')
                        : 'N/A'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ marginLeft: '24px' }}>
                  {startedAt && !isAllDay ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <AccessTimeIcon
                        sx={(theme) => ({ width: '18px', color: theme.palette.case.neutral.n500 })}
                      />
                      <Typography
                        sx={(theme) => ({ color: theme.palette.case.neutral.n500, marginLeft: '4px' })}
                        variant="default"
                      >
                        {startedAt && !isAllDay ? Moment.utc(startedAt).local().format('hh:mm A') : 'HH:MM'}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      sx={(theme) => ({ color: theme.palette.case.neutral.n500, marginLeft: '4px' })}
                      variant="default"
                    >
                      {startedAt && isAllDay && t('general.fieldNames.allDay')}
                    </Typography>
                  )}
                </Box>
              </Box>
              {!!location.address && (
                <Box sx={{ marginTop: '4px', display: 'flex' }}>
                  <FmdGoodIcon sx={(theme) => ({ width: '18px', color: theme.palette.case.neutral.n500 })} />
                  <Typography
                    sx={(theme) => ({ color: theme.palette.case.neutral.n500, marginLeft: '4px' })}
                    variant="default"
                  >
                    {location.address}
                  </Typography>
                </Box>
              )}
            </>
          )}

          {type === NotificationsTypesEnum.event ? (
            <NotificationRequestCardButtonsContainer>
              <NotificationRequestCardButtonContainer onClick={handleClickOnButton}>
                <ActionButton
                  isExstraSmallBtn
                  onClick={() => {
                    handleClickRequestButton({
                      id: id,
                      action: actions[2],
                      entityId: entityId,
                      globalStatus: globalStatus as PlannerItemStatusesEnum,
                      type: type,
                    });
                  }}
                  variant={PlannerItemStatusesEnum.not_going}
                />
              </NotificationRequestCardButtonContainer>
              <NotificationRequestCardButtonContainer onClick={handleClickOnButton}>
                <ActionButton
                  isExstraSmallBtn
                  onClick={() => {
                    if (!status) {
                      dispatch(setRequestStatus(id));
                      handleClickRequestButton({
                        id: id,
                        action: actions[1],
                        entityId: entityId,
                        type: type,
                        globalStatus: globalStatus as PlannerItemStatusesEnum,
                      });
                    }
                  }}
                  variant={PlannerItemStatusesEnum.maybe}
                />
              </NotificationRequestCardButtonContainer>
              <NotificationRequestCardButtonContainer onClick={handleClickOnButton}>
                <ActionButton
                  isExstraSmallBtn
                  onClick={() => {
                    handleClickRequestButton({
                      id: id,
                      action: actions[0],
                      entityId: entityId,
                      globalStatus: globalStatus as PlannerItemStatusesEnum,
                      type: type,
                    });
                  }}
                  variant={PlannerItemStatusesEnum.going}
                />
              </NotificationRequestCardButtonContainer>
            </NotificationRequestCardButtonsContainer>
          ) : (
            <NotificationRequestCardButtonsContainer>
              <NotificationRequestCardButtonContainer onClick={handleClickOnButton}>
                <ActionButton
                  onClick={() => {
                    handleClickRequestButton({
                      id: id,
                      userId: user.id,
                      action: actions[1],
                      entityId: entityId,
                      type: type,
                      globalStatus: globalStatus as PlannerItemStatusesEnum,
                    });
                  }}
                  variant={PlannerItemStatusesEnum.decline}
                />
              </NotificationRequestCardButtonContainer>

              <NotificationRequestCardButtonContainer onClick={handleClickOnButton}>
                <ActionButton
                  onClick={() => {
                    handleClickRequestButton({
                      id: id,
                      action: actions[0],
                      globalStatus: globalStatus as PlannerItemStatusesEnum,
                      entityId: entityId,
                      type: type,
                    });
                  }}
                  variant={PlannerItemStatusesEnum.accept}
                />
              </NotificationRequestCardButtonContainer>
            </NotificationRequestCardButtonsContainer>
          )}
        </Box>
      </NotificationRequestCardContainer>
    </NotificationRequestCardWrapper>
  );
};

export default memo(NotificationRequestCard);
