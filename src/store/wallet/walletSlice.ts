import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isListOver } from '../../shared/functions/isListOver';
import { GetWalletDataResponseModel } from '../../shared/models/wallet/getWalletDataResponse.model';

export type WalletFilters = {
  status: string | null;
  query: string | null;
  date_time_to: string | null;
  date_time_from: string | null;
};

export interface WalletState {
  filters: WalletFilters;
  walletData: any;
  isListOver: boolean | number;
  isFetchingWithFilter: boolean;
}

const initialState: WalletState = {
  walletData: null,
  isListOver: false,
  isFetchingWithFilter: false,
  filters:
    JSON.parse(localStorage.getItem('walletFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('walletFilters') as string)
      : {
          status: 'all',
          query: null,
          date_time_to: null,
          date_time_from: null,
        },
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('walletFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
      state.isListOver = false;
    },
    setWalletData: (
      state,
      action: PayloadAction<{ data: GetWalletDataResponseModel; isFetchingWithFilter: boolean }>,
    ) => {
      state.walletData = action.payload.data;
      state.isListOver = isListOver(action.payload.data);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },
    resetWalletData: (state) => {
      state.walletData = initialState.walletData;
    },
  },
});

export const { setWalletFilters, setWalletData, resetWalletData } = walletSlice.actions;
export default walletSlice.reducer;
