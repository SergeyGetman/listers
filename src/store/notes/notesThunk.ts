import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetNotesResponseModel } from '../../shared/models/notes/getNotesResponse.model';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { NotesItemModel } from '../../shared/models/notes/notesItem.model';
import { NotesFormPayloadModel } from '../../shared/models/notes/notesFormPayload.model';
import { AppDispatch } from '../store';
import { setMoreNotesData, setNotesData } from './notesSlice';
import { ChecklistItemModel } from '../../shared/models/checklists/checklistItem.model';
import { ChecklistItemStatusEnum } from '../../shared/enums/checklistItemStatus.enum';

export const getNotes = createAsyncThunk<
  GetNotesResponseModel,
  { entity_type?: string; entity_id?: number; page: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getNotes', async (props, { dispatch, rejectWithValue }) => {
  try {
    const result = await api.notes.getNotes(props);
    if (props.page === 1) {
      dispatch(setNotesData(result));
    } else {
      dispatch(setMoreNotesData(result));
    }
    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteNotesItem = createAsyncThunk<
  number,
  { itemId: number; entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('deleteNotesItem', async (props, { rejectWithValue }) => {
  try {
    return await api.notes.deleteNotesItem(props).then(() => props.itemId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createNotesItem = createAsyncThunk<
  NotesItemModel,
  NotesFormPayloadModel & { entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('createNotesItem', async (params, { rejectWithValue }) => {
  try {
    return await api.notes.addNotesItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateNotesData = createAsyncThunk<
  NotesItemModel,
  { body: string; id: number; entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('updateNotesData', async (params, { rejectWithValue }) => {
  try {
    return await api.notes.updateNotesItem({ ...params, title: '12' });
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
