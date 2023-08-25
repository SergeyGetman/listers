import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { OptionType } from '../../components/formElements/MuiSelect/types';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch, RootState } from '../store';
import { setNetworkLoading } from '../network/networkSlice';
import {
  CreateGarageModel,
  CreateTransportLicenseModel,
  CreateTransportStickerModel,
  GarageItemModel,
  GarageItemSharedUserModel,
  TransportItemModel,
  TransportLicenseModel,
  TransportStickerModel,
} from '../../shared/models/garage.model';
import { MetaModel } from '../../shared/models/meta.model';
import { setTransportsData } from './garageSlice';
import { InsuranceModel, InsuranceRequestModel } from '../../shared/models/insurance.model';
import router from '../../shared/services/router';
import { changeRedirectLink } from '../Common/commonSlice';
import { CreateTransportForm_GeneralInfo_FirstSubStepType } from '../../shared/models/garage/garageCreateItemForms.model';
import { ResponseFormStepperModel } from '../../shared/models/formStepper.model';

export const getMake = (transportType: string) => async (): Promise<OptionType[]> => {
  try {
    const res = await api.garage.getMake(transportType);

    return res.map((item) => ({ id: item.id, label: item.name, value: item.name }));
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return [];
  }
};

export const getModel = (transportType: string, make: string) => async (): Promise<OptionType[]> => {
  try {
    const res = await api.garage.getModel(transportType, make);

    return res.map((item) => ({ id: item.id, label: item.name, value: item.name }));
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return [];
  }
};

export const createNewTransport = createAsyncThunk<
  any,
  CreateTransportForm_GeneralInfo_FirstSubStepType,
  { rejectValue: ErrorType }
>('createNewTransport', async (data, { rejectWithValue }) => {
  try {
    return await api.garage.createNewTransport(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
export const getDraftedTransport = createAsyncThunk<
  { steps: ResponseFormStepperModel },
  number,
  { rejectValue: ErrorType }
>('getDraftedTransport', async (id, { rejectWithValue }) => {
  try {
    return await api.garage.getDraftTransport(id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getFirstStepFirstSubStep = createAsyncThunk<any, number, { rejectValue: ErrorType }>(
  'getFirstStepFirstSubStep',
  async (id, { rejectWithValue }) => {
    try {
      return await api.garage.getFirstStepFirstSubStep(id);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

// OLD API
export const createTransport = createAsyncThunk<
  GarageItemModel,
  CreateGarageModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createTransport', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.createTransport(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const editTransport = createAsyncThunk<
  TransportItemModel,
  { data: CreateGarageModel; id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('editTransport', async ({ data, id }, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.editTransport(data, id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const getTransports = createAsyncThunk<
  { data: GarageItemModel[]; meta: MetaModel },
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('getTransports', async (_, { dispatch, rejectWithValue, getState }) => {
  try {
    const page = getState().garage.transports.page;
    return await api.garage.getTransports(page);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const handleSortTransportsData = createAsyncThunk<
  any,
  { id: number; index: number; canceledSort: GarageItemModel[] },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('handleSortTransportsData', async ({ id, index, canceledSort }, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.sortTransports(id, { possition: index });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    dispatch(setTransportsData(canceledSort));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const getTransportItem = createAsyncThunk<
  TransportItemModel,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getTransportItem', async (id, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.getTransport(id);
  } catch (e: any) {
    if (e.data.message === `${i18next.t('general.notifications.notHaveAccessError')}.`) {
      NotificationService.error(i18next.t('general.notifications.notHaveAccessError'));
      dispatch(changeRedirectLink(`${router.garage.path}`));
    } else {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
    }
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const createTransportLicense = createAsyncThunk<
  TransportLicenseModel,
  CreateTransportLicenseModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createTransportLicense', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.createTransportLicense(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const editTransportLicense = createAsyncThunk<
  TransportLicenseModel,
  { data: CreateTransportLicenseModel; id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('editTransportLicense', async ({ data, id }, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.editTransportLicense(data, id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const createTransportInsurance = createAsyncThunk<
  InsuranceModel,
  InsuranceRequestModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createTransportInsurance', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.createInsurance(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const editTransportInsurance = createAsyncThunk<
  InsuranceModel,
  { data: InsuranceRequestModel; id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('editTransportInsurance', async ({ data, id }, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.editInsurance(data, id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const deleteTransport = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteTransport', async (id, { dispatch, rejectWithValue }) => {
  try {
    await api.garage.deleteTransport(id);
    NotificationService.success(i18next.t('general.notifications.transportDeleted'));
    return id;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const deleteInsurance = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteInsurance', async (id, { dispatch, rejectWithValue }) => {
  try {
    await api.garage.deleteInsurance(id);
    NotificationService.success(i18next.t('general.notifications.insuranceDeleted'));
    return id;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const deleteTransportLicense = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteTransportLicense', async (id, { dispatch, rejectWithValue }) => {
  try {
    await api.garage.deleteLicense(id);
    NotificationService.success(i18next.t('general.notifications.licensePlateStickerDeleted'));
    return id;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const deleteTransportSticker = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteTransportSticker', async (id, { dispatch, rejectWithValue }) => {
  try {
    await api.garage.deleteSticker(id);
    NotificationService.success(i18next.t('general.notifications.vehicleStickerDeleted'));
    return id;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const shareTransport = createAsyncThunk<
  GarageItemSharedUserModel[],
  { id: number; data: { users: { id: number; permission: string }[] } },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('shareTransport', async ({ id, data }, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.shareTransport(id, data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const createTransportSticker = createAsyncThunk<
  TransportStickerModel,
  CreateTransportStickerModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createTransportSticker', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.createTransportSticker(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const editTransportSticker = createAsyncThunk<
  TransportStickerModel,
  { data: CreateTransportStickerModel; id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('editTransportSticker', async ({ data, id }, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.editTransportSticker(data, id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});

export const unshareTransport = createAsyncThunk<
  any,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('unshareTransport', async (id, { dispatch, rejectWithValue }) => {
  try {
    return await api.garage.unshareTransport(id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setNetworkLoading(false));
  }
});
