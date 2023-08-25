import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { CreateEventFromPayloadModel } from '../../shared/models/event/createEventFormPayload.model';
import { EventItemModel } from '../../shared/models/event/eventItem.model';
import { GetEventsDataResponseModel } from '../../shared/models/event/getEventsDataResponse.model';
import { EventsFilters, setEventsData, setMoreEventsData } from './eventsSlice';
import { PlannerItemStatusesEnum } from '../../shared/enums/plannerItemStatuses.enum';
import { AssignPeopleSelectValueModel } from '../../shared/models/assignPeopleSelectValue.model';

export const createEventItem = createAsyncThunk<
  EventItemModel,
  CreateEventFromPayloadModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createEventItem', async (params, { rejectWithValue }) => {
  try {
    return await api.event.createEvent(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateUsersEvent = createAsyncThunk<
  EventItemModel,
  { users: AssignPeopleSelectValueModel[]; eventId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateUsersEvent', async (params, { rejectWithValue }) => {
  try {
    return await api.event.updateUsersEvent(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateEventItem = createAsyncThunk<
  EventItemModel,
  { params: CreateEventFromPayloadModel; eventId: number; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateEventItem', async ({ params, eventId, confirmation_status }, { rejectWithValue }) => {
  try {
    return await api.event.updateEvent(params, eventId, confirmation_status);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteEvent = createAsyncThunk<
  number,
  { eventId: number; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteEvent', async (params, { rejectWithValue }) => {
  try {
    return await api.event.deleteEvent(params).then(() => params.eventId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const removeMyselfFromEvent = createAsyncThunk<
  number,
  { eventId: number; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('removeMyselfFromEvent', async (params, { rejectWithValue }) => {
  try {
    return await api.event.removeMyself(params).then(() => params.eventId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const archiveEvent = createAsyncThunk<
  number,
  { eventId: number; confirmation_status?: string; is_full: boolean },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('archiveEvent', async (params, { rejectWithValue }) => {
  try {
    return await api.event.archiveEvent(params).then(() => params.eventId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const unArchiveEvent = createAsyncThunk<
  number,
  { eventId: number; confirmation_status?: string; is_full: boolean },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('unArchiveEvent', async (params, { rejectWithValue }) => {
  try {
    return await api.event.unArchiveEvent(params).then(() => params.eventId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeEventStatus = createAsyncThunk<
  EventItemModel,
  { eventId: number; status: PlannerItemStatusesEnum; is_common?: boolean; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('changeEventStatus', async (params, { rejectWithValue }) => {
  try {
    return await api.event.changeStatus(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getEventsData = createAsyncThunk<
  GetEventsDataResponseModel,
  EventsFilters & { page?: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getEventsData', async (params, { rejectWithValue, dispatch }) => {
  try {
    const filterObjEntries = Object.values({ ...params, page: null });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    const result = await api.event.getEventsData({ ...params });

    if (params.page === 1) {
      dispatch(setEventsData({ eventsData: result, isFetchingWithFilter: !!filterItemSum }));
    } else {
      dispatch(setMoreEventsData({ eventsData: result, isFetchingWithFilter: !!filterItemSum }));
    }

    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
export const getEvent = createAsyncThunk<
  EventItemModel,
  { eventId: number; is_list?: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getEvent', async (props, { rejectWithValue }) => {
  try {
    return await api.event.getEvent(props);
  } catch (e: any) {
    if (e.status === 403) {
      NotificationService.info(i18next.t('general.notifications.notAssignedToEvent'));
    } else {
      NotificationService.info(i18next.t('general.notifications.eventNotFound'));
    }

    return rejectWithValue(e.data as ErrorType);
  }
});
