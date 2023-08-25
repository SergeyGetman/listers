import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';
import MuiDrawer from '../../../../components/modalsElements/containers/MuiDrawer';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { GarageFiltersContent } from './components/GarageFiltersContent/GarageFiltersContent';

const GarageFiltersModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState<boolean>(false);
  const { t } = useTranslation();

  const onClose = (isSubmitted?: boolean) => {
    if (isShowUnsavedDataModal && !isSubmitted) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('general.modals.unsavedData.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.garageFiltersModal),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.garageFiltersModal);
    }
  };

  return (
    <MuiDrawer isSmall isFullHeight position="bottom" isShow={!!isOpen} onClose={onClose}>
      <GarageFiltersContent
        onClose={onClose}
        filters={props?.filters}
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
      />
    </MuiDrawer>
  );
};

export default memo(GarageFiltersModal);
