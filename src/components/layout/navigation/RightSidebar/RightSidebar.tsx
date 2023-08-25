import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  setRightSidebarSelectedTab,
  toggleOpenRightSidebar,
} from '../../../../store/RightSidebar/rightSidebarSlice';
import RightSidebarContent from './components/RightSidebarContent';
import { RightSidebarDrawer } from './RightSidebar.style';
import { useAppSelector } from '../../../../shared/hooks/redux';

const RightSidebar: FC = () => {
  const dispatch = useDispatch();
  const { isOpenRightSidebar, rightSidebarSelectedTab } = useAppSelector(({ rightSidebar }) => rightSidebar);
  const isSmallDisplay = useMediaQuery('(max-width:768px)');

  const handleCloseSidebar = () => {
    dispatch(toggleOpenRightSidebar(false));
    dispatch(setRightSidebarSelectedTab(''));
  };

  return (
    <RightSidebarDrawer
      anchor="right"
      variant={isSmallDisplay ? 'temporary' : 'permanent'}
      open={isOpenRightSidebar}
      onClose={handleCloseSidebar}
    >
      <RightSidebarContent
        selectedTab={rightSidebarSelectedTab}
        handleCloseSidebar={handleCloseSidebar}
        isOpenSidebar={isOpenRightSidebar}
      />
    </RightSidebarDrawer>
  );
};

export default RightSidebar;
