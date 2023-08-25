import axios from 'axios';
import { GetTasksDataResponseModel } from '../../../models/tasks/getTasksIDataResponse.model';

const backlogEndpoints = {
  getBacklogItems: (params: any): Promise<GetTasksDataResponseModel> =>
    axios.get('/planner/tasks?status=backlog', { params }),
};

export default backlogEndpoints;
