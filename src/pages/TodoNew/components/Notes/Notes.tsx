import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useNavigate } from 'react-router';
import { NotesContainer } from './Notes.style';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import NoteCard from '../../../../components/itemCards/NoteCard';
import NotesSkeletons from './components/NotesSkeletons';
import { createNoteItem, getNotesItems, handleSortNotesData } from '../../../../store/todo/Notes/notesThunk';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { addNote, resetNotesData, setNewNotesData } from '../../../../store/todo/Notes/notesSlice';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';
import Stub from '../../../../components/stubs/Stub';
import { noFilterMatchStubConfig, notesNoItemsStubConfig } from '../../../../shared/configs/stub.config';
import { getConnections } from '../../../../store/Profile/profile.actions';
import { AddBottomButtonContainer } from '../../../../shared/styles/AddBottomButtonContainer';
import CircularButton from '../../../../components/buttons/CilrcularButton';
import NoItemsStub from '../../../../components/stubs/NoItemsStub';
import { TodoItemModel } from '../../../../shared/models/todo/todoItemModel';
import { setProfileViewDataItem } from '../../../../store/Profile/profile.slice';
import { ProfileViewDataEnum } from '../../../../shared/enums/profileViewData.enum';
import { getTodoAddItemsConfig } from '../../../../shared/configs/todo/todoAddItems.config';
import { TodoItemTypeEnum } from '../../../../shared/enums/todo/todoItemType.enum';
import router from '../../../../shared/services/router';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { createChecklistItem } from '../../../../store/todo/Checklists/checklistsThunk';
import { addChecklist } from '../../../../store/todo/Checklists/checklistsSlice';
import { getChecklistItemConfig } from '../../../../shared/configs/todo/checklistItem.config';
import ChipsActionMenu from '../../../../components/actionMenus/ChipsActionMenu/ChipsActionMenu';

