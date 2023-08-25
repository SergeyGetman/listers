import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
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
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useNavigate } from 'react-router';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import CircularButton from '../../../../components/buttons/CilrcularButton';
import { AddBottomButtonContainer } from '../../../../shared/styles/AddBottomButtonContainer';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import {
  createChecklistItem,
  getChecklistsItems,
  handleSortChecklistsData,
} from '../../../../store/todo/Checklists/checklistsThunk';
import {
  addChecklist,
  resetChecklistsData,
  setNewChecklistsData,
} from '../../../../store/todo/Checklists/checklistsSlice';
import ChecklistsSkeletons from './components/ChecklistsSkeletons';
import ChecklistCard from '../../../../components/itemCards/ChecklistCard';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { getChecklistItemConfig } from '../../../../shared/configs/todo/checklistItem.config';
import { checklistsNoItemsStubConfig, noFilterMatchStubConfig } from '../../../../shared/configs/stub.config';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';
import { TodoItemModel } from '../../../../shared/models/todo/todoItemModel';
import Stub from '../../../../components/stubs/Stub';
import { getConnections } from '../../../../store/Profile/profile.actions';
import NoItemsStub from '../../../../components/stubs/NoItemsStub';
import { TodoContainer } from './Checklists.style';
import { setProfileViewDataItem } from '../../../../store/Profile/profile.slice';
import { ProfileViewDataEnum } from '../../../../shared/enums/profileViewData.enum';
import { getTodoAddItemsConfig } from '../../../../shared/configs/todo/todoAddItems.config';
import { TodoItemTypeEnum } from '../../../../shared/enums/todo/todoItemType.enum';
import router from '../../../../shared/services/router';
import { createNoteItem } from '../../../../store/todo/Notes/notesThunk';
import { addNote } from '../../../../store/todo/Notes/notesSlice';
import ChipsActionMenu from '../../../../components/actionMenus/ChipsActionMenu/ChipsActionMenu';

const Checklists = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeId, setActiveId] = useState(null);
  const isViewTodo = useAppSelector(({ profile }) => profile.data.view_data.is_view_todo);
  const todoAddItemConfig = getTodoAddItemsConfig(t, false);
  const navigate = useNavigate();

  const checklistItemConfig = getChecklistItemConfig(t);
  const { checklistsData, isListOver, isLoading, filters, isFetchingWithFilter, isCanDnD } = useAppSelector(
    ({ todoChecklists }) => todoChecklists,
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

          if (!isViewTodo) {
            dispatch(setProfileViewDataItem(ProfileViewDataEnum.is_view_todo));
          }
        }
      });
    },
    [dispatch, t, isViewTodo],
  );

  const fetchMoreData = () => {
    if (!isListOver) {
      dispatch(
        getChecklistsItems({
          page: checklistsData.meta.current_page + 1,
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

  const sortedChecklistData = useMemo(() => {
    if (!checklistsData?.data?.length) {
      return {
        notAccepted: [],
        completed: [],
        defaultItems: [],
      };
    }
    const notAccepted = checklistsData.data.filter((i: TodoItemModel) => i?.userNotification?.id);
    const completed = checklistsData.data.filter(
      (i: TodoItemModel) => !!i.is_done && !i?.userNotification?.id,
    );
    const defaultItems = checklistsData.data.filter(
      (i: TodoItemModel) => !!i.is_done === false && !i?.userNotification?.id,
    );
    return {
      notAccepted,
      completed,
      defaultItems,
    };
  }, [checklistsData?.data]);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.checklists') }]));
    dispatch(getConnections());
  }, [isMobileDisplay, dispatch, t]);

  useEffect(() => {
    dispatch(
      getChecklistsItems({
        page: 1,
        ...filters,
      }),
    );
    return () => {
      dispatch(resetChecklistsData());
    };
  }, [dispatch, filters]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = checklistsData.data.findIndex(({ id }: { id: number }) => id === active.id);
      const newIndex = checklistsData.data.findIndex(({ id }: { id: number }) => id === over.id);
      const newPosition = sortedChecklistData.defaultItems.findIndex(
        ({ id }: { id: number }) => id === over.id,
      );
      const canceledSort = checklistsData.data;

      dispatch(setNewChecklistsData(arrayMove(checklistsData.data, oldIndex, newIndex)));
      dispatch(handleSortChecklistsData({ id: active.id, index: newPosition, canceledSort }));
    }
  };
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
  }, [dispatch, t, isViewTodo]);
  const handleClick = (type: TodoItemTypeEnum) => {
    if (type === TodoItemTypeEnum.note) {
      createNote();

      navigate(`${router.todo.path}/${router.todo.children.notes.path}`);
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
    <TodoContainer sx={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} onScroll={handleScroll}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {checklistsData?.data?.length ? (
          <SortableContext
            items={sortedChecklistData?.defaultItems}
            strategy={isMobileDisplay ? verticalListSortingStrategy : rectSortingStrategy}
          >
            <Grid
              container
              rowSpacing={{ xs: '16px', sm: '24px' }}
              columnSpacing="24px"
              sx={{
                scrollbarWidth: 'none',
                overflowX: 'hidden',
                msOverflowStyle: 'none',
                pb: '30px',
                '& ::-webkit-scrollbar': {
                  width: '0px !important',
                },
                '@media (max-width: 650px)': { justifyContent: 'center' },
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'center',
                },
              }}
            >
              {sortedChecklistData?.notAccepted.length > 0 &&
                sortedChecklistData?.notAccepted.map((item: TodoItemModel, index: number) => {
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
                      <ChecklistCard item={item} />
                    </Grid>
                  );
                })}
              {sortedChecklistData?.defaultItems.length > 0 &&
                sortedChecklistData?.defaultItems.map((item: TodoItemModel, index: number) => {
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
                      <ChecklistCard isCanDnD={isCanDnD} key={item.id} item={item} />
                    </Grid>
                  );
                })}
              {sortedChecklistData?.completed.length > 0 &&
                sortedChecklistData?.completed.map((item: TodoItemModel, index: number) => {
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
                      <ChecklistCard isCanDraggable={false} key={item.id} item={item} />
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
                      height: { xs: '48px', sm: '348px' },
                      borderRadius: '5px',
                    }}
                    variant="rectangular"
                  />
                </Grid>
              )}
            </Grid>
            <DragOverlay>
              {activeId ? (
                <ChecklistCard
                  isCanDnD
                  isDndActive
                  item={
                    checklistsData?.data?.find(
                      (item: TodoItemModel) => item?.id === activeId,
                    ) as TodoItemModel
                  }
                />
              ) : null}
            </DragOverlay>
          </SortableContext>
        ) : (
          <></>
        )}
      </DndContext>

      {checklistsData?.data?.length === 0 &&
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
            <NoItemsStub value={checklistsNoItemsStubConfig} />
          </PageStubContainer>
        ))}

      {!checklistsData?.data?.length && isLoading && <ChecklistsSkeletons />}

      {isMobileDisplay && (
        <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
          <ChipsActionMenu menuList={menuList}>
            <CircularButton size="large" onClick={() => true} />
          </ChipsActionMenu>
        </AddBottomButtonContainer>
      )}
    </TodoContainer>
  );
};

export default React.memo(Checklists);
