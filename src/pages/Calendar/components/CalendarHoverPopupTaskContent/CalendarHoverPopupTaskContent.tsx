import React, { FC, useCallback, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { ReactComponent as TaskIcon } from '../../../../assets/Images/sidebar/roadmap.svg';
import TaskModalStatusContainer from '../../../../components/plannerItemStatuses/TaskModalStatusContainer';
import ViewTaskPeriodContainer from '../../../../components/viewContainers/ViewTaskPeriodContainer';
import MuiBaseInputView from '../../../../components/formElements/MuiBaseInputView';
import { PlannerItemStatusesEnum } from '../../../../shared/enums/plannerItemStatuses.enum';
import { changeTaskStatus, deleteTask, removeMyselfFromTask } from '../../../../store/roadmap/roadmapThunk';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import {
  removeCalendarItem,
  setUserNotificationCalendarItem,
  updateCalendarItem,
} from '../../../../store/calendar/calendarSlice';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { AssignPeoplePermissionsEnum } from '../../../../shared/enums/assignPeoplePermissions.enum';
import MuiTooltip from '../../../../components/MuiTooltip';
import MuiIconButton from '../../../../components/buttons/MuiIconButton';
import {
  CalendarHoverPopupTaskContentHeader,
  CalendarHoverPopupTaskContentHeaderTitle,
} from './CalendarHoverPopupTaskContent.style';
import ActionButton from '../../../../components/buttons/ActionButton';
import { choseRequestAction } from '../../../../store/RightSidebar/Notifications/notificationsActions';
import { PackageEnum } from '../../../../shared/enums/package.enum';
import { NotificationsActionsEnum } from '../../../../shared/enums/notificationsEnum';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type CalendarHoverPopupTaskContentProps = {
  item: any;
  setIsOpenHoverPopup: (val: boolean) => void;
};
const CalendarHoverPopupTaskContent: FC<CalendarHoverPopupTaskContentProps> = ({
  item,
  setIsOpenHoverPopup,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile.data);

  const isStarterPackage = useMemo(() => {
    return profile?.subscription?.package === PackageEnum.starter || !profile?.subscription?.package;
  }, [profile?.subscription?.package]);
  const isEditor =
    item?.current_user?.role === AssignPeoplePermissionsEnum.editor ||
    item?.current_user?.role === AssignPeoplePermissionsEnum.creator;
  const isCreator = item?.current_user?.role === AssignPeoplePermissionsEnum.creator;

  const handleDeleteTask = useCallback(() => {
    setIsOpenHoverPopup(false);
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
                  dispatch(removeCalendarItem(result.payload));

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
                  dispatch(removeCalendarItem(result.payload));

                  NotificationService.success(t('general.notifications.taskDeleted'));
                }
              }),
            ),
        },
      });
    }
  }, [t, dispatch, item.id, item?.is_recurring, setIsOpenHoverPopup]);

  const handleRemoveYourselfFromTask = useCallback(() => {
    setIsOpenHoverPopup(false);
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
                  dispatch(removeCalendarItem(result.payload));
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
                  dispatch(removeCalendarItem(result.payload));
                  NotificationService.success(t('general.notifications.removeFromTask'));
                }
              }),
            ),
        },
      });
    }
  }, [t, dispatch, item.id, item?.is_recurring, setIsOpenHoverPopup]);

  const onChangeStatus = (
    taskId: number,
    statusValue: PlannerItemStatusesEnum,
    is_common?: boolean,
    setIsLoading?: (val: boolean) => void,
  ) => {
    if (setIsLoading) {
      setIsLoading(true);
    }

    return dispatch(changeTaskStatus({ taskId, status: statusValue, is_common }))
      .then((result) => {
        if (changeTaskStatus.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.taskStatusUpdated'));
          dispatch(updateCalendarItem(result.payload));
          setIsOpenHoverPopup(false);
        }
      })
      .finally(() => {
        if (setIsLoading) {
          setIsLoading(false);
        }
      });
  };

  const handleChangeStatus = (value: PlannerItemStatusesEnum, setIsLoading?: (val: boolean) => void) => {
    if (isEditor && item.usersLength >= 2 && !isStarterPackage) {
      modalObserver.addModal(ModalNamesEnum.confirmWithTwoVariantModal, {
        props: {
          title: t('general.modals.confirmChangeStatusForAllUsersOrYourself.title'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (is_common: boolean) =>
            Promise.resolve().then(() => onChangeStatus(item.id, value, is_common, setIsLoading)),
        },
      });
      return;
    }

    onChangeStatus(item.id, value, false, setIsLoading);
  };

  const handleDecline = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.confirmDeclineModal, {
      props: {
        entityId: item?.id,
        title: t('general.modals.confirmDeclineTaskModal.title'),
        description1: t('general.modals.confirmDeclineTaskModal.description1'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(choseRequestAction({ action: 'decline', id: item?.userNotification?.id })).then(
            (result) => {
              if (choseRequestAction.fulfilled.match(result)) {
                dispatch(removeCalendarItem(item.id));
              }
            },
          );
        },
      },
    });
  }, [dispatch, item?.id, item?.userNotification?.id, t]);

  return (
    <Box>
      <CalendarHoverPopupTaskContentHeader color={item.color}>
        <CalendarHoverPopupTaskContentHeaderTitle>
          <TaskIcon />
          <Typography noWrap sx={{ color: theme.palette.case.contrast.white }} variant="small">
            {item.title}
          </Typography>
        </CalendarHoverPopupTaskContentHeaderTitle>
        <MuiTooltip
          title={isCreator ? t('general.actionMenus.deleteTask') : t('general.actionMenus.removeYourself')}
        >
          <Box component="span">
            <MuiIconButton
              onClick={() => (isCreator ? handleDeleteTask() : handleRemoveYourselfFromTask())}
              color="secondary"
              size="small"
            >
              <DeleteForeverOutlinedIcon sx={{ '&:hover': { opacity: '0.7', transition: '0.3s' } }} />
            </MuiIconButton>
          </Box>
        </MuiTooltip>
      </CalendarHoverPopupTaskContentHeader>
      <Box sx={{ mt: '16px' }}>
        {item?.userNotification ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ width: '50%', pr: '2px' }}>
              <ActionButton
                isStartIcon
                onClick={handleDecline}
                isFullWidth
                variant={PlannerItemStatusesEnum.decline}
              />
            </Box>

            <Box sx={{ width: '50%', pl: '2px' }}>
              <ActionButton
                isStartIcon
                onClick={() => {
                  dispatch(
                    choseRequestAction({
                      action: NotificationsActionsEnum.accept,
                      id: item?.userNotification?.id,
                    }),
                  ).then((result) => {
                    if (choseRequestAction.fulfilled.match(result)) {
                      dispatch(setUserNotificationCalendarItem({ id: item.id, isStarterPackage }));
                    }
                  });
                }}
                isFullWidth
                variant={PlannerItemStatusesEnum.accept}
              />
            </Box>
          </Box>
        ) : (
          <TaskModalStatusContainer
            isHideBacklogBtn
            isExstraSmallBtn
            isShowRequestLoading
            selectedStatus={item?.current_user?.status || item?.status}
            handleChangeStatus={handleChangeStatus}
          />
        )}
      </Box>
      <Box sx={{ color: theme.palette.case.contrast.black, mt: '16px' }}>
        <ViewTaskPeriodContainer
          is_all_day_due_date={item.is_all_day_due_date}
          is_all_day={item.is_all_day}
          started_at={item.started_at}
          finished_at={item.finished_at}
          due_dated_at={item.due_dated_at}
          isShowRangeDate
          isContainAccordion={false}
        />
      </Box>
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

export default CalendarHoverPopupTaskContent;
