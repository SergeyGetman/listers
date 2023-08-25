import React, { FC, memo, useCallback } from 'react';
import { Box } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import SidebarListItem from '../SidebarListItem';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import { reorderSidebarHubsItems } from '../../../../../../store/Profile/profile.slice';
import { updateProfileSidebarItemPosition } from '../../../../../../store/Profile/profile.actions';
import { SidebarEnum } from '../../../../../../shared/enums/sidebar.enum';
import SidebarContainerBtn from '../SidebarContainerBtn';
type SidebarHubsListProps = {
  hubsList: any[];
  handleCloseSidebar: () => void;
  isSmallDisplay: boolean;
};
const SidebarHubsList: FC<SidebarHubsListProps> = ({ hubsList, isSmallDisplay, handleCloseSidebar }) => {
  const dispatch = useAppDispatch();

  const onDragEnd = useCallback(
    (dropResult: any) => {
      if (!dropResult.destination) return;
      const { source, destination } = dropResult;
      const droppableIndex = source.index;
      const destinationIndex = destination.index;
      dispatch(
        updateProfileSidebarItemPosition({
          hubsId: dropResult.draggableId,
          position: dropResult.destination.index,
        }),
      );
      dispatch(reorderSidebarHubsItems({ droppableIndex, destinationIndex }));
    },
    [dispatch],
  );
  return (
    <Box sx={{ width: '100%', mb: '12px' }}>
      <SidebarContainerBtn
        itemId={SidebarEnum.hubs}
        isSmallDisplay={isSmallDisplay}
        handleCloseSidebar={handleCloseSidebar}
      />

      <Box sx={{ mt: '4px' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppableHubs">
            {(columnProvided) => (
              <Box {...columnProvided.droppableProps} ref={columnProvided.innerRef}>
                {hubsList.map((item: any, index) => (
                  <Draggable key={item.hub_id} draggableId={`${item.hub_id}`} index={index}>
                    {(provided, snapshotProvided) => (
                      <SidebarListItem
                        itemId={item.tag}
                        provided={provided}
                        snapshotProvided={snapshotProvided}
                        isSmallDisplay={isSmallDisplay}
                        handleCloseSidebar={handleCloseSidebar}
                      />
                    )}
                  </Draggable>
                ))}
                {columnProvided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default memo(SidebarHubsList);
