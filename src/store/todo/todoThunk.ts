import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { TodoFormPayloadModel } from '../../shared/models/todo/todoModalForm.model';
import { TodoItemModel } from '../../shared/models/todo/todoItemModel';
import { setMoreTodoData, setTodoData, TodoFilters } from './todoSlice';
import { GetTodoDataResponseModel } from '../../shared/models/todo/getTodoDataResponse.model';
import { AssignPeopleSelectValueModel } from '../../shared/models/assignPeopleSelectValue.model';
import { setLoading } from '../Common/commonSlice';

export const createTodoItem = createAsyncThunk<
  TodoItemModel,
  TodoFormPayloadModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createTodoItem', async (params, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.todo.createTodo(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const updateTodoItem = createAsyncThunk<
  TodoItemModel,
  { params: TodoFormPayloadModel; todoId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateEventItem', async ({ params, todoId }, { rejectWithValue }) => {
  try {
    return await api.todo.updateTodo(params, todoId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeIsOpenTodo = createAsyncThunk<
  undefined,
  { is_open: number; todoId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('changeIsOpenTodo', async (params, { rejectWithValue }) => {
  try {
    return await api.todo.changeIsOpen(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getTodo = createAsyncThunk<
  TodoItemModel,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getTodo', async (todoId, { rejectWithValue }) => {
  try {
    return await api.todo.getTodo(todoId);
  } catch (e: any) {
    if (e.status === 403) {
      NotificationService.info(i18next.t('general.notifications.checklistDidNotSharedWithYou'));
    } else {
      NotificationService.info(i18next.t('general.notifications.checklistNotFound'));
    }
    return rejectWithValue(e.data as ErrorType);
  }
});

export const duplicateTodo = createAsyncThunk<
  TodoItemModel,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('duplicateTodo', async (params, { rejectWithValue }) => {
  try {
    return await api.todo.duplicateTodo(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteTodo = createAsyncThunk<
  number,
  { todoId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteTodo', async (params, { rejectWithValue }) => {
  try {
    return await api.todo.deleteTodo(params).then(() => params.todoId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateUsersTodo = createAsyncThunk<
  TodoItemModel,
  { users: AssignPeopleSelectValueModel[]; todoId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateUsersTodo', async (params, { rejectWithValue }) => {
  try {
    return await api.todo.updateUsersTodo(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const convertTodoToTask = createAsyncThunk<
  number,
  { todoId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('convertTodoToTask', async (params, { rejectWithValue }) => {
  try {
    return await api.todo.convertToTask(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const removeMyselfFromTodo = createAsyncThunk<
  number,
  { todoId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('removeMyselfFromTodo', async (params, { rejectWithValue }) => {
  try {
    return await api.todo.removeMyself(params).then(() => params.todoId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getTodoItems = createAsyncThunk<
  GetTodoDataResponseModel,
  TodoFilters & { page?: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getTodoData', async (params, { rejectWithValue, dispatch }) => {
  try {
    const result = await api.todo.getTodoItems({ ...params });

    if (params.page === 1) {
      dispatch(setTodoData(result));
    } else {
      dispatch(setMoreTodoData(result));
    }

    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
