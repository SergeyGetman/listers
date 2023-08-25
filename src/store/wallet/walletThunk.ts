import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { GetWalletDataResponseModel } from '../../shared/models/wallet/getWalletDataResponse.model';
import { WalletFilters } from './walletSlice';

export const getWalletItems = createAsyncThunk<
  { data: GetWalletDataResponseModel; isFetchingWithFilter: boolean },
  WalletFilters,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getWalletItems', async (params, { rejectWithValue }) => {
  const filterObjEntries = Object.values({ ...params, page: null });
  const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
    return currentValue ? previousValue + 1 : previousValue;
  }, 0);
  try {
    const firstPage = api.wallet.getWalletItems({
      page: 1,
      ...params,
      status: params.status === 'all' ? null : params.status,
    });
    const secondPage = api.wallet.getWalletItems({
      page: 2,
      ...params,
      status: params.status === 'all' ? null : params.status,
    });

    return Promise.all([firstPage, secondPage]).then(
      (
        result: GetWalletDataResponseModel[],
      ): { data: GetWalletDataResponseModel; isFetchingWithFilter: boolean } => {
        const firstPageData = result?.[0]?.data;
        const secondPageData = result?.[1]?.data;
        return {
          data: {
            ...result?.[1],
            data: [...firstPageData, ...secondPageData],
          },
          isFetchingWithFilter: !!filterItemSum,
        };
      },
    );
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
