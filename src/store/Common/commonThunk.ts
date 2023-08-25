import { createAsyncThunk } from '@reduxjs/toolkit';

import { setDocumentTitle } from '../../shared/functions/setDocumentTittle';
import { setBreadcrumbsItems } from './commonSlice';
import { BreadcrumbsModel } from '../../shared/models/breadcrumbs.model';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { ItemUserModel } from '../../shared/models/itemUser.model';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import { setNetworkLoading } from '../network/networkSlice';
import { DocumentsEntityTypeEnum } from '../../shared/enums/documentEntityType.enum';
import { SidebarEnum } from '../../shared/enums/socialNetwork.enum';

export const setBreadcrumbs = createAsyncThunk(
  'setBreadcrumbs',
  async (data: BreadcrumbsModel, { dispatch }) => {
    const { title = 'Dashboard' } = data.slice(-1)[0] || {};
    setDocumentTitle(`${title} `);
    dispatch(setBreadcrumbsItems(data));
  },
);

export const downloadMediaFile =
  (fileData: { token: string; isFile?: boolean; original_filename: string }) => async () => {
    try {
      const response = fileData.isFile
        ? await api.common.fileDownload(fileData.token)
        : await api.common.photoDownload(fileData.token);
      const imageURL = URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = imageURL;
      link.setAttribute('download', fileData.original_filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      NotificationService.error('Error downloading file');
    }
  };

export const uploadMediaFile =
  (
    formData: FormData,
    handleChangeProgress: (progress: number) => void,
    deleteLoadingMedia: (file?: any) => void,
  ) =>
  async () => {
    try {
      const response = await api.common.uploadFile(formData, handleChangeProgress);
      deleteLoadingMedia(response);
    } catch (e) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      deleteLoadingMedia();
    }
  };

export const uploadMediaPhoto =
  (
    formData: FormData & { entity_type?: DocumentsEntityTypeEnum },
    handleChangeProgress: (progress: number) => void,
    deleteLoadingMedia: (file?: any) => void,
  ) =>
  async () => {
    try {
      const response = await api.common.uploadPhoto(formData, handleChangeProgress);
      deleteLoadingMedia(response);
    } catch (e) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      deleteLoadingMedia();
    }
  };

export const deleteMedia = (token: string) => async () => {
  try {
    return await api.common.deleteMedia(token);
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    throw new Error('Error');
  }
};

export const getFriends = createAsyncThunk<
  ItemUserModel[],
  { setLoading: (isLoading: boolean) => void | undefined },
  { rejectValue: ErrorType }
>('getFriends', async ({ setLoading }, { rejectWithValue }) => {
  try {
    setLoading?.(true);
    return await api.common.getFriends();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    setLoading?.(false);
  }
});

export const getNetworkCounter = createAsyncThunk<
  { count: number },
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getNetworkCounter', async (_, { dispatch, rejectWithValue }) => {
  try {
    return await api.network.getCounter();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const getOnlineUsers = createAsyncThunk<
  number[],
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getOnlineUsers', async (_, { dispatch, rejectWithValue }) => {
  try {
    return await api.network.getOnlineUsers();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const onAuthWithSocialNetwork = (provider: SidebarEnum, redirectRoute: string) => {
  // TODO need fix from Vasya
  document.location.assign(
    `${process.env.REACT_APP_API_SOCIAL}/redirect?driver=${provider}&return_url=${process.env.REACT_APP_HOST}${redirectRoute}`,
  );
};

export const handleConformOauth = createAsyncThunk<
  any,
  { driver: string; code: string; isLogin: boolean },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getOnlineUsers', async ({ driver, code, isLogin }, { dispatch, rejectWithValue }) => {
  try {
    return await api.auth.callback(driver, code, isLogin);
  } catch (e: any) {
    NotificationService.error(
      e.status === 422 ? e.data?.message : i18next.t('general.notifications.defaultError'),
    );
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});
