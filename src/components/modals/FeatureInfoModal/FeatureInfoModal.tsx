import React, { memo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';
import FeatureInfoModalContainer from './components/FeatureInfoModalContainer';
import MuiModal from '../../modalsElements/containers/MuiModal';

const FeatureInfoModal = ({ isOpen, props }: ModalProps) => {
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.featureInfo);
  };

  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);

  return (
    <MuiModal
      minWidth={isSmallDisplay ? '100%' : undefined}
      customMaxWith="640px"
      isHideCloseBtn
      isShow={!!isOpen}
      onClose={onClose}
    >
      {props?.type ? (
        <FeatureInfoModalContainer onClose={onClose} rightBtnProps={props.rightBtnProps} type={props.type} />
      ) : (
        <></>
      )}
    </MuiModal>
  );
};

export default memo(FeatureInfoModal);
