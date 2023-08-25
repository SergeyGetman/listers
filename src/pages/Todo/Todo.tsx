/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MasonryScroller, useContainerPosition, usePositioner, useResizeObserver } from 'masonic';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { UseFormSetError } from 'react-hook-form';
import { useWindowSize } from '@react-hook/window-size';
import { TodoContainer, TodoScrollableContainer } from './Todo.style';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import { getConnections } from '../../store/Profile/profile.actions';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { AddBottomButtonContainer } from '../../shared/styles/AddBottomButtonContainer';
import PlusActionMenu from '../../components/actionMenus/PlusActionMenu';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import Stub from '../../components/stubs/Stub';
import { toDoStubConfig } from '../../shared/configs/stub.config';
import { createTodoItem, getTodoItems } from '../../store/todo/todoThunk';
import TodoCard from '../../components/itemCards/TodoCard';
import { PageStubContainer } from '../../shared/styles/StubContainer';
import errorsHandler from '../../shared/functions/errorsHandler';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { addTodoItem, resetTodoState } from '../../store/todo/todoSlice';
import WelcomeStub from '../../components/stubs/WelcomeStub';
import { todoWelcomePageStubConfig } from '../../shared/configs/welcomePageStubs/todoWelcomePageStub.config';
import TodoSkeletons from './components/TodoSkeletons';
import modalObserver from '../../shared/utils/observers/modalObserver';

const Todo = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isGetInitialData, setIsGetInitialData] = useState<boolean>(false);
  const { todoData, isListOver } = useAppSelector(({ todo }) => todo);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  const containerRef = React.useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [windowWidth, windowHeight, isGetInitialData]);
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);
  const positioner = usePositioner({ width, columnWidth: 300, columnGutter: 3 }, [todoData?.data?.length]);
  const resizeObserver = useResizeObserver(positioner);
  const profileData = useAppSelector(({ profile }) => profile.data);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.todo') }]));
    dispatch(getConnections());
  }, [dispatch]);
  const listRef = useRef<any>();
  const handleOpenCreateTodoModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.createTodoModal, {});
  }, [dispatch]);
  const todoId = searchParams.get('todoId');

  const fetchMoreData = (page?: number) => {
    if (!isListOver) {
      dispatch(
        getTodoItems({
          page: page ? page : todoData.meta.current_page + 1,
        }),
      );
    }
  };
  const [showSlider, setShowSlider] = useState(true);

  useEffect(() => {
    if (profileData?.view_data?.is_view_todo === true) {
      setIsGetInitialData(false);
      dispatch(
        getTodoItems({
          page: 1,
        }),
      ).then((result) => {
        if (getTodoItems.fulfilled.match(result)) {
          setIsGetInitialData(true);
          fetchMoreData(2);
        }
      });
    }

    return () => {
      dispatch(resetTodoState());
    };
  }, [dispatch, showSlider, profileData?.view_data?.is_view_todo]);

  useEffect(() => {
    if (todoId) {
      modalObserver.addModal(ModalNamesEnum.viewTodoModal, { props: { todoId: todoId, isOpenEditMode } });
    }
  }, [todoId, isOpenEditMode]);

  const handleOpenTodoItem = useCallback(
    (itemId: number, editMode?: boolean) => {
      setSearchParams({ todoId: itemId.toString() });
      setIsOpenEditMode(editMode ? editMode : false);
    },
    [setSearchParams],
  );

  const createTodoContainer = useCallback(
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
      modalObserver.addModal(ModalNamesEnum.todoConfirmModal, {
        props: {
          selectedStatus: title,
          handleConfirm: (
            data: { title: string },
            setError: UseFormSetError<{ title: string }>,
            onClose: () => void,
          ) =>
            dispatch(createTodoItem({ ...submitData, title: data.title })).then((result) => {
              if (createTodoItem.fulfilled.match(result)) {
                onClose();
                NotificationService.success(t('general.notifications.todoAdded'));
                dispatch(addTodoItem(result.payload));
              } else {
                errorsHandler(result, setError);
              }
            }),
        },
      });
    },
    [dispatch, t],
  );

  const menuList = [
    {
      label: `${t('general.todoActionMenuPreset.shopping')}`,
      callback: () => createTodoContainer(t('general.todoActionMenuPreset.shopping'), '🛍️'),
      isContainStartIcon: true,
      startIcon: '🛍️',
      isDisabled: false,
    },
    {
      label: `${t('general.todoActionMenuPreset.work')}`,
      callback: () => createTodoContainer(t('general.todoActionMenuPreset.work'), '💼'),
      isContainStartIcon: true,
      startIcon: '💼',
      isDisabled: false,
    },
    {
      label: `${t('general.todoActionMenuPreset.products')}`,
      callback: () => createTodoContainer(t('general.todoActionMenuPreset.products'), '🛒'),

      isContainStartIcon: true,
      startIcon: '🛒',
      isDisabled: false,
    },
    {
      label: `${t('general.todoActionMenuPreset.cleaning')}`,
      callback: () => createTodoContainer(t('general.todoActionMenuPreset.cleaning'), '🧹'),

      isContainStartIcon: true,
      startIcon: '🧹',
      isDisabled: false,
    },
    {
      label: `${t('general.todoActionMenuPreset.party')}`,
      callback: () => createTodoContainer(t('general.todoActionMenuPreset.party'), '🎉'),
      isContainStartIcon: true,
      startIcon: '🎉',
      isDisabled: false,
    },
    {
      label: `${t('general.todoActionMenuPreset.custom')}`,
      callback: () => handleOpenCreateTodoModal(),
      isContainStartIcon: true,
      startIcon: '🖋️',
      isDisabled: false,
    },
  ];

  const renderItem = useCallback((item: any) => {
    return (
      <Box
        sx={{
          pb: { sm: '30px', xs: '16px' },
          pl: { sm: '10px', xs: '0' },
          pr: { sm: '10px', xs: '0' },
          width: '100%',
        }}
      >
        <TodoCard item={item.data} handleOpenTodoItem={handleOpenTodoItem} />
      </Box>
    );
  }, []);

  if (profileData?.view_data.is_view_todo === false) {
    return (
      <PageStubContainer isWelcomeSlider onClick={() => setShowSlider(false)}>
        <WelcomeStub sliderOptions={todoWelcomePageStubConfig} />
      </PageStubContainer>
    );
  }

  return (
    <TodoContainer ref={containerRef}>
      {isGetInitialData ? (
        <>
          {todoData?.data?.length ? (
            <TodoScrollableContainer ref={listRef}>
              <MasonryScroller
                items={todoData.data}
                resizeObserver={resizeObserver}
                render={renderItem}
                positioner={positioner}
                overscanBy={100}
                offset={offset}
                style={{ outline: 'none' }}
                height={windowHeight}
              />
            </TodoScrollableContainer>
          ) : (
            <PageStubContainer>
              <Stub value={toDoStubConfig} />
            </PageStubContainer>
          )}
        </>
      ) : (
        <TodoSkeletons />
      )}

      <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
        <PlusActionMenu menuList={menuList} />
      </AddBottomButtonContainer>
    </TodoContainer>
  );
};

export default React.memo(Todo);
