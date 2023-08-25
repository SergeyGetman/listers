import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import GroupModalContainer from './GroupModalContainer';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const GroupModal = ({ isOpen, props }: ModalProps) => {
  const { t } = useTranslation();

  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState(false);

  const onClose = (isSubmitted: boolean = false) => {
    if (isShowUnsavedDataModal && !isSubmitted) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('general.modals.unsavedData.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.groupChatModal),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.groupChatModal);
    }
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={() => onClose(false)}>
      <GroupModalContainer
        onClose={onClose}
        thread={props?.thread || null}
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
      />
    </MuiDrawer>
  );
};

export default memo(GroupModal);
