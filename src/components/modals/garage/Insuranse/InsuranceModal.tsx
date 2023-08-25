/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import InsuranceContainer from './InsuranceContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const InsuranceModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState(false);
  const { t } = useTranslation();

  const onClose = (skipConfirmModal: boolean = false) => {
    if (skipConfirmModal === false && isShowUnsavedDataModal) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('general.modals.unsavedData.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            modalObserver.removeModal(ModalNamesEnum.insuranceModal);
          },
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.insuranceModal);
    }
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={() => onClose()}>
      <InsuranceContainer
        onClose={onClose}
        data={props?.data}
        transportId={props?.transportId}
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
      />
    </MuiDrawer>
  );
};

export default memo(InsuranceModal);
