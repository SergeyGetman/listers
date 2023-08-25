import React, { memo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import PlanUpgradeContainer from './PlanUpgradeModalContainer/components';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const PlanUpgradeModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.upgradePlan);
  };

  return isMobile ? (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <PlanUpgradeContainer onClose={onClose} plan={props?.plan} />
    </MuiDrawer>
  ) : (
    <MuiModal maxWidth="md" isShow={!!isOpen} onClose={onClose}>
      <PlanUpgradeContainer onClose={onClose} plan={props?.plan} />
    </MuiModal>
  );
};

export default memo(PlanUpgradeModal);
