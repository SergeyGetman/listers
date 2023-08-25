import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetTasksDataResponseModel } from '../../shared/models/tasks/getTasksIDataResponse.model';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { ArchiveFiltersType, setArchiveData, setMoreArchiveData } from './archiveSlice';

export const getArchiveItems = createAsyncThunk<
  GetTasksDataResponseModel,
  ArchiveFiltersType & { page: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getArchiveItems', async (params, { dispatch, rejectWithValue }) => {
  try {
    const filterObjEntries = Object.values({ ...params, page: null });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    const result = await api.archive.getArchiveItems(params);
    if (params.page === 1) {
      dispatch(
        setArchiveData({
          archiveData: result,
          isFetchingWithFilter: !!filterItemSum,
        }),
      );
    } else {
      dispatch(
        setMoreArchiveData({
          archiveData: result,
          isFetchingWithFilter: !!filterItemSum,
        }),
      );
    }

    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
