import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import BaseHeader from '../BaseHeader';
import { toggleShowEventsNavigationPanel } from '../../../../../store/events/eventsSlice';

type EventsHeaderProps = {
  isShowRightSidebar?: boolean;
};
const EventsHeader: FC<EventsHeaderProps> = ({ isShowRightSidebar }) => {
  const dispatch = useAppDispatch();
  const { isShowEventsNavigationPanel } = useAppSelector(({ events }) => events);
  const profileData = useAppSelector(({ profile }) => profile.data);

  const handleHideNavigationPanel = useCallback(
    (value: boolean) => {
      dispatch(toggleShowEventsNavigationPanel(value));
      localStorage.setItem('eventsNavigationPanel', JSON.stringify(value));
    },
    [dispatch],
  );

  return (
    <BaseHeader
      isShowHideNavigationBtn={profileData?.view_data.is_view_events !== false}
      isShowNavigationPanel={isShowEventsNavigationPanel}
      handleHideNavigationPanel={handleHideNavigationPanel}
      isShowRightSidebar={isShowRightSidebar}
    />
  );
};

export default EventsHeader;
