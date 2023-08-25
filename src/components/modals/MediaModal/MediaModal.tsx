import React, { memo } from 'react';
import MuiModal from '../../modalsElements/containers/MuiModal';
import MediaModalContent from './MediaModalContent';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const MediaModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.mediaViewer);
  };

  return (
    <MuiModal maxWidth="lg" isShow={!!isOpen} onClose={onClose}>
      <MediaModalContent
        onClose={onClose}
        modalProps={{
          media: props?.media,
          activeMedia: props?.activeMedia,
          permission: props?.permission,
          onDelete: props?.onDelete,
          onUpdate: props?.onUpdate,
          entityType: props?.entityType,
        }}
      />
    </MuiModal>
  );
};

export default memo(MediaModal);
