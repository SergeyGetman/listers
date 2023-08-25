import React, { FC, memo, useCallback } from 'react';
import BaseHeader from '../BaseHeader';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { toggleShowRoadmapNavigationPanel } from '../../../../../store/roadmap/roadmapSlice';

type RoadmapHeaderProps = {
  isShowRightSidebar?: boolean;
};
const RoadmapHeader: FC<RoadmapHeaderProps> = ({ isShowRightSidebar }) => {
  const dispatch = useAppDispatch();
  const { isShowRoadmapNavigationPanel } = useAppSelector(({ roadmap }) => roadmap);
  const profileData = useAppSelector(({ profile }) => profile.data);
  const handleHideNavigationPanel = useCallback(
    (value: boolean) => {
      dispatch(toggleShowRoadmapNavigationPanel(value));
      localStorage.setItem('roadmapNavigationPanel', JSON.stringify(value));
    },
    [dispatch],
  );

  return (
    <BaseHeader
      isShowHideNavigationBtn={profileData?.view_data.is_view_tasks !== false}
      isShowNavigationPanel={isShowRoadmapNavigationPanel}
      handleHideNavigationPanel={handleHideNavigationPanel}
      isShowRightSidebar={isShowRightSidebar}
    />
  );
};

export default memo(RoadmapHeader);
