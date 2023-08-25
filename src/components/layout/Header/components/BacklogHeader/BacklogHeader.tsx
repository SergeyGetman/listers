import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import BaseHeader from '../BaseHeader';
import { toggleShowBacklogNavigationPanel } from '../../../../../store/backlog/backlogSlice';

type BacklogHeaderProps = {
  isShowRightSidebar?: boolean;
};

const BacklogHeader: FC<BacklogHeaderProps> = ({ isShowRightSidebar }) => {
  const dispatch = useAppDispatch();
  const { isShowBacklogNavigationPanel } = useAppSelector(({ backlog }) => backlog);
  const handleHideNavigationPanel = useCallback(
    (value: boolean) => {
      dispatch(toggleShowBacklogNavigationPanel(value));
      localStorage.setItem('backlogNavigationPanel', JSON.stringify(value));
    },
    [dispatch],
  );

  return (
    <BaseHeader
      isShowHideNavigationBtn
      isShowNavigationPanel={isShowBacklogNavigationPanel}
      handleHideNavigationPanel={handleHideNavigationPanel}
      isShowRightSidebar={isShowRightSidebar}
    />
  );
};

export default BacklogHeader;
