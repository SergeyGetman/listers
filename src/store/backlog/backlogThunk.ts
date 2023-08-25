import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';

import { setBacklogData, setMoreBacklogData, toggleFetchingInitialData } from './backlogSlice';
import { GetTasksDataResponseModel } from '../../shared/models/tasks/getTasksIDataResponse.model';

export const getBacklogItems = createAsyncThunk<
  GetTasksDataResponseModel,
  any,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getBacklogItems', async (params = { page: 1 }, { dispatch, rejectWithValue }) => {
  try {
    if (params.page === 1) {
      dispatch(toggleFetchingInitialData(false));
    }
    const filterObjEntries = Object.values({ ...params, page: null });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);

    const result = await api.backlog.getBacklogItems(params);
    if (params.page === 1) {
      dispatch(
        setBacklogData({
          backlogData: result,
          isFetchingWithFilter: !!filterItemSum,
        }),
      );
    } else {
      dispatch(
        setMoreBacklogData({
          backlogData: result,
          isFetchingWithFilter: !!filterItemSum,
        }),
      );
    }

    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    dispatch(toggleFetchingInitialData(true));
  }
});
