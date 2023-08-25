import React, { memo } from 'react';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import InviteModalContainer from './InviteModalContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const InviteModal = ({ isOpen }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.inviteNetworkModal);
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <InviteModalContainer onClose={onClose} />
    </MuiDrawer>
  );
};

export default memo(InviteModal);
