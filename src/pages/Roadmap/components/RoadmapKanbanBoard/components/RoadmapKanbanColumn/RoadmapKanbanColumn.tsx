import React, { FC, memo } from 'react';
import { Box, Collapse, Skeleton } from '@mui/material';
import { Virtuoso } from 'react-virtuoso';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import KanbanColumnHeader from '../KanbanColumnHeader';
import { TaskItemModel } from '../../../../../../shared/models/tasks/taskItem.model';
import RoadmapKanbanItemContainer from '../RoadmapKanbanItemContainer';
import { RoadmapKanbanColumnModel } from '../../../../../../shared/models/roadmap/roadmapKanbanColumn.model';
import { getMoreRoadmapColumnData } from '../../../../../../store/roadmap/roadmapThunk';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import RoadmapKanbanColumnNoItemsStub from '../RoadmapKanbanColumnNoItemsStub';
import { RoadmapFilters } from '../../../../../../store/roadmap/roadmapSlice';
import { RoadmapKanbanColumnContainer } from './RoadmapKanbanColumn.style';

type RoadmapKanbanColumnProps = {
  columnProvided: DroppableProvided;
  column: RoadmapKanbanColumnModel;
  handleOpenViwTaskModal: (id: number) => void;
  filters: RoadmapFilters;
  isFirstColumn?: boolean;
  isSecondColumn?: boolean;
  isLastColumn?: boolean;
};
const RoadmapKanbanColumn: FC<RoadmapKanbanColumnProps> = ({
  columnProvided,
  column,
  handleOpenViwTaskModal,
  filters,
  isFirstColumn,
  isSecondColumn,
  isLastColumn,
}) => {
  const dispatch = useAppDispatch();
  const skeletonArr = Array(3).fill({ name: '' });

  const HeightPreservingItem = React.useMemo(() => {
    return ({ children, ...props }: { children: React.ReactNode; 'data-known-size': number }) => {
      return (
        <div {...props} style={{ height: props['data-known-size'] || undefined }}>
          {children}
        </div>
      );
    };
  }, []);

  const Footer = () => {
    return !column.isListOver ? (
      <Box>
        {skeletonArr.map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              p: '10px 0',
            }}
          >
            <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height="90px" width="320px" />
          </Box>
        ))}
      </Box>
    ) : (
      <></>
    );
  };

  const fetchMoreData = () => {
    if (!column.isListOver) {
      dispatch(
        getMoreRoadmapColumnData({
          ...filters,
          page: column.meta.current_page + 1,
          statuses: [],
          status: column.id,
        }),
      );
    }
  };

  return (
    <RoadmapKanbanColumnContainer
      item
      xs={4}
      isFirstColumn={isFirstColumn}
      isSecondColumn={isSecondColumn}
      isLastColumn={isLastColumn}
    >
      <KanbanColumnHeader label={column.label} taskId={column.id} />
      <Box
        className="test"
        sx={{
          height: '100%',
          width: '320px',
          display: 'flex',
          position: 'relative',
        }}
        {...columnProvided.droppableProps}
        ref={columnProvided.innerRef}
      >
        <Box sx={{ position: 'absolute', zIndex: '1' }}>
          <Collapse in={!column.data.length}>
            <RoadmapKanbanColumnNoItemsStub type={column.id} />
          </Collapse>
        </Box>

        <Virtuoso
          data={column.data}
          overscan={200}
          style={{ height: '100%', width: '100%', display: 'flex', scrollbarWidth: 'none' }}
          endReached={() => fetchMoreData()}
          components={{
            // @ts-ignore
            // TODO find solution
            Item: HeightPreservingItem,
            Footer,
          }}
          itemContent={(index: number, item: TaskItemModel) => {
            return (
              item && (
                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                  {(provided) => (
                    <RoadmapKanbanItemContainer
                      handleOpenViwTaskModal={handleOpenViwTaskModal}
                      provided={provided}
                      task={item}
                    />
                  )}
                </Draggable>
              )
            );
          }}
        />
      </Box>
    </RoadmapKanbanColumnContainer>
  );
};

export default memo(RoadmapKanbanColumn);
