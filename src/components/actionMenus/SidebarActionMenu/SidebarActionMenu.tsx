import React, { FC, useEffect } from 'react';
import { bindTrigger, bindPopover, usePopupState } from 'material-ui-popup-state/hooks';
import { Box, useTheme } from '@mui/material';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SidebarActionMenuContainer, SidebarActionMenuItem } from './SidebarActionMenu.style';
import router from '../../../shared/services/router';
import MuiLinkButton from '../../buttons/MuiLinkButton';
import SidebarActionMenuElement from './SidebarActionMenuItem';
type SidebarActionMenuProps = {
  menuList: {
    item: any;
    isHideIcon?: boolean;
    callback: () => void;
    disableCallback?: () => void;
    isDisabled?: boolean;
    tooltipTitle?: string;
    isShowBottomDivider?: boolean;
  }[];
  isSmallDisplay: boolean;
  handleCloseSidebar: () => void;
  children?: React.ReactNode;
  onChangeMenuState?: (val: boolean) => void;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
};

const SidebarActionMenu: FC<SidebarActionMenuProps> = ({
  menuList,
  onChangeMenuState,
  children,
  isSmallDisplay,
  handleCloseSidebar,
  anchorOriginHorizontal = 'right',
  anchorOriginVertical = 'bottom',
  transformOriginHorizontal = 'left',
  transformOriginVertical = 'top',
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demo-popup-menu',
  });
  const { t } = useTranslation();

  const theme = useTheme();
  useEffect(() => {
    if (onChangeMenuState) {
      onChangeMenuState(popupState.isOpen);
    }
  }, [popupState.isOpen, onChangeMenuState]);
  return (
    <Box sx={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
      <Box sx={{ display: 'inline-block', cursor: 'pointer', width: '100%' }} {...bindTrigger(popupState)}>
        {children}
      </Box>

      <SidebarActionMenuContainer
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
      >
        {popupState.isOpen && (
          <Box>
            {menuList.map(({ item }) => (
              <Box
                key={item?.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  pb: item.isShowBottomDivider ? '4px' : '0',
                  mb: item.isShowBottomDivider ? '4px' : '0',
                  width: '100%',
                  borderBottom: item.isShowBottomDivider
                    ? `1px solid ${theme.palette.case.neutral.n100}`
                    : 'none',
                }}
              >
                <SidebarActionMenuElement
                  key={item?.id}
                  item={item}
                  popupState={popupState}
                  isSmallDisplay={isSmallDisplay}
                  handleCloseSidebar={handleCloseSidebar}
                />
              </Box>
            ))}

            <MuiLinkButton sx={{ width: '100%' }}>
              <Link
                style={{
                  textDecoration: 'none',
                  width: '100%',
                }}
                to={`${router.settings.path}/${router.settings.children.logout.path}`}
                onClick={() => {
                  popupState.close();
                  if (isSmallDisplay) {
                    handleCloseSidebar();
                  }
                }}
              >
                <SidebarActionMenuItem selected={false}>
                  {t('general.leftSidebar.items.logOut.label')}
                </SidebarActionMenuItem>
              </Link>
            </MuiLinkButton>
          </Box>
        )}
      </SidebarActionMenuContainer>
    </Box>
  );
};

export default SidebarActionMenu;
