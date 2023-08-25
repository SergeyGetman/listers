import React, { FC, memo } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { TaskItemModel } from '../../../../../../shared/models/tasks/taskItem.model';
import TaskKanbanCard from '../../../../../../components/itemCards/TaskKanbanCard';
type RoadmapKanbanItemContainerProps = {
  provided: DraggableProvided;
  task: TaskItemModel;
  handleOpenViwTaskModal: (id: number, isEdit?: boolean) => void;
};
const RoadmapKanbanItemContainer: FC<RoadmapKanbanItemContainerProps> = memo(
  ({ provided, task, handleOpenViwTaskModal }: RoadmapKanbanItemContainerProps) => {
    return <TaskKanbanCard handleOpenViwTaskModal={handleOpenViwTaskModal} provided={provided} task={task} />;
  },
);

export default RoadmapKanbanItemContainer;
