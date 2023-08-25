import React, { memo } from 'react';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import NetworkFiltersModalContainer from './components/NetworkFiltersModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const NetworkFiltersModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.networkFiltersModal);
  };

  return (
    <MuiDrawer isSmall isShow={!!isOpen} onClose={onClose}>
      <NetworkFiltersModalContainer type={props?.type} onClose={onClose} />
    </MuiDrawer>
  );
};

export default memo(NetworkFiltersModal);
