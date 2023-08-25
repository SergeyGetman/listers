import React, { FC, memo, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useTranslation } from 'react-i18next';
import { ItemUserModel } from '../../../shared/models/itemUser.model';
import {
  ListPopover,
  ShowMoreUsersButtonIconWrap,
  UserListPopoverInfo,
  UserListPopoverItemStyle,
} from './UserListPopover.style';
import UserListPopoverItem from './components/UserListPopoverItem';

type UserListPopoverProps = {
  users: ItemUserModel[];
  children?: React.ReactNode;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
  maxUserShow?: number | null;
  onClickShowMore?: () => void;
  isShowAddUserBtn?: boolean;
  onClickShare?: () => void;
};

const UserListPopover: FC<UserListPopoverProps> = ({
  users,
  children,
  anchorOriginHorizontal = 'right',
  anchorOriginVertical = 'bottom',
  transformOriginHorizontal = 'right',
  transformOriginVertical = 'top',
  maxUserShow,
  onClickShowMore,
  isShowAddUserBtn,
  onClickShare,
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'userListPopover',
  });
  const [assignUsers, setAssignUsers] = useState<ItemUserModel[] | null>([]);

  const { t } = useTranslation();
  useEffect(() => {
    if (maxUserShow && maxUserShow > 0 && maxUserShow < users.length) {
      const usersView = [];
      for (let i = 1; i <= maxUserShow; i += 1) {
        usersView.push(users[i]);
      }
      setAssignUsers([...usersView]);
    } else {
      setAssignUsers([...users]);
    }
  }, [maxUserShow, users]);

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Box sx={{ display: 'inline-block' }} {...bindTrigger(popupState)}>
        {children}
      </Box>
      <ListPopover
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
            {isShowAddUserBtn && onClickShare && (
              <UserListPopoverItemStyle
                onClick={() => {
                  onClickShare();
                  popupState.close();
                }}
                isButton
              >
                <ShowMoreUsersButtonIconWrap>
                  <Typography sx={{ fontSize: '16px' }} noWrap variant="extra_small">
                    +
                  </Typography>
                </ShowMoreUsersButtonIconWrap>
                <UserListPopoverInfo>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ lineHeight: '15px' }} noWrap variant="extra_small">
                      {t('general.buttons.share')}
                    </Typography>
                  </Box>
                </UserListPopoverInfo>
              </UserListPopoverItemStyle>
            )}
            {assignUsers?.map((item) => (
              <UserListPopoverItem item={item} key={item.id} />
            ))}
            {maxUserShow && maxUserShow > 0 && maxUserShow < users.length ? (
              <UserListPopoverItemStyle isButton onClick={onClickShowMore}>
                <ShowMoreUsersButtonIconWrap>
                  <Typography sx={{ lineHeight: '17px' }} noWrap variant="extra_small">
                    {`+${users.length - maxUserShow}`}
                  </Typography>
                </ShowMoreUsersButtonIconWrap>
                <UserListPopoverInfo>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ lineHeight: '15px' }} noWrap variant="extra_small">
                      {t('general.buttons.otherMembers')}
                    </Typography>
                  </Box>
                </UserListPopoverInfo>
              </UserListPopoverItemStyle>
            ) : (
              <Box />
            )}
          </Box>
        )}
      </ListPopover>
    </Box>
  );
};

export default memo(UserListPopover);
