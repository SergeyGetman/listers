import React, { FC } from 'react';
import {
  RightSidebarNavigationItemBody,
  RightSidebarNavigationItemContainer,
} from './RightSidebarNavigationItem.style';

type RightSidebarNavigationItemProps = {
  children?: React.ReactNode;
  handleChangeSelectedTab: (tab: string) => void;
  isActive: boolean;
  name: string;
};

const RightSidebarNavigationItem: FC<RightSidebarNavigationItemProps> = ({
  children,
  isActive,
  handleChangeSelectedTab,
  name,
}) => {
  return (
    <RightSidebarNavigationItemContainer onClick={() => handleChangeSelectedTab(name)}>
      <RightSidebarNavigationItemBody isActive={isActive}>{children}</RightSidebarNavigationItemBody>
    </RightSidebarNavigationItemContainer>
  );
};

export default RightSidebarNavigationItem;
