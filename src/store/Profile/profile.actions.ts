import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { changeRedirectLink, setLoading } from '../Common/commonSlice';
import { ProfileModel } from '../../shared/models/profile/profile.model';
import { HubModel } from '../../shared/models/hub.model';
import { ProfileSettingsModel } from '../../shared/models/profile/profileSettings.model';
import { GeneralSettingsFormModel } from '../../shared/models/profile/generalSettingsForm.model';
import { VerificationLoginFormModel } from '../../shared/models/verificationLoginFormModel';
import { ItemUserModel } from '../../shared/models/itemUser.model';
import { ProfileGeneralInfoFormModel } from '../../shared/models/profile/profileGeneralInfoForm.model';
import { ProfileAppearanceFormModel } from '../../shared/models/profile/profileAppearanceForm.model';
import { ProfileContactsFormModel } from '../../shared/models/profile/profileContactsForm.model';
import { ProfileBodyArtFormModel } from '../../shared/models/profile/profileBodyArtForm.model';
import { FeedBackFormType } from '../../pages/Feedback/components/FeedbackRateUs/FeedbackRateUs';
import { setProfileViewDataItem } from './profile.slice';
import router from '../../shared/services/router';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { UserFullNameModalPayload } from '../../components/modals/UserFullNameModal/components/UserFullNameModalContainer/UserFullNameModalContainer';
import modalObserver from '../../shared/utils/observers/modalObserver';

export const getProfileInfo = createAsyncThunk<
  ProfileModel,
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getProfileInfo', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    const result = await api.profile.getProfile();
    if (result.expired.length) {
      dispatch(changeRedirectLink(`${router.settings.path}/${router.settings.children.wallet.path}`));
      // navigate(`${router.settings.path}/${router.settings.children.wallet.path}`);
      modalObserver.addModal(ModalNamesEnum.payment, {
        props: {
          isBilling: true,
          expired: result.expired[0],
        },
      });
    }

    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const updateProfileGeneralInfo = createAsyncThunk<
  ProfileModel,
  ProfileGeneralInfoFormModel,
  { rejectValue: ErrorType }
