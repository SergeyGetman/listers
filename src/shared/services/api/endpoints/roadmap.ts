import axios from 'axios';
import { GetTasksDataResponseModel } from '../../../models/tasks/getTasksIDataResponse.model';
import { RoadmapFilters } from '../../../../store/roadmap/roadmapSlice';
import { PlannerItemStatusesEnum } from '../../../enums/plannerItemStatuses.enum';

const roadmapEndpoints = {
  getRoadmapItems: (
    params: RoadmapFilters & { page?: number; status?: PlannerItemStatusesEnum },
  ): Promise<GetTasksDataResponseModel> => axios.get('/planner/tasks', { params }),
};

export default roadmapEndpoints;
