import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import BaseHeader from '../BaseHeader';
import { toggleShowArchiveNavigationPanel } from '../../../../../store/archive/archiveSlice';

type ArchiveHeaderProps = {
  isShowRightSidebar?: boolean;
};
const ArchiveHeader: FC<ArchiveHeaderProps> = ({ isShowRightSidebar }) => {
  const dispatch = useAppDispatch();
  const { isShowArchiveNavigationPanel } = useAppSelector(({ archive }) => archive);

  const handleHideNavigationPanel = useCallback(
    (value: boolean) => {
      dispatch(toggleShowArchiveNavigationPanel(value));
      localStorage.setItem('archiveNavigationPanel', JSON.stringify(value));
    },
    [dispatch],
  );

  return (
    <BaseHeader
      isShowHideNavigationBtn
      isShowNavigationPanel={isShowArchiveNavigationPanel}
      handleHideNavigationPanel={handleHideNavigationPanel}
      isShowRightSidebar={isShowRightSidebar}
    />
  );
};

export default ArchiveHeader;
