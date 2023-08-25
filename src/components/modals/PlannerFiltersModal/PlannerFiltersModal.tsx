import React, { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import PlannerFiltersModalContainer from './components/PlannerFiltersModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const PlannerFiltersModal = ({ isOpen }: ModalProps) => {
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
          handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.plannerFiltersModal),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.plannerFiltersModal);
    }
  };

  return (
    <MuiDrawer isSmall isShow={!!isOpen} onClose={() => onClose()}>
      <PlannerFiltersModalContainer setIsShowUnsavedDataModal={setIsShowUnsavedDataModal} onClose={onClose} />
    </MuiDrawer>
  );
};

export default memo(PlannerFiltersModal);
