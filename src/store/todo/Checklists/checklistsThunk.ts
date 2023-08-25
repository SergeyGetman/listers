import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../../store';
import api from '../../../shared/services/api';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../shared/locales/i18n';
import {
  setChecklistsData,
  TodoFilters,
  toggleFetchingInitialData,
  setMoreChecklistsData,
  setChecklistsLoading,
  setNewChecklistsData,
} from './checklistsSlice';
import { GetTodoDataResponseModel } from '../../../shared/models/todo/getTodoDataResponse.model';
import { TodoItemModel } from '../../../shared/models/todo/todoItemModel';
import { TodoFormPayloadModel } from '../../../shared/models/todo/todoModalForm.model';
import { setLoading } from '../../Common/commonSlice';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';

export const getChecklistsItems = createAsyncThunk<
  GetTodoDataResponseModel,
  TodoFilters & { page?: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getChecklistsItems', async (params, { rejectWithValue, dispatch }) => {
  try {
    if (params.page === 1) {
      dispatch(toggleFetchingInitialData(false));
    }
    dispatch(setChecklistsLoading(true));
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
    const reformatParams =
      params?.shared_filter?.includes('completed') || params?.shared_filter?.includes('all')
        ? {
            ...params,
            shared_filter: params?.shared_filter.filter((item: string) => item !== 'completed'),
            is_completed: 0,
          }
        : { ...params };

    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);

    const filterItemSumForDnd = filterObjForDndEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    const result2 = await api.todoChecklists.getChecklistsItems({ is_need_action: 1, ...reformatParams });
    const result = await api.todoChecklists.getChecklistsItems({ ...reformatParams, is_need_action: 0 });

    dispatch(setChecklistsLoading(false));

    if (params.page === 1) {
      dispatch(
        setChecklistsData({
          checklistsData: { ...result, data: [...result2.data, ...result.data] },
          isFetchingWithFilter: !!filterItemSum,
          isCanDnD: !filterItemSumForDnd,
        }),
      );
    } else {
      dispatch(
        setMoreChecklistsData({
          checklistsData: result,
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

export const handleSortChecklistsData = createAsyncThunk<
  any,
  { id: number; index: number; canceledSort: TodoItemModel[] },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('handleSortChecklistsData', async ({ id, index, canceledSort }, { dispatch, rejectWithValue }) => {
  try {
    return await api.todoChecklists.sortChecklists(id, { position: index });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    dispatch(setNewChecklistsData(canceledSort));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createChecklistItem = createAsyncThunk<
  TodoItemModel,
  TodoFormPayloadModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createChecklistItem', async (params, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.todoChecklists.createChecklist(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const deleteChecklist = createAsyncThunk<
  number,
  { checklistId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteChecklist', async (params, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.deleteChecklist(params).then(() => params.checklistId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const duplicateChecklist = createAsyncThunk<
  TodoItemModel,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('duplicateChecklist', async (params, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.todoChecklists.duplicateChecklist(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const deleteChecklistItemThunk = createAsyncThunk<
  number,
  { itemId: number; entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('deleteChecklistItem', async (props, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.deleteChecklistItem(props).then(() => props.itemId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateTodoChecklistItem = createAsyncThunk<
  TodoItemModel,
  { checklistId: number; item: TodoItemModel },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateTodoChecklistItem', async ({ checklistId, item }, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.updateChecklistItem({ checklistId, item });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const completeChecklistsItem = createAsyncThunk<
  TodoItemModel,
  { checklistId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('completeChecklistsItem', async (params, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.completeChecklistsItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const uncompleteChecklistsItem = createAsyncThunk<
  TodoItemModel,
  { checklistId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('uncompleteChecklistsItem', async (params, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.uncompleteChecklistsItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateUsersChecklist = createAsyncThunk<
  TodoItemModel,
  { users: AssignPeopleSelectValueModel[]; checklistId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateUsersChecklist', async (params, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.updateUsersChecklist(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const convertChecklistToTask = createAsyncThunk<
  number,
  { checklistId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('convertChecklistToTask', async (params, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.convertToTask(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const convertChecklistItemToTask = createAsyncThunk<
  number,
  { checklistId: number; checklistItemId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('convertChecklistItemToTask', async (params, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.convertItemToTask(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const removeYourselfFromChecklist = createAsyncThunk<
  number,
  { checklistId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('removeYourselfFromChecklist', async (params, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.removeYourself(params).then(() => params.checklistId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeIsOpenChecklist = createAsyncThunk<
  undefined,
  { is_open: number; checklistId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('changeIsOpenChecklist', async (params, { rejectWithValue }) => {
  try {
    return await api.todoChecklists.changeIsOpen(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
