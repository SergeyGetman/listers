import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarViewEnum } from '../../shared/enums/calendarView.enum';
import { reformatCalendarItem } from '../../shared/functions/reformatCalendarItem';
import { AssignPeoplePermissionsEnum } from '../../shared/enums/assignPeoplePermissions.enum';

export type CalendarFiltersType = {
  entities: string[];
  event_statuses: string[];
  task_statuses: string[];
  payment_statuses: string[];
};

export interface CalendarState {
  isShowCalendarNavigationPanel: boolean;
  calendarData: any;
  selectedCalendarView: CalendarViewEnum;
  isFetchingWithFilter: boolean;
  isFetchingInitialData: boolean;
  filters: CalendarFiltersType;
}

const initialState: CalendarState = {
  isFetchingInitialData: false,
  selectedCalendarView: JSON.parse(localStorage.getItem('selectedCalendarView') as string)
    ? JSON.parse(localStorage.getItem('selectedCalendarView') as string)
    : CalendarViewEnum.month,
  isShowCalendarNavigationPanel:
    typeof JSON.parse(localStorage.getItem('calendarNavigationPanel') as string) === 'boolean'
      ? JSON.parse(localStorage.getItem('calendarNavigationPanel') as string)
      : true,
  calendarData: [],
  isFetchingWithFilter: false,
  filters:
    JSON.parse(localStorage.getItem('calendarFilters') as string) !== null
      ? JSON.parse(localStorage.getItem('calendarFilters') as string)
      : {
          entities: null,
          event_statuses: null,
          task_statuses: null,
          payment_statuses: null,
        },
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    toggleShowCalendarNavigationPanel: (state, action: PayloadAction<boolean>) => {
      state.isShowCalendarNavigationPanel = action.payload;
    },
    setCalendarFilters: (state, action: PayloadAction<object>) => {
      localStorage.setItem('calendarFilters', JSON.stringify(action.payload));
      state.filters = { ...state.filters, ...action.payload };
    },
    setSelectedCalendarView: (state, action: PayloadAction<CalendarViewEnum>) => {
      localStorage.setItem('selectedCalendarView', JSON.stringify(action.payload));
      state.selectedCalendarView = action.payload;
    },
    setCalendarDate: (state, action: PayloadAction<any>) => {
      state.calendarData = action.payload;
    },
    addedCalendarItem: (state, action: PayloadAction<{ data: any; isStarterPackage: boolean }>) => {
      state.calendarData = [
        ...state.calendarData,
        reformatCalendarItem(action.payload.data, action.payload.isStarterPackage),
      ];
    },
    setUserNotificationCalendarItem: (
      state,
      action: PayloadAction<{ id: number; isStarterPackage: boolean }>,
    ) => {
      state.calendarData = state.calendarData.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            userNotification: null,
            editable:
              (item?.current_user?.role === AssignPeoplePermissionsEnum.editor ||
                item?.current_user?.role === AssignPeoplePermissionsEnum.creator) &&
              !action.payload.isStarterPackage,
          };
        }
        return item;
      });
    },
    updateCalendarItem: (state, action: PayloadAction<any>) => {
      state.calendarData = state.calendarData.map((item: any) => {
        if (item.id === action.payload.id) {
          return reformatCalendarItem(action.payload, false);
        }
        return item;
      });
    },
    removeCalendarItem: (state, action: PayloadAction<number>) => {
      state.calendarData = state.calendarData.filter((item: any) => item.id !== action.payload);
    },
    resetCalendarData: (state) => {
      return { ...initialState, filters: state.filters, selectedCalendarView: state.selectedCalendarView };
    },
  },
});

export const {
  toggleShowCalendarNavigationPanel,
  setSelectedCalendarView,
  setCalendarDate,
  addedCalendarItem,
  updateCalendarItem,
  setUserNotificationCalendarItem,
  removeCalendarItem,
  setCalendarFilters,
  resetCalendarData,
} = calendarSlice.actions;
export default calendarSlice.reducer;
