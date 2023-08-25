import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { VinAndLicensePlateInfoType } from '../../../shared/models/garage/vin-info';
import { ErrorType } from '../../../shared/interfaces/error.interfaces';
import api from '../../../shared/services/api';
import { USState } from '../enum/UsaStateEnum';

import { OptionType } from '../../../components/formElements/MuiSelect/types';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../shared/locales/i18n';
import { AppDispatch, RootState } from '../../../store/store';
import {
  CreateTransportFormType,
  GetTransportsParams,
  ResultDataRecognitionData,
  ResultInfo,
  RootGarageItemsData,
  RootMeta,
  TransportsSorting,
} from './types';
import {
  deleteCurrentTransport,
  isEmptyDataGarageWithFilter,
  setCurrentTransport,
  setLoadingGarage,
  setTransportDataWithNewPosition,
} from './garageSliceV2';
import { TransportData } from '../components/types';
import { StatusTransport } from '../GarageMainPage/components/GarageMainPageItems/GarageCardItems/GarageCardItem/GarageCardItem';
import { Entity } from '../GarageNew';
import { setLoading } from '../../../store/Common/commonSlice';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';

export const getVinInfo = createAsyncThunk<
  ResultInfo<VinAndLicensePlateInfoType>,
  string,
  { rejectValue: ErrorType }
>('VinInfo', async (vin: string, { rejectWithValue }) => {
  try {
    return await api.garageV2.getVehicleInfoByVin(vin);
  } catch (err) {
    return rejectWithValue(err as any);
  }
});

export const getLicensePlateInfo = createAsyncThunk<
  ResultInfo<VinAndLicensePlateInfoType>,
  { licensePlate: string; state: USState },
  { rejectValue: ErrorType }
>('VinInfo', async ({ licensePlate, state }, { rejectWithValue }) => {
  try {
    return await api.garageV2.getVehicleInfoByLicensePlate(licensePlate, state);
  } catch (err) {
    return rejectWithValue(err as ErrorType);
  }
});

export const getInfoMake = createAsyncThunk<ResultInfo<OptionType[]>, string, { rejectValue: ErrorType }>(
  'InfoMake',
  async (vehicleType: string, { rejectWithValue }) => {
    try {
      const res = await api.garageV2.getMakeInfo(vehicleType);

      const arrayMapper = res.data.map((item: string) => ({ id: nanoid(), label: item, value: item }));
      return {
        data: arrayMapper,
        status: res.status,
      };
    } catch (err) {
      return rejectWithValue(err as ErrorType);
    }
  },
);

export const getInfoModel = createAsyncThunk<
  ResultInfo<OptionType[]>,
  { make: string; year: number; vehicleType: string },
  { rejectValue: ErrorType }
>('InfoModel', async (modelData, { rejectWithValue }) => {
  try {
    const res = await api.garageV2.getModelInfo(modelData.make, modelData.year, modelData.vehicleType);
    const arrayMapper = res.data.map((item: string) => ({ id: nanoid(), label: item, value: item }));
    return {
      data: arrayMapper,
      status: res.status,
    };
  } catch (err) {
    return rejectWithValue(err as any);
  }
});

export const getTransportsV2 = createAsyncThunk<
  { data: RootGarageItemsData[]; meta: RootMeta },
  Partial<GetTransportsParams>,
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('getTransports', async (garageParams, { dispatch, rejectWithValue }) => {
  dispatch(setLoadingGarage({ isLoading: false }));
  try {
    const garagePendingResult = await api.garageV2.getTransports({
      is_need_action: TransportsSorting.IS_PENDING,
      page: garageParams.page || 1,
      ...garageParams,
    });
    const garageMyResult = await api.garageV2.getTransports({
      is_need_action: TransportsSorting.IS_MY,
      page: garageParams.page || 1,
      ...garageParams,
    });
    const resultRequest = [...garagePendingResult.data, ...garageMyResult.data];
    dispatch(isEmptyDataGarageWithFilter({ filters: garageParams, garageData: resultRequest }));

    const sortingResultRequest = (generalResult: RootGarageItemsData[]) => {
      const pending = generalResult.filter(
        (garage) => garage.current.confirm_status === StatusTransport.pending,
      );

      const general = generalResult.filter(
        (garage) => garage.current.confirm_status !== StatusTransport.pending,
      );

      return {
        pending,
        general,
      };
    };

    const { pending, general } = sortingResultRequest(resultRequest);
    const sortingResult = [...pending, ...general];

    return {
      data: sortingResult,
      meta: garageMyResult.meta,
    };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoadingGarage({ isLoading: true }));
  }
});

