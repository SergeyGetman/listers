import React, { memo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import MuiModal from '../../modalsElements/containers/MuiModal';
import ShareModalContainer from './componants/ShareModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const ShareModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.shareModal);
  };

  return isMobile ? (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <ShareModalContainer
        owner={props?.owner}
        users={props?.users}
        onClose={onClose}
        handleConfirm={props?.handleConfirm}
        title={props?.title}
        disableRemoveYourself={props?.disableRemoveYourself}
      />
    </MuiDrawer>
  ) : (
    <MuiModal maxWidth="sm" customMaxWith="640px" isShow={!!isOpen} isHideCloseBtn onClose={onClose}>
      <ShareModalContainer
        owner={props?.owner}
        users={props?.users}
        onClose={onClose}
        handleConfirm={props?.handleConfirm}
        title={props?.title}
        disableRemoveYourself={props?.disableRemoveYourself}
      />
    </MuiModal>
  );
};

export default memo(ShareModal);
