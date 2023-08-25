import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import BaseHeader from '../BaseHeader';
import { toggleShowPlannerNavigationPanel } from '../../../../../store/planner/plannerSlice';

type PlannerHeaderProps = {
  isShowRightSidebar?: boolean;
};

const PlannerHeader: FC<PlannerHeaderProps> = ({ isShowRightSidebar }) => {
  const dispatch = useAppDispatch();
  const { isShowPlannerNavigationPanel } = useAppSelector(({ planner }) => planner);
  const profileData = useAppSelector(({ profile }) => profile.data);

  const handleHideNavigationPanel = useCallback(
    (value: boolean) => {
      dispatch(toggleShowPlannerNavigationPanel(value));
      localStorage.setItem('plannerNavigationPanel', JSON.stringify(value));
    },
    [dispatch],
  );

  return (
    <BaseHeader
      isShowHideNavigationBtn={profileData?.view_data.is_view_journal !== false}
      isShowNavigationPanel={isShowPlannerNavigationPanel}
      handleHideNavigationPanel={handleHideNavigationPanel}
      isShowRightSidebar={isShowRightSidebar}
    />
  );
};

export default PlannerHeader;
