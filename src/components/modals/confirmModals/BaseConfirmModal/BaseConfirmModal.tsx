import React, { useState, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import ModalFooter from '../../../modalsElements/containers/Footer/ModalFooter';
import { BaseConfirmModalContainer } from './BaseConfirmModal.style';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';
import ModalHeader from '../../../headers/ModalHeader';

const BaseConfirmModal = ({ isOpen, props }: ModalProps) => {
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.baseConfirmModal);
  };

  const handleReject = () => {
    Promise.resolve()
      .then(() => (props?.handleCancel ? props?.handleCancel() : true))
      .then(() => onClose());
  };

  const handleAccept = () => {
    setIsShowConfirmLoader(true);
    Promise.resolve()
      .then(() => (props?.handleConfirm ? props?.handleConfirm() : true))
      .then(() => onClose())
      .finally(() => setIsShowConfirmLoader(false))
      // eslint-disable-next-line no-console
      .catch((err) => console.warn(err));
  };

  return (
    <MuiModal maxWidth="sm" customMaxWith="640px" isShow={!!isOpen} isHideCloseBtn onClose={onClose}>
      <BaseConfirmModalContainer>
        <ModalHeader title={props?.title} onClose={onClose} />

        <Box sx={{ width: '100%', padding: '24px' }}>
          {props?.textComponent ? (
            props?.textComponent
          ) : (
            <Typography variant="large" sx={{ whiteSpace: 'pre-line', fontWeight: '400' }}>
              {props?.text}
            </Typography>
          )}
        </Box>
      </BaseConfirmModalContainer>
      {props?.isHideFooter ? (
        <></>
      ) : props?.isOnlyOneBtn ? (
        <ModalFooter
          position="sticky"
          middleBtnProps={{
            isShow: true,
            label: props?.confirmBtnText,
            variant: 'contained',
            size: 'medium',
            onClick: () => handleAccept(),
          }}
        />
      ) : (
        <ModalFooter
          position="sticky"
          isBoxShadow={false}
          middleBtnProps={{
            isShow: true,
            label: props?.cancelBtnText,
            variant: 'outlined',
            size: 'medium',
            onClick: () => handleReject(),
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: isShowConfirmLoader,
            label: props?.confirmBtnText,
            variant: 'contained',
            size: 'medium',
            onClick: () => handleAccept(),
          }}
        />
      )}
    </MuiModal>
  );
};

export default memo(BaseConfirmModal);
