import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Collapse, Typography, useTheme, Zoom } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { TransitionGroup } from 'react-transition-group';
import { UseFormSetError } from 'react-hook-form';
import { TodoItemModel } from '../../../shared/models/todo/todoItemModel';
import {
  TodoCardAccordion,
  TodoCardAccordionDetails,
  TodoCardAccordionSummary,
  TodoCardCounterBlock,
} from './TodoCard.style';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import { useAppDispatch } from '../../../shared/hooks/redux';
import MuiAvatarGroup from '../../avatars/MuiAvatarGroup';
import ChecklistForm from '../../forms/ChecklistForm';
import { ChecklistFormPayloadModel } from '../../../shared/models/checklists/checklistFormPayload.model';
import {
  createChecklistItem,
  removeChecklistItem,
  updateChecklistItem,
  updateChecklistItemBody,
} from '../../../store/checklists/checklistsThunk';

import ChecklistItemCard from '../ChecklistItemCard';
import { ChecklistItemStatusEnum } from '../../../shared/enums/checklistItemStatus.enum';
import {
  addChecklistItemToTodo,
  addTodoItem,
  changeTodoItemIsOpenValue,
  deleteChecklistItemInTodo,
  removeTodoItem,
  setUserNotification,
  updateChecklistItemInTodo,
  updateTodoListItem,
} from '../../../store/todo/todoSlice';
import { plannerItemColorConfig } from '../../../shared/configs/plannerItemColor.config';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../shared/functions/typeGuardFormActionMenu';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import {
  changeIsOpenTodo,
  deleteTodo,
  duplicateTodo,
  removeMyselfFromTodo,
  updateUsersTodo,
} from '../../../store/todo/todoThunk';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { PlannerItemModelTypeEnum } from '../../../shared/enums/plannerItemModelType.enum';
import { setLoading } from '../../../store/Common/commonSlice';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import ActionButton from '../../buttons/ActionButton';
import { choseRequestAction } from '../../../store/RightSidebar/Notifications/notificationsActions';
import { NotificationsActionsEnum } from '../../../shared/enums/notificationsEnum';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import errorsHandler from '../../../shared/functions/errorsHandler';

type TodoCardProps = {
  item: TodoItemModel;
  handleOpenTodoItem: (itemId: number, isEdit?: boolean) => void;
};

