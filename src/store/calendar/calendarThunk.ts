import { createAsyncThunk } from '@reduxjs/toolkit';
import Moment from 'moment';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch, RootState } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { CalendarViewEnum } from '../../shared/enums/calendarView.enum';
import { CalendarFiltersType, setCalendarDate } from './calendarSlice';
import { setLoading } from '../Common/commonSlice';
import { reformatCalendarItem } from '../../shared/functions/reformatCalendarItem';
import theme from '../../theme/theme';
import { TaskItemModel } from '../../shared/models/tasks/taskItem.model';
import { EventItemModel } from '../../shared/models/event/eventItem.model';
import { PackageEnum } from '../../shared/enums/package.enum';

export const getCalendarData = createAsyncThunk<
  any,
  { calendarView: CalendarViewEnum; dateFrom: string; dateTo: string; filters: CalendarFiltersType },
  { state: RootState; rejectValue: ErrorType; dispatch: AppDispatch }
>('getCalendarData', async (params, { rejectWithValue, dispatch, getState }) => {
  try {
    const userPackage = getState().profile?.data?.subscription?.package;
    const isStarterPackage = userPackage === PackageEnum.starter || !userPackage;

    dispatch(setLoading(true));
    if (params.calendarView !== CalendarViewEnum.year) {
      return api.calendar
        .getCalendarData({
          finished_at: Moment(params.dateTo).endOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
          started_at: Moment(params.dateFrom).startOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
          ...params.filters,
        })
        .then((response: any) => {
          const formatData = response.data.map((item: any) => {
            return reformatCalendarItem(item, isStarterPackage);
          });
          dispatch(setCalendarDate(formatData));
        })
        .finally(() => dispatch(setLoading(false)));
    }
    return api.calendar
      .getCalendarDates({
        finish_date: params.dateTo,
        start_date: params.dateFrom,
        ...params.filters,
      })
      .then((response) => {
        const formatData = response.map((item: string, key: number) => {
          return {
            color: theme.palette.case.warning.middle,
            start: Moment(item).format(),
            end: Moment(item).format(),
            title: '',
            id: key,
          };
        });
        dispatch(setCalendarDate(formatData));
      })
      .finally(() => dispatch(setLoading(false)));
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateCalendarTaskDate = createAsyncThunk<
  TaskItemModel,
  {
    params: { is_all_day: boolean; started_at: string; finished_at: string; confirmation_status?: string };
    taskId: number;
  },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateCalendarTaskDate', async ({ params, taskId }, { rejectWithValue }) => {
  try {
    return await api.calendar.changeTaskDate(params, taskId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateCalendarEventDate = createAsyncThunk<
  EventItemModel,
  {
    params: { is_all_day: boolean; started_at: string; finished_at: string; confirmation_status?: string };
    eventId: number;
  },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateCalendarEventDate', async ({ params, eventId }, { rejectWithValue }) => {
  try {
    return await api.calendar.changeEventDate(params, eventId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeCalendarItemDate = createAsyncThunk<
  EventItemModel,
  {
    params: { is_all_day: boolean; started_at: string; finished_at: string; confirmation_status?: string };
    itemId: number;
  },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('changeCalendarItemDate', async ({ params, itemId }, { rejectWithValue }) => {
  try {
    return await api.calendar.changeCalendarItemDate(params, itemId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
