import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import parse from 'html-react-parser';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { ReactComponent as EventIcon } from '../../../../assets/Images/sidebar/events.svg';
import ViewTaskPeriodContainer from '../../../../components/viewContainers/ViewTaskPeriodContainer';
import MuiBaseInputView from '../../../../components/formElements/MuiBaseInputView';
import EventModalStatusContainer from '../../../../components/plannerItemStatuses/EventModalStatusContainer';
import { AssignPeoplePermissionsEnum } from '../../../../shared/enums/assignPeoplePermissions.enum';
import { PlannerItemStatusesEnum } from '../../../../shared/enums/plannerItemStatuses.enum';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { changeEventStatus, deleteEvent, removeMyselfFromEvent } from '../../../../store/events/eventsThunk';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { addedCalendarItem, removeCalendarItem } from '../../../../store/calendar/calendarSlice';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import MuiTooltip from '../../../../components/MuiTooltip';
import MuiIconButton from '../../../../components/buttons/MuiIconButton';
import {
  CalendarHoverPopupEventContentBox,
  CalendarHoverPopupEventContentBoxTitle,
} from './CalendarHoverPopupEventContent.style';
import MuiPhoneNumberInputView from '../../../../components/formElements/MuiPhoneNumberInputView';
import { PackageEnum } from '../../../../shared/enums/package.enum';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type CalendarHoverPopupEventContentProps = {
  item: any;
  setIsOpenHoverPopup: (val: boolean) => void;
};

const CalendarHoverPopupEventContent: FC<CalendarHoverPopupEventContentProps> = ({
  item,
  setIsOpenHoverPopup,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isCreator = item?.current_user?.role === AssignPeoplePermissionsEnum.creator;

  const profile = useAppSelector((state) => state.profile.data);

  const isStarterPackage = useMemo(() => {
    return profile?.subscription?.package === PackageEnum.starter || !profile?.subscription?.package;
  }, [profile?.subscription?.package]);

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
                  dispatch(removeCalendarItem(result.payload));

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
                  dispatch(removeCalendarItem(result.payload));

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
                  dispatch(removeCalendarItem(result.payload));

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
                  dispatch(removeCalendarItem(result.payload));

                  NotificationService.success(t('general.notifications.removeFromEvent'));
                }
              }),
            ),
        },
      });
    }
  }, [t, dispatch, item.id, item?.is_recurring]);
  const handleOpenInGoogleMaps = () => {
    window.open(`http://maps.google.com/maps?q=loc:${item?.location?.map?.lat},${item?.location?.map?.lng}`);
  };

  const handleChangeStatus = ({
    selectedStatus,
    setIsLoading,
  }: {
    selectedStatus: PlannerItemStatusesEnum;
    setIsLoading?: (val: boolean) => void;
  }) => {
    if (item.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.confirmRecurringModal.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            Promise.resolve().then(() =>
              dispatch(changeEventStatus({ eventId: item.id, status: selectedStatus, confirmation_status }))
                .then((result) => {
                  if (changeEventStatus.fulfilled.match(result)) {
                    NotificationService.success(t('general.notifications.eventStatusUpdated'));

                    dispatch(removeCalendarItem(result.payload.id));
                    dispatch(addedCalendarItem({ data: result.payload, isStarterPackage }));

                    setIsOpenHoverPopup(false);
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
      dispatch(changeEventStatus({ eventId: item.id, status: selectedStatus }))
        .then((result) => {
          if (changeEventStatus.fulfilled.match(result)) {
            NotificationService.success(t('general.notifications.eventStatusUpdated'));
            dispatch(removeCalendarItem(result.payload.id));
            dispatch(addedCalendarItem({ data: result.payload, isStarterPackage }));

            setIsOpenHoverPopup(false);
          }
        })
        .finally(() => {
          if (setIsLoading) {
            setIsLoading(false);
          }
        });
    }
  };
  return (
    <Box>
      <CalendarHoverPopupEventContentBox color={item.color}>
        <CalendarHoverPopupEventContentBoxTitle>
          <EventIcon />
          <Typography noWrap sx={{ color: theme.palette.case.contrast.white }} variant="small">
            {item.title}
          </Typography>
        </CalendarHoverPopupEventContentBoxTitle>
        <MuiTooltip
          title={isCreator ? t('general.actionMenus.deleteEvent') : t('general.actionMenus.removeYourself')}
        >
          <Box component="span">
            <MuiIconButton
              onClick={() => (isCreator ? handleDeleteEvent() : handleRemoveYourselfFromEvent())}
              color="secondary"
              size="small"
            >
              <DeleteForeverOutlinedIcon sx={{ '&:hover': { opacity: '0.7', transition: '0.3s' } }} />
            </MuiIconButton>
          </Box>
        </MuiTooltip>
      </CalendarHoverPopupEventContentBox>
      <Box sx={{ mt: '16px' }}>
        <EventModalStatusContainer
          isExstraSmallBtn
          isShowRequestLoading
          selectedStatus={item?.current_user?.status}
          handleChangeStatus={handleChangeStatus}
          finished_at={item.finished_at}
        />
      </Box>
      <Box sx={{ color: theme.palette.case.contrast.black, mt: '16px' }}>
        <ViewTaskPeriodContainer
          is_all_day={item.is_all_day}
          started_at={item.started_at}
          finished_at={item.finished_at}
          isShowRangeDate
          isContainAccordion={false}
          isShowDueDate={false}
        />
      </Box>
      {item?.phone && (
        <Box sx={{ color: theme.palette.case.contrast.black, mt: '16px' }}>
          <MuiPhoneNumberInputView content={item?.phone} />
        </Box>
      )}
      {item?.site && (
        <Box sx={{ color: theme.palette.case.contrast.black, mt: '16px' }}>
          <MuiBaseInputView
            isShowCopyBtn={!!item.site}
            label={t('general.fieldNames.url')}
            content={item.site ? item.site : 'N/A'}
          />
        </Box>
      )}
      {item?.location?.address && item?.location?.map?.lat && (
        <Box sx={{ color: theme.palette.case.contrast.black, mt: '16px' }}>
          <MuiBaseInputView
            isShowCopyBtn
            label={t('general.fieldNames.location')}
            content={item?.location?.address}
            isShowLocationBtn={!!item?.location?.map?.lat}
            handleOpenInGoogleMaps={handleOpenInGoogleMaps}
          />
        </Box>
      )}

      <Box sx={{ color: theme.palette.case.contrast.black, mt: '16px' }}>
        <MuiBaseInputView
          isShowBottomBorder={false}
          content={item?.description ? parse(item.description) : 'N/A'}
          label={t('general.fieldNames.description')}
        />
      </Box>
    </Box>
  );
};

export default CalendarHoverPopupEventContent;