>('updateProfileGeneralInfo', async (props, { rejectWithValue }) => {
  try {
    return await api.profile.updateProfileGeneralInfo(props);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateProfileSidebarItemPosition = createAsyncThunk<any, any, { rejectValue: ErrorType }>(
  'updateProfileSidebarItemPosition',
  async (props, { rejectWithValue }) => {
    try {
      return await api.profile.updateProfileSidebarItemPosition(props);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const updateProfileFullName = createAsyncThunk<
  ProfileModel,
  UserFullNameModalPayload,
  { rejectValue: ErrorType }
>('updateProfileFullName', async (data, { rejectWithValue }) => {
  try {
    return await api.profile.updateProfileFullName(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeProfileTimezone = createAsyncThunk<
  undefined,
  { timezone_name: string },
  { rejectValue: ErrorType }
>('changeProfileTimezone', async (props, { rejectWithValue }) => {
  try {
    return await api.profile.changeProfileTimezone(props);
  } catch (e: any) {
    return rejectWithValue(e.data as ErrorType);
  }
});

export const setViewDataItem = createAsyncThunk<
  undefined,
  { entity: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('setViewDataItem', async (params, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setProfileViewDataItem(params.entity));
    return await api.profile.setViewDataItem(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createProfileBodyArt = createAsyncThunk<
  ProfileModel,
  ProfileBodyArtFormModel,
  { rejectValue: ErrorType }
>('createProfileBodyArt', async (props, { rejectWithValue }) => {
  try {
    return await api.profile.createProfileBodyArt(props);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateProfileBodyArt = createAsyncThunk<
  ProfileModel,
  { id: number } & ProfileBodyArtFormModel,
  { rejectValue: ErrorType }
>('updateProfileBodyArt', async (props, { rejectWithValue }) => {
  try {
    return await api.profile.updateProfileBodyArt(props);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteProfileBodyArt = createAsyncThunk<number, { id: number }, { rejectValue: ErrorType }>(
  'deleteProfileBodyArt',
  async (props, { rejectWithValue }) => {
    try {
      return await api.profile.deleteProfileBodyArt(props).then(() => props.id);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const updateProfileContacts = createAsyncThunk<
  ProfileModel,
  ProfileContactsFormModel,
  { rejectValue: ErrorType }
>('updateProfileContacts', async (props, { rejectWithValue }) => {
  try {
    return await api.profile.updateProfileContacts(props);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateProfileAppearance = createAsyncThunk<
  ProfileModel,
  ProfileAppearanceFormModel,
  { rejectValue: ErrorType }
>('updateProfileAppearance', async (props, { rejectWithValue }) => {
  try {
    return await api.profile.updateProfileAppearance(props);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getConnections = createAsyncThunk<
  ItemUserModel[],
  { setLoading?: (value: boolean) => void } | undefined,
  { rejectValue: ErrorType }
>('getConnections', async (_, { rejectWithValue }) => {
  try {
    setLoading?.(true);
    return await api.profile.getConnections();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    setLoading?.(false);
  }
});

export const getProfileSettings = createAsyncThunk<any, undefined, { rejectValue: ErrorType }>(
  'getProfileSettings',
  async (_, { rejectWithValue }) => {
    try {
      return await api.profile.getProfileSettings();
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const setProfileSettings = createAsyncThunk<any, any, { rejectValue: ErrorType }>(
  'setProfileSettings',
  async (data, { rejectWithValue }) => {
    try {
      return await api.profile.setProfileSettings(data);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const deleteProfile = createAsyncThunk<
  undefined,
  { password: string | null },
  { rejectValue: ErrorType }
>('deleteProfile', async (data, { rejectWithValue }) => {
  try {
    return await api.profile.deleteProfile(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const setDeviceToken = createAsyncThunk<
  undefined,
  { push_token: string; platform: string },
  { rejectValue: ErrorType }
>('setDeviceToken', async (data, { rejectWithValue }) => {
  try {
    return await api.profile.setDeviceToken(data);
  } catch (e: any) {
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeLoginData = createAsyncThunk<
  ProfileSettingsModel,
  GeneralSettingsFormModel,
  { rejectValue: ErrorType }
>('changeLoginData', async (data, { rejectWithValue }) => {
  try {
    return await api.profile.changeLoginData(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const activateLogin = createAsyncThunk<
  { login: string; isPhone: boolean },
  VerificationLoginFormModel & { isPhone: boolean },
  { rejectValue: ErrorType }
>('activateLogin', async (data, { rejectWithValue }) => {
  try {
    return await api.auth.activateUser(data).then(() => {
      return { login: data.login, isPhone: data.isPhone };
    });
  } catch (e: any) {
    if (e.status === 498) {
      NotificationService.error(i18next.t('general.notifications.expiredCode'));
    } else {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
    }
    return rejectWithValue({ ...e.data, status: e.status } as ErrorType);
  }
});

export const resendVerificationCode = createAsyncThunk<
  undefined,
  { login: string },
  { rejectValue: ErrorType }
>('resendVerificationCode', async (data, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));

    return await api.auth.activationResendCode(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const getSettingsProfileInfo = createAsyncThunk<
  ProfileSettingsModel,
  undefined,
  { rejectValue: ErrorType }
>('getSettingsProfileInfo', async (_, { rejectWithValue }) => {
  try {
    return await api.profile.getSettingsProfile();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getFullProfileInfo = createAsyncThunk<
  ProfileSettingsModel,
  undefined,
  { rejectValue: ErrorType }
>('getFullProfileInfo', async (_, { rejectWithValue }) => {
  try {
    return await api.profile.getFullProfile();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const activateHub = createAsyncThunk<HubModel, number, { rejectValue: ErrorType }>(
  'activateHub',
  async (hubId, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      return await api.profile.activateHub(hubId);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const deletePaymentCard = createAsyncThunk<any, number, { rejectValue: ErrorType }>(
  'deletePaymentCard',
  async (cardId, { rejectWithValue }) => {
    try {
      return await api.payment.deleteCard(cardId);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const sendFeedback = createAsyncThunk<
  undefined,
  FeedBackFormType & { documents: { id: number }[] },
  { rejectValue: ErrorType }
>('sendFeedback', async (props, { rejectWithValue }) => {
  try {
    return await api.profile.feedback(props);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deactivateHub = createAsyncThunk<HubModel, number, { rejectValue: ErrorType }>(
  'deactivateHub',
  async (hubId, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      return await api.profile.deactivateHub(hubId);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const updateFeedsCounter = createAsyncThunk<
  { count_news: number; count_requests: number; count_notification: number },
  undefined,
  { rejectValue: ErrorType }
>('updateFeedsCounter', async (_, { rejectWithValue }) => {
  try {
    return await api.profile.updateFeedsCounter();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
