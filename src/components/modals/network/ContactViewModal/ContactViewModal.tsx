import { memo } from 'react';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import ContactViewContainer from './ContactViewContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const ContactViewModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.contactViewModal);
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <ContactViewContainer menuListItems={props?.menuListItems} userId={props?.id} onClose={onClose} />
    </MuiDrawer>
  );
};
export default memo(ContactViewModal);
