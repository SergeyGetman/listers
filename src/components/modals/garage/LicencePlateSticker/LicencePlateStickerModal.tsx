import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import LicencePlateStickerContainer from './LicencePlateStickerContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const LicencePlateStickerModal = ({ isOpen, props }: ModalProps) => {
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
            modalObserver.removeModal(ModalNamesEnum.garageLicense);
          },
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.garageLicense);
    }
  };
  return (
    <MuiDrawer isShow={!!isOpen} onClose={() => onClose()}>
      <LicencePlateStickerContainer
        onClose={onClose}
        data={props?.data}
        transportId={props?.transportId}
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
      />
    </MuiDrawer>
  );
};

export default memo(LicencePlateStickerModal);
