import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import TodoFiltersModalContent from './components/TodoFiltersModalContent/TodoFiltersModalContent';

const TodoFiltersModal = ({ isOpen, props }: ModalProps) => {
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
          handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.todoFiltersModal),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.todoFiltersModal);
    }
  };

  return (
    <MuiDrawer isSmall isFullHeight position="bottom" isShow={!!isOpen} onClose={onClose}>
      <TodoFiltersModalContent
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
        filters={props?.filters}
        isNotesPage={props?.isNotesPage}
        onClose={onClose}
      />
    </MuiDrawer>
  );
};

export default memo(TodoFiltersModal);
