import React, { FC, ReactNode } from 'react';
import { Box, SxProps, Typography, Theme } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import {
  ActionMenuMobileFromPlus,
  ActionMenuMobileFromPlusItem,
  ActionMenuMobileHeaderContainer,
} from './GarageCreateActionMenu.style';
import { ReactComponent as CloseIcon } from '../../../assets/Images/modalNavigation/close.svg';
import theme from '../../../theme/theme';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import CircularButton from '../../buttons/CilrcularButton';

export type PlusActionMenuMobileProps = {
  menuList: ActionMenuListModel;
  header: string | null;
  isMobile: boolean;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
  childrenComponent: ReactNode | null;
  sx?: SxProps<Theme> | undefined;
  isMobileVariant?: boolean;
};

const GarageCreateActionMenu: FC<PlusActionMenuMobileProps> = ({
  menuList,
  header,
  childrenComponent,
  isMobile,
  anchorOriginHorizontal = 'center',
  anchorOriginVertical = 'top',
  transformOriginHorizontal = 'center',
  transformOriginVertical = 'bottom',
  sx,
  isMobileVariant = true,
}) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <Box onClick={(e) => e.stopPropagation()}>
          {childrenComponent !== null ? (
            <Box sx={{ display: 'inline-block', cursor: 'pointer' }} {...bindTrigger(popupState)}>
              {childrenComponent}
            </Box>
          ) : (
            <CircularButton size="large" {...bindTrigger(popupState)} />
          )}

          <ActionMenuMobileFromPlus
            isMobileVariant={isMobileVariant}
            isMobile={isMobile}
            sx={{ ...sx }}
            {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: anchorOriginVertical,
              horizontal: anchorOriginHorizontal,
            }}
            transformOrigin={{
              vertical: transformOriginVertical,
              horizontal: transformOriginHorizontal,
            }}
          >
            {header !== null && (
              <ActionMenuMobileHeaderContainer>
                <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="h3">
                  {header}
                </Typography>
                <Box onClick={() => popupState.close()} sx={{ padding: '4px', cursor: 'pointer' }}>
                  <CloseIcon />
                </Box>
              </ActionMenuMobileHeaderContainer>
            )}
            <Box
              display="flex"
              flexDirection="column"
              gap={isMobileVariant ? '8px' : '0'}
              padding={isMobile ? '16px' : '4px'}
              alignItems="center"
            >
              {menuList?.map((item) => (
                <ActionMenuMobileFromPlusItem
                  isMobileVariant={isMobileVariant}
                  isMobile={isMobile}
                  key={item.label}
                  onClick={() => {
                    popupState.close();
                    item.callback();
                  }}
                >
                  <Box display="flex" alignItems="center" gap="8px">
                    {item.isContainStartIcon && <item.startIcon />}
                    <Typography
                      variant={!isMobileVariant ? 't14r' : 's2'}
                      sx={{ color: theme.palette.case.neutral.n600 }}
                    >
                      {item?.label}
                    </Typography>
                  </Box>
                </ActionMenuMobileFromPlusItem>
              ))}
            </Box>
          </ActionMenuMobileFromPlus>
        </Box>
      )}
    </PopupState>
  );
};

export default GarageCreateActionMenu;
