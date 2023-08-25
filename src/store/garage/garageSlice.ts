import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createTransport,
  createTransportInsurance,
  createTransportLicense,
  createTransportSticker,
  deleteInsurance,
  deleteTransport,
  deleteTransportLicense,
  deleteTransportSticker,
  editTransport,
  editTransportInsurance,
  editTransportLicense,
  editTransportSticker,
  getTransportItem,
  getTransports,
  shareTransport,
} from './garageThunk';
import { GarageItemModel, TransportItemModel } from '../../shared/models/garage.model';
import { MediaType } from '../../shared/models/media.model';

export interface NetworkState {
  transport: {
    data: TransportItemModel | null;
  };
  transports: {
    data: GarageItemModel[];
    page: number;
    isStopPagination: boolean;
  };
}

const initialState: NetworkState = {
  transport: {
    data: null,
  },
  transports: {
    data: [],
    page: 1,
    isStopPagination: false,
  },
};

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    clearTransportsState(state) {
      state.transports = initialState.transports;
    },
    clearTransportState(state) {
      state.transport = initialState.transport;
    },
    setTransportsData(state, action) {
      state.transports.data = action.payload;
    },
    removeTransport(state, action) {
      state.transports.data = state.transports.data.filter((item) => item.id !== action.payload);
    },
    addTransportPhoto(state, action: PayloadAction<MediaType[]>) {
      if (state.transport.data) state.transport.data.photos = action.payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getTransports.fulfilled, (state, { payload }) => {
      if (state.transports.page === 1) {
        state.transports.data = payload.data;
      } else {
        state.transports.data = [...state.transports.data, ...payload.data];
      }
      state.transports.isStopPagination = payload.meta.last_page === state.transports.page;
      state.transports.page = payload.meta.current_page + 1;
    });
    addCase(getTransportItem.fulfilled, (state, { payload }) => {
      state.transport.data = payload;
    });
    addCase(createTransport.fulfilled, (state, { payload }) => {
      state.transports.data = [payload, ...state.transports.data];
    });
    addCase(deleteTransport.fulfilled, (state, { payload }) => {
      state.transports.data = state.transports.data.filter((item) => item.id !== payload);
    });
    addCase(createTransportLicense.fulfilled, (state, { payload }) => {
      if (state.transport.data !== null) {
        state.transport.data.license_list = [payload, ...state.transport.data.license_list];
      }
    });
    addCase(editTransportLicense.fulfilled, (state, { payload }) => {
      if (state.transport.data !== null) {
        state.transport.data.license_list = state.transport.data.license_list.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        });
      }
    });
    addCase(createTransportInsurance.fulfilled, (state, { payload }) => {
      if (state.transport.data !== null) {
        state.transport.data.insurance_list = [payload, ...state.transport.data.insurance_list];
      }
    });

    addCase(editTransportInsurance.fulfilled, (state, { payload }) => {
      if (state.transport.data !== null) {
        state.transport.data.insurance_list = state.transport.data.insurance_list.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        });
      }
    });
    addCase(editTransport.fulfilled, (state, { payload }) => {
      if (state.transport.data) {
        state.transport.data = payload;
      }
    });
    addCase(deleteInsurance.fulfilled, (state, { payload }) => {
      if (state.transport.data) {
        state.transport.data.insurance_list = state.transport.data.insurance_list.filter(
          (item) => item.id !== payload,
        );
      }
    });
    addCase(deleteTransportLicense.fulfilled, (state, { payload }) => {
      if (state.transport.data) {
        state.transport.data.license_list = state.transport.data.license_list.filter(
          (item) => item.id !== payload,
        );
      }
    });
    addCase(deleteTransportSticker.fulfilled, (state, { payload }) => {
      if (state.transport.data) {
        state.transport.data.stickers = state.transport.data.stickers.filter((item) => item.id !== payload);
      }
    });
    addCase(shareTransport.fulfilled, (state, { payload }) => {
      if (state.transport.data) {
        state.transport.data.shared_users = payload;
      }
    });
    addCase(createTransportSticker.fulfilled, (state, { payload }) => {
      if (state.transport.data) {
        state.transport.data.stickers = [payload, ...state.transport.data.stickers];
      }
    });
    addCase(editTransportSticker.fulfilled, (state, { payload }) => {
      if (state.transport.data) {
        state.transport.data.stickers = state.transport.data.stickers.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        });
      }
    });
  },
});

export const {
  clearTransportsState,
  setTransportsData,
  clearTransportState,
  removeTransport,
  addTransportPhoto,
} = garageSlice.actions;
export default garageSlice.reducer;
