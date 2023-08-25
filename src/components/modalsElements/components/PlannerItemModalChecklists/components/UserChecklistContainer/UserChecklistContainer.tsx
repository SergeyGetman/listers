import React, { FC, memo } from 'react';
import { Box, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { UseFormSetError } from 'react-hook-form';
import PersonContainer from '../PersonContainer';
import { ItemUserModel } from '../../../../../../shared/models/itemUser.model';
import ChecklistForm from '../../../../../forms/ChecklistForm';
import ChecklistItemCard from '../../../../../itemCards/ChecklistItemCard';
import { ChecklistItemModel } from '../../../../../../shared/models/checklists/checklistItem.model';
import { ChecklistItemStatusEnum } from '../../../../../../shared/enums/checklistItemStatus.enum';
import { ChecklistFormPayloadModel } from '../../../../../../shared/models/checklists/checklistFormPayload.model';
type UserChecklistContainerProps = {
  user: ItemUserModel;
  userData: ChecklistItemModel[];
  handleChangeChecklistItemStatus?: (
    newStatus: ChecklistItemStatusEnum,
    itemId: number,
    callback: (value: boolean) => void,
  ) => void;
  handleDeleteChecklistItem?: (itemId: number, callback: (value: boolean) => void) => void;
  onSubmit?: (value: ChecklistFormPayloadModel, reset: () => void, setError: UseFormSetError<any>) => void;
  isShowFormLoader?: boolean;
  isEditor: boolean;
  creatorId: number;
  currentUserId: number;
  isArchive?: boolean;
};
const UserChecklistContainer: FC<UserChecklistContainerProps> = ({
  user,
  userData,
  handleChangeChecklistItemStatus,
  handleDeleteChecklistItem,
  onSubmit,
  isShowFormLoader,
  isEditor,
  creatorId,
  currentUserId,
  isArchive,
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <PersonContainer currentUserId={currentUserId} user={user} creatorId={creatorId} />

      <Box sx={{ mt: '16px' }}>
        {onSubmit && !isArchive && (
          <Box sx={{ mb: '16px' }}>
            <ChecklistForm callBack={onSubmit} isShowInputLoader={!!isShowFormLoader} />
          </Box>
        )}

        <TransitionGroup>
          {userData.map((item) => (
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
                  hasEditPermission={isEditor}
                  handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
                  handleDeleteChecklistItem={handleDeleteChecklistItem}
                />
              </Box>
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>
    </Box>
  );
};

export default memo(UserChecklistContainer);
