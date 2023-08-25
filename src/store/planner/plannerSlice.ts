import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import Moment from 'moment/moment';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { removeItemFromPlannerList } from '../../shared/functions/removeItemFromPlannerList';
import { TaskItemModel } from '../../shared/models/tasks/taskItem.model';
import { EventItemModel } from '../../shared/models/event/eventItem.model';
import { addItemToPlannerList } from '../../shared/functions/addItemToPlannerList';
import { updatePlannerDates } from '../../shared/functions/updatePlannerDates';

export type PlannerFiltersType = {
  entities: string[];
  event_statuses: string[];
  task_statuses: string[];
  payment_statuses: string[];
};

export interface PlannerState {
  isShowPlannerNavigationPanel: boolean;
  plannerDates: string[];
  plannerList: any;
  plannerGeneralMaxMinDate: { started_at: string; finished_at: string } | null;
  plannerCurrentMinDate: string | null;
  plannerCurrentMaxDate: string | null;
  isCurrentMinDateListOver: boolean;
  isCurrentMaxDateListOver: boolean;
  topPaginationDate: string | null;
  bottomPaginationDate: string | null;
  isTopPaginationHasMore: boolean;
  isBottomPaginationHasMore: boolean;
  isGetPlannerData: boolean;
  isFetchingWithFilter: boolean;
  filters: PlannerFiltersType;
}

const initialState: PlannerState = {
  isShowPlannerNavigationPanel:
    typeof JSON.parse(localStorage.getItem('plannerNavigationPanel') as string) === 'boolean'
      ? JSON.parse(localStorage.getItem('plannerNavigationPanel') as string)
      : true,
  plannerDates: [],
  plannerList: [],
  plannerGeneralMaxMinDate: null,
  plannerCurrentMinDate: null,
  plannerCurrentMaxDate: null,
  isCurrentMinDateListOver: false,
  isCurrentMaxDateListOver: false,
  isFetchingWithFilter: false,
  topPaginationDate: null,
  bottomPaginationDate: null,
  isTopPaginationHasMore: false,
  isBottomPaginationHasMore: false,
  isGetPlannerData: false,
  filters:
    JSON.parse(localStorage.getItem('plannerFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('plannerFilters') as string)
      : {
          entities: null,
          event_statuses: null,
          task_statuses: null,
          payment_statuses: null,
        },
};

export const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    toggleShowPlannerNavigationPanel: (state, action: PayloadAction<boolean>) => {
      state.isShowPlannerNavigationPanel = action.payload;
    },
    togglePlannerGetData: (state, action: PayloadAction<boolean>) => {
      state.isGetPlannerData = action.payload;
    },
    setPlannerGeneralMinMaxDate: (
      state,
      action: PayloadAction<{ started_at: string; finished_at: string }>,
    ) => {
      state.plannerGeneralMaxMinDate = action.payload;
    },

    setPlannerCurrentMinDate: (state, action: PayloadAction<{ date: string; isListOver: boolean }>) => {
      state.plannerCurrentMinDate = action.payload.date;
      state.isCurrentMinDateListOver = action.payload.isListOver;
    },
    setPlannerCurrentMaxDate: (state, action: PayloadAction<{ date: string; isListOver: boolean }>) => {
      state.plannerCurrentMaxDate = action.payload.date;
      state.isCurrentMaxDateListOver = action.payload.isListOver;
    },
    setPlannerTopPaginationDate: (state, action: PayloadAction<{ date: string; isListOver: boolean }>) => {
      state.topPaginationDate = action.payload.date;
      state.isTopPaginationHasMore = action.payload.isListOver;
    },
    setPlannerBottomPaginationDate: (state, action: PayloadAction<{ date: string; isListOver: boolean }>) => {
      state.bottomPaginationDate = action.payload.date;
      state.isBottomPaginationHasMore = action.payload.isListOver;
    },
    setPlannerIsFetchingWithFilter: (state, action: PayloadAction<boolean>) => {
      state.isFetchingWithFilter = action.payload;
    },
    resetPlannerListData: (state) => {
      state.plannerList = [];
    },
    setPlannerFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('plannerFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
    },
    setPlannerDate: (state, action: PayloadAction<string[]>) => {
      state.plannerDates = action.payload;
    },
    setTopPaginationPlannerDate: (state, action: PayloadAction<string[]>) => {
      state.plannerDates = [...action.payload, ...state.plannerDates];
    },
    setBottomPaginationPlannerDate: (state, action: PayloadAction<string[]>) => {
      state.plannerDates = [...state.plannerDates, ...action.payload];
    },
    setPlannerInitialData: (state, action: PayloadAction<any>) => {
      state.plannerList = action.payload.data;
      state.isGetPlannerData = true;
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },
    setPlannerTopItem: (state, action: PayloadAction<any>) => {
      state.plannerList = [action.payload, ...state.plannerList].sort((a, b) => {
        return Moment(a.date).diff(Moment(b.date), 'minute');
      });
    },
    setPlannerBottomItem: (state, action: PayloadAction<any>) => {
      state.plannerList = [...state.plannerList, action.payload].sort((a, b) => {
        return Moment(a.date).diff(Moment(b.date), 'minute');
      });
    },
    removePlannerListItem: (
      state,
      action: PayloadAction<{ id: number; modelType: PlannerItemModelTypeEnum }>,
    ) => {
      state.plannerList = removeItemFromPlannerList(
        current(state.plannerList),
        action.payload.id,
        action.payload.modelType,
      );
    },
    addPlannerListItem: (state, action: PayloadAction<any>) => {
      state.plannerList = addItemToPlannerList({
        plannerList: current(state.plannerList),
        item: action.payload,
        bottomPaginationDate: state.bottomPaginationDate || '',
        topPaginationDate: state.topPaginationDate || '',
        plannerGeneralMaxMinDate: current(state.plannerGeneralMaxMinDate) || '',
      });
      state.plannerDates = updatePlannerDates({
        plannerDates: current(state.plannerDates),
        plannerCurrentMaxDate: state.plannerCurrentMaxDate || '',
        plannerCurrentMinDate: state.plannerCurrentMinDate || '',
        item: action.payload,
      });
    },
    updatePlannerListItemWithoutSplit: (state, action: PayloadAction<TaskItemModel | EventItemModel>) => {
      state.plannerList = state.plannerList.map((day: any) => {
        return {
          ...day,
          items: day.items.map((item: TaskItemModel | EventItemModel) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          }),
        };
      });
    },
    resetPlannerData: (state) => {
      return { ...initialState, filters: state.filters };
    },
  },
});

export const {
  toggleShowPlannerNavigationPanel,
  setPlannerFilters,
  setPlannerGeneralMinMaxDate,
  setPlannerCurrentMinDate,
  setPlannerCurrentMaxDate,
  setPlannerDate,
  setPlannerInitialData,
  setPlannerTopPaginationDate,
  setPlannerBottomPaginationDate,
  setPlannerTopItem,
  setPlannerBottomItem,
  setTopPaginationPlannerDate,
  setBottomPaginationPlannerDate,
  resetPlannerData,
  removePlannerListItem,
  updatePlannerListItemWithoutSplit,
  addPlannerListItem,
  togglePlannerGetData,
  setPlannerIsFetchingWithFilter,
  resetPlannerListData,
} = plannerSlice.actions;
export default plannerSlice.reducer;
