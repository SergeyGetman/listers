import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import EventsFiltersModalContainer from './components/EventsFiltersModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const EventsFiltersModal = ({ isOpen }: ModalProps) => {
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
          handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.eventsFiltersModal),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.eventsFiltersModal);
    }
  };

  return (
    <MuiDrawer isSmall isShow={!!isOpen} onClose={onClose}>
      <EventsFiltersModalContainer setIsShowUnsavedDataModal={setIsShowUnsavedDataModal} onClose={onClose} />
    </MuiDrawer>
  );
};

export default memo(EventsFiltersModal);
