import React, { FC, memo, useMemo } from 'react';
import { Box } from '@mui/material';
import { ReactComponent as ShareIcon } from '../../../assets/Images/share-icon.svg';
import UserListPopover from '../../popovers/UserListPopover';
import { ItemUserModel } from '../../../shared/models/itemUser.model';
import AvatarContainer from '../AvatarContainer';
import { AvatarGroupContainer, ShareContainer } from './MuiAvatarGroup.style';
import SharePopover from '../../popovers/SharePopover';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';

type MuiAvatarGroupProps = {
  users: ItemUserModel[];
  owner: ItemUserModel;
  maxItemView?: number;
  handleConfirmSharePopup?: (users: ItemUserModel[]) => void;
  isContainOwnerInUsers?: boolean;
  isShowUserListPopover?: boolean;
  isShowAddUserBtn?: boolean;
  size?: 'extraSmall' | 'small' | 'medium';
  onClickShare?: () => void;
  isOpenSharePopup?: boolean;
  setIsOpenSharePopup?: (val: boolean) => void;
  isCustomSharePopupState?: boolean;
  disableRemoveYourself?: boolean;
  defaultStatusFroNewUsers?: PlannerItemStatusesEnum;
  isCanChangeStatus?: boolean;
  isShowStatusesForViewer?: boolean;
  isCanOwnerChangeYourPermission?: boolean;
};
// ADD SIZE ENUMS
const MuiAvatarGroup: FC<MuiAvatarGroupProps> = ({
  users,
  owner,
  handleConfirmSharePopup,
  maxItemView = 2,
  isShowUserListPopover = true,
  isContainOwnerInUsers = true,
  isShowAddUserBtn = true,
  size = 'small',
  onClickShare,
  isOpenSharePopup,
  setIsOpenSharePopup,
  isCustomSharePopupState,
  disableRemoveYourself,
  defaultStatusFroNewUsers,
  isCanChangeStatus,
  isShowStatusesForViewer,
  isCanOwnerChangeYourPermission,
}) => {
  const ownerCheckedUsersArr: ItemUserModel[] = useMemo(() => {
    return isContainOwnerInUsers
      ? users.findIndex((item) => item?.id === owner.id) >= 0
        ? users
        : [owner, ...users]
      : users.filter((item: { id: number }) => item?.id !== owner?.id);
  }, [owner, users, isContainOwnerInUsers]);

  const sortDataForUserPopover = useMemo(() => {
    let formattedArr = [];

    if (users.findIndex((item) => item?.id === owner?.id) >= 0) {
      formattedArr = users
        .map((item) => (item?.id === owner?.id ? { ...item, isOwner: true } : item))
        .sort((x, y) => {
          return x.isOwner === true ? -1 : y.isOwner === true ? 1 : 0;
        });
    } else {
      formattedArr = [...users, { ...owner, isOwner: true }].sort((x, y) => {
        return x.isOwner === true ? -1 : y.isOwner === true ? 1 : 0;
      });
    }

    return formattedArr;
  }, [owner, users]);

  return (
    <Box display="flex" alignItems="center" ml="8px">
      {isShowUserListPopover ? (
        <UserListPopover onClickShare={onClickShare} isShowAddUserBtn={false} users={sortDataForUserPopover}>
          <AvatarGroupContainer size={size} max={maxItemView}>
            {ownerCheckedUsersArr.map((item) => (
              <AvatarContainer
                key={item.id}
                firstName={item.first_name}
                customStyle={{ '& .BaseBadge-badge': { right: '6px' } }}
                src={
                  item?.avatar
                    ? item?.avatar?.additional_info?.size_urls?.avatar_icon || item?.avatar?.url
                    : ''
                }
                id={item.id}
                isOwner={owner.id === item.id}
                size={size}
                lastName={item.last_name}
              />
            ))}
          </AvatarGroupContainer>
        </UserListPopover>
      ) : (
        <AvatarGroupContainer size={size} max={maxItemView}>
          {ownerCheckedUsersArr.map((item) => (
            <AvatarContainer
              key={item.id}
              firstName={item.first_name}
              customStyle={{ '& .BaseBadge-badge': { right: '6px' } }}
              src={
                item?.avatar ? item?.avatar?.additional_info?.size_urls?.avatar_icon || item?.avatar?.url : ''
              }
              id={item.id}
              isOwner={owner.id === item.id}
              size={size}
              lastName={item.last_name}
            />
          ))}
        </AvatarGroupContainer>
      )}

      {isShowAddUserBtn && (
        <SharePopover
          isOpen={isOpenSharePopup}
          setIsOpen={setIsOpenSharePopup}
          isCustomPopupState={isCustomSharePopupState}
          users={users}
          handleConfirm={handleConfirmSharePopup}
          owner={owner}
          disableRemoveYourself={disableRemoveYourself}
          defaultStatusFroNewUsers={defaultStatusFroNewUsers}
          isCanChangeStatus={isCanChangeStatus}
          isShowStatusesForViewer={isShowStatusesForViewer}
          isCanOwnerChangeYourPermission={isCanOwnerChangeYourPermission}
        >
          <ShareContainer size={size} onClick={onClickShare}>
            <ShareIcon />
          </ShareContainer>
        </SharePopover>
      )}
    </Box>
  );
};

export default memo(MuiAvatarGroup);
