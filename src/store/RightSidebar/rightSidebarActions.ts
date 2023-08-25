import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../shared/services/api';
import { toggleGetInitialData, toggleShowInputLoader } from './rightSidebarSlice';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { ChecklistItemStatusEnum } from '../../shared/enums/checklistItemStatus.enum';
import { ChecklistItemModel } from '../../shared/models/checklists/checklistItem.model';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { ChecklistFormPayloadModel } from '../../shared/models/checklists/checklistFormPayload.model';
import { GetChecklistsResponseModel } from '../../shared/models/checklists/getChecklistsResponse.model';
import { AppDispatch } from '../store';
import i18next from '../../shared/locales/i18n';
import { GetNotesResponseModel } from '../../shared/models/notes/getNotesResponse.model';
import { NotesItemModel } from '../../shared/models/notes/notesItem.model';
import { NotesFormPayloadModel } from '../../shared/models/notes/notesFormPayload.model';

export const getRightSidebarChecklists = createAsyncThunk<
  GetChecklistsResponseModel,
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getRightSidebarChecklists', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(toggleGetInitialData(false));
    return await api.rightSidebar.getChecklists();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(toggleGetInitialData(true));
  }
});

export const createRightSidebarChecklistItem = createAsyncThunk<
  ChecklistItemModel,
  ChecklistFormPayloadModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createRightSidebarChecklistItem', async (params, { dispatch, rejectWithValue }) => {
  try {
    dispatch(toggleShowInputLoader(true));
    return await api.rightSidebar.addChecklistItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(toggleShowInputLoader(false));
  }
});

export const updateChecklistItem = createAsyncThunk<
  ChecklistItemModel,
  { status: ChecklistItemStatusEnum; id: number },
  { rejectValue: ErrorType }
>('updateChecklistItem', async (params, { rejectWithValue }) => {
  try {
    return await api.rightSidebar.updateChecklistItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteChecklistItem = createAsyncThunk<number, number, { rejectValue: ErrorType }>(
  'deleteChecklistItem',
  async (itemID, { rejectWithValue }) => {
    try {
      return await api.rightSidebar.deleteChecklistItem(itemID).then(() => itemID);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const getRightSidebarNotes = createAsyncThunk<
  GetNotesResponseModel,
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getRightSidebarNotes', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(toggleGetInitialData(false));
    return await api.rightSidebar.getNotes();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(toggleGetInitialData(true));
  }
});

export const deleteNotesItem = createAsyncThunk<number, number, { rejectValue: ErrorType }>(
  'deleteNotesItem',
  async (itemID, { rejectWithValue }) => {
    try {
      return await api.rightSidebar.deleteNotesItem(itemID).then(() => itemID);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const createNotesItem = createAsyncThunk<
  NotesItemModel,
  NotesFormPayloadModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createNotesItem', async (params, { dispatch, rejectWithValue }) => {
  try {
    dispatch(toggleShowInputLoader(true));
    return await api.rightSidebar.addNotesItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(toggleShowInputLoader(false));
  }
});
