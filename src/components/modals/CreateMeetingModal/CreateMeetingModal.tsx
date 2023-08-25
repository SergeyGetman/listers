import React, { useCallback, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import CreateMeetingModalContainer from './components/CreateMeetingModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const CreateMeetingModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState<boolean>(false);
  const theme = useTheme();

  const { t } = useTranslation();

  const onClose = useCallback(
    (isSubmitted: boolean = false) => {
      if (isShowUnsavedDataModal && !isSubmitted) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.unsavedData.title'),
            text: t('general.modals.unsavedData.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.createMeetingModal),
          },
        });
      } else {
        modalObserver.removeModal(ModalNamesEnum.createMeetingModal);
      }
    },
    [isShowUnsavedDataModal, t],
  );

  return (
    <MuiDrawer backgroundColor={theme.palette.case.neutral.n50} isShow={!!isOpen} onClose={onClose}>
      <CreateMeetingModalContainer
        createDate={props?.createDate}
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
        onClose={onClose}
      />
    </MuiDrawer>
  );
};

export default memo(CreateMeetingModal);
