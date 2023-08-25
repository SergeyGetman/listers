/* eslint-disable no-console */
import React, { FC, useCallback, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { EventItemModel } from '../../../../../shared/models/event/eventItem.model';
import ViewDescriptionContainer from '../../../../viewContainers/ViewDescriptionContainer';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import EventModalStatusContainer from '../../../../plannerItemStatuses/EventModalStatusContainer';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import router from '../../../../../shared/services/router';
import { changeEventStatus } from '../../../../../store/events/eventsThunk';
import { updatedEventItem } from '../../../../../store/events/eventsSlice';
import {
  addedCalendarItem,
  removeCalendarItem,
  updateCalendarItem,
} from '../../../../../store/calendar/calendarSlice';
import {
  addPlannerListItem,
  removePlannerListItem,
  updatePlannerListItemWithoutSplit,
} from '../../../../../store/planner/plannerSlice';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import PlannerItemModalHeader from '../../../../headers/PlannerItemModalHeader';
import RowWithTitleContainer from '../../../../containers/RowWithTitleContainer';
import DateTimeView from '../../../../formElements/DateTimeView';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import { EventTypeEnum } from '../../../../../shared/enums/eventType.enum';
import MuiPhoneNumberInputView from '../../../../formElements/MuiPhoneNumberInputView/MuiPhoneNumberInputView';
import LocationView from '../../../../locations/LocationView';
import ViewEventModalTabsContainer from './components/ViewEventModalTabsContainer';
import { ReactComponent as DollarIcon } from '../../../../../assets/Images/dollar-icon.svg';
import { ReactComponent as InternetIcon } from '../../../../../assets/Images/internet-icon.svg';
import { MoneyActionConfig } from '../../../../../shared/configs/moneyEction.config';
import CopyButton from '../../../../buttons/CopyButton';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';

type MainEventViewProps = {
  event: EventItemModel;
  isArchive: boolean;
  onClose: () => void;
  menuList: ActionMenuListModel;
  isFooterButton?: boolean;
  isDeclineLoading?: boolean;
  isAcceptLoading?: boolean;
  handleAccept?: () => void;
  handleDecline?: () => void;
  setUserNotifications: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

const MainEventView: FC<MainEventViewProps> = ({
  event,
  isArchive,
  onClose,
  menuList,
  isAcceptLoading,
  isDeclineLoading,
  handleDecline,
  setUserNotifications,
  handleAccept,
  isFooterButton,
}) => {
  const { t } = useTranslation();
  const { data } = useAppSelector(({ profile }) => profile);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);
  const tags = event?.tags?.length > 0 ? event?.tags[0].name : null;
  const isStarterPackage = useMemo(() => {
    return data?.subscription?.package === PackageEnum.starter || !data?.subscription?.package;
  }, [data?.subscription?.package]);

  const handleUpdateListItem = useCallback(
    (updatedEvent: EventItemModel, isUpdateWithoutSplitting: boolean = false) => {
      if (location.pathname === router.events.path) {
        dispatch(updatedEventItem(updatedEvent));
      } else if (location.pathname === router.calendar.path) {
        if (isUpdateWithoutSplitting) {
          dispatch(updateCalendarItem(updatedEvent));
        } else {
          dispatch(removeCalendarItem(updatedEvent.id));
          dispatch(addedCalendarItem({ data: updatedEvent, isStarterPackage }));
        }
      } else if (location.pathname === router.journal.path) {
        if (isUpdateWithoutSplitting) {
          dispatch(updatePlannerListItemWithoutSplit(updatedEvent));
        } else {
          dispatch(removePlannerListItem({ modelType: PlannerItemModelTypeEnum.event, id: updatedEvent.id }));
          dispatch(addPlannerListItem(updatedEvent));
        }
      }
    },
    [dispatch, isStarterPackage, location.pathname],
  );

  const handleChangeStatus = useCallback(
    ({
      selectedStatus,
      setIsLoading,
    }: {
      selectedStatus: PlannerItemStatusesEnum;
      setIsLoading?: (val: boolean) => void;
    }) => {
      if (event.current_user.status === selectedStatus) {
        return;
      }
      if (event.is_recurring) {
        modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
          props: {
            title: t('general.modals.confirmRecurringModal.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: (confirmation_status: string) =>
              Promise.resolve().then(() =>
                dispatch(
                  changeEventStatus({
                    eventId: event.id,
                    status: selectedStatus,
                    confirmation_status,
                  }),
                )
                  .then((result) => {
                    if (changeEventStatus.fulfilled.match(result)) {
                      NotificationService.success(t('general.notifications.eventStatusUpdated'));
                      modalObserver.updateModalProps(ModalNamesEnum.viewEventModal, {
                        props: {
                          data: result.payload,
                        },
                      });
                      handleUpdateListItem(result.payload, true);
                      setUserNotifications(false);
                    }
                  })
                  .finally(() => {
                    if (setIsLoading) {
                      setIsLoading(false);
                    }
                  }),
              ),
          },
        });
      } else {
        if (setIsLoading) {
          setIsLoading(true);
        }
        dispatch(changeEventStatus({ eventId: event.id, status: selectedStatus }))
          .then((result) => {
            if (changeEventStatus.fulfilled.match(result)) {
              NotificationService.success(t('general.notifications.eventStatusUpdated'));
              modalObserver.updateModalProps(ModalNamesEnum.viewEventModal, {
                props: {
                  data: result.payload,
                },
              });
              handleUpdateListItem(result.payload, true);
              setUserNotifications(false);
            }
          })
          .finally(() => {
            if (setIsLoading) {
              setIsLoading(false);
            }
          });
      }
    },
    [
      dispatch,
      setUserNotifications,
      event.current_user.status,
      event.id,
      event.is_recurring,
      handleUpdateListItem,
      t,
    ],
  );

  return (
    <Box>
      <PlannerItemModalHeader
        title={event.title}
        onClose={onClose}
        tag={tags}
        isShowTag
        headerMenuList={menuList}
      />
      <Box sx={{ p: { xs: '0 16px', sm: '0 24px' }, overflowX: 'hidden', height: '100%' }}>
        <Box sx={{ mt: '24px' }}>
          <RowWithTitleContainer
            alignItems="flexStart"
            titlePadding={isSmallDisplay ? '4px' : ' 0 '}
            title="When"
          >
            <DateTimeView
              startDate={event.started_at}
              startTime={event.started_at}
              finishDate={event.finished_at}
              finishTime={event.finished_at}
              isRange
              isShowReminder
              reminder={event.notify_before}
              isShowRecurring={event.is_recurring}
              recurringPattern={event.recurring_pattern}
              isAllDay={event.is_all_day}
            />
          </RowWithTitleContainer>
        </Box>
        <Box sx={{ mt: '24px' }}>
          <RowWithTitleContainer title="For">
            <MuiAvatarGroup
              maxItemView={4}
              size="small"
              isShowAddUserBtn={false}
              isContainOwnerInUsers
              handleConfirmSharePopup={() => true}
              users={event.users}
              onClickShare={() => true}
              owner={event.owner}
            />
          </RowWithTitleContainer>
        </Box>
        {event.type === EventTypeEnum.call && event.phone && (
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer alignItems="flexStart" isFlexWidth title="Type">
              {event.type === EventTypeEnum.call && event.phone && (
                <MuiPhoneNumberInputView isShowPhoneIcon content={event.phone} country={event.country} />
              )}
            </RowWithTitleContainer>
          </Box>
        )}
        {event.type === EventTypeEnum.online && event.site && (
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer alignItems="flexStart" isFlexWidth title="Type">
              {event.type === EventTypeEnum.online && event.site && (
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <InternetIcon />
                  <Typography
                    mr="12px"
                    ml="6px"
                    sx={{ a: { color: `${theme.palette.case.blue.b800} !important` } }}
                    noWrap
                    variant="t14r"
                  >
                    <a target="_blank" href={`${event.site}`} rel="noreferrer">
                      {event.site}
                    </a>
                  </Typography>
                  <CopyButton content={event.site} />
                </Box>
              )}
            </RowWithTitleContainer>
          </Box>
        )}
        {event.type === EventTypeEnum.in_person && event.location && (
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer alignItems="flexStart" isFlexWidth title="Type">
              {event.type === EventTypeEnum.in_person && event.location && (
                <LocationView isShowTypeIcon address={event.location.address} location={event.location.map} />
              )}
            </RowWithTitleContainer>
          </Box>
        )}
        {event.fee && (
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer title="Fee">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DollarIcon />
                <Typography ml="6px" color={theme.palette.case.neutral.n800} variant="t14r">
                  {event.fee / 100}
                </Typography>
                {event.current_user.money_action && (
                  <>
                    <Typography m="0 4px" color={theme.palette.case.neutral.n500} variant="t14r">
                      in
                    </Typography>
                    <Typography color={theme.palette.case.neutral.n800} variant="t14r">
                      {MoneyActionConfig[event.current_user.money_action]?.label}
                    </Typography>
                  </>
                )}
              </Box>
            </RowWithTitleContainer>
          </Box>
        )}
        {isSmallDisplay && (
          <Box mt="24px">
            <EventModalStatusContainer
              selectedStatus={event?.current_user?.status}
              isShowRequestLoading
              isArchive={isArchive}
              finished_at={event.finished_at ? event.finished_at : ''}
              handleChangeStatus={handleChangeStatus}
            />
          </Box>
        )}

        {event.description && (
          <Box sx={{ mt: '40px' }}>
            <ViewDescriptionContainer description={event.description} />
          </Box>
        )}
        <Box sx={{ width: '100%', mt: '24px', paddingBottom: '150px' }}>
          <ViewEventModalTabsContainer attachments={event.documents} entityId={event.id} />
        </Box>
      </Box>
      {/* {!isSmallDisplay && ( */}
      {/*  <ModalFooterContainer isShowBackGround footerPosition="absolute" isBorderTop isBoxShadow={false}> */}
      {/*    <EventModalStatusContainer */}
      {/*      selectedStatus={event?.current_user?.status} */}
      {/*      isShowRequestLoading */}
      {/*      isArchive={isArchive} */}
      {/*      finished_at={event.finished_at ? event.finished_at : ''} */}
      {/*      handleChangeStatus={handleChangeStatus} */}
      {/*    /> */}
      {/*  </ModalFooterContainer> */}
      {/* )} */}
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
  );
};

export default MainEventView;
