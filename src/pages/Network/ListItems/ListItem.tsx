import React, { FC, memo, useState } from 'react';
import NetworkUserCard from '../../../components/itemCards/NetworkUserCard';
import { NetworkUserStatus } from '../../../shared/enums/networkUserStatus.enum';
import { AddressType, NetworkUserModel } from '../../../shared/models/network';
import { MenuListItem } from '../../../components/itemCards/NetworkUserCard/NetworkUserCard';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { gentPartUserInformation } from '../../../store/network/networkThunk';

type Props = {
  user: NetworkUserModel;
  handleGetActionButton: (user: NetworkUserModel) => void;
  handleGetActionSecondButton: (user: NetworkUserModel) => void;
  handleGenerateActionsMenu: (user: NetworkUserModel) => MenuListItem[];
  handleClickOnCard: (user: NetworkUserModel) => void;
  isDisable: () => boolean;
};

const NetworkListItem: FC<Props> = ({
  user,
  handleGetActionButton,
  handleGetActionSecondButton,
  handleGenerateActionsMenu,
  handleClickOnCard,
  isDisable,
}) => {
  const dispatch = useAppDispatch();
  const [userPartInformation, setPartUserInformation] = useState<{
    email: string;
    phone: string;
    address: AddressType;
  } | null>(null);

  const getUserPartInformation = (isOpen: boolean) => {
    if (isOpen) {
      dispatch(gentPartUserInformation(user.friend_id)).then((result) => {
        if (gentPartUserInformation.fulfilled.match(result)) {
          const newData = {
            email: result.payload.emails[0]?.value,
            phone: result.payload.phones[0]?.value,
            address: result.payload.current_address || result.payload.hometown_address,
          };
          setPartUserInformation(newData);
        }
      });
      return;
    }
    setPartUserInformation(null);
  };

  return (
    <NetworkUserCard
      onToggleOpen={getUserPartInformation}
      key={user.id}
      id={user.friend_id}
      isDisable={isDisable}
      is_company={user.contacts?.is_company}
      company={
        user.contacts?.company
          ? user.contacts?.company
          : user.contacts?.company
          ? user.contacts?.company
          : user.company
      }
      full_name={`${user.first_name} ${!!user.middle_name ? user.middle_name : ''} ${user.last_name}`}
      first_name={user.first_name}
      last_name={user.last_name}
      entity_type={user.entity_type as NetworkUserStatus}
      userRole={user.role}
      avatar={user.avatar?.additional_info?.size_urls?.avatar_profile || user.avatar?.url || ''}
      onClickButton={() => handleGetActionButton(user)}
      onClickSecondButton={() => handleGetActionSecondButton(user)}
      userShortInfo={userPartInformation}
      menuListItems={handleGenerateActionsMenu(user)}
      handleClickOnCard={() => handleClickOnCard(user)}
    />
  );
};

export default memo(NetworkListItem);
