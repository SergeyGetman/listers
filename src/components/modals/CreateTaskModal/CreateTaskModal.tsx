import React, { useCallback, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import CreateTaskModalContainer from './components/CreateTaskModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const CreateTaskModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const theme = useTheme();

  const onClose = useCallback(
    (isSubmitted: boolean = false) => {
      if (isShowUnsavedDataModal && !isSubmitted) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.unsavedData.title'),
            text: t('general.modals.unsavedData.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () => modalObserver.removeModal(ModalNamesEnum.createTaskModal),
          },
        });
      } else {
        modalObserver.removeModal(ModalNamesEnum.createTaskModal);
      }
    },
    [t, isShowUnsavedDataModal],
  );

  return (
    <MuiDrawer backgroundColor={theme.palette.case.neutral.n50} isShow={!!isOpen} onClose={onClose}>
      <CreateTaskModalContainer
        isBacklog={props?.isBacklog}
        createDate={props?.createDate}
        convertItem={props?.item}
        handleDeleteChecklistItem={props?.handleDeleteChecklistItem}
        title={props?.title ? props.title : ''}
        description={
          props?.item?.description
            ? props?.item?.description
            : props?.description
            ? `<p>${props?.description}</p>`
            : null
        }
        isConvertChecklistToTask={props?.isConvertChecklistToTask}
        isConvertChecklistItemToTask={props?.isConvertChecklistItemToTask}
        setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
        onClose={onClose}
      />
    </MuiDrawer>
  );
};

export default memo(CreateTaskModal);
