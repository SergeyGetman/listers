import React, { FC } from 'react';
import { Box } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import CircularButton from '../../buttons/CilrcularButton';
import MuiTooltip from '../../MuiTooltip';
import { ActionMenuFromPlus, ActionMenuFromPlusItem } from './PlusActionMenu.style';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';

export type PlusActionMenuProps = {
  menuList: ActionMenuListModel;
};

const PlusActionMenu: FC<PlusActionMenuProps> = ({ menuList }) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <CircularButton size="large" {...bindTrigger(popupState)} />
          <ActionMenuFromPlus
            {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            {menuList?.map((item) =>
              item.isDisabled ? (
                <MuiTooltip
                  key={item.label}
                  placement="left"
                  title={item?.tooltipTitle ? item?.tooltipTitle : ''}
                >
                  <Box onClick={() => (item.disableCallback ? item.disableCallback() : true)}>
                    <ActionMenuFromPlusItem disabled>{item?.label}</ActionMenuFromPlusItem>
                  </Box>
                </MuiTooltip>
              ) : (
                <ActionMenuFromPlusItem
                  key={item.label}
                  onClick={() => {
                    popupState.close();
                    item.callback();
                  }}
                >
                  {item.isContainStartIcon && (
                    <Box sx={{ fontSize: '13px', mr: '5px' }}>{item.startIcon}</Box>
                  )}
                  {item?.label}
                </ActionMenuFromPlusItem>
              ),
            )}
          </ActionMenuFromPlus>
        </>
      )}
    </PopupState>
  );
};

export default PlusActionMenu;
