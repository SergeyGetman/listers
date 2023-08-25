import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../../store';
import api from '../../../shared/services/api';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../shared/locales/i18n';
import {
  setNotesLoading,
  NotesFilters,
  toggleFetchingInitialData,
  setNotesData,
  setMoreNotesData,
  setNewNotesData,
} from './notesSlice';
import { setLoading } from '../../Common/commonSlice';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';
import { GetNotesDataResponseModel } from '../../../shared/models/todo/notes/getNotesDataResponseModel.model';
import { NoteItemModel } from '../../../shared/models/todo/notes/noteItemModel';
import { NoteFormPayloadModel } from '../../../shared/models/todo/notes/noteFormPayloadModel.model';
import { TodoItemModel } from '../../../shared/models/todo/todoItemModel';

export const getNotesItems = createAsyncThunk<
  GetNotesDataResponseModel,
  NotesFilters & { page?: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getNotesItems', async (params, { rejectWithValue, dispatch }) => {
  try {
    if (params.page === 1) {
      dispatch(toggleFetchingInitialData(false));
    }
    dispatch(setNotesLoading(true));
    const filterObjEntries = Object.values({
      ...params,
      shared_filter: !!params?.shared_filter?.length ? params?.shared_filter : null,
      page: null,
    });

    const filterObjForDndEntries = Object.values({
      ...params,
      shared_filter: !!params?.shared_filter?.length
        ? !!params?.shared_filter.filter((item: string) => item !== 'completed').length
          ? params?.shared_filter.filter((item: string) => item !== 'completed')
          : null
        : null,
      page: null,
    });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);

    const filterItemSumForDnd = filterObjForDndEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    const reformatParams = params?.shared_filter?.includes('completed')
      ? {
          ...params,
          shared_filter: params?.shared_filter.filter((item: string) => item !== 'completed'),
        }
      : { ...params };

    const result = await api.todoNotes.getNotesItems({ ...reformatParams, is_need_action: 0 });
    const result2 = await api.todoNotes.getNotesItems({ is_need_action: 1, ...reformatParams });
    dispatch(setNotesLoading(false));

    if (params.page === 1) {
      dispatch(
        setNotesData({
          notesData: { ...result, data: [...result2.data, ...result.data] },
          isFetchingWithFilter: !!filterItemSum,
          isCanDnD: !filterItemSumForDnd,
        }),
      );
    } else {
      dispatch(
        setMoreNotesData({
          notesData: result,
          isFetchingWithFilter: !!filterItemSum,
          isCanDnD: !filterItemSumForDnd,
        }),
      );
    }

    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(toggleFetchingInitialData(true));
  }
});

export const getNote = createAsyncThunk<
  TodoItemModel,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getNote', async (todoId, { rejectWithValue }) => {
  try {
    return await api.todoNotes.getNote(todoId);
  } catch (e: any) {
    if (e.status === 403) {
      NotificationService.info(i18next.t('general.notifications.notesDidNotSharedWithYou'));
    } else {
      NotificationService.info(i18next.t('general.notifications.noteNoteFound'));
    }
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createNoteItem = createAsyncThunk<
  NoteItemModel,
  NoteFormPayloadModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createNoteItem', async (params, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.todoNotes.createNote(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const handleSortNotesData = createAsyncThunk<
  any,
  { id: number; index: number; canceledSort: TodoItemModel[] },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('handleSortNotesData', async ({ id, index, canceledSort }, { dispatch, rejectWithValue }) => {
  try {
    return await api.todoNotes.sortNotes(id, { position: index });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    dispatch(setNewNotesData(canceledSort));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteNote = createAsyncThunk<
  number,
  { noteId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteNote', async (params, { rejectWithValue }) => {
  try {
    return await api.todoNotes.deleteNote(params).then(() => params.noteId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const removeYourselfFromNote = createAsyncThunk<
  number,
  { noteId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('removeYourselfFromNote', async (params, { rejectWithValue }) => {
  try {
    return await api.todoNotes.removeYourself(params).then(() => params.noteId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateUsersNote = createAsyncThunk<
  NoteItemModel,
  { users: AssignPeopleSelectValueModel[]; noteId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateUsersNote', async (params, { rejectWithValue }) => {
  try {
    return await api.todoNotes.updateUsersNote(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateNotesItem = createAsyncThunk<
  NoteItemModel,
  { noteId: number; item: TodoItemModel },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateNotesItem', async ({ noteId, item }, { rejectWithValue }) => {
  try {
    return await api.todoNotes.updateChecklistItem({ noteId, item });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeIsOpenNote = createAsyncThunk<
  undefined,
  { is_open: number; noteId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('changeIsOpenNote', async (params, { rejectWithValue }) => {
  try {
    return await api.todoNotes.changeIsOpen(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
