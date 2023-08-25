import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch, RootState } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { UpdatePaymentsFormPayload } from '../../shared/models/payments/updatePaymentsFormPayload.model';
import { PlannerItemStatusesEnum } from '../../shared/enums/plannerItemStatuses.enum';
import { getTransportItem } from '../garage/garageThunk';

export const getPaymentItem = createAsyncThunk<
  any,
  { paymentId: number; is_list?: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getPaymentItem', async (props, { rejectWithValue }) => {
  try {
    return await api.payment.getPayment(props);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updatePaymentItem = createAsyncThunk<
  any,
  { params: UpdatePaymentsFormPayload; paymentId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('updatePaymentItem', async ({ params, paymentId }, { dispatch, rejectWithValue, getState }) => {
  try {
    const res = await api.payment.updatePayment(params, paymentId);
    if (window.location.href.includes('garage/')) {
      const transportId = getState().garage.transport.data?.id as number;
      dispatch(getTransportItem(transportId));
    }
    return res;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changePaymentStatus = createAsyncThunk<
  any,
  { paymentId: number; status: PlannerItemStatusesEnum },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('changePaymentStatus', async (params, { rejectWithValue }) => {
  try {
    return await api.payment.changeStatus(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
