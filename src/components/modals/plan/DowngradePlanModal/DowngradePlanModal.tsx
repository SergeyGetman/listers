import React, { memo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import DowngradePlanContainer from './DowngradePlanContainer';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const DowngradePlanModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.downgradePlan);
  };

  return isMobile ? (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <DowngradePlanContainer downgradePlan={props?.downgradePlan} onClose={onClose} />
    </MuiDrawer>
  ) : (
    <MuiModal maxWidth="md" isShow={!!isOpen} onClose={onClose}>
      <DowngradePlanContainer downgradePlan={props?.downgradePlan} onClose={onClose} />
    </MuiModal>
  );
};

export default memo(DowngradePlanModal);
