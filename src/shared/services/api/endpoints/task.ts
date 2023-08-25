import axios from 'axios';
import { TaskItemModel } from '../../../models/tasks/taskItem.model';
import { TaskFormPayloadModel } from '../../../models/tasks/taskFormPayload.model';
import { PlannerItemStatusesEnum } from '../../../enums/plannerItemStatuses.enum';
import { AssignPeopleSelectValueModel } from '../../../models/assignPeopleSelectValue.model';

const taskEndpoints = {
  createTask: (params: TaskFormPayloadModel): Promise<TaskItemModel> => axios.post('/planner/tasks', params),
  updateTask: (
    params: TaskFormPayloadModel,
    taskId: number,
    confirmation_status?: string,
  ): Promise<TaskItemModel> => axios.put(`/planner/tasks/${taskId}`, { ...params, confirmation_status }),
  removeMyself: (params: { taskId: number; confirmation_status?: string }): Promise<number> =>
    axios.delete(`planner/tasks/${params.taskId}/self`, { params }),
  archiveTask: (params: {
    taskId: number;
    confirmation_status?: string;
    is_full: boolean;
  }): Promise<number> => axios.post(`planner/tasks/${params.taskId}/archive`, params),
  unArchiveTask: (params: {
    taskId: number;
    confirmation_status?: string;
    is_full: boolean;
  }): Promise<number> => axios.post(`planner/tasks/${params.taskId}/unarchive`, params),
  getTasks: (params: { taskId: number; is_list?: number }): Promise<TaskItemModel> =>
    axios.get(`/planner/tasks/${params.taskId}`, { params }),
  deleteTask: (params: { taskId: number; confirmation_status?: string }): Promise<number> =>
    axios.delete(`/planner/tasks/${params.taskId}`, { params }),
  changeStatus: (params: {
    taskId: number;
    status: PlannerItemStatusesEnum;
    is_common?: boolean;
  }): Promise<TaskItemModel> => axios.post(`planner/tasks/${params.taskId}/status`, params),
  changeStatusForAssignPeople: (params: {
    taskId: number;
    status: PlannerItemStatusesEnum;
    userId: number;
  }): Promise<TaskItemModel> =>
    axios.put(`/planner/tasks/${params.taskId}/assigned-users/${params.userId}/status`, params),
  updateUsersTask: (params: {
    users: AssignPeopleSelectValueModel[];
    taskId: number;
  }): Promise<TaskItemModel> => axios.put(`planner/tasks/${params.taskId}/users`, params),
};

export default taskEndpoints;
