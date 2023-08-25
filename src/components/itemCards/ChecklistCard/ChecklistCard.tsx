import React, { FC, useCallback, useMemo, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { UseFormSetError } from 'react-hook-form';
import { TodoItemModel } from '../../../shared/models/todo/todoItemModel';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import ChecklistMobileCard from './components/ChecklistMobileCard/ChecklistMobileCard';
import ChecklistDesktopCard from './components/ChecklistDesktopCard/ChecklistDesktopCard';
import { getChecklistIconConfig } from '../../../shared/configs/todo/checklistIcon.config';
import {
  changeIsOpenChecklist,
  completeChecklistsItem,
  deleteChecklist,
  deleteChecklistItemThunk,
  duplicateChecklist,
  removeYourselfFromChecklist,
  uncompleteChecklistsItem,
  updateTodoChecklistItem,
  updateUsersChecklist,
} from '../../../store/todo/Checklists/checklistsThunk';
import { PlannerItemModelTypeEnum } from '../../../shared/enums/plannerItemModelType.enum';
import {
  addChecklist,
  addChecklistItemToTodo,
  changeChecklistIsOpenValue,
  deleteChecklistItem,
  removeChecklist,
  setChecklistUserNotification,
  uncompleteChecklistItem,
  updateChecklistItemInTodo,
  updateChecklistListItem,
} from '../../../store/todo/Checklists/checklistsSlice';
import { useAppDispatch } from '../../../shared/hooks/redux';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { ChecklistItemStatusEnum } from '../../../shared/enums/checklistItemStatus.enum';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';
import typeGuardFormActionMenu from '../../../shared/functions/typeGuardFormActionMenu';
import { choseRequestAction } from '../../../store/RightSidebar/Notifications/notificationsActions';
import { NotificationsActionsEnum } from '../../../shared/enums/notificationsEnum';
import { ChecklistFormPayloadModel } from '../../../shared/models/checklists/checklistFormPayload.model';
import {
  createChecklistItem,
  updateChecklistItem,
  updateChecklistItemBody,
} from '../../../store/checklists/checklistsThunk';
import errorsHandler from '../../../shared/functions/errorsHandler';
import { MediaType } from '../../../shared/models/media.model';

type Props = {
  item: TodoItemModel;
  isCanDraggable?: boolean;
  isCanDnD?: boolean;
  isDndActive?: boolean;
};

const ChecklistCard: FC<Props> = ({ item, isCanDraggable = true, isCanDnD, isDndActive }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const iconItem = getChecklistIconConfig[item?.icon];
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const [isShowFormLoader, setIsShowFormLoader] = useState<boolean>(false);
  const [isEditTitle, setIsEditTitle] = useState(false);

  const [isExpanded, toggleExpand] = useState<boolean>(!!item.is_open);

  const onToggleExpand = useCallback(() => {
    toggleExpand(!isExpanded);
    dispatch(changeIsOpenChecklist({ checklistId: item.id, is_open: !isExpanded ? 1 : 0 })).then((result) => {
      if (changeIsOpenChecklist.fulfilled.match(result)) {
        dispatch(changeChecklistIsOpenValue({ checklistId: item.id, is_open: !isExpanded ? 1 : 0 }));
      }
    });
  }, [isExpanded, item.id, dispatch]);

  const isEditor = useMemo(() => {
    return item.current_user.role !== AssignPeoplePermissionsEnum.viewer;
  }, [item.current_user.role]);
  const isCreator = useMemo(() => {
    return item.current_user.role === AssignPeoplePermissionsEnum.creator;
  }, [item.current_user.role]);

  const handleRemoveChecklist = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.deleteTodo.title'),
        text: t('general.modals.deleteTodo.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          Promise.resolve().then(() =>
            dispatch(deleteChecklist({ checklistId: item.id })).then((result) => {
              if (deleteChecklist.fulfilled.match(result)) {
                dispatch(removeChecklist(result.payload));
                NotificationService.success(t('general.notifications.todoDeleted'));
              }
            }),
          ),
      },
    });
  }, [t, dispatch, item.id]);

  const handleDuplicateChecklist = useCallback(() => {
    dispatch(duplicateChecklist(item.id)).then((result) => {
      if (duplicateChecklist.fulfilled.match(result)) {
        dispatch(addChecklist(result.payload));
        NotificationService.success(t('general.notifications.todoDuplicated'));
      }
    });
  }, [t, dispatch, item.id]);

  const handleUpdateChecklist = ({
    checklistId,
    title,
    callback,
  }: {
    checklistId: number;
    title: string;
    callback: () => void;
  }) => {
    dispatch(updateTodoChecklistItem({ checklistId, item: { ...item, title } }))
      .then((result) => {
        if (updateTodoChecklistItem.fulfilled.match(result)) {
          dispatch(updateChecklistListItem(result.payload));
        }
      })
      .finally(() => callback());
  };
  const handleUpdateChecklistDueDate = ({
    due_date,
    callback,
  }: {
    due_date?: string;
    callback: (value: boolean) => void;
  }) => {
    dispatch(
      updateTodoChecklistItem({
        checklistId: item.id,
        item: {
          ...item,
          due_dated_at: due_date
            ? `${Moment(
                `${Moment(due_date).format('MM/DD/YYYY')} ${Moment('12:00:00', 'HH:mm:ss').format(
                  'HH:mm:ss',
                )}`,
              )
                .utc()
                .format('YYYY-MM-DD HH:mm:ss')}`
            : undefined,
        },
      }),
    ).then((result) => {
      if (updateTodoChecklistItem.fulfilled.match(result)) {
        dispatch(updateChecklistListItem(result.payload));
        callback(false);
      }
    });
  };
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
      data: item.checklists,
      todoCount: todoStatus.length,
      doneCount: doneStatus.length,
    };
  }, [item.checklists]);

  const handleDeleteChecklistItem = useCallback(
    (checklistItemId: number, callback: (val: boolean) => void) => {
      dispatch(
        deleteChecklistItemThunk({
          itemId: checklistItemId,
          entity_type: PlannerItemModelTypeEnum.todo,
          entity_id: item.id,
        }),
      ).finally(() => {
        dispatch(deleteChecklistItem({ checklistId: item.id, checklistItemId }));
        callback(false);
      });
    },
    [dispatch, item.id],
  );

  const handleOpenShareModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.shareModal, {
      props: {
        users: item?.users,
        owner: item?.owner,
        title: t('general.header.shareWith'),
        handleConfirm: (users: AssignPeopleSelectValueModel[]) =>
          Promise.resolve().then(() =>
            dispatch(updateUsersChecklist({ users, checklistId: item.id })).then((result) => {
              if (updateUsersChecklist.fulfilled.match(result)) {
                dispatch(updateChecklistListItem(result.payload));
                NotificationService.success(t('general.notifications.todoUpdated'));
              }
            }),
          ),
      },
    });
  }, [dispatch, item?.id, item?.owner, item?.users, t]);

  const handleOpenAttachFilesModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.attachFiles, {
      props: {
        documents: item?.documents,
        maxAttachmentsLength: 5,
        isCanAddMedia: isEditor,
        owner: item?.owner,
        title: t('general.header.attachFiles'),
        handleConfirm: (doc: MediaType[]) =>
          Promise.resolve().then(() =>
            dispatch(
              updateTodoChecklistItem({ checklistId: item.id, item: { ...item, documents: doc } }),
            ).then((result) => {
              if (updateTodoChecklistItem.fulfilled.match(result)) {
                dispatch(updateChecklistListItem(result.payload));
              }
            }),
          ),
      },
    });
  }, [dispatch, isEditor, item, t]);

  const handleCompleteChecklists = useCallback(() => {
    dispatch(completeChecklistsItem({ checklistId: item.id })).then((result) => {
      if (completeChecklistsItem.fulfilled.match(result)) {
        dispatch(updateChecklistListItem(result.payload));
      }
    });
  }, [dispatch, item.id]);

  const handleUncompleteChecklists = useCallback(() => {
    dispatch(uncompleteChecklistsItem({ checklistId: item.id })).then((result) => {
      if (uncompleteChecklistsItem.fulfilled.match(result)) {
        dispatch(uncompleteChecklistItem(result.payload));
      }
    });
  }, [dispatch, item.id]);

  const handleRemoveYourselfFromChecklist = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.removeYourselfFromTodo.title'),
        text: t('general.modals.removeYourselfFromTodo.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          dispatch(removeYourselfFromChecklist({ checklistId: item.id })).then((result) => {
            if (removeYourselfFromChecklist.fulfilled.match(result)) {
              dispatch(removeChecklist(result.payload));
              NotificationService.success(t('general.notifications.removeFromTodo'));
            }
          }),
      },
    });
  }, [t, dispatch, item.id]);

  const handleConvertToTask = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.createTaskModal, {
      props: { isConvertChecklistToTask: true, title: item.title, item },
    });
  }, [item]);

  const handleConvertChecklistItemToTask = useCallback(
    (id: number, title: string) => {
      modalObserver.addModal(ModalNamesEnum.createTaskModal, {
        props: {
          item: { ...item, id, title, checklistId: item.id, description: title },
          isConvertChecklistItemToTask: true,
        },
      });
    },
    [item],
  );

  const handleAccept = useCallback(() => {
    dispatch(
      choseRequestAction({ action: NotificationsActionsEnum.accept, id: item?.userNotification?.id }),
    ).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        dispatch(setChecklistUserNotification({ id: item?.id }));
      }
    });
  }, [item.id, item?.userNotification?.id, dispatch]);

  const handleDecline = useCallback(() => {
    dispatch(choseRequestAction({ action: 'decline', id: item?.userNotification?.id })).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        dispatch(removeChecklist(item.id));
      }
    });
  }, [item.id, item?.userNotification?.id, dispatch]);

  const handleSetEditTitle = () => {
    setTimeout(() => {
      setIsEditTitle(true);
    }, 100);
  };

  const checklistMenuList: ActionMenuListModel = useMemo(() => {
    if (!!item?.userNotification) {
      return [
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
      isCreator && {
        label: t('general.actionMenus.convertToTask'),
        callback: handleConvertToTask,
        isDisabled: false,
      },
      {
        label: t('general.actionMenus.duplicate'),
        callback: handleDuplicateChecklist,
        isDisabled: false,
      },
      isEditor && {
        label: t('general.actionMenus.share'),
        callback: handleOpenShareModal,
        isDisabled: false,
      },
      isEditor &&
        isMobileDisplay && {
          label: t('general.actionMenus.editTitle'),
          callback: handleSetEditTitle,
          isDisabled: false,
        },
      !!item.is_done === false &&
        isEditor && {
          label: t('general.actionMenus.complete'),
          callback: handleCompleteChecklists,
          isDisabled: false,
        },
      !!item.is_done &&
        isEditor && {
          label: t('general.actionMenus.uncomplete'),
          callback: handleUncompleteChecklists,
          isDisabled: false,
        },
      isCreator && {
        label: t('general.actionMenus.delete'),
        callback: handleRemoveChecklist,
        isDisabled: false,
      },
      !isCreator && {
        label: t('general.actionMenus.removeYourself'),
        callback: handleRemoveYourselfFromChecklist,
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [
    item?.userNotification,
    item.is_done,
    isCreator,
    t,
    handleConvertToTask,
    handleDuplicateChecklist,
    isEditor,
    handleOpenShareModal,
    isMobileDisplay,
    handleCompleteChecklists,
    handleUncompleteChecklists,
    handleRemoveChecklist,
    handleRemoveYourselfFromChecklist,
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
            if (item.is_done) {
              handleUncompleteChecklists();
            }
          } else {
            errorsHandler(result, setError);
          }
        })
        .finally(() => setIsShowFormLoader(false));
    },
    [dispatch, handleUncompleteChecklists, item.id, item.is_done],
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

  return isMobileDisplay ? (
    <ChecklistMobileCard
      item={item}
      iconItem={iconItem}
      menuList={checklistMenuList}
      isEditTitle={isEditTitle}
      setIsEditTitle={setIsEditTitle}
      handleDeleteChecklistItem={handleDeleteChecklistItem}
      handleConvertChecklistItemToTask={handleConvertChecklistItemToTask}
      sortedChecklistData={sortedChecklistData}
      handleOpenShareModal={handleOpenShareModal}
      permissions={{ isEditor, isCreator }}
      isNotAcceptedItem={!!item?.userNotification}
      handleDecline={handleDecline}
      handleAccept={handleAccept}
      isCanDnD={isCanDnD}
      isExpanded={isExpanded}
      onToggleExpand={onToggleExpand}
      handleUpdateChecklistItem={handleUpdateChecklistItem}
      handleUpdateChecklistDueDate={handleUpdateChecklistDueDate}
      onSubmit={onSubmit}
      isDndActive={isDndActive}
      handleUpdateChecklist={handleUpdateChecklist}
      handleOpenAttachFilesModal={handleOpenAttachFilesModal}
      handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
      isShowFormLoader={isShowFormLoader}
    />
  ) : (
    <ChecklistDesktopCard
      item={item}
      onSubmit={onSubmit}
      isCanDnD={isCanDnD}
      handleOpenAttachFilesModal={handleOpenAttachFilesModal}
      isShowFormLoader={isShowFormLoader}
      iconItem={iconItem}
      handleUpdateChecklist={handleUpdateChecklist}
      handleUpdateChecklistItem={handleUpdateChecklistItem}
      menuList={checklistMenuList}
      isDndActive={isDndActive}
      handleDeleteChecklistItem={handleDeleteChecklistItem}
      handleConvertChecklistItemToTask={handleConvertChecklistItemToTask}
      sortedChecklistData={sortedChecklistData}
      handleUpdateChecklistDueDate={handleUpdateChecklistDueDate}
      handleOpenShareModal={handleOpenShareModal}
      permissions={{ isEditor, isCreator }}
      isNotAcceptedItem={!!item?.userNotification}
      isCanDraggable={isCanDraggable}
      handleDecline={handleDecline}
      handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
      handleAccept={handleAccept}
    />
  );
};

export default ChecklistCard;
