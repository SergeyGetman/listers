import { MetaModel } from '../meta.model';
import { TaskItemModel } from './taskItem.model';

export type GetTasksDataResponseModel = {
  data: TaskItemModel[];
  meta: MetaModel;
};
