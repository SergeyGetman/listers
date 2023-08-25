import React, { FC } from 'react';
import { Box } from '@mui/material';
import { ItemUserModel } from '../../../shared/models/itemUser.model';
import EventViewAssignPeopleListItem from './components/EventViewAssignPeopleListItem';

type EventViewAssignPeopleProps = {
  users: ItemUserModel[];
  owner: ItemUserModel;
  isShowStatuses?: boolean;
  currentUserId: number;
};

const EventViewAssignPeople: FC<EventViewAssignPeopleProps> = ({
  users,
  owner,
  currentUserId,
  isShowStatuses = true,
}) => {
  return (
    <Box>
      <EventViewAssignPeopleListItem
        isShowStatuses={isShowStatuses}
        currentUserId={currentUserId}
        isOwner
        item={owner}
      />
      {users.map((item, key) => (
        <EventViewAssignPeopleListItem
          isShowStatuses={isShowStatuses}
          key={key}
          currentUserId={currentUserId}
          item={item}
        />
      ))}
    </Box>
  );
};

export default EventViewAssignPeople;
