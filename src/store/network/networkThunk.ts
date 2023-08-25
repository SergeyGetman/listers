import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch, RootState } from '../store';
import {
  ConnectedUserModel,
  CreateContactModel,
  InviteUser,
  NetworkUserModel,
  UserPartInformation,
} from '../../shared/models/network';
import { MetaModel } from '../../shared/models/meta.model';
import { setInviteLoading, setInviteUserLoading, setNetworkLoading } from './networkSlice';
import { NetworkTypeEnum } from '../../shared/enums/networkType.enum';
import { setLoading } from '../Common/commonSlice';

export const getRoles =
  (
    setLoadingRole: (isLoading: boolean) => void,
    setData: (data: {}) => void,
    selectGroup: (data: {}) => void,
  ) =>
  async () => {
    try {
      setLoadingRole(true);
      const res = await api.network.getRoles();
      setData(res);
      selectGroup(res);
      return res;
    } catch (e) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return e;
    } finally {
      setLoadingRole(false);
    }
  };

export const getInviteUsers = createAsyncThunk<
  { data: InviteUser[]; meta: MetaModel },
  { query: string },
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('getInviteUsers', async ({ query }, { dispatch, rejectWithValue, getState }) => {
  try {
    dispatch(setInviteLoading(true));
    const page = getState().network.invite.page;
    return await api.network.getInviteUsers(page, query || '');
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setInviteLoading(true));
  }
});

export const sentInviteRequest =
  (data: { user_id: number; role: string; login: null | string }) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setInviteUserLoading({ id: data.user_id, isLoading: true }));
      const res = await api.network.inviteUser(data);
      dispatch(setInviteUserLoading({ id: data.user_id, isLoading: false, isInvited: true }));
      NotificationService.success(i18next.t('network.toasts.sentInvite'));
      return res;
    } catch (e) {
      dispatch(setInviteUserLoading({ id: data.user_id, isLoading: false }));
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return e;
    }
  };

export const getNetworkUsers = createAsyncThunk<
  { data: NetworkUserModel[]; meta: MetaModel },
  { type: NetworkTypeEnum; query: string; role?: string | null },
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('getNetworkUsers', async ({ query, role, type }, { dispatch, rejectWithValue, getState }) => {
  try {
    dispatch(setNetworkLoading(true));
    const page = getState().network.network.page;
    return await api.network.getNetworkUser(type, query, page, role);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const pendingConfirm = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('pendingConfirm', async (userId, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    await api.network.confirm(userId);
    return userId;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const networkCancel = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('networkCancel', async (userId, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    await api.network.cancel(userId);
    return userId;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const networkCancelFuture = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('networkCancelFuture', async (userId, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    await api.network.cancelFuture(userId);
    return userId;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const inviteFutureUser = createAsyncThunk<
  any,
  { id: number; data: { role: string; login?: string } },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('inviteFutureUser', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoading(true));
    const user = await api.network.inviteFutureUser(id, data);
    NotificationService.success(i18next.t('network.toasts.sentInviteContact'));
    return user;
  } catch (e: any) {
    NotificationService.error(
      e.data.errors.login ? e.data.errors.login : i18next.t('general.notifications.defaultError'),
    );
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const networkResend = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('networkResend', async (friendId, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    await api.network.resend(friendId);
    NotificationService.success(i18next.t('network.toasts.requestResend'));
    return friendId;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const networkResendFutureRequest = createAsyncThunk<
  number,
  { friendId: number; data: { login: string | null; country?: string; role: string } },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('networkResendFutureRequest', async ({ friendId, data }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    await api.network.resendFutureRequest(friendId, data);
    return friendId;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const networkDeleteUser = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('networkDeleteUser', async (friendId, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    await api.network.deleteUser(friendId);
    return friendId;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const gentPartUserInformation = createAsyncThunk<
  UserPartInformation,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('gentPartUserInformation', async (friendId, { dispatch, rejectWithValue }) => {
  try {
    return await api.network.getPartUserInfo(friendId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const networkShare = createAsyncThunk<
  any,
  { data: { users: { id: number }[] }; id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('networkShare', async ({ data, id }, { dispatch, rejectWithValue }) => {
  try {
    NotificationService.success(i18next.t('general.notifications.contactWasSuccessfullyShared'));
    return await api.network.share(data, id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const handleChangeConnectionRole = createAsyncThunk<
  { role: string; id: number },
  { friendId: number; data: { role: string } },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('handleChangeConnectionRole', async ({ friendId, data }, { dispatch, rejectWithValue }) => {
  try {
    await api.network.changeRole(friendId, data);
    return { id: friendId, role: data.role };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const createContact = createAsyncThunk<
  any,
  { data: CreateContactModel },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createContact', async ({ data }, { dispatch, rejectWithValue }) => {
  try {
    return await api.network.createContact(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const editContact = createAsyncThunk<
  NetworkUserModel,
  { data: CreateContactModel; id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('editContact', async ({ data, id }, { dispatch, rejectWithValue }) => {
  try {
    return await api.network.editContact(data, id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const editConnectionUser = createAsyncThunk<
  { role: string; id: number },
  { data: { role: string; note: any; documents: { id: number }[] }; id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('editConnectionUser', async ({ data, id }, { dispatch, rejectWithValue }) => {
  try {
    await api.network.editConnectionUser(data, id);
    return { role: data.role, id };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const getSentLogins = createAsyncThunk<
  { login?: string }[],
  { id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getSentLogins', async ({ id }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.network.getSentLogins(id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const getUser = createAsyncThunk<
  ConnectedUserModel,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getUser', async (id, { dispatch, rejectWithValue }) => {
  try {
    return await api.network.getUser(id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});
