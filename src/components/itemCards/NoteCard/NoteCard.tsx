import React, { FC, useCallback, useMemo, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TodoItemModel } from '../../../shared/models/todo/todoItemModel';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../shared/functions/typeGuardFormActionMenu';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { useAppDispatch } from '../../../shared/hooks/redux';
import {
  changeIsOpenNote,
  deleteNote,
  removeYourselfFromNote,
  updateNotesItem,
  updateUsersNote,
} from '../../../store/todo/Notes/notesThunk';
import {
  changeNoteIsOpenValue,
  removeNote,
  setNoteUserNotification,
  updateNote,
} from '../../../store/todo/Notes/notesSlice';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';
import { choseRequestAction } from '../../../store/RightSidebar/Notifications/notificationsActions';
import { NotificationsActionsEnum } from '../../../shared/enums/notificationsEnum';
import NoteDesktopCard from './components/NoteDesktopCard/NoteDesktopCard';
import NoteMobileCard from './components/NoteMobileCard/NoteMobileCard';
import { MediaType } from '../../../shared/models/media.model';

type Props = {
  item: TodoItemModel;
  isCanDnD?: boolean;
  isDndActive?: boolean;
};

const NoteCard: FC<Props> = ({ item, isCanDnD, isDndActive }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditBody, setIsEditBody] = useState(false);
  const [isExpanded, toggleExpand] = useState<boolean>(!!item.is_open);

  const isEditor = useMemo(() => {
    return item.current_user.role !== AssignPeoplePermissionsEnum.viewer;
  }, [item.current_user.role]);
  const isCreator = useMemo(() => {
    return item.current_user.role === AssignPeoplePermissionsEnum.creator;
  }, [item.current_user.role]);

  const onToggleExpand = useCallback(() => {
    toggleExpand(!isExpanded);
    dispatch(changeIsOpenNote({ noteId: item.id, is_open: !isExpanded ? 1 : 0 })).then((result) => {
      if (changeIsOpenNote.fulfilled.match(result)) {
        dispatch(changeNoteIsOpenValue({ noteId: item.id, is_open: !isExpanded ? 1 : 0 }));
      }
    });
  }, [isExpanded, item.id, dispatch]);

  const isNotAcceptedItem = useMemo(() => {
    return !!item?.userNotification;
  }, [item?.userNotification]);

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
            dispatch(updateNotesItem({ noteId: item.id, item: { ...item, documents: doc } })).then(
              (result) => {
                if (updateNotesItem.fulfilled.match(result)) {
                  dispatch(updateNote(result.payload));
                }
              },
            ),
          ),
      },
    });
  }, [dispatch, isEditor, item, t]);

  const handleRemoveNote = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.deleteNote.title'),
        text: t('general.modals.deleteNote.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          Promise.resolve().then(() =>
            dispatch(deleteNote({ noteId: item.id })).then((result) => {
              if (deleteNote.fulfilled.match(result)) {
                dispatch(removeNote(result.payload));
                NotificationService.success(t('general.notifications.noteDeleted'));
              }
            }),
          ),
      },
    });
  }, [t, dispatch, item.id]);

  const handleRemoveYourselfFromNote = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.removeYourselfFromNote.title'),
        text: t('general.modals.removeYourselfFromNote.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () =>
          dispatch(removeYourselfFromNote({ noteId: item.id })).then((result) => {
            if (removeYourselfFromNote.fulfilled.match(result)) {
              dispatch(removeNote(result.payload));
              NotificationService.success(t('general.notifications.removeFromNote'));
            }
          }),
      },
    });
  }, [t, dispatch, item.id]);

  const handleOpenShareModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.shareModal, {
      props: {
        users: item?.users,
        owner: item?.owner,
        title: t('general.header.shareWith'),
        handleConfirm: (users: AssignPeopleSelectValueModel[]) =>
          Promise.resolve().then(() =>
            dispatch(updateUsersNote({ users, noteId: item.id })).then((result) => {
              if (updateUsersNote.fulfilled.match(result)) {
                dispatch(updateNote(result.payload));
                NotificationService.success(t('general.notifications.noteUpdated'));
              }
            }),
          ),
      },
    });
  }, [dispatch, item?.id, item?.owner, item?.users, t]);

  const handleAccept = useCallback(() => {
    dispatch(
      choseRequestAction({ action: NotificationsActionsEnum.accept, id: item?.userNotification?.id }),
    ).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        dispatch(setNoteUserNotification({ id: item?.id }));
      }
    });
  }, [item.id, item?.userNotification?.id, dispatch]);

  const handleDecline = useCallback(() => {
    dispatch(choseRequestAction({ action: 'decline', id: item?.userNotification?.id })).then((result) => {
      if (choseRequestAction.fulfilled.match(result)) {
        dispatch(removeNote(item.id));
      }
    });
  }, [item.id, item?.userNotification?.id, dispatch]);

  const handleUpdateNotesTitle = ({
    noteId,
    title,
    callback,
  }: {
    noteId: number;
    title: string;
    callback: () => void;
  }) => {
    dispatch(updateNotesItem({ noteId, item: { ...item, title } }))
      .then((result) => {
        if (updateNotesItem.fulfilled.match(result)) {
          dispatch(updateNote(result.payload));
        }
      })
      .finally(() => callback());
  };

  const handleUpdateNotesDescription = ({
    noteId,
    description,
    callback,
  }: {
    noteId: number;
    description: string;
    callback: () => void;
  }) => {
    dispatch(updateNotesItem({ noteId, item: { ...item, description } }))
      .then((result) => {
        if (updateNotesItem.fulfilled.match(result)) {
          dispatch(updateNote(result.payload));
        }
      })
      .finally(() => callback());
  };

  const handleSetEditTitle = () => {
    setTimeout(() => {
      setIsEditTitle(true);
    }, 100);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSetEditBody = () => {
    if (!isExpanded) {
      onToggleExpand();
      setTimeout(() => {
        setIsEditBody(true);
      }, 100);
    } else {
      setTimeout(() => {
        setIsEditBody(true);
      }, 100);
    }
  };

  const menuList: ActionMenuListModel = useMemo(() => {
    if (isNotAcceptedItem) {
      return [
        {
          label: t('general.actionMenus.accept'),
          callback: handleAccept,
          isDisabled: false,
        },
        {
          label: t('general.actionMenus.decline'),
          callback: handleDecline,
          isDisabled: false,
        },
      ];
    }
    return [
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
      isEditor &&
        isMobileDisplay && {
          label: t('general.actionMenus.editNote'),
          callback: handleSetEditBody,
          isDisabled: false,
        },
      isCreator && {
        label: t('general.actionMenus.delete'),
        callback: handleRemoveNote,
        isDisabled: false,
      },
      !isCreator && {
        label: t('general.actionMenus.removeYourself'),
        callback: handleRemoveYourselfFromNote,
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [
    isNotAcceptedItem,
    isEditor,
    t,
    handleOpenShareModal,
    isMobileDisplay,
    handleSetEditBody,
    isCreator,
    handleRemoveNote,
    handleRemoveYourselfFromNote,
    handleAccept,
    handleDecline,
  ]);

  return isMobileDisplay ? (
    <NoteMobileCard
      item={item}
      isEditTitle={isEditTitle}
      setIsEditTitle={setIsEditTitle}
      isEditBody={isEditBody}
      setIsEditBody={setIsEditBody}
      menuList={menuList}
      handleOpenShareModal={handleOpenShareModal}
      permissions={{ isEditor, isCreator }}
      isNotAcceptedItem={!!item?.userNotification}
      handleOpenAttachFilesModal={handleOpenAttachFilesModal}
      handleDecline={handleDecline}
      isCanDnD={isCanDnD}
      handleAccept={handleAccept}
      handleUpdateNotesTitle={handleUpdateNotesTitle}
      handleChangeNotesDescription={handleUpdateNotesDescription}
      isExpanded={isExpanded}
      onToggleExpand={onToggleExpand}
      isDndActive={isDndActive}
    />
  ) : (
    <NoteDesktopCard
      item={item}
      menuList={menuList}
      isDndActive={isDndActive}
      isCanDnD={isCanDnD}
      handleOpenShareModal={handleOpenShareModal}
      permissions={{ isEditor, isCreator }}
      handleOpenAttachFilesModal={handleOpenAttachFilesModal}
      handleChangeNotesDescription={handleUpdateNotesDescription}
      handleUpdateNotesTitle={handleUpdateNotesTitle}
      isNotAcceptedItem={!!item?.userNotification}
      handleDecline={handleDecline}
      handleAccept={handleAccept}
    />
  );
};

export default NoteCard;
