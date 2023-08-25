import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { getKanbanItems, getMoreRoadmapColumnData } from './roadmapThunk';
import { isListOver } from '../../shared/functions/isListOver';
import { ByPersonFiltersEnum } from '../../shared/enums/byPersonFilters.enum';
import { TaskItemModel } from '../../shared/models/tasks/taskItem.model';
import { removeItemFromKanbanColumn } from '../../shared/functions/removeItemFromKanbanColumn';
import { GetTasksDataResponseModel } from '../../shared/models/tasks/getTasksIDataResponse.model';
import { PlannerItemStatusesEnum } from '../../shared/enums/plannerItemStatuses.enum';

export type RoadmapFilters = {
  personal_assignment: string | null;
  related_user_id: ByPersonFiltersEnum | null;
  priorities: string[] | null;
  statuses: string[] | null;
  is_late: number | null;
  is_today: number | null;
  query: string | null;
  date_time_to: string | null;
  date_time_from: string | null;
};

export interface RoadmapState {
  isShowRoadmapNavigationPanel: boolean;
  kanbanData: any;
  cardViewData: any;
  isLargeDisplay: boolean;
  isListOver: boolean | number;
  filters: RoadmapFilters;
  isFetchingWithFilter: boolean;
}

const initialState: RoadmapState = {
  isShowRoadmapNavigationPanel:
    typeof JSON.parse(localStorage.getItem('roadmapNavigationPanel') as string) === 'boolean'
      ? JSON.parse(localStorage.getItem('roadmapNavigationPanel') as string)
      : true,
  kanbanData: null,
  cardViewData: null,
  isLargeDisplay: true,
  isListOver: false,
  isFetchingWithFilter: false,
  filters:
    JSON.parse(localStorage.getItem('roadmapFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('roadmapFilters') as string)
      : {
          personal_assignment: null,
          related_user_id: null,
          priorities: null,
          is_late: null,
          is_today: null,
          query: null,
          date_time_to: null,
          date_time_from: null,
          statuses: [
            PlannerItemStatusesEnum.todo,
            PlannerItemStatusesEnum.in_progress,
            PlannerItemStatusesEnum.done,
          ],
        },
};

export const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    toggleShowRoadmapNavigationPanel: (state, action: PayloadAction<boolean>) => {
      state.isShowRoadmapNavigationPanel = action.payload;
    },
    setRoadmapIsLargeDisplay: (state, action: PayloadAction<boolean>) => {
      state.isLargeDisplay = action.payload;
    },
    setRoadmapFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('roadmapFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
      state.isListOver = false;
    },
    changeKanbanItemStatus: (
      state,
      action: PayloadAction<{
        droppableId: string;
        droppableIndex: number;
        destinationId: string;
        destinationIndex: number;
        changedItem: TaskItemModel;
      }>,
    ) => {
      const { droppableId, droppableIndex, destinationId, destinationIndex, changedItem } = action.payload;
      const droppableIdColumnData = state.kanbanData[droppableId].data;
      const destinationIdColumnData = state.kanbanData[destinationId].data;
      droppableIdColumnData.splice(droppableIndex, 1);
      destinationIdColumnData.splice(destinationIndex, 0, changedItem);

      state.kanbanData = {
        ...state.kanbanData,
        [droppableId]: {
          ...state.kanbanData[droppableId],
          data: droppableIdColumnData,
        },
        [destinationId]: {
          ...state.kanbanData[destinationId],
          data: destinationIdColumnData,
        },
      };
    },
    removeRoadmapItem: (state, action: PayloadAction<number>) => {
      if (state.isLargeDisplay) {
        state.kanbanData = removeItemFromKanbanColumn(current(state.kanbanData), action.payload);
      } else {
        state.cardViewData.data = state.cardViewData.data.filter(
          (item: TaskItemModel) => item.id !== action.payload,
        );
      }
    },
    addRoadmapItem: (state, action: PayloadAction<TaskItemModel>) => {
      if (state.isLargeDisplay) {
        const columnId = action.payload.current_user.status || action.payload.global_status;
        state.kanbanData = {
          ...state.kanbanData,
          [columnId]: {
            ...state.kanbanData[columnId],
            data: [action.payload, ...state.kanbanData[columnId].data],
          },
        };
      } else {
        state.cardViewData = {
          ...state.cardViewData,
          data: [action.payload, ...state.cardViewData.data],
        };
      }
    },
    updateRoadmapItem: (state, action: PayloadAction<TaskItemModel>) => {
      if (state.isLargeDisplay) {
        const columnId = action.payload.current_user.status || action.payload.global_status;
        state.kanbanData = {
          ...state.kanbanData,
          [columnId]: {
            ...state.kanbanData[columnId],
            data: state.kanbanData[columnId].data.map((item: TaskItemModel) => {
              if (item.id === action.payload.id) {
                return action.payload;
              }
              return item;
            }),
          },
        };
      } else {
        state.cardViewData.data = state.cardViewData.data.map((item: TaskItemModel) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      }
    },

    resetKanbanData: (state) => {
      return { ...initialState, filters: state.filters };
    },
    resetCardViewData: (state) => {
      return { ...initialState, filters: state.filters };
    },

    setRoadmapCardViewData: (
      state,
      action: PayloadAction<{ data: GetTasksDataResponseModel; isFetchingWithFilter: boolean }>,
    ) => {
      state.cardViewData = action.payload.data;
      state.isListOver = isListOver(action.payload.data);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },
    setMoreRoadmapCardViewData: (state, action: PayloadAction<GetTasksDataResponseModel>) => {
      if (state.cardViewData?.meta) {
        state.cardViewData = {
          ...action.payload,
          data: [...state.cardViewData.data, ...action.payload.data],
        };
      }

      state.isListOver = isListOver(action.payload);
    },
  },

  extraReducers: ({ addCase }) => {
    addCase(getKanbanItems.fulfilled, (state, { payload }) => {
      state.kanbanData = payload.data;
      state.isFetchingWithFilter = payload.isFetchingWithFilter;
    });
    addCase(getMoreRoadmapColumnData.fulfilled, (state, { payload }) => {
      state.kanbanData = {
        ...state.kanbanData,
        [payload.status]: {
          ...state.kanbanData[payload.status],
          ...payload.newData,
          data: [...state.kanbanData[payload.status].data, ...payload.newData.data],
          isListOver: isListOver(payload.newData),
        },
      };
    });
  },
});

export const {
  toggleShowRoadmapNavigationPanel,
  setRoadmapFilters,
  changeKanbanItemStatus,
  setRoadmapIsLargeDisplay,
  removeRoadmapItem,
  addRoadmapItem,
  updateRoadmapItem,
  setRoadmapCardViewData,
  setMoreRoadmapCardViewData,
  resetKanbanData,
  resetCardViewData,
} = roadmapSlice.actions;
export default roadmapSlice.reducer;
