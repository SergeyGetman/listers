import React, { FC, memo } from 'react';
import { Box } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import SidebarListItem from '../SidebarListItem';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import { reorderSidebarOrganizerItems } from '../../../../../../store/Profile/profile.slice';
import { updateProfileSidebarItemPosition } from '../../../../../../store/Profile/profile.actions';
import SidebarContainerBtn from '../SidebarContainerBtn';
import { SidebarEnum } from '../../../../../../shared/enums/sidebar.enum';
type SidebarOrganizerListProps = {
  organizerList: any[];
  handleCloseSidebar: () => void;
  isSmallDisplay: boolean;
};
const SidebarOrganizerList: FC<SidebarOrganizerListProps> = ({
  organizerList,
  isSmallDisplay,
  handleCloseSidebar,
}) => {
  const dispatch = useAppDispatch();
  const onDragEnd = (dropResult: any) => {
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
    dispatch(reorderSidebarOrganizerItems({ droppableIndex, destinationIndex }));
  };
  return (
    <Box sx={{ width: '100%', mt: '8px', mb: '12px' }}>
      <SidebarContainerBtn
        itemId={SidebarEnum.organizer}
        isSmallDisplay={isSmallDisplay}
        handleCloseSidebar={handleCloseSidebar}
      />
      <Box sx={{ mt: '4px' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppableOrganizer">
            {(columnProvided) => (
              <Box {...columnProvided.droppableProps} ref={columnProvided.innerRef}>
                {organizerList.map((item: any, index) => (
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

export default memo(SidebarOrganizerList);
