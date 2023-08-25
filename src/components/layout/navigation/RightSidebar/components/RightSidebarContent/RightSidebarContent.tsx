import React, { FC } from 'react';
import { Box } from '@mui/material';
import RightSidebarHeader from '../RightSidebarHeader';
import { RightSidebarContentContainer } from './RightSidebarContent.style';
import { rightSidebarConfig } from '../../../../../../shared/configs/rightSidebar.config';

type RightSidebarContentProps = {
  selectedTab: string;
  handleCloseSidebar: () => void;
  isOpenSidebar: boolean;
};

const RightSidebarContent: FC<RightSidebarContentProps> = ({
  selectedTab,
  handleCloseSidebar,
  isOpenSidebar,
}) => {
  const Panel = rightSidebarConfig?.find((tab) => tab.name === selectedTab);

  return (
    <RightSidebarContentContainer>
      {isOpenSidebar && (
        <>
          <RightSidebarHeader selectedTab={selectedTab} handleCloseSidebar={handleCloseSidebar} />
          <Box sx={{ marginTop: '16px', height: '100%' }}>{Panel && <Panel.Component />}</Box>
        </>
      )}
    </RightSidebarContentContainer>
  );
};
export default RightSidebarContent;
