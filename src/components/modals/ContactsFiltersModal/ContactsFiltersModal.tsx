import React, { memo } from 'react';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import ContactsFiltersModalContainer from './components/NetworkFiltersModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const ContactsFiltersModal = ({ isOpen }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.contactsFiltersModal);
  };

  return (
    <MuiDrawer isSmall isShow={!!isOpen} onClose={onClose}>
      <ContactsFiltersModalContainer onClose={onClose} />
    </MuiDrawer>
  );
};

export default memo(ContactsFiltersModal);
