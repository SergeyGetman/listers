import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { AppDispatch } from '../store';
import { setCommentsData, setMoreCommentsData } from './commentsSlice';
import { GetCommentsResponseModel } from '../../shared/models/comments/getCommentsResponse.model';
import { CommentsItemModel } from '../../shared/models/comments/commentsItem.model';
import { CommentsFormPayloadModel } from '../../shared/models/comments/commentsFormPayload.model';

export const getComments = createAsyncThunk<
  GetCommentsResponseModel,
  { entity_type?: string; entity_id?: number; page: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getNotes', async (props, { dispatch, rejectWithValue }) => {
  try {
    const result = await api.comments.getComments(props);
    if (props.page === 1) {
      dispatch(setCommentsData({ ...result, data: result.data.reverse() }));
    } else {
      dispatch(setMoreCommentsData({ ...result, data: result.data.reverse() }));
    }
    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteCommentsItem = createAsyncThunk<
  number,
  { itemId: number; entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('deleteNotesItem', async (props, { rejectWithValue }) => {
  try {
    return await api.comments.deleteCommentsItem(props).then(() => props.itemId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createCommentsItem = createAsyncThunk<
  CommentsItemModel,
  CommentsFormPayloadModel & { entity_type?: string; entity_id?: number },
  { rejectValue: ErrorType }
>('createNotesItem', async (params, { rejectWithValue }) => {
  try {
    return await api.comments.addCommentsItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
