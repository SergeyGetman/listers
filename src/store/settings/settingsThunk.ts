import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import {
  CouponModel,
  DiscountModel,
  PaymentMethodModel,
  PlanModel,
  SubscriptionFeedback,
  SubscriptionInfoModel,
} from '../../shared/models/plans.model';
import { PlanPeriodEnum } from '../../shared/enums/planPeriodEnum';
import { getProfileInfo } from '../Profile/profile.actions';

export const getPlans = createAsyncThunk<
  PlanModel[],
  PlanPeriodEnum,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getPlans', async (period, { rejectWithValue }) => {
  try {
    return await api.settings.getPlans(period);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createSubscription = createAsyncThunk<
  any,
  { id: number; code?: string | undefined; isTrial?: boolean },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createSubscription', async ({ id, code, isTrial }, { rejectWithValue, dispatch }) => {
  try {
    const res = await api.settings.createSubscription(id, code, isTrial);

    if (res?.user_status !== 'requires_action' && res?.user_status !== 'requires_payment_method') {
      await dispatch(getProfileInfo());
    }

    return res;
  } catch (e: any) {
    if (e?.status === 425) {
      dispatch(getProfileInfo());
    } else {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
    }
    return rejectWithValue({ ...e.data, status: e.status } as ErrorType);
  }
});

export const getCuponInfo = createAsyncThunk<
  CouponModel,
  { name: string; package_id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getCuponInfo', async ({ name, package_id }, { rejectWithValue }) => {
  try {
    const res = await api.settings.getCouponInfo(name, package_id);
    // await dispatch(getProfileInfo());
    return res;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getSubscriptionInfo = createAsyncThunk<
  SubscriptionInfoModel,
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getSubscriptionInfo', async (_, { rejectWithValue }) => {
  try {
    return await api.settings.getSubscriptionInfo();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createPaymentMethod = createAsyncThunk<
  PaymentMethodModel,
  { source: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createPaymentMethod', async (data, { rejectWithValue }) => {
  try {
    return await api.settings.createPaymentMethod(data);
  } catch (e: any) {
    if (e?.status === 422) {
      if (e.data?.message) {
        NotificationService.error(e.data?.message);
      } else {
        NotificationService.error(i18next.t('general.notifications.defaultError'));
      }
    } else {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
    }
    return rejectWithValue(e.data as ErrorType);
  }
});

export const cancelSubscription = createAsyncThunk<
  any,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('cancelSubscription', async (id, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.settings.cancelSubscription(id);
    await dispatch(getProfileInfo());
    return res;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const billingPay = createAsyncThunk<any, number, { rejectValue: ErrorType; dispatch: AppDispatch }>(
  'billingPay',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.settings.billingPay(id);
      await dispatch(getProfileInfo());
      return res;
    } catch (e: any) {
      if (e?.status === 422) {
        if (e.data?.message) {
          NotificationService.error(e.data?.message);
        } else {
          NotificationService.error(i18next.t('general.notifications.defaultError'));
        }
      } else {
        NotificationService.error(i18next.t('general.notifications.defaultError'));
      }
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const getDowngradeSubscription = createAsyncThunk<
  DiscountModel[],
  undefined,
  { rejectValue: ErrorType }
>('getDowngradeSubscription', async (_, { rejectWithValue }) => {
  try {
    return await api.settings.getDowngradeDiscount();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const applyDiscount = createAsyncThunk<any, string, { rejectValue: ErrorType }>(
  'getDowngradeSubscription',
  async (coupon, { rejectWithValue }) => {
    try {
      return await api.settings.setCoupon(coupon);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const createSubscriptionFeedback = createAsyncThunk<
  any,
  { data: SubscriptionFeedback },
  { rejectValue: ErrorType }
>('getDowngradeSubscription', async ({ data }, { rejectWithValue }) => {
  try {
    return await api.settings.setSubscriptionFeedback(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getPlanProrate = createAsyncThunk<{ total: number }, number, { rejectValue: ErrorType }>(
  'getPlanProrate',
  async (id, { rejectWithValue }) => {
    try {
      return await api.settings.getProrate(id);
    } catch (e: any) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return rejectWithValue(e.data as ErrorType);
    }
  },
);

export const setSupportTimeBookDemo = createAsyncThunk<
  any,
  { supportTimeStart: string; supportTimeEnd: string },
  { rejectValue: ErrorType }
>('setSupportTimeBookDemo', async ({ supportTimeStart, supportTimeEnd }, { rejectWithValue }) => {
  try {
    return await api.settings.setSupportMeetingTime(supportTimeStart, supportTimeEnd);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
