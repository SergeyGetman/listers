import React, { memo } from 'react';
import { useTheme } from '@mui/material';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import UserProfileModalContainer from './UserProfileModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const UserProfileModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.userProfileModal);
  };

  return (
    <MuiDrawer backgroundColor={theme.palette.case.neutral.n50} isShow={!!isOpen} onClose={onClose}>
      <UserProfileModalContainer userId={props?.id} onClose={onClose} />
    </MuiDrawer>
  );
};

export default memo(UserProfileModal);