const TodoCard: FC<TodoCardProps> = ({ item, handleOpenTodoItem }) => {
  const [isExpanded, toggleExpand] = useState<boolean>(!!item.is_open);
  const [isShowFormLoader, setIsShowFormLoader] = useState<boolean>(false);
  useEffect(() => {
    toggleExpand(!!item.is_open);
  }, [item.is_open]);
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const itemBorderColor = useMemo(() => {
    return item.color ? plannerItemColorConfig[item.color]?.iconColor : null;
  }, [item.color]);
  const isEditor = useMemo(() => {
    return item.current_user.role !== AssignPeoplePermissionsEnum.viewer;
  }, [item.current_user.role]);
  const isCreator = useMemo(() => {
    return item.current_user.role === AssignPeoplePermissionsEnum.creator;
  }, [item.current_user.role]);

  const sortedChecklistData = useMemo(() => {
    const doneStatus = item.checklists
      .filter((i) => i.status === ChecklistItemStatusEnum.done)
      .sort((a, b) => {
        return Moment(b.updated_at).diff(Moment(a.updated_at));
      });
    const todoStatus = item.checklists
      .filter((i) => i.status === ChecklistItemStatusEnum.todo)
      .sort((a, b) => {
        return Moment(b.updated_at).diff(Moment(a.updated_at));
      });
    return {
      data: [...todoStatus, ...doneStatus],
      todoCount: todoStatus.length,
      doneCount: doneStatus.length,
    };
  }, [item.checklists]);

  const onToggleExpand = useCallback(() => {
    toggleExpand(!isExpanded);
    dispatch(changeIsOpenTodo({ todoId: item.id, is_open: !isExpanded ? 1 : 0 })).then((result) => {
      if (changeIsOpenTodo.fulfilled.match(result)) {
        dispatch(changeTodoItemIsOpenValue({ todoId: item.id, is_open: !isExpanded ? 1 : 0 }));
      }
    });
  }, [isExpanded, item.id, dispatch]);

  const handleDuplicateTotoItem = useCallback(() => {
    dispatch(setLoading(true));
    dispatch(duplicateTodo(item?.id))
      .then((result) => {
        if (duplicateTodo.fulfilled.match(result)) {
          dispatch(addTodoItem(result.payload));
          NotificationService.success(t('general.notifications.todoDuplicated'));
        }
      })
      .finally(() => {
        return dispatch(setLoading(false));
      });
  }, [t, dispatch, item.id]);

  const handleRemoveYourselfFromTodo = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.removeYourselfFromTodo.title'),
        text: t('general.modals.removeYourselfFromTodo.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          dispatch(removeMyselfFromTodo({ todoId: item.id })).then((result) => {
            if (removeMyselfFromTodo.fulfilled.match(result)) {
              dispatch(removeTodoItem(result.payload));
              NotificationService.success(t('general.notifications.removeFromTodo'));
            }
          }),
      },
    });
  }, [t, dispatch, item.id]);

  const handleDeleteTodo = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.deleteTodo.title'),
        text: t('general.modals.deleteTodo.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          Promise.resolve().then(() =>
            dispatch(deleteTodo({ todoId: item.id })).then((result) => {
              if (deleteTodo.fulfilled.match(result)) {
                dispatch(removeTodoItem(result.payload));
                NotificationService.success(t('general.notifications.todoDeleted'));
              }
            }),
          ),
      },
    });
  }, [t, dispatch, item.id]);

  const handleConvertToTask = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.createTaskModal, { props: { item: item, isConvertToTask: true } });
  }, [item]);

  const handleOpenShareModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.shareModal, {
      props: {
        users: item?.users,
        owner: item?.owner,
        title: `Share "${item?.title}" checklist`,
        handleConfirm: (users: AssignPeopleSelectValueModel[]) =>
          Promise.resolve().then(() =>
            dispatch(updateUsersTodo({ users, todoId: item.id })).then((result) => {
              if (updateUsersTodo.fulfilled.match(result)) {
                dispatch(updateTodoListItem(result.payload));
                NotificationService.success(t('general.notifications.todoUpdated'));
              }
            }),
          ),
      },
    });
  }, [dispatch, item?.id, item?.owner, item?.title, item?.users, t]);

  const handleAccept = useCallback(() => {
    dispatch(
      choseRequestAction({ action: NotificationsActionsEnum.accept, id: item?.userNotification?.id }),
    ).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        dispatch(setUserNotification({ id: item?.id }));
      }
    });
  }, [item.id, item?.userNotification?.id, dispatch]);

  const handleDecline = useCallback(() => {
    dispatch(choseRequestAction({ action: 'decline', id: item?.userNotification?.id })).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        dispatch(removeTodoItem(item.id));
      }
    });
  }, [item.id, item?.userNotification?.id, dispatch]);

  const menuList: ActionMenuListModel = useMemo(() => {
    if (!!item?.userNotification) {
      return [
        {
          label: t('general.actionMenus.view'),
          callback: () => handleOpenTodoItem(item.id, false),
          isDisabled: false,
        },
        {
          label: t('general.actionMenus.accept'),
          callback: () => handleAccept(),
          isDisabled: false,
        },
        {
          label: t('general.actionMenus.decline'),
          callback: () => handleDecline(),
          isDisabled: false,
        },
      ];
    }
    return [
      isEditor && {
        label: t('general.actionMenus.edit'),
        callback: () => handleOpenTodoItem(item.id, true),
        isDisabled: false,
      },
      {
        label: t('general.actionMenus.view'),
        callback: () => handleOpenTodoItem(item.id),
        isDisabled: false,
      },
      isEditor && {
        label: t('general.actionMenus.share'),
        callback: () => handleOpenShareModal(),
        isDisabled: false,
      },
      {
        label: t('general.actionMenus.duplicate'),
        callback: () => handleDuplicateTotoItem(),
        isDisabled: false,
      },
      isCreator && {
        label: t('general.actionMenus.convertToTask'),
        callback: () => handleConvertToTask(),
        isDisabled: false,
        tooltipTitle: t('general.tooltips.activateHubs'),
      },
      !isCreator && {
        label: t('general.actionMenus.removeYourself'),
        callback: () => handleRemoveYourselfFromTodo(),
        isDisabled: false,
      },
      isCreator && {
        label: t('general.actionMenus.deleteTask'),
        callback: () => handleDeleteTodo(),
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [
    t,
    isEditor,
    isCreator,
    handleOpenTodoItem,
    item.id,
    item.userNotification,
    handleOpenShareModal,
    handleDuplicateTotoItem,
    handleRemoveYourselfFromTodo,
    handleConvertToTask,
    handleDeleteTodo,
    handleAccept,
    handleDecline,
  ]);

  const onSubmit = useCallback(
    (value: ChecklistFormPayloadModel, reset: () => void, setError: UseFormSetError<any>) => {
      setIsShowFormLoader(true);
      dispatch(
        createChecklistItem({ ...value, entity_type: PlannerItemModelTypeEnum.todo, entity_id: item.id }),
      )
        .then((result) => {
          if (createChecklistItem.fulfilled.match(result)) {
            dispatch(addChecklistItemToTodo({ todoId: item.id, checklistItem: result.payload }));
            reset();
          } else {
            errorsHandler(result, setError);
          }
        })
        .finally(() => setIsShowFormLoader(false));
    },
    [dispatch, item.id],
  );

  const handleChangeChecklistItemStatus = useCallback(
    (newStatus: ChecklistItemStatusEnum, itemId: number, callback: (val: boolean) => void) => {
      dispatch(
        updateChecklistItem({
          status: newStatus,
          id: itemId,
          entity_type: PlannerItemModelTypeEnum.todo,
          entity_id: item.id,
        }),
      )
        .then((result) => {
          if (updateChecklistItem.fulfilled.match(result)) {
            dispatch(updateChecklistItemInTodo({ todoId: item.id, checklistItem: result.payload }));
          }
        })
        .finally(() => {
          callback(false);
        });
    },
    [dispatch, item.id],
  );

  const handleUpdateChecklistItem = useCallback(
    (itemId: number, body: string, callback: (val: boolean) => void) => {
      dispatch(
        updateChecklistItemBody({
          body: body,
          id: itemId,
          entity_type: PlannerItemModelTypeEnum.todo,
          entity_id: item.id,
        }),
      )
        .then((result) => {
          if (updateChecklistItemBody.fulfilled.match(result)) {
            dispatch(updateChecklistItemInTodo({ todoId: item.id, checklistItem: result.payload }));
          }
        })
        .finally(() => {
          callback(false);
        });
    },
    [dispatch, item.id],
  );

  const handleDeleteChecklistItem = useCallback(
    (itemId: number, callback: (val: boolean) => void) => {
      dispatch(
        removeChecklistItem({ itemId, entity_type: PlannerItemModelTypeEnum.todo, entity_id: item.id }),
      ).finally(() => {
        dispatch(deleteChecklistItemInTodo({ todoId: item.id, checklistItemId: itemId }));
        callback(false);
      });
    },
    [dispatch, item.id],
  );

  return (
    <TodoCardAccordion
      TransitionProps={{ unmountOnExit: true }}
      disableGutters
      elevation={0}
      square
      expanded={isExpanded}
      onChange={onToggleExpand}
    >
      <TodoCardAccordionSummary itemBorderColor={itemBorderColor} isExpanded={isExpanded}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <Typography sx={{ pr: '10px' }} noWrap variant="large_bolt">
            {item.icon ? item.icon : ''} {item.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Zoom in={!!sortedChecklistData?.data?.length}>
              <TodoCardCounterBlock itemBorderColor={itemBorderColor} sx={{ mr: '10px' }}>
                <Typography variant="extra_small">{`${sortedChecklistData.doneCount}/${sortedChecklistData?.data?.length}`}</Typography>
              </TodoCardCounterBlock>
            </Zoom>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BaseActionMenu menuList={menuList} />
            </Box>
          </Box>
        </Box>
      </TodoCardAccordionSummary>
      <TodoCardAccordionDetails>
        {(!!item?.users.length || !!item.due_dated_at) && (
          <Box
            sx={{
              width: '100%',
              mb: '5px',
              p: '0 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {!!item.due_dated_at ? (
              <Typography
                noWrap
                sx={{
                  flexShrink: '0',
                  color: item.current_user.is_late
                    ? theme.palette.case.warning.high
                    : theme.palette.case.contrast.black,
                }}
                variant="extra_small"
              >
                {`Due ${Moment.utc(item.due_dated_at, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YY')}`}
              </Typography>
            ) : (
              <Box />
            )}

            {!!item?.users?.length && (
              <MuiAvatarGroup
                size="extraSmall"
                isContainOwnerInUsers={false}
                users={item?.users}
                isShowAddUserBtn={isEditor}
                onClickShare={() => handleOpenShareModal()}
                owner={item?.owner}
              />
            )}
          </Box>
        )}
        {!!item?.userNotification ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              margin: '16px 0',
              padding: '0 8px',
            }}
          >
            <Box sx={{ width: '50%', pr: '4px' }}>
              <ActionButton
                isStartIcon
                isFullWidth
                onClick={handleDecline}
                variant={PlannerItemStatusesEnum.decline}
              />
            </Box>
            <Box sx={{ width: '50%', pl: '4px' }}>
              <ActionButton
                isStartIcon
                isFullWidth
                onClick={handleAccept}
                variant={PlannerItemStatusesEnum.accept}
              />
            </Box>
          </Box>
        ) : (
          <Collapse in={isEditor && sortedChecklistData?.data?.length <= 20}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: ' 100%',
                backgroundColor: theme.palette.case.contrast.white,
                borderBottom: !!sortedChecklistData.data.length
                  ? `1px solid ${theme.palette.case.neutral.n100}`
                  : '',
                p: '8px 10px',
              }}
            >
              <ChecklistForm callBack={onSubmit} isShowInputLoader={isShowFormLoader} />
            </Box>
          </Collapse>
        )}

        <Box
          sx={{
            opacity: !!item?.userNotification ? '0.4' : 'initial',
            pointerEvents: !!item?.userNotification ? 'none' : 'initial',
          }}
        >
          <TransitionGroup>
            {sortedChecklistData.data.map((checklistItem, index) => (
              <Collapse key={checklistItem.id}>
                <Box>
                  <ChecklistItemCard
                    item={checklistItem}
                    hasEditPermission={isEditor}
                    hoverColor={itemBorderColor}
                    handleUpdateChecklistItem={handleUpdateChecklistItem}
                    isActionMenu
                    isBorderRadius={index === sortedChecklistData.data.length - 1}
                    handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
                    handleDeleteChecklistItem={handleDeleteChecklistItem}
                  />
                </Box>
              </Collapse>
            ))}
          </TransitionGroup>
        </Box>
      </TodoCardAccordionDetails>
    </TodoCardAccordion>
  );
};

export default TodoCard;
