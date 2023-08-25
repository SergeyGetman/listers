import React, { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiTooltip from '../../MuiTooltip';
import { ActionMenuBase, ActionMenuBaseItem } from './BaseActionMenu.style';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import MuiIconButton from '../../buttons/iconButtons/MuiIconButton/MuiIconButton';

type BaseActionMenuProps = {
  menuList: ActionMenuListModel;
  icon?: any;
  isDisabled?: boolean;
  isUseChildrenComponent?: boolean;
  children?: React.ReactNode;
  isPrimaryHover?: boolean;
  iconSize?: 'small' | 'medium' | 'large';
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
  color?: 'primary' | 'secondary';
};

const BaseActionMenu: FC<BaseActionMenuProps> = ({
  menuList,
  icon = <MoreVertIcon />,
  iconSize = 'medium',
  isDisabled = false,
  anchorOriginVertical = 'bottom',
  anchorOriginHorizontal = 'right',
  transformOriginVertical = 'top',
  transformOriginHorizontal = 'right',
  isUseChildrenComponent = false,
  color,
  isPrimaryHover = true,
  children = <Box />,
}) => {
  const handleClickAwayPopup = (close: { (): void; (): void }, event: React.MouseEvent) => {
    close();
    event.stopPropagation();
  };
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);

  return (
    <PopupState variant="popover" popupId="base-action-menu">
      {(popupState) => (
        <>
          {isUseChildrenComponent ? (
            <Box sx={{ display: 'inline-block', cursor: 'pointer' }} {...bindTrigger(popupState)}>
              {children}
            </Box>
          ) : (
            <MuiIconButton
              color={color}
              variant="default"
              isDisabled={isDisabled}
              size={iconSize}
              isPrimaryHover={isPrimaryHover}
              {...bindTrigger(popupState)}
            >
              {icon}
            </MuiIconButton>
          )}

          <ActionMenuBase
            {...bindMenu({
              ...popupState,
              close: (e: React.MouseEvent) => handleClickAwayPopup(popupState.close, e),
            } as any)}
            anchorOrigin={{
              vertical: anchorOriginVertical,
              horizontal: anchorOriginHorizontal,
            }}
            transformOrigin={{
              vertical: transformOriginVertical,
              horizontal: transformOriginHorizontal,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {menuList?.map((item) =>
              item.isDisabled ? (
                <MuiTooltip
                  key={item.label}
                  placement={isSmallDisplay ? 'top' : 'left'}
                  title={item?.tooltipTitle ? item?.tooltipTitle : ''}
                >
                  <Box onClick={() => (item.disableCallback ? item.disableCallback() : true)}>
                    <ActionMenuBaseItem disabled>{item?.label}</ActionMenuBaseItem>
                  </Box>
                </MuiTooltip>
              ) : (
                <ActionMenuBaseItem
                  key={item.label}
                  onClick={(e) => {
                    popupState.close();
                    e.stopPropagation();
                    item.callback();
                  }}
                >
                  {item?.label}
                </ActionMenuBaseItem>
              ),
            )}
          </ActionMenuBase>
        </>
      )}
    </PopupState>
  );
};

export default BaseActionMenu;
