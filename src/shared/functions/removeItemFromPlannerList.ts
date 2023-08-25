import { TaskItemModel } from '../models/tasks/taskItem.model';
import { EventItemModel } from '../models/event/eventItem.model';
import { PlannerItemModelTypeEnum } from '../enums/plannerItemModelType.enum';

export const removeItemFromPlannerList = (
  plannerList: any,
  id: number,
  modelType: PlannerItemModelTypeEnum,
) => {
  return plannerList
    .map((day: any) => {
      const isContainInThisDay = day.items.findIndex((item: any) => item.id === id) !== -1;
      return {
        ...day,
        eventCount:
          isContainInThisDay && modelType === PlannerItemModelTypeEnum.event
            ? day.eventCount - 1
            : day.eventCount,
        taskCount:
          isContainInThisDay && modelType === PlannerItemModelTypeEnum.task
            ? day.taskCount - 1
            : day.taskCount,

        items: day.items.filter((item: TaskItemModel | EventItemModel) => item.id !== id),
      };
    })
    .filter((day: any) => !!day.items.length);
};
