import React, { memo } from 'react';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import UserFullNameModalContainer from './components/UserFullNameModalContainer';
import MuiModal from '../../modalsElements/containers/MuiModal';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const UserFullNameModal = ({ isOpen }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.userFullNameModal);
  };

  return (
    <MuiModal isHideCloseBtn maxWidth="sm" isShow={!!isOpen} onClose={() => true}>
      <UserFullNameModalContainer onClose={onClose} />
    </MuiModal>
  );
};

export default memo(UserFullNameModal);
