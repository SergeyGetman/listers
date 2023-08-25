import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  activateHub,
  activateLogin,
  changeLoginData,
  createProfileBodyArt,
  deactivateHub,
  deleteProfileBodyArt,
  getConnections,
  getFullProfileInfo,
  getProfileInfo,
  getProfileSettings,
  getSettingsProfileInfo,
  setProfileSettings,
  updateFeedsCounter,
  updateProfileAppearance,
  updateProfileBodyArt,
  updateProfileContacts,
  updateProfileFullName,
  updateProfileGeneralInfo,
} from './profile.actions';
import { TaskItemModel } from '../../shared/models/tasks/taskItem.model';
import { AvatarModel } from '../../shared/models/avatar.model';
import { MediaType } from '../../shared/models/media.model';
export interface ProfileState {
  isFetching: boolean;
  data: any;
  connections: any;
}

const initialState: ProfileState = {
  isFetching: false,
  data: null,
  connections: null,
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfileViewDataItem: (state, action: PayloadAction<string>) => {
      state.data.view_data = { ...state.data.view_data, [action.payload]: true };
    },
    setProfileHubsGarageExpiredAtDate: (state, action: PayloadAction<boolean>) => {
      state.data.hubs.garage.expired_at = action.payload;
    },

    setProfileEmail: (state, action: PayloadAction<string>) => {
      state.data.email = action.payload;
    },
    setProfilePhone: (state, action: PayloadAction<string>) => {
      state.data.phone = action.payload;
    },
    deleteProfileAvatar: (state) => {
      state.data = { ...state.data, avatar: null };
    },
    setProfileAvatar: (state, action: PayloadAction<AvatarModel>) => {
      state.data = { ...state.data, avatar: action.payload };
    },
    deleteProfileBackground: (state) => {
      state.data = { ...state.data, background: null };
    },
    setProfileBackground: (state, action: PayloadAction<AvatarModel>) => {
      state.data = { ...state.data, background: action.payload };
    },
    setProfileGallery: (state, action: PayloadAction<MediaType[]>) => {
      state.data = { ...state.data, gallery: action.payload };
    },

    setProfileNotificationsCount: (state, action: PayloadAction<number>) => {
      state.data = {
        ...state.data,
        counters: {
          ...state.data.counters,
          count_requests: state.data.counters.count_requests + action.payload,
        },
      };
    },
    reorderSidebarOrganizerItems: (state, action: PayloadAction<any>) => {
      const reorderedItem = state.data?.sidebar?.organizers?.splice(action.payload.droppableIndex, 1);
      state.data.sidebar.organizers.splice(action.payload.destinationIndex, 0, ...reorderedItem);
    },
    reorderSidebarHubsItems: (state, action: PayloadAction<any>) => {
      const reorderedItem = state.data?.sidebar?.hubs?.splice(action.payload.droppableIndex, 1);
      state.data.sidebar.hubs.splice(action.payload.destinationIndex, 0, ...reorderedItem);
    },
    setProfileNotificationsNewsCount: (state, action: PayloadAction<number>) => {
      state.data = {
        ...state.data,
        counters: {
          ...state.data.counters,
          count_notification: state.data.counters.count_notification + action.payload,
          count_news: state.data.counters.count_news + action.payload,
        },
      };
    },
    setProfileNotificationsAllNewsCount: (state) => {
      state.data = {
        ...state.data,
        counters: {
          ...state.data.counters,
          count_notification: state.data.counters.count_notification - state.data.counters.count_news,
          count_news: 0,
        },
      };
    },
    resetProfileState: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getProfileInfo.fulfilled, (state, { payload }) => {
      state.isFetching = true;
      state.data = {
        ...state.data,
        ...payload,
        sidebar: {
          ...payload.sidebar,
          organizers: payload?.sidebar?.organizers?.filter(
            (item: any) => item.tag !== 'storage' && item.tag !== 'google_sync',
          ),
        },
      };
    });
    addCase(getConnections.fulfilled, (state, { payload }) => {
      state.connections = payload.map((item: any) => {
        if (item?.contacts?.is_company) {
          return { ...item, full_name: item?.contacts?.company };
        }
        return item;
      });
    });
    addCase(getSettingsProfileInfo.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, ...payload };
    });
    addCase(updateProfileFullName.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, ...payload };
    });
    addCase(getFullProfileInfo.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, ...payload };
    });
    addCase(updateProfileGeneralInfo.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, ...payload };
    });
    addCase(updateProfileAppearance.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, appearance: payload };
    });
    addCase(updateProfileContacts.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, contacts: payload };
    });
    addCase(changeLoginData.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, ...payload };
    });
    addCase(activateLogin.fulfilled, (state, { payload }) => {
      if (payload.isPhone) {
        state.data = {
          ...state.data,
          phone: payload.login,
          unverified_login: { ...state.data.unverified_login, phone: null },
        };
      } else {
        state.data = {
          ...state.data,
          email: payload.login,
          unverified_login: { ...state.data.unverified_login, email: null },
        };
      }
    });
    addCase(createProfileBodyArt.fulfilled, (state, { payload }) => {
      state.data = {
        ...state.data,
        bodyArts: [...state.data.bodyArts, payload],
      };
    });
    addCase(updateProfileBodyArt.fulfilled, (state, { payload }) => {
      state.data = {
        ...state.data,
        bodyArts: state.data.bodyArts.map((item: TaskItemModel) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        }),
      };
    });

    addCase(deleteProfileBodyArt.fulfilled, (state, { payload }) => {
      state.data = {
        ...state.data,
        bodyArts: state.data.bodyArts.filter((item: any) => item.id !== payload),
      };
    });

    addCase(activateHub.fulfilled, (state, { payload }) => {
      const hubName = payload.name?.toLowerCase();
      state.data.hubs = { ...state.data.hubs, [hubName]: payload };
    });
    addCase(deactivateHub.fulfilled, (state, { payload }) => {
      const hubName = payload.name?.toLowerCase();
      state.data.hubs = { ...state.data.hubs, [hubName]: payload };
    });
    addCase(updateFeedsCounter.fulfilled, (state, { payload }) => {
      state.data.counters = { ...state.data.counters, ...payload };
    });
    addCase(getProfileSettings.fulfilled, (state, { payload }) => {
      state.data = { ...state?.data, profileSettings: payload };
    });
    addCase(setProfileSettings.fulfilled, (state, { payload }) => {
      state.data = { ...state?.data, profileSettings: { ...state?.data?.profileSettings, ...payload } };
    });
  },
});

export const {
  resetProfileState,
  setProfileViewDataItem,
  setProfileHubsGarageExpiredAtDate,
  deleteProfileAvatar,
  setProfileAvatar,
  deleteProfileBackground,
  setProfileBackground,
  setProfileGallery,
  setProfileNotificationsCount,
  setProfileNotificationsAllNewsCount,
  setProfileNotificationsNewsCount,
  reorderSidebarOrganizerItems,
  reorderSidebarHubsItems,
} = profileSlice.actions;
export default profileSlice.reducer;
