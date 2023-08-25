import { createAsyncThunk } from '@reduxjs/toolkit';
import Moment from 'moment';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch, RootState } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import {
  PlannerFiltersType,
  resetPlannerListData,
  setPlannerBottomItem,
  setPlannerBottomPaginationDate,
  setPlannerCurrentMaxDate,
  setPlannerCurrentMinDate,
  setPlannerDate,
  setPlannerGeneralMinMaxDate,
  setPlannerInitialData,
  setPlannerIsFetchingWithFilter,
  setPlannerTopItem,
  setPlannerTopPaginationDate,
  togglePlannerGetData,
} from './plannerSlice';
import { getInitialPlannerDates } from '../../shared/functions/getInitialPlannerDates';

export const getPlannerMinMaxDate = createAsyncThunk<
  { finished_at: string; started_at: string },
  { params: PlannerFiltersType },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getPlannerMinMaxDate', async ({ params }, { rejectWithValue, dispatch }) => {
  try {
    const filterObjEntries = Object.values({ ...params, page: null });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);

    dispatch(setPlannerIsFetchingWithFilter(!!filterItemSum));
    return await api.planner.getPlannerMinMaxDate(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getPlannerInitialData = createAsyncThunk<
  any,
  { dates: string[]; filters: PlannerFiltersType },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getPlannerInitialData', async (params, { rejectWithValue }) => {
  try {
    const filterObjEntries = Object.values({ ...params.filters, page: null });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);

    const requests = params.dates.map((date: string) =>
      api.planner.getPlannerItemsByData({
        finished_at: Moment(date).endOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
        started_at: Moment(date).startOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
        ...params.filters,
      }),
    );

    return Promise.all(requests).then((result: any) => {
      return {
        data: result.map((item: any, index: number) => {
          return {
            eventCount: item.counts.event,
            taskCount: item.counts.task,
            paymentCount: item.counts.payment,
            date: Moment(params.dates[index]).format('MMMM DD, YYYY'),
            items: item.data,
          };
        }),
        isFetchingWithFilter: !!filterItemSum,
      };
    });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getPlannerDataByDate = createAsyncThunk<
  any,
  { date: string; isBottomPagination?: boolean; filters: PlannerFiltersType },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getCalendarData', async ({ date, isBottomPagination = false, filters }, { rejectWithValue, dispatch }) => {
  try {
    const result = await api.planner
      .getPlannerItemsByData({
        finished_at: Moment(date).endOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
        started_at: Moment(date).startOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
        ...filters,
      })
      .then((payload) => {
        return {
          eventCount: payload.counts.event,
          taskCount: payload.counts.task,
          paymentCount: payload.counts.payment,
          date: Moment(date).format('MMMM DD, YYYY'),
          items: payload.data,
        };
      });
    if (!!result.items.length) {
      if (isBottomPagination) {
        dispatch(setPlannerBottomItem(result));
      } else {
        dispatch(setPlannerTopItem(result));
      }
    }

    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getPlannerDates = createAsyncThunk<
  string[],
  { dateFrom: string; dateTo: string; filters: PlannerFiltersType },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getCalendarData', async (params, { rejectWithValue }) => {
  try {
    return api.planner.getPlannerDates({
      finish_date: params.dateTo,
      start_date: params.dateFrom,
      ...params.filters,
    });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getCurrentMinDate = (date: string, infoMinDate: string) => async (dispatch: AppDispatch) => {
  if (infoMinDate === null || date === null) {
    return null;
  }
  if (Moment(date).diff(Moment(infoMinDate), 'month') > 6) {
    const resultDate = Moment(date).subtract(6, 'month').format('YYYY-MM-DD');
    dispatch(
      setPlannerCurrentMinDate({
        date: resultDate,
        isListOver: false,
      }),
    );

    return { currentMinDate: resultDate, prevMinDate: date };
  }
  dispatch(setPlannerCurrentMinDate({ date: infoMinDate, isListOver: true }));
  return { currentMinDate: infoMinDate, prevMinDate: date };
};

export const getCurrentMaxDate = (date: string, infoMaxDate: string) => async (dispatch: AppDispatch) => {
  if (infoMaxDate === null || date === null) {
    return null;
  }

  if (Moment(date).diff(Moment(infoMaxDate), 'month') > 6) {
    const resultDate = Moment(date).add(6, 'month').format('YYYY-MM-DD');
    dispatch(
      setPlannerCurrentMaxDate({
        date: resultDate,
        isListOver: false,
      }),
    );
    return { currentMaxDate: resultDate, prevMaxDate: date };
  }

  dispatch(
    setPlannerCurrentMaxDate({
      date: infoMaxDate,
      isListOver: true,
    }),
  );
  return { currentMaxDate: infoMaxDate, prevMaxDate: date };
};

export const plannerInitialize = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(togglePlannerGetData(false));
  dispatch(getPlannerMinMaxDate({ params: getState().planner?.filters })).then(async (minMaxResponse) => {
    if (getPlannerMinMaxDate.fulfilled.match(minMaxResponse)) {
      dispatch(setPlannerGeneralMinMaxDate(minMaxResponse.payload));
      const start = await dispatch(
        getCurrentMinDate(
          Moment().format('YYYY-MM-DD'),
          minMaxResponse.payload.started_at
            ? Moment(minMaxResponse.payload.started_at).format('YYYY-MM-DD')
            : minMaxResponse.payload.started_at,
        ),
      ).then((result) => result?.currentMinDate);
      const finish = await dispatch(
        getCurrentMaxDate(
          Moment().format('YYYY-MM-DD'),
          minMaxResponse.payload.finished_at
            ? Moment(minMaxResponse.payload.finished_at).format('YYYY-MM-DD')
            : minMaxResponse.payload.finished_at,
        ),
      ).then((result) => result?.currentMaxDate);

      if (start && finish) {
        const newFinish = start === finish ? Moment(finish).add(1, 'day').format('YYYY-MM-DD') : finish;
        dispatch(
          getPlannerDates({
            dateFrom: start,
            dateTo: newFinish,
            filters: getState().planner?.filters,
          }),
        ).then((getDateResponse) => {
          if (getPlannerDates.fulfilled.match(getDateResponse)) {
            dispatch(setPlannerDate(getDateResponse.payload));
            const initialDates = getInitialPlannerDates(getDateResponse.payload);

            dispatch(
              setPlannerTopPaginationDate({
                date: initialDates.smallerItem,
                isListOver: initialDates.hasNextSmallerItem,
              }),
            );
            dispatch(
              setPlannerBottomPaginationDate({
                date: initialDates.largerItem,
                isListOver: initialDates.hasNextLargerItem,
              }),
            );

            dispatch(
              getPlannerInitialData({ dates: initialDates.result, filters: getState().planner?.filters }),
            ).then((getInitialDataResponse) => {
              if (getPlannerInitialData.fulfilled.match(getInitialDataResponse)) {
                dispatch(setPlannerInitialData(getInitialDataResponse.payload));
              }
            });
          }
        });
      } else {
        dispatch(togglePlannerGetData(true));
        dispatch(resetPlannerListData());
      }
    }
  });
};
