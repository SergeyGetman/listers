import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import BaseHeader from '../BaseHeader';
import { toggleShowCalendarNavigationPanel } from '../../../../../store/calendar/calendarSlice';

type CalendarHeaderProps = {
  isShowRightSidebar?: boolean;
};

const CalendarHeader: FC<CalendarHeaderProps> = ({ isShowRightSidebar }) => {
  const dispatch = useAppDispatch();
  const { isShowCalendarNavigationPanel } = useAppSelector(({ calendar }) => calendar);

  const handleHideNavigationPanel = useCallback(
    (value: boolean) => {
      dispatch(toggleShowCalendarNavigationPanel(value));
      localStorage.setItem('calendarNavigationPanel', JSON.stringify(value));
    },
    [dispatch],
  );

  return (
    <BaseHeader
      isShowHideNavigationBtn
      isShowNavigationPanel={isShowCalendarNavigationPanel}
      handleHideNavigationPanel={handleHideNavigationPanel}
      isShowRightSidebar={isShowRightSidebar}
    />
  );
};

export default CalendarHeader;
