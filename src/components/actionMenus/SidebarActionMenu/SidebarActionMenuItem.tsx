import React, { FC } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import MuiLinkButton from '../../buttons/MuiLinkButton';
import { SidebarActionMenuItem } from './SidebarActionMenu.style';
type SidebarActionMenuItemProps = {
  isSmallDisplay: boolean;
  handleCloseSidebar: () => void;
  item: any;
  popupState: any;
};
const SidebarActionMenuElement: FC<SidebarActionMenuItemProps> = ({
  isSmallDisplay,
  handleCloseSidebar,
  item,
  popupState,
}) => {
  const resolved = useResolvedPath(item?.to);
  const match = useMatch({ path: resolved?.pathname, end: true });

  return (
    <MuiLinkButton sx={{ width: '100%', mt: '1px', mb: '1px' }}>
      <Link
        style={{
          textDecoration: 'none',
          width: '100%',
        }}
        to={item?.to}
        onClick={() => {
          popupState.close();
          if (isSmallDisplay) {
            handleCloseSidebar();
          }
        }}
      >
        <SidebarActionMenuItem
          key={item.label}
          selected={!!match}
          isHideIcon={item.isHideIcon}
          onClick={() => {
            popupState.close();
          }}
        >
          <item.icon />
          {item.label}
        </SidebarActionMenuItem>
      </Link>
    </MuiLinkButton>
  );
};

export default SidebarActionMenuElement;
