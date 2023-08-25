import React, { FC, useEffect } from 'react';
import { bindTrigger, bindPopover, usePopupState } from 'material-ui-popup-state/hooks';
import { Box } from '@mui/material';
import { ChipsActionMenuContainer } from './ChipsActionMenu.style';
import ChipsActionMenuItem from './ChipsActionMenuItem';
type ChipsActionMenuProps = {
  menuList: {
    item: any;
    isHideIcon?: boolean;
    callback: () => void;
    disableCallback?: () => void;
    isDisabled?: boolean;
    tooltipTitle?: string;
    isShowBottomDivider?: boolean;
  }[];
  children?: React.ReactNode;
  onChangeMenuState?: (val: boolean) => void;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
};

const ChipsActionMenu: FC<ChipsActionMenuProps> = ({
  menuList,
  onChangeMenuState,
  children,
  anchorOriginHorizontal = 'right',
  anchorOriginVertical = 'bottom',
  transformOriginHorizontal = 'left',
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
    <Box onClick={(e) => e.stopPropagation()}>
      <Box sx={{ display: 'inline-block', cursor: 'pointer' }} {...bindTrigger(popupState)}>
        {children}
      </Box>

      <ChipsActionMenuContainer
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
            {menuList.map(({ item, callback }) => (
              <ChipsActionMenuItem callback={callback} key={item?.id} item={item} popupState={popupState} />
            ))}
          </Box>
        )}
      </ChipsActionMenuContainer>
    </Box>
  );
};

export default ChipsActionMenu;
