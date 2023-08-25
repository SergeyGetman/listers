import React from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiModal from '../../modalsElements/containers/MuiModal';
import AttachFilesModalContainer from './components/AttachFilesModalContainer';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';

const AttachFilesModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.attachFiles);
  };
  return isMobile ? (
    <MuiDrawer isFullHeight isShow={!!isOpen} onClose={onClose}>
      <AttachFilesModalContainer
        onClose={onClose}
        documents={props?.documents}
        handleConfirm={props?.handleConfirm}
        title={props?.title}
        maxAttachmentsLength={props?.maxAttachmentsLength}
        isCanAddMedia={props?.isCanAddMedia}
      />
    </MuiDrawer>
  ) : (
    <MuiModal maxWidth="sm" customMaxWith="640px" isShow={!!isOpen} isHideCloseBtn onClose={onClose}>
      <AttachFilesModalContainer
        onClose={onClose}
        documents={props?.documents}
        handleConfirm={props?.handleConfirm}
        title={props?.title}
        maxAttachmentsLength={props?.maxAttachmentsLength}
        isCanAddMedia={props?.isCanAddMedia}
      />
    </MuiModal>
  );
};

export default AttachFilesModal;
