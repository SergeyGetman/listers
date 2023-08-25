import React, { memo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import DesktopModalContent from './components/DesktopModalContent/DesktopModalContent';
import MobileModalContent from './components/MobileModalContent/MobileModalContent';

const ChecklistTemplatesModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.checklistTemplatesModal);
  };

  return isMobileDisplay ? (
    <MuiDrawer isSmall position="bottom" isShow={!!isOpen} onClose={onClose}>
      <MobileModalContent func={props?.callback} onClose={onClose} />
    </MuiDrawer>
  ) : (
    <MuiModal maxWidth="sm" customMaxWith="640px" isShow={!!isOpen} isHideCloseBtn onClose={onClose}>
      <DesktopModalContent func={props?.callback} onClose={onClose} />
    </MuiModal>
  );
};

export default memo(ChecklistTemplatesModal);
