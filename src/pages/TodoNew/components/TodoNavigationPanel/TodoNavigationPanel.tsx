import React, { FC, useCallback, useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, Box, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { generateSelectOptions } from '../../../../shared/utils/generateSelectOptions';
import MuiBaseTextFiled from '../../../../components/formElements/MuiBaseTextFiled';
import MuiButton from '../../../../components/buttons/MuiButton';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { createChecklistItem } from '../../../../store/todo/Checklists/checklistsThunk';
import { addChecklist, setTodoFilters } from '../../../../store/todo/Checklists/checklistsSlice';
import { getChecklistItemConfig } from '../../../../shared/configs/todo/checklistItem.config';
import {
  ShareChecklistsFiltersEnum,
  ShareNotesFiltersEnum,
} from '../../../../shared/enums/shareFilters.enum';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import {
  TodoNavigationPanelContainer,
  TodoNavigationPanelDesktopContainer,
  TodoNavigationPanelMobileContentContainer,
  TodoNavigationPanelContentContainer,
} from './TodoNavigationPanel.style';
import MuiIconButton from '../../../../components/buttons/iconButtons/MuiIconButton';
import { ReactComponent as FilterSvg } from '../../../../assets/Images/filter.svg';
import router from '../../../../shared/services/router';
import TodoNavigationFormElements from './components/TodoNavigationFormElements';
import { createNoteItem } from '../../../../store/todo/Notes/notesThunk';
import { addNote, setNotesFilters } from '../../../../store/todo/Notes/notesSlice';
import { setProfileViewDataItem } from '../../../../store/Profile/profile.slice';
import { ProfileViewDataEnum } from '../../../../shared/enums/profileViewData.enum';
import { getTodoAddItemsConfig } from '../../../../shared/configs/todo/todoAddItems.config';
import { TodoItemTypeEnum } from '../../../../shared/enums/todo/todoItemType.enum';
import ChipsActionMenu from '../../../../components/actionMenus/ChipsActionMenu/ChipsActionMenu';
import NavigationTabs from '../../../../components/NavigationTabs';
import { ReactComponent as NoteIcon } from '../../../../assets/Images/todoIcons/note.svg';
import { ReactComponent as ChecklistIcon } from '../../../../assets/Images/todoIcons/checklist.svg';

const TodoNavigationPanel: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const todoAddItemConfig = getTodoAddItemsConfig(t, false);
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletDisplay = useMediaQuery(theme.breakpoints.down('lg'));

  const [isDisabledChecklistsFilters, setIsDisabledChecklistsFilters] = useState({
    only_mine: false,
    shared_by_me: false,
    shared_with_me: false,
    all: false,
    completed: false,
  });

  const [isDisabledNotesFilters, setIsDisabledNotesFilters] = useState({
    only_mine: false,
    shared_by_me: false,
    shared_with_me: false,
    all: false,
  });

  const shareChecklistsFilterOptions = useMemo(() => {
    return generateSelectOptions(
      Object.values(ShareChecklistsFiltersEnum),
      'general.shareFilters',
      isDisabledChecklistsFilters,
    ).filter((item) => item.value !== ShareNotesFiltersEnum.all);
  }, [isDisabledChecklistsFilters]);

  const shareNotesFilterOptions = useMemo(() => {
    return generateSelectOptions(
      Object.values(ShareNotesFiltersEnum),
      'general.shareFilters',
      isDisabledNotesFilters,
    ).filter((item) => item.value !== ShareNotesFiltersEnum.all);
  }, [isDisabledNotesFilters]);

  const { filters } = useAppSelector(({ todoChecklists }) => todoChecklists);

  const notesFilters = useAppSelector(({ todoNotes }) => todoNotes.filters);
  const isViewTodo = useAppSelector(({ profile }) => profile.data.view_data.is_view_todo);

  const isNotesPage = useMemo(() => {
    return location.pathname.includes(`${router.todo.children.notes.path}`);
  }, [location.pathname]);

  const [query, setQuery] = React.useState(
    isNotesPage ? (notesFilters.title ? notesFilters.title : '') : filters.title ? filters.title : '',
  );

  const [activeTabValue, setActiveTabValue] = React.useState(isNotesPage ? 1 : 0);

  const handleChangeNavigation = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue !== activeTabValue) {
      if (newValue === 0) {
        navigate(router.todo.path);
      } else if (newValue === 1) {
        navigate(router.todo.children.notes.path);
      }
      setActiveTabValue(newValue);
    }
  };

  const [shareFilterValue, setShareFilterValue] = React.useState(
    isNotesPage
      ? notesFilters?.shared_filter?.length > 0
        ? notesFilters.shared_filter
        : []
      : filters?.shared_filter?.length > 0
      ? filters.shared_filter
      : [],
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
      if (isNotesPage) {
        navigate(`${router.todo.path}`);
      }
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
    [dispatch, isNotesPage, isViewTodo, navigate, t],
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
  }, [dispatch, t, isViewTodo]);

  const checklistItemConfig = getChecklistItemConfig(t);

  const handleClick = (type: TodoItemTypeEnum) => {
    if (type === TodoItemTypeEnum.note) {
      createNote();
      if (!isNotesPage) {
        navigate(`${router.todo.path}/${router.todo.children.notes.path}`);
      }
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

  const handleOpenFiltersModal = () => {
    modalObserver.addModal(ModalNamesEnum.todoFiltersModal, {
      props: {
        filters: isNotesPage ? notesFilters : filters,
        isNotesPage,
      },
    });
  };

  const debounceSearch = useDebounce((inputValue: string) => {
    if (isNotesPage) {
      dispatch(setNotesFilters({ ...filters, title: !!inputValue.trim().length ? inputValue : null }));
    } else {
      dispatch(setTodoFilters({ ...filters, title: !!inputValue.trim().length ? inputValue : null }));
    }
  }, 1500);

  const handleChangeSearch = (inputValue: string) => {
    setQuery(inputValue);
    debounceSearch(inputValue);
  };

  const debounceSelect = useDebounce((value: string[]) => {
    if (isNotesPage) {
      dispatch(setNotesFilters({ ...notesFilters, shared_filter: value }));
    } else {
      dispatch(
        setTodoFilters({
          ...filters,
          shared_filter: value,
        }),
      );
    }
  }, 1500);

  const selectOnChangeFunc = (e: any) => {
    setShareFilterValue(e.target.value);
    debounceSelect(e.target.value);
  };

  const textFieldOnChangeFunc = (e: React.FormEvent<HTMLInputElement>) => {
    if (e?.currentTarget?.value?.length > 36) {
      return;
    }
    handleChangeSearch(e.currentTarget.value);
  };

  useEffect(() => {
    setShareFilterValue(
      isNotesPage
        ? notesFilters.shared_filter
          ? notesFilters.shared_filter
          : []
        : filters.shared_filter
        ? filters.shared_filter
        : [],
    );

    setQuery(
      isNotesPage ? (notesFilters.title ? notesFilters.title : '') : filters.title ? filters.title : '',
    );
  }, [isNotesPage, filters.shared_filter, filters.title, notesFilters.shared_filter, notesFilters.title, t]);

  useEffect(() => {
    if (isNotesPage) {
      if (!!shareFilterValue?.find((element: string) => element === ShareNotesFiltersEnum.all)) {
        setIsDisabledNotesFilters({
          only_mine: true,
          shared_by_me: true,
          shared_with_me: true,
          all: false,
        });
      } else {
        setIsDisabledNotesFilters({
          only_mine: false,
          shared_by_me: false,
          shared_with_me: false,
          all: false,
        });
      }
    } else {
      if (!!shareFilterValue?.find((element: string) => element === ShareChecklistsFiltersEnum.all)) {
        setIsDisabledChecklistsFilters({
          only_mine: true,
          shared_by_me: true,
          shared_with_me: true,
          all: false,
          completed: true,
        });
      } else {
        setIsDisabledChecklistsFilters({
          only_mine: false,
          shared_by_me: false,
          shared_with_me: false,
          all: false,
          completed: false,
        });
      }
    }
  }, [shareFilterValue, isNotesPage]);

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
    <>
      {isMobileDisplay ? (
        <TodoNavigationPanelContainer>
          <NavigationTabs
            tabs={[
              { label: t('general.checklists'), icon: <ChecklistIcon /> },
              { label: t('general.notes'), icon: <NoteIcon /> },
            ]}
            value={activeTabValue}
            handleChange={handleChangeNavigation}
          />

          <TodoNavigationPanelMobileContentContainer>
            <Box sx={{ width: '100%', marginRight: '12px' }}>
              <MuiBaseTextFiled
                variant="outlined"
                required
                value={query}
                placeholder={t('general.placeholders.searchBy', {
                  props: isNotesPage ? t('general.noteTitle') : t('general.checklistTitle'),
                })}
                onChange={textFieldOnChangeFunc}
                size="medium"
                inputProps={{
                  maxLength: 35,
                  startAdornment: <SearchIcon sx={{ width: '24px !important', height: '24px !important' }} />,
                }}
              />
            </Box>

            <MuiIconButton onClick={handleOpenFiltersModal} variant="default" size="medium" color="secondary">
              <FilterSvg />
            </MuiIconButton>
          </TodoNavigationPanelMobileContentContainer>
        </TodoNavigationPanelContainer>
      ) : isTabletDisplay ? (
        <TodoNavigationPanelContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <NavigationTabs
              tabs={[
                { label: t('general.checklists'), icon: <ChecklistIcon /> },
                { label: t('general.notes'), icon: <NoteIcon /> },
              ]}
              value={activeTabValue}
              handleChange={handleChangeNavigation}
            />
            <ChipsActionMenu menuList={menuList}>
              <MuiButton
                isStopPropagation={false}
                label={t('general.buttons.add')}
                variant="contained"
                startIcon={<AddIcon />}
              />
            </ChipsActionMenu>
          </Box>

          <TodoNavigationPanelContentContainer>
            <TodoNavigationFormElements
              isTabletDisplay={isTabletDisplay}
              selectValue={shareFilterValue}
              selectOptions={isNotesPage ? shareNotesFilterOptions : shareChecklistsFilterOptions}
              selectOnChange={selectOnChangeFunc}
              textFieldValue={query}
              textFieldOnChange={textFieldOnChangeFunc}
              isViewCheckbox={!isNotesPage}
            />
          </TodoNavigationPanelContentContainer>
        </TodoNavigationPanelContainer>
      ) : (
        <TodoNavigationPanelDesktopContainer>
          <NavigationTabs
            tabs={[
              { label: t('general.checklists'), icon: <ChecklistIcon /> },
              { label: t('general.notes'), icon: <NoteIcon /> },
            ]}
            value={activeTabValue}
            handleChange={handleChangeNavigation}
          />

          <TodoNavigationPanelContentContainer>
            <TodoNavigationFormElements
              selectValue={shareFilterValue}
              selectOptions={isNotesPage ? shareNotesFilterOptions : shareChecklistsFilterOptions}
              selectOnChange={selectOnChangeFunc}
              textFieldValue={query}
              textFieldOnChange={textFieldOnChangeFunc}
              isViewCheckbox={!isNotesPage}
            />
            <ChipsActionMenu menuList={menuList}>
              <MuiButton
                isStopPropagation={false}
                label={t('general.buttons.add')}
                variant="contained"
                startIcon={<AddIcon />}
              />
            </ChipsActionMenu>
          </TodoNavigationPanelContentContainer>
        </TodoNavigationPanelDesktopContainer>
      )}
    </>
  );
};

export default React.memo(TodoNavigationPanel);
