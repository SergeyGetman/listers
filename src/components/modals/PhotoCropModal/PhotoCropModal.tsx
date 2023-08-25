import { memo } from 'react';
import MuiModal from '../../modalsElements/containers/MuiModal';
import PhotoCrop from './PhotoCrop';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const PhotoCropModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.photoCrop);
  };

  return (
    <MuiModal maxWidth="lg" isShow={!!isOpen} onClose={onClose}>
      <PhotoCrop
        title={props?.cropTitle}
        img={props?.img}
        entityType={props?.entityType}
        entityId={props?.entityId}
        handleSavePhoto={props?.handleSavePhoto}
        loadingMediaId={props?.loadingMediaId}
        isCropForBackground={props?.isCropForBackground}
        onClose={onClose}
      />
    </MuiModal>
  );
};

export default memo(PhotoCropModal);
