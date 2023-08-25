import { MetaModel } from '../meta.model';
import { TaskItemModel } from '../tasks/taskItem.model';
import { PlannerItemStatusesEnum } from '../../enums/plannerItemStatuses.enum';

export type RoadmapKanbanColumnModel = {
  data: TaskItemModel[];
  meta: MetaModel;
  id: PlannerItemStatusesEnum.todo | PlannerItemStatusesEnum.in_progress | PlannerItemStatusesEnum.done;
  label: string;
  isListOver: boolean | number;
};