const Notes = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(null);
  const dispatch = useAppDispatch();
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const isViewTodo = useAppSelector(({ profile }) => profile.data.view_data.is_view_todo);
  const navigate = useNavigate();
  const todoAddItemConfig = getTodoAddItemsConfig(t, false);
  const checklistItemConfig = getChecklistItemConfig(t);

  const { notesData, isLoading, filters, isFetchingWithFilter, isListOver, isCanDnD } = useAppSelector(
    ({ todoNotes }) => todoNotes,
  );
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: isMobileDisplay ? 300 : 0,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: isMobileDisplay ? 300 : 0,
        tolerance: 5,
      },
    }),
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
        if (!isViewTodo) {
          dispatch(setProfileViewDataItem(ProfileViewDataEnum.is_view_todo));
        }
      }
    });
  }, [dispatch, isViewTodo, t]);

  useEffect(() => {
    dispatch(
      getNotesItems({
        page: 1,
        ...filters,
      }),
    );
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.notes') }]));
    dispatch(getConnections());

    return () => {
      dispatch(resetNotesData());
    };
  }, [dispatch, filters, t]);

  const fetchMoreData = () => {
    if (!isListOver) {
      dispatch(
        getNotesItems({
          page: notesData.meta.current_page + 1,
          ...filters,
        }),
      );
    }
  };
  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !isLoading) {
      fetchMoreData();
    }
  };

  const sortedNotesData = useMemo(() => {
    if (!notesData?.data?.length) {
      return {
        notAccepted: [],
        defaultItems: [],
      };
    }
    const notAccepted = notesData.data.filter((i: TodoItemModel) => i?.userNotification?.id);
    const defaultItems = notesData.data.filter((i: TodoItemModel) => !i?.userNotification?.id);
    return {
      notAccepted,
      defaultItems,
    };
  }, [notesData?.data]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = notesData.data.findIndex(({ id }: { id: number }) => id === active.id);
      const newIndex = notesData.data.findIndex(({ id }: { id: number }) => id === over.id);
      const newPosition = sortedNotesData?.defaultItems.findIndex(({ id }: { id: number }) => id === over.id);

      const canceledSort = notesData.data;
      dispatch(setNewNotesData(arrayMove(notesData.data, oldIndex, newIndex)));
      if (newPosition >= 0) {
        dispatch(handleSortNotesData({ id: active.id, index: newPosition, canceledSort }));
      }
    }
  };
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
          navigate(`${router.todo.path}`);
          if (!isViewTodo) {
            dispatch(setProfileViewDataItem(ProfileViewDataEnum.is_view_todo));
          }
        }
      });
    },
    [dispatch, t, navigate, isViewTodo],
  );

  const handleClick = (type: TodoItemTypeEnum) => {
    if (type === TodoItemTypeEnum.note) {
      createNote();
    } else {
      modalObserver.addModal(ModalNamesEnum.checklistTemplatesModal, {
        props: {
          callback: (key: string) => {
            createChecklist(checklistItemConfig[key].label, checklistItemConfig[key].icon);
          },
        },
      });
    }
  };
  const menuList = [
    {
      item: todoAddItemConfig[TodoItemTypeEnum.checklist],
      callback: () => handleClick(TodoItemTypeEnum.checklist),
    },
    {
      item: todoAddItemConfig[TodoItemTypeEnum.note],
      callback: () => handleClick(TodoItemTypeEnum.note),
    },
  ];
  return (
    <NotesContainer onScroll={handleScroll}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {notesData?.data?.length ? (
          <SortableContext
            items={sortedNotesData?.defaultItems}
            strategy={isMobileDisplay ? verticalListSortingStrategy : rectSortingStrategy}
          >
            <Grid
              container
              rowSpacing={{ xs: '16px', sm: '24px' }}
              columnSpacing="24px"
              sx={{
                overflowX: 'hidden',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '& ::-webkit-scrollbar': {
                  width: '0px !important',
                },
                pb: '30px',
                '@media (max-width: 650px)': { justifyContent: 'center' },
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'center',
                },
              }}
            >
              {sortedNotesData?.notAccepted.map((item: any, index: number) => {
                return (
                  <Grid
                    sx={{
                      '@media (min-width: 0px)': { width: '100%' },
                      '@media (min-width: 650px)': { width: '50%' },
                      '@media (min-width: 1200px)': { width: '33.33%' },
                      '@media (min-width: 1650px)': { width: '25%' },
                    }}
                    item
                    key={index}
                  >
                    <NoteCard key={item.id} item={item} />
                  </Grid>
                );
              })}
              {sortedNotesData?.defaultItems.map((item: any, index: number) => {
                return (
                  <Grid
                    sx={{
                      '@media (min-width: 0px)': { width: '100%' },
                      '@media (min-width: 650px)': { width: '50%' },
                      '@media (min-width: 1200px)': { width: '33.33%' },
                      '@media (min-width: 1650px)': { width: '25%' },
                    }}
                    item
                    key={index}
                  >
                    <NoteCard isCanDnD={isCanDnD} key={item.id} item={item} />
                  </Grid>
                );
              })}

              {isLoading && (
                <Grid
                  sx={{
                    '@media (min-width: 0px)': { width: '100%' },
                    '@media (min-width: 650px)': { width: '50%' },
                    '@media (min-width: 1200px)': { width: '33.33%' },
                    '@media (min-width: 1650px)': { width: '25%' },
                  }}
                  item
                >
                  <Skeleton
                    sx={{
                      width: '100%',
                      minWidth: '300px',
                      maxWidth: '650px',
                      height: { xs: '48px', sm: '291px' },
                      borderRadius: '5px',
                    }}
                    variant="rectangular"
                  />
                </Grid>
              )}
            </Grid>

            <DragOverlay>
              {activeId ? (
                <NoteCard
                  isDndActive
                  isCanDnD
                  item={notesData?.data?.find((item: any) => item?.id === activeId)}
                />
              ) : null}
            </DragOverlay>
          </SortableContext>
        ) : (
          <></>
        )}
      </DndContext>

      {notesData?.data?.length === 0 &&
        !isLoading &&
        (isFetchingWithFilter ? (
          <PageStubContainer
            sx={{ pt: isMobileDisplay ? '0 !important' : '', height: isMobileDisplay ? 'auto' : '' }}
            isNoFilterMatch
          >
            <Stub isBoltSubtitleText={false} value={noFilterMatchStubConfig} />
          </PageStubContainer>
        ) : (
          <PageStubContainer
            sx={{ pt: isMobileDisplay ? '0 !important' : '', height: isMobileDisplay ? 'auto' : '' }}
          >
            <NoItemsStub value={notesNoItemsStubConfig} />
          </PageStubContainer>
        ))}

      {!notesData?.data?.length && isLoading && <NotesSkeletons />}

      {isMobileDisplay && (
        <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
          <ChipsActionMenu menuList={menuList}>
            <CircularButton size="large" onClick={() => true} />
          </ChipsActionMenu>
        </AddBottomButtonContainer>
      )}
    </NotesContainer>
  );
};

export default React.memo(Notes);
