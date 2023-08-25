import { memo } from 'react';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import TodoConfirmModalContainer from './components/TodoConfirmModalContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const TodoConfirmModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.todoConfirmModal);
  };

  return (
    <MuiModal maxWidth="sm" isShow={!!isOpen} onClose={onClose}>
      <TodoConfirmModalContainer
        handleConfirm={props?.handleConfirm}
        onClose={onClose}
        selectedStatus={props?.selectedStatus}
      />
    </MuiModal>
  );
};

export default memo(TodoConfirmModal);
