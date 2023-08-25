import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetChecklistsResponseModel } from '../../shared/models/checklists/getChecklistsResponse.model';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { ChecklistItemModel } from '../../shared/models/checklists/checklistItem.model';
import { ChecklistFormPayloadModel } from '../../shared/models/checklists/checklistFormPayload.model';
import { ChecklistItemStatusEnum } from '../../shared/enums/checklistItemStatus.enum';
import { AppDispatch } from '../store';

export const getChecklists = createAsyncThunk<
  GetChecklistsResponseModel,
  { entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('getChecklists', async (params, { rejectWithValue }) => {
  try {
    return await api.checklists.getChecklists(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createChecklistItem = createAsyncThunk<
  ChecklistItemModel,
  ChecklistFormPayloadModel & { entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('createChecklistItem', async (params, { rejectWithValue }) => {
  try {
    return await api.checklists.addChecklistItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateChecklistItem = createAsyncThunk<
  ChecklistItemModel,
  { status: ChecklistItemStatusEnum; id: number; entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('updateChecklistItem', async (params, { rejectWithValue }) => {
  try {
    return await api.checklists.updateChecklistItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const handleSortChecklists = createAsyncThunk<
  any,
  { id: number; index: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('handleSortChecklists', async ({ id, index }, { rejectWithValue }) => {
  try {
    return await api.checklists.sortChecklists(id, { position: index });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateChecklistItemBody = createAsyncThunk<
  ChecklistItemModel,
  { body: string; id: number; entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('updateChecklistItemBody', async (params, { rejectWithValue }) => {
  try {
    return await api.checklists.updateChecklistItemBody(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getChecklistItem = createAsyncThunk<ChecklistItemModel, number, { rejectValue: ErrorType }>(
  'deleteChecklistItem',
  async (props, { rejectWithValue }) => {
    try {
      return await api.checklists.getChecklistItem(props);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const removeChecklistItem = createAsyncThunk<
  number,
  { itemId: number; entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('deleteChecklistItem', async (props, { rejectWithValue }) => {
  try {
    return await api.checklists.deleteChecklistItem(props).then(() => props.itemId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
