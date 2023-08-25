import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import BodyArtsModalContainer from './components/BodyArtsModalContainer/BodyArtsModalContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const BodyArtsModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const onClose = (isSubmitted: boolean = false) => {
    if (isShowUnsavedDataModal && !isSubmitted) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('general.modals.unsavedData.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.bodyArts),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.bodyArts);
    }
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <BodyArtsModalContainer
        bodyArtId={props?.bodyArtId}
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
        onClose={onClose}
      />
    </MuiDrawer>
  );
};

export default memo(BodyArtsModal);
