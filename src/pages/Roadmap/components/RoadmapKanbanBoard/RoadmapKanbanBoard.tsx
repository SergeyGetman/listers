import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { changeTaskStatus, getKanbanItems } from '../../../../store/roadmap/roadmapThunk';
import RoadmapKanbanItemContainer from './components/RoadmapKanbanItemContainer';
import RoadmapKanbanColumn from './components/RoadmapKanbanColumn';
import { PlannerItemStatusesEnum } from '../../../../shared/enums/plannerItemStatuses.enum';
import {
  changeKanbanItemStatus,
  resetKanbanData,
  RoadmapFilters,
} from '../../../../store/roadmap/roadmapSlice';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import KanbanColumnSkeleton from './components/KanbanColumnSkeleton';
import { plannerItemPriorityConfig } from '../../../../shared/configs/plannerItemPriority.config';

type RoadmapKanbanBoardProps = {
  filters: RoadmapFilters;
  handleOpenViwTaskModal: (id: number, isEdit?: boolean) => void;
};
const RoadmapKanbanBoard: FC<RoadmapKanbanBoardProps> = ({ filters, handleOpenViwTaskModal }) => {
  const [isGetInitialData, setIsGetInitialData] = useState<boolean>(false);
  const { kanbanData } = useAppSelector(({ roadmap }) => roadmap);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const kanbanList = [
    PlannerItemStatusesEnum.todo,
    PlannerItemStatusesEnum.in_progress,
    PlannerItemStatusesEnum.done,
  ];

  useEffect(() => {
    return () => {
      dispatch(resetKanbanData());
    };
  }, [dispatch]);

  useEffect(() => {
    setIsGetInitialData(false);
    dispatch(
      getKanbanItems({
        ...filters,
        statuses: null,
        priorities: filters.priorities
          ? filters.priorities.map((item: string) => (plannerItemPriorityConfig.none.id === item ? '' : item))
          : null,
      }),
    ).then((result) => {
      if (getKanbanItems.fulfilled.match(result)) {
        setIsGetInitialData(true);
      }
    });
  }, [dispatch, filters]);

  const onDragEnd = (
    dropResult:
      | {
          source: { droppableId: PlannerItemStatusesEnum; index: number };
          destination: { droppableId: PlannerItemStatusesEnum; index: number };
        }
      | DropResult
      | any,
  ) => {
    if (!dropResult.destination) return;

    const { source, destination } = dropResult;
    const droppableId = source.droppableId;
    const droppableIndex = source.index;
    const destinationId = destination.droppableId;
    const destinationIndex = destination.index;
    const item = kanbanData[droppableId].data[droppableIndex];
    const changedItem = { ...item, current_user: { ...item.current_user, status: destinationId } };
    dispatch(
      changeKanbanItemStatus({ droppableId, droppableIndex, destinationId, destinationIndex, changedItem }),
    );

    if (destinationId !== droppableId) {
      dispatch(
        changeTaskStatus({
          taskId: item.id,
          status: destinationId,
          is_common: !item.current_user.status,
        }),
      ).then((result) => {
        if (changeTaskStatus.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.taskStatusUpdated'));
        }
      });
    }
  };

  return (
    <Box sx={{ height: '100%' }}>
      {isGetInitialData && kanbanData ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid sx={{ height: '100%', flexGrow: 1 }} container>
            {kanbanList.map((section: PlannerItemStatusesEnum) => (
              <Droppable
                mode="virtual"
                renderClone={(provided, snapshot, rubric) => (
                  <RoadmapKanbanItemContainer
                    handleOpenViwTaskModal={handleOpenViwTaskModal}
                    provided={provided}
                    task={kanbanData[section].data[rubric.source.index]}
                  />
                )}
                key={section}
                droppableId={section}
              >
                {(columnProvided) => (
                  <RoadmapKanbanColumn
                    isFirstColumn={section === PlannerItemStatusesEnum.todo}
                    isSecondColumn={section === PlannerItemStatusesEnum.in_progress}
                    isLastColumn={section === PlannerItemStatusesEnum.done}
                    handleOpenViwTaskModal={handleOpenViwTaskModal}
                    columnProvided={columnProvided}
                    filters={filters}
                    column={kanbanData[section]}
                  />
                )}
              </Droppable>
            ))}
          </Grid>
        </DragDropContext>
      ) : (
        <KanbanColumnSkeleton />
      )}
    </Box>
  );
};

export default RoadmapKanbanBoard;
