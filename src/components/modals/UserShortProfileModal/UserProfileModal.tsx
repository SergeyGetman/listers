import React, { memo } from 'react';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import UserProfileContainer from './UserProfileContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const UserShortProfileModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.userShortProfileModal);
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <UserProfileContainer
        userData={props?.userData}
        actionMenu={props?.actionMenu}
        userId={props?.userId}
        onClose={onClose}
      />
    </MuiDrawer>
  );
};

export default memo(UserShortProfileModal);
