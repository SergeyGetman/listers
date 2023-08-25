import React, { memo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import PlanAddCardContainer from './PlanAddCardContainer';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const PlanAddCardModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.addPlanCard);
  };

  return isMobile ? (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY as string, { locale: 'en' })}>
        <PlanAddCardContainer onClose={onClose} plan={props?.plan} isEditCard={props?.isEditCard} />
      </Elements>
    </MuiDrawer>
  ) : (
    <MuiModal maxWidth="md" isShow={!!isOpen} onClose={onClose}>
      <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY as string, { locale: 'en' })}>
        <PlanAddCardContainer onClose={onClose} plan={props?.plan} isEditCard={props?.isEditCard} />
      </Elements>
    </MuiModal>
  );
};

export default memo(PlanAddCardModal);
