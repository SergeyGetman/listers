import React, { FC, memo } from 'react';
import { Box } from '@mui/material';
import TaskViewAssignPeopleListItem from './components/TaskViewAssignPeopleListItem';
import { ItemUserModel } from '../../../shared/models/itemUser.model';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
type TaskViewAssignPeopleListType = {
  users: ItemUserModel[];
  owner: ItemUserModel;
  status: PlannerItemStatusesEnum;
  handleChangeAssignUserStatus: (params: {
    userStatus: PlannerItemStatusesEnum;
    userId: number;
    setIsShowChangeStatusLoader: (val: boolean) => void;
  }) => void;
  currentUserId: number;
  isEditor: boolean;
  isArchive?: boolean;
};
const TaskViewAssignPeopleList: FC<TaskViewAssignPeopleListType> = ({
  users,
  owner,
  currentUserId,
  status,
  isEditor,
  handleChangeAssignUserStatus,
  isArchive,
}) => {
  const isIncludeOwnerInAssignPeople =
    users.findIndex((item: ItemUserModel) => item?.id === owner?.id) !== -1;
  const sortUserList = [...users];

  if (isIncludeOwnerInAssignPeople) {
    sortUserList.unshift(
      ...sortUserList.splice(
        users.findIndex((item) => item?.id === owner?.id),
        1,
      ),
    );
  }

  return (
    <Box>
      {!isIncludeOwnerInAssignPeople && (
        <Box sx={{ opacity: '0.6' }}>
          <TaskViewAssignPeopleListItem
            isNotAssignedCreator
            isEditor={isEditor}
            currentUserId={currentUserId}
            ownerId={owner?.id}
            item={owner}
            status={status}
            handleChangeAssignUserStatus={handleChangeAssignUserStatus}
          />
        </Box>
      )}
      {sortUserList.map((item, key) => (
        <TaskViewAssignPeopleListItem
          key={key}
          isEditor={isEditor}
          currentUserId={currentUserId}
          ownerId={owner?.id}
          item={item}
          status={status}
          isArchive={isArchive}
          handleChangeAssignUserStatus={handleChangeAssignUserStatus}
        />
      ))}
    </Box>
  );
};

export default memo(TaskViewAssignPeopleList);
