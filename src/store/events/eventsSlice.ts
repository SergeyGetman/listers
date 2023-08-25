import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ByPersonFiltersEnum } from '../../shared/enums/byPersonFilters.enum';
import { isListOver } from '../../shared/functions/isListOver';
import { EventItemModel } from '../../shared/models/event/eventItem.model';
import { GetEventsDataResponseModel } from '../../shared/models/event/getEventsDataResponse.model';

export type EventsFilters = {
  personal_assignment: string | null;
  related_user_id: ByPersonFiltersEnum | null;
  statuses: string[] | null;
  is_today: number | null;
  query: string | null;
  date_time_to: string | null;
  date_time_from: string | null;
};

export interface EventsState {
  isShowEventsNavigationPanel: boolean;
  filters: EventsFilters;
  isListOver: boolean | number;
  eventsData: any;
  isFetchingWithFilter: boolean;
}

const initialState: EventsState = {
  isShowEventsNavigationPanel:
    typeof JSON.parse(localStorage.getItem('eventsNavigationPanel') as string) === 'boolean'
      ? JSON.parse(localStorage.getItem('eventsNavigationPanel') as string)
      : true,
  isListOver: false,
  eventsData: [],
  isFetchingWithFilter: false,

  filters:
    JSON.parse(localStorage.getItem('eventsFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('eventsFilters') as string)
      : {
          personal_assignment: null,
          related_user_id: null,
          priorities: null,
          is_late: null,
          is_today: null,
          query: null,
          date_time_to: null,
          date_time_from: null,
        },
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    toggleShowEventsNavigationPanel: (state, action: PayloadAction<boolean>) => {
      state.isShowEventsNavigationPanel = action.payload;
    },
    setEventsData: (
      state,
      action: PayloadAction<{ eventsData: GetEventsDataResponseModel; isFetchingWithFilter: boolean }>,
    ) => {
      state.eventsData = action.payload.eventsData;
      state.isListOver = isListOver(action.payload.eventsData);
      state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
    },
    setMoreEventsData: (
      state,
      action: PayloadAction<{ eventsData: GetEventsDataResponseModel; isFetchingWithFilter: boolean }>,
    ) => {
      if (state.eventsData?.meta) {
        state.eventsData = {
          ...action.payload.eventsData,
          data: [...state.eventsData.data, ...action.payload.eventsData.data],
        };
        state.isListOver = isListOver(action.payload.eventsData);
        state.isFetchingWithFilter = action.payload.isFetchingWithFilter;
      }
    },
    addedEventItem: (state, action: PayloadAction<EventItemModel>) => {
      if (state.eventsData.meta) {
        state.eventsData = {
          ...state.eventsData,
          data: [action.payload, ...state.eventsData.data],
        };
      }
    },
    updatedEventItem: (state, action: PayloadAction<EventItemModel>) => {
      if (state.eventsData.meta) {
        state.eventsData.data = state.eventsData.data.map((item: EventItemModel) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      }
    },
    removeEventItem: (state, action: PayloadAction<number>) => {
      if (state.eventsData.meta) {
        state.eventsData.data = state.eventsData.data.filter(
          (item: EventItemModel) => item.id !== action.payload,
        );
      }
    },
    setEventsFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('eventsFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
      state.isListOver = false;
    },
    resetEventsState: (state) => {
      return { ...initialState, filters: state.filters };
    },
  },
});

export const {
  toggleShowEventsNavigationPanel,
  setEventsFilters,
  setEventsData,
  setMoreEventsData,
  addedEventItem,
  updatedEventItem,
  removeEventItem,
  resetEventsState,
} = eventsSlice.actions;
export default eventsSlice.reducer;
