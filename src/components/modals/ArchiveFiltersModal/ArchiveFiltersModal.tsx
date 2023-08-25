import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import ArchiveFiltersModalContainer from './components/ArchiveFiltersModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const ArchiveFiltersModal = ({ isOpen }: ModalProps) => {
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
          handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.archiveFiltersModal),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.archiveFiltersModal);
    }
  };

  return (
    <MuiDrawer isSmall isShow={!!isOpen} onClose={onClose}>
      <ArchiveFiltersModalContainer onClose={onClose} setIsShowUnsavedDataModal={setIsShowUnsavedDataModal} />
    </MuiDrawer>
  );
};

export default memo(ArchiveFiltersModal);
