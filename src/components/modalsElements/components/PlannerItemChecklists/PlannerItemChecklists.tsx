import React, { FC, useCallback, useEffect, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { Box, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import {
  createChecklistItem,
  getChecklists,
  removeChecklistItem,
  updateChecklistItem,
  updateChecklistItemBody,
} from '../../../../store/checklists/checklistsThunk';
import {
  addChecklistItem,
  changeChecklistItemStatus,
  deleteChecklistItem,
  resetChecklistsData,
  updateChecklistItemFromList,
} from '../../../../store/checklists/checklistsSlice';
import { ChecklistFormPayloadModel } from '../../../../shared/models/checklists/checklistFormPayload.model';
import errorsHandler from '../../../../shared/functions/errorsHandler';
import { ChecklistItemStatusEnum } from '../../../../shared/enums/checklistItemStatus.enum';
import PlannerChecklistSkeleton from '../PlannerItemModalChecklists/components/PlannerChecklistSkeleton';
import ChecklistForm from '../../../forms/ChecklistForm';
import ChecklistItem from '../../../itemCards/ChecklistCard/components/ChecklistItem/ChecklistItem';
import PlannerItemNavigationStub from '../../../stubs/PlannerItemNavigationStub';
import { PlannerItemNavigationEnum } from '../../../../shared/enums/plannerItemNavigation.enum';
type PlannerItemChecklistsProps = {
  entityId?: number;
  isCanEdit: boolean;
  isArchive?: boolean;
  isCreate?: boolean;
};
const PlannerItemChecklists: FC<PlannerItemChecklistsProps> = ({
  entityId,
  isCanEdit,
  isArchive,
  isCreate = false,
}) => {
  const dispatch = useAppDispatch();
  const [isFetchedInitialData, setIsFetchedInitialData] = useState<boolean>(isCreate);
  const [isShowFormLoader, setIsShowFormLoader] = useState<boolean>(false);
  const { checklistData } = useAppSelector(({ checklists }) => checklists);

  useEffect(() => {
    if (!isCreate) {
      setIsFetchedInitialData(false);
      dispatch(
        getChecklists({
          entity_type: isCreate ? undefined : 'planner_item',
          entity_id: isCreate ? undefined : entityId,
        }),
      ).finally(() => setIsFetchedInitialData(true));
      return () => {
        dispatch(resetChecklistsData());
      };
    }
    return () => true;
  }, [dispatch, entityId, isCreate]);

  const onSubmit = useCallback(
    (value: ChecklistFormPayloadModel, reset: () => void, setError: UseFormSetError<any>) => {
      setIsShowFormLoader(true);
      dispatch(
        createChecklistItem({
          ...value,
          entity_type: isCreate ? undefined : 'planner_item',
          entity_id: isCreate ? undefined : entityId,
        }),
      )
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
    [dispatch, entityId, isCreate],
  );

  const handleChangeChecklistItemStatus = useCallback(
    (newStatus: ChecklistItemStatusEnum, itemId: number, callback: (val: boolean) => void) => {
      dispatch(
        updateChecklistItem({
          status: newStatus,
          id: itemId,
          entity_type: isCreate ? undefined : 'planner_item',
          entity_id: isCreate ? undefined : entityId,
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
    [dispatch, entityId, isCreate],
  );

  const handleDeleteChecklistItem = useCallback(
    (itemId: number, callback: (val: boolean) => void) => {
      dispatch(
        removeChecklistItem({
          itemId,
          entity_type: isCreate ? undefined : 'planner_item',
          entity_id: isCreate ? undefined : entityId,
        }),
      ).finally(() => {
        dispatch(deleteChecklistItem(itemId));
        callback(false);
      });
    },
    [dispatch, entityId, isCreate],
  );

  const handleUpdateChecklistItem = useCallback(
    (itemId: number, body: string, callback: (val: boolean) => void) => {
      dispatch(
        updateChecklistItemBody({
          body: body,
          id: itemId,
          entity_type: isCreate ? undefined : 'planner_item',
          entity_id: isCreate ? undefined : entityId,
        }),
      )
        .then((result) => {
          if (updateChecklistItemBody.fulfilled.match(result)) {
            dispatch(updateChecklistItemFromList(result.payload));
          }
        })
        .finally(() => {
          callback(false);
        });
    },
    [dispatch, isCreate, entityId],
  );

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        msOverflowStyle: 'none',
        '& ::-webkit-scrollbar': {
          width: '0px !important',
        },
      }}
    >
      {isFetchedInitialData ? (
        <>
          {checklistData?.length > 0 || isCanEdit ? (
            <Box
              sx={{
                height: '100%',
                overflowX: 'auto',
                width: '100%',
              }}
            >
              <Box sx={{ mt: '16px', width: '100%' }}>
                {onSubmit && !isArchive && isCanEdit && (
                  <Box sx={{ mb: '16px', width: '100%' }}>
                    <ChecklistForm callBack={onSubmit} isShowInputLoader={!!isShowFormLoader} />
                  </Box>
                )}
                {checklistData && (
                  <TransitionGroup>
                    {checklistData.map((item) => (
                      <Collapse key={item.id}>
                        <Box>
                          <ChecklistItem
                            item={item}
                            isShowConvertToTaskBtn={!isCreate}
                            isMobile={false}
                            hasDragAndDrop={false}
                            handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
                            handleUpdateChecklistItem={handleUpdateChecklistItem}
                            handleDeleteChecklistItem={handleDeleteChecklistItem}
                            handleConvertChecklistItemToTask={() => true}
                            hasEditPermission={isCanEdit}
                            isNotAcceptedItem={false}
                          />
                        </Box>
                      </Collapse>
                    ))}
                  </TransitionGroup>
                )}
              </Box>
            </Box>
          ) : (
            <PlannerItemNavigationStub variant={PlannerItemNavigationEnum.checklists} />
          )}
        </>
      ) : (
        <Box sx={{ mt: '16px' }}>
          <PlannerChecklistSkeleton />
        </Box>
      )}
    </Box>
  );
};

export default PlannerItemChecklists;
