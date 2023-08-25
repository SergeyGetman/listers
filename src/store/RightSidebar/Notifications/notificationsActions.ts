import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../shared/services/api';
import { setNewsLoading, setNewsPage, setRequestsLoading, setRequestsPage } from './notificationsSlice';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { ErrorType } from '../../../shared/interfaces/error.interfaces';
import { GetNewsResponseModel } from '../../../shared/models/notifications/news/getNewsResponse.model';
import { AppDispatch, RootState } from '../../store';
import i18next from '../../../shared/locales/i18n';
import { setLoading } from '../../Common/commonSlice';
import { setProfileNotificationsAllNewsCount } from '../../Profile/profile.slice';
import { GetRequestsResponseModel } from '../../../shared/models/notifications/requests/getRequestsResponse.model';

export const getNews = createAsyncThunk<
  GetNewsResponseModel,
  { page?: number } | undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('getNews', async (data, { dispatch, rejectWithValue, getState }) => {
  try {
    dispatch(setNewsLoading(true));
    const nextPage = getState().notifications.news.page;
    if (data?.page) {
      dispatch(setNewsPage(data?.page));
    }
    return await api.rightSidebar.getNews(data?.page ? data?.page : nextPage);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNewsLoading(false));
  }
});

export const viewedNews = createAsyncThunk<number, number, { rejectValue: ErrorType; dispatch: AppDispatch }>(
  'viewedNews',
  async (newsId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      await api.rightSidebar.viewedNews(newsId);
      return newsId;
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const removeNews = createAsyncThunk<number, number, { rejectValue: ErrorType; dispatch: AppDispatch }>(
  'removeNews',
  async (newsId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      await api.rightSidebar.removeNews(newsId);
      return newsId;
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const viewedAllNews = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('viewedAllNews', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.rightSidebar.viewedAllNews();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
    dispatch(setProfileNotificationsAllNewsCount());
  }
});

export const showAllNews = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('showAllNews', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.rightSidebar.showAllNews();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
    dispatch(setProfileNotificationsAllNewsCount());
  }
});

export const removeAllNews = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('removeAllNews', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.rightSidebar.removeAllNews();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
    dispatch(setProfileNotificationsAllNewsCount());
  }
});

export const getRequests = createAsyncThunk<
  GetRequestsResponseModel,
  { page?: number } | undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('getRequests', async (data, { dispatch, rejectWithValue, getState }) => {
  try {
    dispatch(setRequestsLoading(true));
    const nextPage = getState().notifications.requests.page;
    if (data?.page) {
      dispatch(setRequestsPage(data?.page));
    }
    return await api.rightSidebar.getRequests(data?.page ? data?.page : nextPage);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setRequestsLoading(false));
  }
});

export const choseRequestAction = createAsyncThunk<
  { id?: number; action: string },
  { id?: number; action: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('choseRequestAction', async (data, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.rightSidebar.choseRequestAction(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});
