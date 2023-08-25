import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BreadcrumbsModel } from '../../shared/models/breadcrumbs.model';
import { getNetworkCounter } from './commonThunk';

export type ChatCountersType = {
  count_unread_group: number;
  count_unread_message: number;
  count_unread_private: number;
};

export interface CommonState {
  isAuth: boolean;
  redirectLink: string;
  isOpenLeftSidebar: boolean;
  breadcrumbs: BreadcrumbsModel;
  loaders: string[];
  online: number[];
  counters: {
    chat: ChatCountersType & { global: number };
    network: { global: number };
  };
}

const initialState: CommonState = {
  isAuth: !!localStorage.getItem('token'),
  isOpenLeftSidebar: false,
  redirectLink: '',
  breadcrumbs: [],
  loaders: [],
  online: [],
  counters: {
    chat: {
      count_unread_group: 0,
      count_unread_message: 0,
      count_unread_private: 0,
      global: 0,
    },
    network: {
      global: 0,
    },
  },
};

export const commonSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.loaders = [...state.loaders, 'loading'];
      } else {
        state.loaders.pop();
      }
    },
    setBreadcrumbsItems: (state, action: PayloadAction<BreadcrumbsModel>) => {
      state.breadcrumbs = action.payload;
    },
    toggleOpenLeftSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenLeftSidebar = action.payload;
    },
    setChatCounters: (state, action: PayloadAction<ChatCountersType>) => {
      const chatCounters: CommonState['counters']['chat'] = {
        ...action.payload,
        global: 0,
      };
      if (action.payload.count_unread_message) {
        chatCounters.global = action.payload.count_unread_message;
      }

      state.counters.chat = {
        ...state.counters.chat,
        ...chatCounters,
      };
    },
    setNetworkCounter(state, action: PayloadAction<number>) {
      state.counters.network.global = action.payload;
    },
    setOnlineUsers(state, action: PayloadAction<number[]>) {
      const usersSet = new Set(state.online);
      for (let i = 0; i < action.payload.length; i++) {
        usersSet.add(action.payload[i]);
      }
      state.online = Array.from(usersSet) as number[];
    },
    addOnlineUser(state, action: PayloadAction<number>) {
      const newUsers = new Set(state.online);
      newUsers.add(action.payload);
      state.online = Array.from(newUsers) as number[];
    },
    deleteOnlineUser(state, action: PayloadAction<number>) {
      state.online = state.online.filter((item) => item !== action.payload);
    },
    changeRedirectLink(state, action: PayloadAction<string>) {
      state.redirectLink = action.payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getNetworkCounter.fulfilled, (state, action) => {
      state.counters.network.global = action.payload.count;
    });
  },
});

export const {
  setAuth,
  setLoading,
  toggleOpenLeftSidebar,
  setBreadcrumbsItems,
  setChatCounters,
  setNetworkCounter,
  setOnlineUsers,
  addOnlineUser,
  deleteOnlineUser,
  changeRedirectLink,
} = commonSlice.actions;
export default commonSlice.reducer;
