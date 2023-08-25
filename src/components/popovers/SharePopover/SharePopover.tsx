/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useEffect, useRef } from 'react';
import { bindPopover, bindTrigger, PopupState, usePopupState } from 'material-ui-popup-state/hooks';
import { Box } from '@mui/material';
import SharePopupContent from './components/SharePopupContent';
import { ItemUserModel } from '../../../shared/models/itemUser.model';
import { SharePopoverStyle } from './SharePopover.style';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
type SharePopoverProps = {
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
  children?: React.ReactNode;
  isOpen?: boolean;
  handleConfirm?: (users: ItemUserModel[]) => void;
  setIsOpen?: (val: boolean) => void;
  isCustomPopupState?: boolean;
  users: ItemUserModel[];
  owner: ItemUserModel;
  disableRemoveYourself?: boolean;
  defaultStatusFroNewUsers?: PlannerItemStatusesEnum;
  isCanChangeStatus?: boolean;
  isShowStatusesForViewer?: boolean;
  isCanOwnerChangeYourPermission?: boolean;
};
const SharePopover: FC<SharePopoverProps> = ({
  anchorOriginHorizontal = 'center',
  anchorOriginVertical = 'bottom',
  transformOriginHorizontal = 'center',
  transformOriginVertical = 'top',
  handleConfirm,
  children,
  setIsOpen,
  isOpen,
  isCustomPopupState,
  users,
  owner,
  disableRemoveYourself,
  defaultStatusFroNewUsers,
  isCanChangeStatus,
  isShowStatusesForViewer,
  isCanOwnerChangeYourPermission,
}) => {
  const anchorRef = useRef<HTMLElement | null>(null);

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demo-popup-menu',
  });

  useEffect(() => {
    if (isCustomPopupState && anchorRef.current) {
      popupState.setAnchorEl(anchorRef.current);
    }
  }, [isCustomPopupState]);

  const handleClickAwayPopup = (close: { (): void; (): void }, event?: React.MouseEvent) => {
    close();
    if (setIsOpen && isCustomPopupState) {
      setIsOpen(false);
    }
    if (event) {
      event.stopPropagation();
    }
  };

  const handleOpenPopup = (open: { (e: React.MouseEvent): void; (): void }, event: React.MouseEvent) => {
    if (setIsOpen && isCustomPopupState) {
      setIsOpen(true);
    }
    open(event);
  };

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Box
        sx={{ display: 'inline-block', cursor: 'pointer' }}
        ref={anchorRef}
        {...bindTrigger({
          ...popupState,
          open: (e: React.MouseEvent) => handleOpenPopup(popupState.open, e),
        } as PopupState)}
      >
        {children}
      </Box>
      <SharePopoverStyle
        {...bindPopover({
          ...popupState,
          close: (e: React.MouseEvent) => handleClickAwayPopup(popupState.close, e),
          isOpen: isCustomPopupState ? isOpen : popupState.isOpen,
        } as PopupState)}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
      >
        {(isCustomPopupState ? isOpen : popupState.isOpen) && (
          <SharePopupContent
            onClose={() => handleClickAwayPopup(popupState.close)}
            users={users}
            defaultStatusFroNewUsers={defaultStatusFroNewUsers}
            handleConfirm={handleConfirm}
            owner={owner}
            isCanChangeStatus={isCanChangeStatus}
            isCanOwnerChangeYourPermission={isCanOwnerChangeYourPermission}
            isShowStatusesForViewer={isShowStatusesForViewer}
            disableRemoveYourself={disableRemoveYourself}
          />
        )}
      </SharePopoverStyle>
    </Box>
  );
};

export default SharePopover;
