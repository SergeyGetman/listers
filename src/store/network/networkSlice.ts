import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NetworkTypeEnum } from '../../shared/enums/networkType.enum';
import { InviteUser, NetworkUserModel } from '../../shared/models/network';
import {
  editConnectionUser,
  getInviteUsers,
  getNetworkUsers,
  handleChangeConnectionRole,
  inviteFutureUser,
  networkCancel,
  networkCancelFuture,
  networkDeleteUser,
  networkResend,
  networkResendFutureRequest,
} from './networkThunk';

export interface NetworkState {
  invite: {
    data: InviteUser[];
    page: number;
    isStopPagination: boolean;
    isLoading: boolean;
  };
  network: {
    data: NetworkUserModel[];
    selectUserInfo: NetworkUserModel | undefined;
    page: number;
    isStopPagination: boolean;
    isLoading: boolean;
    type: NetworkTypeEnum | undefined;
    isShowFilter: boolean;
    networkFilterType: NetworkTypeEnum;
    contactsFilterType: string;
    isFetching: boolean;
  };
}

const initialState: NetworkState = {
  invite: {
    data: [],
    page: 1,
    isStopPagination: false,
    isLoading: false,
  },
  network: {
    data: [],
    selectUserInfo: undefined,
    page: 1,
    isStopPagination: false,
    isLoading: false,
    type: undefined,
    isFetching: false,
    isShowFilter: true,
    networkFilterType:
      JSON.parse(localStorage.getItem('networkFilterType') as string) !== null
        ? JSON.parse(localStorage.getItem('networkFilterType') as string)
        : NetworkTypeEnum.all,
    contactsFilterType:
      JSON.parse(localStorage.getItem('contactsFilterType') as string) !== null
        ? JSON.parse(localStorage.getItem('contactsFilterType') as string)
        : NetworkTypeEnum.contacts,
  },
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setInviteRole(state, action: PayloadAction<{ id: number; role: string }>) {
      state.invite.data = state.invite.data.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, selectedRole: action.payload.role };
        }
        return item;
      });
    },
    setInviteLoading(state, action: PayloadAction<boolean>) {
      state.invite.isLoading = action.payload;
    },
    clearInviteState(state) {
      state.invite = initialState.invite;
    },
    // TODO type any
    setNetworkFilterType(state, action: PayloadAction<any>) {
      localStorage.setItem('networkFilterType', JSON.stringify(action.payload));
      state.network.networkFilterType = action.payload;
    },

    setContactsFilterType(state, action: PayloadAction<string>) {
      localStorage.setItem('contactsFilterType', JSON.stringify(action.payload));
      state.network.contactsFilterType = action.payload;
    },
    setInviteUserLoading(
      state,
      action: PayloadAction<{ id: number; isLoading: boolean; isInvited?: boolean }>,
    ) {
      state.invite.data = state.invite.data.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, userLoading: action.payload.isLoading, isSendInvite: action.payload.isInvited };
        }
        return user;
      });
    },
    setNetworkLoading(state, action: PayloadAction<boolean>) {
      state.network.isLoading = action.payload;
    },
    clearNetworkState(state) {
      state.network = {
        ...initialState.network,
        networkFilterType: state.network.networkFilterType,
        contactsFilterType: state.network.contactsFilterType,
      };
    },
    setNetworkType(state, action: PayloadAction<NetworkTypeEnum | undefined>) {
      state.network.type = action.payload;
    },
    addNetworkUser(state, action: PayloadAction<NetworkUserModel>) {
      state.network.data = [action.payload, ...state.network.data];
    },
    changeNetworkUser(state, action: PayloadAction<NetworkUserModel>) {
      state.network.data = state.network.data.map((user) => {
        if (user.friend_id === action.payload.friend_id) {
          return { ...user, ...action.payload };
        }
        return user;
      });
    },
    deleteNetworkUser(state, action: PayloadAction<number>) {
      state.network.data = state.network.data.filter((item) => item.friend_id !== action.payload);
    },
    deleteNetworkRequest(state, action: PayloadAction<number>) {
      state.network.data = state.network.data.filter((item) => item.id !== action.payload);
    },
    setNetworkSelectUserInfo(state, action: PayloadAction<number>) {
      state.network.selectUserInfo = state.network.data.find((item) => item.id === action.payload);
    },
    setShowNetworkFilter(state, action: PayloadAction<boolean>) {
      state.network.isShowFilter = action.payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getInviteUsers.fulfilled, ({ invite }, { payload: { data, meta } }) => {
      if (invite.page === 1) {
        invite.data = data;
      } else {
        invite.data = [...invite.data, ...data];
      }
      invite.isStopPagination = meta.last_page <= invite.page;
      invite.page = meta.current_page + 1;
    });
    addCase(getNetworkUsers.fulfilled, ({ network }, { payload: { data, meta } }) => {
      if (network.page === 1) {
        network.data = data;
      } else {
        network.data = [...network.data, ...data];
      }
      network.isStopPagination = meta.last_page <= network.page;
      network.page = meta.current_page + 1;
      network.isFetching = true;
    });
    addCase(networkCancel.fulfilled, (state, action) => {
      state.network.data = state.network.data.filter((item) => item.friend_id !== action.payload);
    });
    addCase(networkCancelFuture.fulfilled, (state, action) => {
      state.network.data = state.network.data.filter((item) => item.id !== action.payload);
    });
    addCase(networkResend.fulfilled, (state, action) => {
      state.network.data = state.network.data.map((item) => {
        if (item.friend_id === action.payload) {
          return { ...item, is_resend: false };
        }
        return item;
      });
    });
    addCase(networkResendFutureRequest.fulfilled, (state, action) => {
      state.network.data = state.network.data.map((item) => {
        if (item.friend_id === action.payload) {
          return { ...item, is_resend: false };
        }
        return item;
      });
    });
    addCase(networkDeleteUser.fulfilled, (state, action) => {
      state.network.data = state.network.data.filter((item) => item.friend_id !== action.payload);
    });
    addCase(inviteFutureUser.fulfilled, (state, action) => {
      state.network.data = state.network.data.map((item) => {
        if (item.friend_id === action.payload.friend_id) {
          return { ...item, is_invited: action.payload.is_invited };
        }
        return item;
      });
    });
    addCase(handleChangeConnectionRole.fulfilled, (state, action) => {
      state.network.data = state.network.data.map((item) => {
        if (item.friend_id === action.payload.id) {
          return { ...item, role: action.payload.role };
        }
        return item;
      });
    });
    addCase(editConnectionUser.fulfilled, (state, action) => {
      state.network.data = state.network.data.map((item) => {
        if (item.friend_id === action.payload.id) {
          return { ...item, role: action.payload.role };
        }
        return item;
      });
    });
  },
});

export const {
  setInviteRole,
  setInviteLoading,
  clearInviteState,
  setInviteUserLoading,
  setNetworkLoading,
  clearNetworkState,
  setNetworkType,
  addNetworkUser,
  changeNetworkUser,
  deleteNetworkUser,
  setShowNetworkFilter,
  setNetworkFilterType,
  deleteNetworkRequest,
  setNetworkSelectUserInfo,
  setContactsFilterType,
} = networkSlice.actions;
export default networkSlice.reducer;
