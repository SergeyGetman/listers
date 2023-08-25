import React, { FC, useEffect } from 'react';
import { bindTrigger, bindPopover, usePopupState } from 'material-ui-popup-state/hooks';
import { Box } from '@mui/material';
import { PaperActionMenuContainer, PaperActionMenuItem } from './PaperActionMenu.style';
import MuiTooltip from '../../MuiTooltip';
import { PaperActionMenuItemModel } from '../../../shared/models/paperActionMenuItem.model';

type PaperActionMenuProps = {
  menuList: {
    item: PaperActionMenuItemModel;
    isHideIcon?: boolean;
    callback: () => void;
    disableCallback?: () => void;
    isDisabled?: boolean;
    tooltipTitle?: string;
  }[];
  activeItem?: string;
  isFullHeightContainer?: boolean;
  isSmall?: boolean;
  children?: React.ReactNode;
  onChangeMenuState?: (val: boolean) => void;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
};

const PaperActionMenu: FC<PaperActionMenuProps> = ({
  isSmall,
  menuList,
  activeItem,
  isFullHeightContainer,
  onChangeMenuState,
  children,
  anchorOriginHorizontal = 'right',
  anchorOriginVertical = 'bottom',
  transformOriginHorizontal = 'right',
  transformOriginVertical = 'top',
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demo-popup-menu',
  });
  useEffect(() => {
    if (onChangeMenuState) {
      onChangeMenuState(popupState.isOpen);
    }
  }, [popupState.isOpen, onChangeMenuState]);
  return (
    <Box sx={{ height: isFullHeightContainer ? '100%' : 'auto' }}>
      <Box
        sx={{ display: 'inline-block', cursor: 'pointer', height: isFullHeightContainer ? '100%' : 'auto' }}
        {...bindTrigger(popupState)}
      >
        {children}
      </Box>

      <PaperActionMenuContainer
        isSmall={isSmall}
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
      >
        {menuList.map(
          (
            {
              isDisabled,
              disableCallback,
              callback,
              tooltipTitle,
              item: { icon: Icon, iconColor, id, label, isHideIcon, value },
            },
            i,
          ) =>
            isDisabled ? (
              <MuiTooltip key={label} placement="left" title={tooltipTitle ?? ''}>
                <Box
                  sx={{ marginBottom: menuList.length >= i ? '5px' : '' }}
                  onClick={() => (disableCallback ? disableCallback() : true)}
                >
                  <PaperActionMenuItem
                    isSmall={isSmall}
                    iconColor={iconColor}
                    disabled
                    isHideIcon={isHideIcon}
                  >
                    {Icon && <Icon />}
                    {label}
                  </PaperActionMenuItem>
                </Box>
              </MuiTooltip>
            ) : (
              <PaperActionMenuItem
                key={label}
                isSmall={isSmall}
                iconColor={iconColor}
                selected={!!(id && id === activeItem) || !!(value && value === activeItem)}
                isHideIcon={isHideIcon}
                onClick={(e) => {
                  popupState.close();
                  e.stopPropagation();
                  callback();
                }}
              >
                {Icon && <Icon />}
                {label}
              </PaperActionMenuItem>
            ),
        )}
      </PaperActionMenuContainer>
    </Box>
  );
};

export default PaperActionMenu;
