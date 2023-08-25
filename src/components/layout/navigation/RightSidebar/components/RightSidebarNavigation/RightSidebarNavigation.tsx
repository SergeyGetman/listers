import React, { FC } from 'react';
import { Box } from '@mui/material';
import RightSidebarNavigationItem from '../RightSidebarNavigationItem';
import { RightSidebarNavigationList } from './RightSidebarNavigation.style';
import { rightSidebarConfig } from '../../../../../../shared/configs/rightSidebar.config';
import MuiChip from '../../../../../MuiChip';

type RightSidebarNavigationProps = {
  handleChangeSelectedTab: (tab: string) => void;
  selectedTab: string;
  notificationsCounters: number;
};

const RightSidebarNavigation: FC<RightSidebarNavigationProps> = ({
  selectedTab,
  handleChangeSelectedTab,
  notificationsCounters,
}) => {
  return (
    <RightSidebarNavigationList dense>
      {rightSidebarConfig.map((item) => (
        <Box sx={{ position: 'relative' }}>
          <RightSidebarNavigationItem
            key={item.name}
            name={item?.name}
            isActive={selectedTab === item?.name}
            handleChangeSelectedTab={handleChangeSelectedTab}
          >
            <item.icon />
            {item.name === 'notifications' && (
              <Box sx={{ position: 'absolute', bottom: '10px', right: 0 }}>
                {notificationsCounters > 0 && <MuiChip isShow label={notificationsCounters} />}
              </Box>
            )}
          </RightSidebarNavigationItem>
        </Box>
      ))}
    </RightSidebarNavigationList>
  );
};
export default RightSidebarNavigation;
