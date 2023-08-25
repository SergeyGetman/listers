import React, { memo } from 'react';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import TransportSharingContainer from './TransportSharingContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const TransportSharingModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.transportSharing);
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={() => onClose()}>
      <TransportSharingContainer transportId={props?.transportId} onClose={onClose} data={props?.data} />
    </MuiDrawer>
  );
};

export default memo(TransportSharingModal);
