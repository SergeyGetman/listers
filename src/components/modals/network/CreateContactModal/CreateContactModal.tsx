import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import CreateContactModalContainer from './CreateContactModalContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const CreateContactModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState(false);
  const { t } = useTranslation();

  const onClose = (skipConfirmModal: boolean = false) => {
    if (skipConfirmModal === false && isShowUnsavedDataModal) {
      modalObserver.addModal(ModalNamesEnum.alertModal, {
        props: {
          modalContent: {
            variantIcon: 'warning',
            header: i18next.t('general.modals.unsavedDataAlert.title'),
            title: i18next.t('general.modals.unsavedDataAlert.text'),
            subtitle: i18next.t('general.modals.unsavedDataAlert.subText'),
            isShowFooter: true,
          },
          leftBtnProps: {
            isShow: true,
            label: t('general.buttons.backToEdit'),
          },
          rightBtnProps: {
            isShow: true,
            label: t('general.buttons.leave'),
            onClick: () => {
              modalObserver.removeModal(ModalNamesEnum.createContactModal);
              modalObserver.removeModal(ModalNamesEnum.alertModal);
            },
          },
          middleBtnProps: { isShow: false },
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.createContactModal);
    }
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={() => onClose()}>
      <CreateContactModalContainer
        onClose={onClose}
        id={props?.id}
        handleViewContactInfo={props?.handleViewContactInfo}
        setIsShowUnsavedDataModal={(value: boolean) => setIsShowUnsavedDataModal(value)}
      />
    </MuiDrawer>
  );
};

export default memo(CreateContactModal);