export const setNewTransportPosition = createAsyncThunk<
  any,
  { activeId: number; indexTransport: number; oldPositionData: RootGarageItemsData[] },
  { rejectValue: ErrorType }
>(
  'setNewTransportPosition',
  async ({ oldPositionData, indexTransport, activeId }, { rejectWithValue, dispatch }) => {
    try {
      return await api.garageV2.setNewTransportPosition(activeId, indexTransport);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      dispatch(setTransportDataWithNewPosition({ newPositionData: oldPositionData }));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const createNewTransport = createAsyncThunk<any, CreateTransportFormType, { rejectValue: ErrorType }>(
  'createNewTransport',
  async (data, { rejectWithValue }) => {
    try {
      return await api.garageV2.createNewTransport(data);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const selfCancelShare = createAsyncThunk<any, number, { rejectValue: ErrorType }>(
  'createNewTransport',
  async (transportID, { rejectWithValue, dispatch }) => {
    try {
      return await api.garageV2.cancelShare(transportID).then(() => {
        dispatch(deleteCurrentTransport({ transportID }));
      });
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const syncUserShare = createAsyncThunk<
  any,
  { transportID: number; users: AssignPeopleSelectValueModel[] },
  { rejectValue: ErrorType }
>('createNewTransport', async (usersInfo, { rejectWithValue }) => {
  try {
    return await api.garageV2.syncUsersShare(usersInfo);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteTransport = createAsyncThunk<
  any,
  { transportID: number; vehicleName: string },
  { rejectValue: ErrorType }
>('deleteTransport', async ({ transportID, vehicleName }, { rejectWithValue, dispatch }) => {
  try {
    return await api.garageV2
      .deleteTransport(transportID)
      .then(() => {
        dispatch(deleteCurrentTransport({ transportID }));
        NotificationService.success(`${vehicleName} deleted`);
      })
      .catch(() => {
        NotificationService.error(i18next.t('general.notifications.defaultError'));
      });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createNewTransportAllForm = createAsyncThunk<
  any,
  TransportData | any,
  { rejectValue: ErrorType }
>('createNewTransportAllForm', async (data, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));
    return await api.garageV2.createNewTransportAllForm(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(setLoading(false));
  }
});

export const scanningInsuranceCard = createAsyncThunk<
  ResultDataRecognitionData | any,
  number,
  { rejectValue: ErrorType }
>('scanningInsuranceCard', async (id, { rejectWithValue }) => {
  try {
    return await api.garageV2.uploadInsurance(id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getCurrentTransport = createAsyncThunk<RootGarageItemsData, number, { rejectValue: ErrorType }>(
  'updateTransport',
  async (transportID, { rejectWithValue, dispatch }) => {
    try {
      const transport = await api.garageV2.getTransport(transportID);
      dispatch(setCurrentTransport({ transport }));
      return transport;
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const updateTransportWS = createAsyncThunk<
  {
    updateTransportWS: RootGarageItemsData;
  },
  Entity,
  { rejectValue: ErrorType }
>('updateTransport', async (socketEvent, { rejectWithValue }) => {
  try {
    const updateTransportResponse = await api.garageV2.getTransport(socketEvent.entity_id);

    return {
      updateTransportWS: updateTransportResponse,
    };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const addTransportWS = createAsyncThunk<
  {
    addTransportWS: RootGarageItemsData;
  },
  Entity,
  { rejectValue: ErrorType }
>('addTransportWS', async (socketEvent, { rejectWithValue }) => {
  try {
    const addTransportResponse = await api.garageV2.getTransport(socketEvent.entity_id);

    return {
      addTransportWS: addTransportResponse,
    };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const acceptedTransportWS = createAsyncThunk<
  {
    acceptedTransportWS: RootGarageItemsData;
  },
  number,
  { rejectValue: ErrorType }
>('acceptedTransportWS', async (transportID, { rejectWithValue }) => {
  try {
    const acceptedTransportResponse = await api.garageV2.getTransport(transportID);

    return {
      acceptedTransportWS: acceptedTransportResponse,
    };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
