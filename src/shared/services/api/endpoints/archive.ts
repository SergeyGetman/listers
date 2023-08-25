import axios from 'axios';
import { GetTasksDataResponseModel } from '../../../models/tasks/getTasksIDataResponse.model';
import { ArchiveFiltersType } from '../../../../store/archive/archiveSlice';

const ArchiveEndpoints = {
  getArchiveItems: (params: ArchiveFiltersType & { page: number }): Promise<GetTasksDataResponseModel> =>
    axios.get('/planner/archive', { params }),
};

export default ArchiveEndpoints;
