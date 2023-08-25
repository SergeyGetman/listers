import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { UseFormSetError } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import {
  createChecklistItem,
  getChecklists,
  removeChecklistItem,
  updateChecklistItem,
} from '../../../../store/checklists/checklistsThunk';
import { formatChecklistData } from '../../../../shared/functions/formatChecklistData';
import { ItemUserModel } from '../../../../shared/models/itemUser.model';
import { ChecklistItemStatusEnum } from '../../../../shared/enums/checklistItemStatus.enum';
import { ChecklistFormPayloadModel } from '../../../../shared/models/checklists/checklistFormPayload.model';
import {
  addChecklistItem,
  changeChecklistItemStatus,
  deleteChecklistItem,
  resetChecklistsData,
} from '../../../../store/checklists/checklistsSlice';
import UserChecklistContainer from './components/UserChecklistContainer';
import PlannerChecklistSkeleton from './components/PlannerChecklistSkeleton';
import errorsHandler from '../../../../shared/functions/errorsHandler';
type PlannerItemModalChecklistsProps = {
  entityId: number;
  isEditor: boolean;
  creatorId: number;
  isArchive?: boolean;
  currentUserId: number;
};

const PlannerItemModalChecklists: FC<PlannerItemModalChecklistsProps> = ({
  entityId,
  isEditor,
  creatorId,
  isArchive,
  currentUserId,
}) => {
  const dispatch = useAppDispatch();
  const [isFetchedInitialData, setIsFetchedInitialData] = useState<boolean>(false);
  const [isShowFormLoader, setIsShowFormLoader] = useState<boolean>(false);
  const { checklistData } = useAppSelector(({ checklists }) => checklists);
  const { connections, data } = useAppSelector(({ profile }) => profile);
  const currentUser = useMemo(() => {
    return connections.find((item: ItemUserModel) => item.id === data.id);
  }, [connections, data.id]);

  useEffect(() => {
    setIsFetchedInitialData(false);
    dispatch(getChecklists({ entity_type: 'planner_item', entity_id: entityId })).finally(() =>
      setIsFetchedInitialData(true),
    );
    return () => {
      dispatch(resetChecklistsData());
    };
  }, [dispatch, entityId]);

  const formatChecklistsData = useMemo(() => {
    if (isFetchedInitialData) {
      return formatChecklistData(checklistData, data.id);
    }
    return { usersData: [], currentUserData: [] };
  }, [checklistData, data.id, isFetchedInitialData]);

  const onSubmit = useCallback(
    (value: ChecklistFormPayloadModel, reset: () => void, setError: UseFormSetError<any>) => {
      setIsShowFormLoader(true);
      dispatch(createChecklistItem({ ...value, entity_type: 'planner_item', entity_id: entityId }))
        .then((result) => {
          if (createChecklistItem.fulfilled.match(result)) {
            dispatch(addChecklistItem(result.payload));
            reset();
          } else {
            errorsHandler(result, setError);
          }
        })
        .finally(() => setIsShowFormLoader(false));
    },
    [dispatch, entityId],
  );

  const handleChangeChecklistItemStatus = useCallback(
    (newStatus: ChecklistItemStatusEnum, itemId: number, callback: (val: boolean) => void) => {
      dispatch(
        updateChecklistItem({
          status: newStatus,
          id: itemId,
          entity_type: 'planner_item',
          entity_id: entityId,
        }),
      )
        .then((result) => {
          if (updateChecklistItem.fulfilled.match(result)) {
            dispatch(changeChecklistItemStatus(result.payload));
          }
        })
        .finally(() => {
          callback(false);
        });
    },
    [dispatch, entityId],
  );

  const handleDeleteChecklistItem = useCallback(
    (itemId: number, callback: (val: boolean) => void) => {
      dispatch(removeChecklistItem({ itemId, entity_type: 'planner_item', entity_id: entityId })).finally(
        () => {
          dispatch(deleteChecklistItem(itemId));
          callback(false);
        },
      );
    },
    [dispatch, entityId],
  );

  return (
    <Box
      sx={{
        height: '100%',
        msOverflowStyle: 'none',
        '& ::-webkit-scrollbar': {
          width: '0px !important',
        },
      }}
    >
      {isFetchedInitialData ? (
        <Box
          sx={{
            height: '100%',
            overflowX: 'auto',
            pb: '150px',
          }}
        >
          <UserChecklistContainer
            userData={formatChecklistsData.currentUserData}
            handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
            handleDeleteChecklistItem={handleDeleteChecklistItem}
            user={currentUser}
            onSubmit={onSubmit}
            isShowFormLoader={isShowFormLoader}
            isEditor
            currentUserId={currentUserId}
            isArchive={isArchive}
            creatorId={creatorId}
          />

          {formatChecklistsData.usersData.length >= 1 &&
            formatChecklistsData?.usersData.map((item, index) => (
              <UserChecklistContainer
                key={index}
                currentUserId={currentUserId}
                userData={item.items}
                handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
                handleDeleteChecklistItem={handleDeleteChecklistItem}
                user={item.owner}
                isEditor={isEditor}
                creatorId={creatorId}
              />
            ))}
        </Box>
      ) : (
        <Box sx={{ mt: '30px' }}>
          <PlannerChecklistSkeleton />
        </Box>
      )}
    </Box>
  );
};

export default PlannerItemModalChecklists;
