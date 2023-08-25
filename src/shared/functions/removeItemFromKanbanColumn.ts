import { TaskItemModel } from '../models/tasks/taskItem.model';
import { GetRoadmapKanbanDataResponseModel } from '../models/roadmap/getRoadmapKanbanDataResponse.model';

export const removeItemFromKanbanColumn = (kanbanData: GetRoadmapKanbanDataResponseModel, id: number) => {
  let newKanbanData = kanbanData;
  const kanbanColumnKeyArr = Object.keys(kanbanData);
  kanbanColumnKeyArr.forEach((key) => {
    newKanbanData = {
      ...newKanbanData,
      [key]: {
        ...kanbanData[key],
        data: kanbanData[key].data.filter((item: TaskItemModel) => item.id !== id),
      },
    };
  });
  return newKanbanData;
};
