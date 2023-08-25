import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { CreateMeetingFormPayloadModel } from '../../shared/models/meeting/createMeetingFormPayload.model';
import { MeetingModel } from '../../shared/models/meeting/meeting.model';
import { PlannerItemStatusesEnum } from '../../shared/enums/plannerItemStatuses.enum';

export const createMeetingItem = createAsyncThunk<
  MeetingModel,
  CreateMeetingFormPayloadModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createMeetingItem', async (params, { rejectWithValue }) => {
  try {
    return await api.meeting.createMeeting(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateMeetingItem = createAsyncThunk<
  MeetingModel,
  { params: CreateMeetingFormPayloadModel; meetingId: number; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateMeetingItem', async ({ params, meetingId, confirmation_status }, { rejectWithValue }) => {
  try {
    return await api.meeting.updateMeeting(params, meetingId, confirmation_status);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getMeeting = createAsyncThunk<
  MeetingModel,
  { meetingId: number; is_list?: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getMeeting', async (props, { rejectWithValue }) => {
  try {
    return await api.meeting.getMeeting(props);
  } catch (e: any) {
    if (e.status === 403) {
      NotificationService.info(i18next.t('general.notifications.notAssignedToMeeting'));
    } else {
      NotificationService.info(i18next.t('general.notifications.meetingNotFound'));
    }

    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteMeeting = createAsyncThunk<
  number,
  { meetingId: number; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteMeeting', async (params, { rejectWithValue }) => {
  try {
    return await api.meeting.deleteMeeting(params).then(() => params.meetingId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const removeMyselfFromMeeting = createAsyncThunk<
  number,
  { meetingId: number; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('removeMyselfFromMeeting', async (params, { rejectWithValue }) => {
  try {
    return await api.meeting.removeMyself(params).then(() => params.meetingId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const archiveMeeting = createAsyncThunk<
  number,
  { meetingId: number; confirmation_status?: string; is_full: boolean },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('archiveMeeting', async (params, { rejectWithValue }) => {
  try {
    return await api.meeting.archiveMeeting(params).then(() => params.meetingId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const unArchiveMeeting = createAsyncThunk<
  number,
  { meetingId: number; confirmation_status?: string; is_full: boolean },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('unArchiveMeeting', async (params, { rejectWithValue }) => {
  try {
    return await api.meeting.unArchiveMeeting(params).then(() => params.meetingId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeMeetingStatus = createAsyncThunk<
  MeetingModel,
  { meetingId: number; status: PlannerItemStatusesEnum; is_common?: boolean; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('changeEventStatus', async (params, { rejectWithValue }) => {
  try {
    return await api.meeting.changeStatus(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
