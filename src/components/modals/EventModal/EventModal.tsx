import { useMediaQuery, useTheme } from '@mui/material';
import { memo } from 'react';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import MuiModal from '../../modalsElements/containers/MuiModal';

import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import EventModalContainer from './EventModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const EventModal = ({ isOpen }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.promocodeEvent);
  };

  return isMobile ? (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <EventModalContainer onClose={onClose} />
    </MuiDrawer>
  ) : (
    <MuiModal maxWidth="md" isShow={!!isOpen} onClose={onClose}>
      <EventModalContainer onClose={onClose} />
    </MuiModal>
  );
};

export default memo(EventModal);
