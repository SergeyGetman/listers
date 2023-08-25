import React, { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { TodoItemModel } from '../../../../../shared/models/todo/todoItemModel';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { plannerItemColorConfig } from '../../../../../shared/configs/plannerItemColor.config';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../../../shared/functions/typeGuardFormActionMenu';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import MainTodoView from '../MainTodoView';
import { deleteTodo, duplicateTodo, removeMyselfFromTodo } from '../../../../../store/todo/todoThunk';
import { addTodoItem, removeTodoItem, setUserNotification } from '../../../../../store/todo/todoSlice';
import MainTodoEdit from '../MainTodoEdit';
import { setLoading } from '../../../../../store/Common/commonSlice';
import { choseRequestAction } from '../../../../../store/RightSidebar/Notifications/notificationsActions';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type ViewTodoModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  todo: TodoItemModel;
  setIsShowUnsavedDataModal: (val: boolean) => void;
  isOpenEditMode?: boolean;
};

const ViewTodoModalContainer: FC<ViewTodoModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
  todo,
  isOpenEditMode,
}) => {
  const dispatch = useAppDispatch();
  const [isEditView, setIsEditView] = useState<boolean>(isOpenEditMode ? isOpenEditMode : false);
  const [userNotifications, setUserNotifications] = useState<boolean>(!!todo.userNotification);
  const [isAcceptLoading, setIsAcceptLoading] = useState<boolean>(false);
  const [isDeclineLoading, setIsDeclineLoading] = useState<boolean>(false);
  const profileData = useAppSelector(({ profile }) => profile?.data);

  const { t } = useTranslation();
  const isEditor = useMemo(() => {
    return (
      todo.current_user.role === AssignPeoplePermissionsEnum.editor ||
      todo.current_user.role === AssignPeoplePermissionsEnum.creator
    );
  }, [todo.current_user.role]);

  const isCreator = useMemo(() => {
    return todo.current_user.role === AssignPeoplePermissionsEnum.creator;
  }, [todo.current_user.role]);
  const colorItem = useMemo(() => {
    return todo.color ? plannerItemColorConfig[todo.color] : plannerItemColorConfig.none;
  }, [todo.color]);

  const handleChangeMainView = useCallback((val: boolean) => {
    setIsEditView(val);
  }, []);

  const handleAccept = useCallback(() => {
    setIsAcceptLoading(true);
    dispatch(choseRequestAction({ action: 'accept', id: todo?.userNotification?.id })).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        dispatch(setUserNotification({ id: todo?.id }));
        setUserNotifications(false);
      }
      setIsAcceptLoading(false);
    });
  }, [todo.id, todo?.userNotification?.id, dispatch]);
  const handleDecline = useCallback(() => {
    setIsDeclineLoading(true);
    dispatch(choseRequestAction({ action: 'decline', id: todo?.userNotification?.id })).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        dispatch(removeTodoItem(todo.id));
        onClose();
      }
      setIsDeclineLoading(false);
    });
  }, [onClose, setIsDeclineLoading, todo.id, todo?.userNotification?.id, dispatch]);

  const handleDeleteTodo = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.deleteTodo.title'),
        text: t('general.modals.deleteTodo.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          Promise.resolve().then(() =>
            dispatch(deleteTodo({ todoId: todo.id })).then((result) => {
              if (deleteTodo.fulfilled.match(result)) {
                onClose();
                dispatch(removeTodoItem(result.payload));
                NotificationService.success(t('general.notifications.todoDeleted'));
              }
            }),
          ),
      },
    });
  }, [t, dispatch, onClose, todo.id]);

  const handleDuplicateTotoItem = useCallback(() => {
    dispatch(setLoading(true));
    dispatch(duplicateTodo(todo?.id))
      .then((result) => {
        if (duplicateTodo.fulfilled.match(result)) {
          dispatch(addTodoItem(result.payload));
          NotificationService.success(t('general.notifications.todoDuplicated'));
        }
      })
      .finally(() => {
        return dispatch(setLoading(false));
      });
  }, [t, dispatch, todo.id]);

  const handleRemoveYourselfFromTodo = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.removeYourselfFromTodo.title'),
        text: t('general.modals.removeYourselfFromTodo.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          Promise.resolve().then(() =>
            dispatch(removeMyselfFromTodo({ todoId: todo.id })).then((result) => {
              if (removeMyselfFromTodo.fulfilled.match(result)) {
                onClose();
                dispatch(removeTodoItem(result.payload));
                NotificationService.success(t('general.notifications.removeFromTodo'));
              }
            }),
          ),
      },
    });
  }, [t, dispatch, onClose, todo.id]);

  const handleConvertToTask = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.createTaskModal, {
      props: { item: todo, isConvertToTask: true },
    });
    onClose();
  }, [onClose, todo]);

  const menuList: ActionMenuListModel = useMemo(() => {
    return [
      isEditor && {
        label: t('general.actionMenus.edit'),
        callback: () => {
          handleChangeMainView(true);
        },
        isDisabled: false,
      },
      {
        label: t('general.actionMenus.duplicate'),
        callback: () => handleDuplicateTotoItem(),
        isDisabled: false,
      },
      !isCreator && {
        label: t('general.actionMenus.removeYourself'),
        callback: () => handleRemoveYourselfFromTodo(),
        isDisabled: false,
      },

      isCreator && {
        label: t('general.actionMenus.convertToTask'),
        callback: () => handleConvertToTask(),
        tooltipTitle: t('general.tooltips.activateHubs'),
      },
      isCreator && {
        label: t('general.actionMenus.deleteTask'),
        callback: () => handleDeleteTodo(),
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [
    handleChangeMainView,
    handleConvertToTask,
    handleDeleteTodo,
    handleDuplicateTotoItem,
    handleRemoveYourselfFromTodo,
    isCreator,
    isEditor,
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
      <MuiDefaultDrawerHeader
        titleRightIcon={<colorItem.icon sx={{ color: colorItem.iconColor }} />}
        onClose={onClose}
        headerMenuList={userNotifications ? undefined : menuList}
        isShowHeaderMenu={!isEditView}
        title={todo.title}
        isEditMode={isEditView}
      />
      <Box
        sx={{
          padding: '0 10px',
          width: '100%',
          flexGrow: '1',
          height: '100%',
          overflow: 'auto',
        }}
      >
        {isEditView ? (
          <MainTodoEdit
            item={todo}
            currentUserId={profileData?.id}
            setIsEditView={setIsEditView}
            setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
          />
        ) : (
          <MainTodoView
            isFooterButton={userNotifications}
            handleAccept={handleAccept}
            isAcceptLoading={isAcceptLoading}
            isDeclineLoading={isDeclineLoading}
            handleDecline={handleDecline}
            item={todo}
          />
        )}
      </Box>
    </Box>
  );
};

export default ViewTodoModalContainer;
