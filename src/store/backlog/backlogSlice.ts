import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isListOver } from '../../shared/functions/isListOver';
import { TaskItemModel } from '../../shared/models/tasks/taskItem.model';
import { ByPersonFiltersEnum } from '../../shared/enums/byPersonFilters.enum';
import { GetTasksDataResponseModel } from '../../shared/models/tasks/getTasksIDataResponse.model';

export type BacklogFiltersType = {
  personal_assignment: string | null;
  related_user_id: ByPersonFiltersEnum | null;
  priorities: string[] | null;
  is_late: number | null;
  query: string | null;
};

export interface BacklogState {
  isShowBacklogNavigationPanel: boolean;
  backlogData: any;
  isListOver: boolean | number;
  isFetchingWithFilter: boolean;
  isFetchingInitialData: boolean;
  filters: BacklogFiltersType;
}

const initialState: BacklogState = {
  isFetchingInitialData: false,
  isShowBacklogNavigationPanel:
    typeof JSON.parse(localStorage.getItem('backlogNavigationPanel') as string) === 'boolean'
      ? JSON.parse(localStorage.getItem('backlogNavigationPanel') as string)
      : true,
  filters:
    JSON.parse(localStorage.getItem('backlogFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('backlogFilters') as string)
      : {
          personal_assignment: null,
          related_user_id: null,
          priorities: null,
          is_late: null,
          query: null,
        },
  backlogData: [],
  isListOver: false,
  isFetchingWithFilter: false,
};

export const backlogSlice = createSlice({
  name: 'backlog',
  initialState,
  reducers: {
    toggleShowBacklogNavigationPanel: (state, action: PayloadAction<boolean>) => {
      state.isShowBacklogNavigationPanel = action.payload;
    },
    setBacklogFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('backlogFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFetchingInitialData: (state, action: PayloadAction<boolean>) => {
      state.isFetchingInitialData = action.payload;
    },
    addedBacklogItem: (state, action: PayloadAction<TaskItemModel>) => {
      if (state.backlogData.meta) {
        state.backlogData = {
          ...state.backlogData,
          data: [action.payload, ...state.backlogData.data],
        };
      }
    },
    updateBacklogItem: (state, action: PayloadAction<TaskItemModel>) => {
      if (state.backlogData.meta) {
        state.backlogData.data = state.backlogData.data.map((item: TaskItemModel) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      }
    },
    removeBacklogItem: (state, action: PayloadAction<number>) => {
      if (state.backlogData.meta) {
        state.backlogData.data = state.backlogData.data.filter(
          (item: TaskItemModel) => item.id !== action.payload,
        );
      }
    },
    setBacklogData: (
      state,
      action: PayloadAction<{ backlogData: GetTasksDataResponseModel; isFetchingWithFilter: boolean }>,
    ) => {
      state.backlogData = action.payload.backlogData;
      state.isListOver = isListOver(action.payload.backlogData);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },
    setMoreBacklogData: (
      state,
      action: PayloadAction<{ backlogData: GetTasksDataResponseModel; isFetchingWithFilter: boolean }>,
    ) => {
      if (state.backlogData?.meta) {
        state.backlogData = {
          ...action.payload.backlogData,
          data: [...state.backlogData.data, ...action.payload.backlogData.data],
        };
      }

      state.isListOver = isListOver(action.payload.backlogData);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },
    resetBacklogData: (state) => {
      return { ...initialState, filters: state.filters };
    },
  },
});

export const {
  toggleShowBacklogNavigationPanel,
  setBacklogData,
  setMoreBacklogData,
  toggleFetchingInitialData,
  addedBacklogItem,
  setBacklogFilters,
  removeBacklogItem,
  updateBacklogItem,
  resetBacklogData,
} = backlogSlice.actions;
export default backlogSlice.reducer;
