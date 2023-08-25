import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import NetworkSharingModalContainer from './NetworkSharingModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const NetworkSharingModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState(false);
  const { t } = useTranslation();

  const onClose = (isSubmitted: boolean = false) => {
    if (isShowUnsavedDataModal && !isSubmitted) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('general.modals.unsavedData.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.networkSharingModal),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.networkSharingModal);
    }
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={() => onClose()}>
      <NetworkSharingModalContainer
        onClose={onClose}
        user={props?.data}
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
      />
    </MuiDrawer>
  );
};

export default memo(NetworkSharingModal);
