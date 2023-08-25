import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isListOver } from '../../shared/functions/isListOver';
import { TaskItemModel } from '../../shared/models/tasks/taskItem.model';
import { GetTasksDataResponseModel } from '../../shared/models/tasks/getTasksIDataResponse.model';
import { EventItemModel } from '../../shared/models/event/eventItem.model';

export type ArchiveFiltersType = {
  query: string | null;
  model_type: string;
  date_time_to: string | null;
  date_time_from: string | null;
};

export interface ArchiveState {
  isShowArchiveNavigationPanel: boolean;
  archiveData: any;
  isListOver: boolean | number;
  isFetchingWithFilter: boolean;
  filters: ArchiveFiltersType;
}

const initialState: ArchiveState = {
  isFetchingWithFilter: false,
  isShowArchiveNavigationPanel:
    typeof JSON.parse(localStorage.getItem('archiveNavigationPanel') as string) === 'boolean'
      ? JSON.parse(localStorage.getItem('archiveNavigationPanel') as string)
      : true,
  filters:
    JSON.parse(localStorage.getItem('archiveFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('archiveFilters') as string)
      : {
          model_type: null,
          query: null,
          date_time_to: null,
          date_time_from: null,
        },
  archiveData: [],
  isListOver: false,
};

export const archiveSlice = createSlice({
  name: 'archive',
  initialState,
  reducers: {
    toggleShowArchiveNavigationPanel: (state, action: PayloadAction<boolean>) => {
      state.isShowArchiveNavigationPanel = action.payload;
    },
    setArchiveFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('archiveFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
      state.isListOver = false;
    },
    addedArchiveItem: (state, action: PayloadAction<TaskItemModel>) => {
      if (state.archiveData.meta) {
        state.archiveData = {
          ...state.archiveData,
          data: [action.payload, ...state.archiveData.data],
        };
      }
    },
    updateArchiveItem: (state, action: PayloadAction<TaskItemModel | EventItemModel>) => {
      if (state.archiveData.meta) {
        state.archiveData.data = state.archiveData.data.map((item: TaskItemModel | EventItemModel) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      }
    },
    removeArchiveItem: (state, action: PayloadAction<number>) => {
      if (state.archiveData.meta) {
        state.archiveData.data = state.archiveData.data.filter(
          (item: TaskItemModel) => item.id !== action.payload,
        );
      }
    },
    setArchiveData: (
      state,
      action: PayloadAction<{ archiveData: GetTasksDataResponseModel; isFetchingWithFilter: boolean }>,
    ) => {
      state.archiveData = action.payload.archiveData;
      state.isListOver = isListOver(action.payload.archiveData);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },
    setMoreArchiveData: (
      state,
      action: PayloadAction<{ archiveData: GetTasksDataResponseModel; isFetchingWithFilter: boolean }>,
    ) => {
      if (state.archiveData?.meta) {
        state.archiveData = {
          ...action.payload.archiveData,
          data: [...state.archiveData.data, ...action.payload.archiveData.data],
        };
      }
      state.isListOver = isListOver(action.payload.archiveData);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },
    resetArchiveData: (state) => {
      return { ...initialState, filters: state.filters };
    },
  },
});

export const {
  toggleShowArchiveNavigationPanel,
  setArchiveFilters,
  setArchiveData,
  setMoreArchiveData,
  addedArchiveItem,
  removeArchiveItem,
  updateArchiveItem,
  resetArchiveData,
} = archiveSlice.actions;
export default archiveSlice.reducer;
