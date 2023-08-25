import React, { FC, useCallback } from 'react';
import { Box, Modal } from '@mui/material';
import NavigationButton from '../../../buttons/NavigationButton';
import { ModalCloseButtonContainer, ModalContainer } from './MuiModal.style';

type MuiDialogProps = {
  isShow: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  customMaxWith?: string;
  minWidth?: string;
  children?: React.ReactNode;
  isHideCloseBtn?: boolean;
  onClose?: () => void;
  isDisabledDefaultClose?: boolean;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
};

const MuiModal: FC<MuiDialogProps> = ({
  onClose,
  isShow,
  maxWidth = 'sm',
  customMaxWith,
  minWidth,
  children,
  isHideCloseBtn = false,
  isFullWidth = false,
  isFullHeight = false,
  isDisabledDefaultClose = true,
}) => {
  const handleClose = useCallback(() => {
    if (isDisabledDefaultClose) {
      return;
    }
    if (onClose) {
      onClose();
    }
  }, [isDisabledDefaultClose, onClose]);
  return (
    <Modal sx={{ zIndex: 1300 }} onClose={handleClose} open={isShow}>
      <ModalContainer
        modalMinWith={minWidth}
        isFullWidth={isFullWidth}
        customMaxWith={customMaxWith}
        modalMaxWith={maxWidth}
        isFullHeight={isFullHeight}
      >
        {isHideCloseBtn ? (
          <></>
        ) : (
          <ModalCloseButtonContainer>
            <NavigationButton size="large" type="close" onClick={onClose} />
          </ModalCloseButtonContainer>
        )}

        <Box sx={{ height: '100%', width: '100%' }}>{children}</Box>
      </ModalContainer>
    </Modal>
  );
};

export default MuiModal;
