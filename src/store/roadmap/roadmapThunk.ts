import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../shared/locales/i18n';
import { TaskFormPayloadModel } from '../../shared/models/tasks/taskFormPayload.model';
import { TaskItemModel } from '../../shared/models/tasks/taskItem.model';
import { PlannerItemStatusesEnum } from '../../shared/enums/plannerItemStatuses.enum';
import { plannerItemStatusesConfig } from '../../shared/configs/plannerItemStatuses.config';
import { isListOver } from '../../shared/functions/isListOver';
import { GetRoadmapKanbanDataResponseModel } from '../../shared/models/roadmap/getRoadmapKanbanDataResponse.model';
import { GetTasksDataResponseModel } from '../../shared/models/tasks/getTasksIDataResponse.model';
import { RoadmapFilters, setMoreRoadmapCardViewData, setRoadmapCardViewData } from './roadmapSlice';

import { AssignPeopleSelectValueModel } from '../../shared/models/assignPeopleSelectValue.model';

export const getKanbanItems = createAsyncThunk<
  { data: GetRoadmapKanbanDataResponseModel; isFetchingWithFilter: boolean },
  RoadmapFilters,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getKanbanItems', async (params, { rejectWithValue }) => {
  try {
    const filterObjEntries = Object.values({ ...params, page: null });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    const requestTodo = api.roadmap.getRoadmapItems({ ...params, status: PlannerItemStatusesEnum.todo });
    const requestProgress = api.roadmap.getRoadmapItems({
      ...params,
      status: PlannerItemStatusesEnum.in_progress,
    });
    const requestDone = api.roadmap.getRoadmapItems({ ...params, status: PlannerItemStatusesEnum.done });

    return Promise.all([requestTodo, requestProgress, requestDone]).then(
      (
        result: GetTasksDataResponseModel[],
      ): { data: GetRoadmapKanbanDataResponseModel; isFetchingWithFilter: boolean } => {
        return {
          data: {
            [PlannerItemStatusesEnum.todo]: {
              ...result?.[0],
              id: PlannerItemStatusesEnum.todo,
              label: plannerItemStatusesConfig[PlannerItemStatusesEnum.todo].label,
              isListOver: isListOver(result?.[0]),
            },
            [PlannerItemStatusesEnum.in_progress]: {
              ...result?.[1],
              id: PlannerItemStatusesEnum.in_progress,
              label: plannerItemStatusesConfig[PlannerItemStatusesEnum.in_progress].label,
              isListOver: isListOver(result?.[1]),
            },
            [PlannerItemStatusesEnum.done]: {
              ...result?.[2],
              id: PlannerItemStatusesEnum.done,
              label: plannerItemStatusesConfig[PlannerItemStatusesEnum.done].label,
              isListOver: isListOver(result?.[2]),
            },
          },
          isFetchingWithFilter: !!filterItemSum,
        };
      },
    );
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateUsersTask = createAsyncThunk<
  TaskItemModel,
  { users: AssignPeopleSelectValueModel[]; taskId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateUsersTodo', async (params, { rejectWithValue }) => {
  try {
    return await api.task.updateUsersTask(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getMoreRoadmapColumnData = createAsyncThunk<
  { status: PlannerItemStatusesEnum; newData: GetTasksDataResponseModel },
  RoadmapFilters & { status: PlannerItemStatusesEnum; page: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getMoreRoadmapColumnData', async (params, { rejectWithValue }) => {
  try {
    return api.roadmap
      .getRoadmapItems({ ...params })
      .then((result): { status: PlannerItemStatusesEnum; newData: GetTasksDataResponseModel } => {
        return { newData: result, status: params.status };
      });
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getRoadmapCardViewData = createAsyncThunk<
  GetTasksDataResponseModel,
  RoadmapFilters & { page?: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getRoadmapCardViewData', async (params, { rejectWithValue, dispatch }) => {
  try {
    const filterObjEntries = Object.values({ ...params, page: null });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    const result = await api.roadmap.getRoadmapItems({ ...params });

    if (params.page === 1) {
      dispatch(setRoadmapCardViewData({ data: result, isFetchingWithFilter: !!filterItemSum }));
    } else {
      dispatch(setMoreRoadmapCardViewData(result));
    }

    return result;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const createTaskItem = createAsyncThunk<
  TaskItemModel,
  TaskFormPayloadModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createTaskItem', async (params, { rejectWithValue }) => {
  try {
    return await api.task.createTask(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const updateTaskItem = createAsyncThunk<
  TaskItemModel,
  { params: TaskFormPayloadModel; taskId: number; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createTaskItem', async ({ params, taskId, confirmation_status }, { rejectWithValue }) => {
  try {
    return await api.task.updateTask(params, taskId, confirmation_status);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const deleteTask = createAsyncThunk<
  number,
  { taskId: number; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('deleteTask', async (params, { rejectWithValue }) => {
  try {
    return await api.task.deleteTask(params).then(() => params.taskId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const removeMyselfFromTask = createAsyncThunk<
  number,
  { taskId: number; confirmation_status?: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('removeMyselfFromTask', async (params, { rejectWithValue }) => {
  try {
    return await api.task.removeMyself(params).then(() => params.taskId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const archiveTask = createAsyncThunk<
  number,
  { taskId: number; confirmation_status?: string; is_full: boolean },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('archiveTask', async (params, { rejectWithValue }) => {
  try {
    return await api.task.archiveTask(params).then(() => params.taskId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const unArchiveTask = createAsyncThunk<
  number,
  { taskId: number; confirmation_status?: string; is_full: boolean },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('unArchiveTask', async (params, { rejectWithValue }) => {
  try {
    return await api.task.unArchiveTask(params).then(() => params.taskId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeTaskStatus = createAsyncThunk<
  TaskItemModel,
  { taskId: number; status: PlannerItemStatusesEnum; is_common?: boolean },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('changeTaskStatus', async (params, { rejectWithValue }) => {
  try {
    return await api.task.changeStatus(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const changeStatusForAssignPeople = createAsyncThunk<
  TaskItemModel,
  { taskId: number; status: PlannerItemStatusesEnum; userId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('changeStatusForAssignPeople', async (params, { rejectWithValue }) => {
  try {
    return await api.task.changeStatusForAssignPeople(params);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
export const getTask = createAsyncThunk<
  TaskItemModel,
  { taskId: number; is_list?: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getTask', async (props, { rejectWithValue }) => {
  try {
    return await api.task.getTasks(props);
  } catch (e: any) {
    if (e.status === 403) {
      NotificationService.info(i18next.t('general.notifications.notAssignedToTask'));
    } else {
      NotificationService.info(i18next.t('general.notifications.taskNotFound'));
    }

    return rejectWithValue(e.data as ErrorType);
  }
});
