import React, { memo } from 'react';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import ModalContent from './components/ModalContent/ModalContent';

const WithCreateVariantsModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.withCreateVariantsModal);
  };

  return (
    <MuiDrawer isSmall position="bottom" isShow={!!isOpen} onClose={onClose}>
      <ModalContent itemList={props?.menuList} onClose={onClose} />
    </MuiDrawer>
  );
};

export default memo(WithCreateVariantsModal);
