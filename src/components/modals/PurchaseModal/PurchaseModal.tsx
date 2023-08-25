import React, { memo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiModal from '../../modalsElements/containers/MuiModal';
import PurchaseModalContainer from './components/PurchaseModalContainer';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const PurchaseModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.purchaseModal);
  };

  return isMobile ? (
    <MuiDrawer isDisabledDefaultClose isShow={!!isOpen} onClose={onClose}>
      <PurchaseModalContainer isPremium={props?.isPlatinum} onClose={onClose} />
    </MuiDrawer>
  ) : (
    <MuiModal
      isFullWidth={isTablet}
      isDisabledDefaultClose
      isHideCloseBtn
      maxWidth="md"
      isShow={!!isOpen}
      onClose={onClose}
    >
      <PurchaseModalContainer isPremium={props?.isPlatinum} onClose={onClose} />
    </MuiModal>
  );
};

export default memo(PurchaseModal);
