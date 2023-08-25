import React, { FC, useCallback, useEffect } from 'react';
import { Box, Collapse, Skeleton } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { RightSidebarChecklistItemContainer } from './RightSidebarChecklists.style';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import {
  createRightSidebarChecklistItem,
  deleteChecklistItem,
  getRightSidebarChecklists,
  updateChecklistItem,
} from '../../../../../../store/RightSidebar/rightSidebarActions';
import ChecklistItemCard from '../../../../../itemCards/ChecklistItemCard';
import { resetRightSidebarChecklistState } from '../../../../../../store/RightSidebar/rightSidebarSlice';
import { ChecklistItemStatusEnum } from '../../../../../../shared/enums/checklistItemStatus.enum';
import { ChecklistFormPayloadModel } from '../../../../../../shared/models/checklists/checklistFormPayload.model';
import ChecklistForm from '../../../../../forms/ChecklistForm/ChecklistForm';

const RightSidebarChecklists: FC = () => {
  const dispatch = useAppDispatch();
  const { isGetInitialData, isShowInputLoader, rightSidebarChecklistData } = useAppSelector(
    ({ rightSidebar }) => rightSidebar,
  );
  const skeletonArr = Array(14).fill('');

  const onSubmit = (data: ChecklistFormPayloadModel, reset: () => void) => {
    dispatch(createRightSidebarChecklistItem(data)).then((result) => {
      if (createRightSidebarChecklistItem.fulfilled.match(result)) {
        reset();
      }
    });
  };

  useEffect(() => {
    dispatch(getRightSidebarChecklists());
    return () => {
      dispatch(resetRightSidebarChecklistState());
    };
  }, [dispatch]);

  const handleUpdateChecklistItem = useCallback(
    (newStatus: ChecklistItemStatusEnum, itemId: number, callback: (val: boolean) => void) => {
      dispatch(updateChecklistItem({ status: newStatus, id: itemId })).finally(() => {
        callback(false);
      });
    },
    [dispatch],
  );

  const handleDeleteChecklistItem = useCallback(
    (itemId: number, callback: (val: boolean) => void) => {
      dispatch(deleteChecklistItem(itemId)).finally(() => {
        callback(false);
      });
    },
    [dispatch],
  );

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ padding: '0 10px' }}>
        <ChecklistForm callBack={onSubmit} isShowInputLoader={isShowInputLoader} />
      </Box>

      <RightSidebarChecklistItemContainer>
        {isGetInitialData ? (
          <TransitionGroup>
            {rightSidebarChecklistData.map((item) => (
              <Collapse key={item.id}>
                <Box
                  sx={{
                    marginBottom: '16px',
                    ':first-of-type': {
                      marginTop: 0,
                    },
                  }}
                >
                  <ChecklistItemCard
                    item={item}
                    hasEditPermission
                    handleChangeChecklistItemStatus={handleUpdateChecklistItem}
                    handleDeleteChecklistItem={handleDeleteChecklistItem}
                  />
                </Box>
              </Collapse>
            ))}
          </TransitionGroup>
        ) : (
          skeletonArr.map((item, index) => (
            <Box key={index} sx={{ height: '43px', marginBottom: '16px' }}>
              <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height={43} />
            </Box>
          ))
        )}
      </RightSidebarChecklistItemContainer>
    </Box>
  );
};

export default RightSidebarChecklists;
