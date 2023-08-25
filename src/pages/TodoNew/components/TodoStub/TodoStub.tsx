import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@mui/material';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';
import StubWithCreateVariants from '../../../../components/stubs/StubWithCreateVariants';
import { TodoItemTypeEnum } from '../../../../shared/enums/todo/todoItemType.enum';
import { getTodoAddItemsConfig } from '../../../../shared/configs/todo/todoAddItems.config';
import { getChecklistItemConfig } from '../../../../shared/configs/todo/checklistItem.config';
import { createChecklistItem } from '../../../../store/todo/Checklists/checklistsThunk';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { addChecklist } from '../../../../store/todo/Checklists/checklistsSlice';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { setProfileViewDataItem } from '../../../../store/Profile/profile.slice';
import { ProfileViewDataEnum } from '../../../../shared/enums/profileViewData.enum';
import { createNoteItem } from '../../../../store/todo/Notes/notesThunk';
import { addNote } from '../../../../store/todo/Notes/notesSlice';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import { getConnections } from '../../../../store/Profile/profile.actions';
import { todoBaseStubConfig } from '../../../../shared/configs/stub.config';
import NoItemsStub from '../../../../components/stubs/NoItemsStub';

const TodoStub: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const { t } = useTranslation();
  const todoAddItemsConfig = getTodoAddItemsConfig(t, true);
  const checklistItemConfig = getChecklistItemConfig(t);

  const createChecklist = useCallback(
    (title: string, icon: string) => {
      const submitData = {
        title,
        documents: [],
        users: [],
        description: '',
        photos: [],
        icon: icon,
        color: null,
        due_dated_at: null,
      };
      dispatch(createChecklistItem(submitData)).then((result) => {
        if (createChecklistItem.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.todoAdded'));
          dispatch(addChecklist(result.payload));
          modalObserver.removeModal(ModalNamesEnum.checklistTemplatesModal);
          modalObserver.removeModal(ModalNamesEnum.withCreateVariantsModal);
          dispatch(setProfileViewDataItem(ProfileViewDataEnum.is_view_todo));
        }
      });
    },
    [dispatch, t],
  );

  const createNote = useCallback(() => {
    const submitData = {
      title: 'New note',
      documents: [],
      users: [],
      description: '',
      photos: [],
    };
    dispatch(createNoteItem(submitData)).then((result) => {
      if (createNoteItem.fulfilled.match(result)) {
        NotificationService.success(t('general.notifications.noteAdded'));
        dispatch(addNote(result.payload));
        dispatch(setProfileViewDataItem(ProfileViewDataEnum.is_view_todo));
      }
    });
  }, [dispatch, t]);

  const handleOpenChecklistTemplatesModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.checklistTemplatesModal, {
      props: {
        callback: (key: string) => {
          createChecklist(checklistItemConfig[key].label, checklistItemConfig[key].icon);
        },
      },
    });
  }, [checklistItemConfig, createChecklist]);

  const stubMenuList = useMemo(() => {
    return [
      {
        item: todoAddItemsConfig[TodoItemTypeEnum.checklist],
        callback: handleOpenChecklistTemplatesModal,
      },
      {
        item: todoAddItemsConfig[TodoItemTypeEnum.note],
        callback: createNote,
      },
    ];
  }, [todoAddItemsConfig, handleOpenChecklistTemplatesModal, createNote]);

  const handleOpenWithCreateVariantsModalModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.withCreateVariantsModal, {
      props: { menuList: stubMenuList },
    });
  }, [stubMenuList]);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.todo') }]));
    dispatch(getConnections());
  }, [isMobileDisplay, handleOpenWithCreateVariantsModalModal, dispatch, t]);

  return (
    <>
      {isMobileDisplay ? (
        <NoItemsStub handleAddItem={handleOpenWithCreateVariantsModalModal} value={todoBaseStubConfig} />
      ) : (
        <PageStubContainer>
          <StubWithCreateVariants createItemList={stubMenuList} label={t('stubs.todo.baseStub.title')} />
        </PageStubContainer>
      )}
    </>
  );
};

export default React.memo(TodoStub);
