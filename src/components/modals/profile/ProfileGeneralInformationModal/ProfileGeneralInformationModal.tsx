import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import ProfileGeneralInformationModalContainer from './components/ProfileGeneralInformationModalContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const ProfileGeneralInformationModal = ({ isOpen }: ModalProps) => {
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
          handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.profileGeneralInformation),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.profileGeneralInformation);
    }
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      <ProfileGeneralInformationModalContainer
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
        onClose={onClose}
      />
    </MuiDrawer>
  );
};

export default memo(ProfileGeneralInformationModal);
