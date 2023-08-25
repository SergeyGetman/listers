import React, { memo } from 'react';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import PaymentContainer from './PaymentContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const PaymentModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    if (props?.isBilling) return;
    modalObserver.removeModal(ModalNamesEnum.payment);
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <PaymentContainer
        onClose={onClose}
        plan={props?.plan}
        isBilling={props?.isBilling}
        expired={props?.expired}
        isEdit={props?.isEdit}
        hub={props?.hub}
      />
    </MuiDrawer>
  );
};

export default memo(PaymentModal);
