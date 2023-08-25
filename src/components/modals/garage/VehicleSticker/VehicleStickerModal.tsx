import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import VehicleStickerContainer from './VehicleStickerContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const VehicleStickerModal = ({ isOpen, props }: ModalProps) => {
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
            modalObserver.removeModal(ModalNamesEnum.vehicleStickerModal);
          },
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.vehicleStickerModal);
    }
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <VehicleStickerContainer
        onClose={onClose}
        transportId={props?.transportId}
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
        data={props?.data}
      />
    </MuiDrawer>
  );
};

export default memo(VehicleStickerModal);
