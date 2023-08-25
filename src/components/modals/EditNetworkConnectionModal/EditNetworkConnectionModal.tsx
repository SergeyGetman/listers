import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import EditNetworkConnectionContainer from './EditNetworkConnectionContainer';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const EditNetworkConnectionModal = ({ isOpen, props }: ModalProps) => {
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
            modalObserver.removeModal(ModalNamesEnum.networkEditConnection);
          },
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.networkEditConnection);
    }
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={() => onClose()}>
      <EditNetworkConnectionContainer
        onClose={onClose}
        userId={props?.data.userId}
        setIsShowUnsavedDataModal={(value: boolean) => setIsShowUnsavedDataModal(value)}
      />
    </MuiDrawer>
  );
};

export default memo(EditNetworkConnectionModal);
