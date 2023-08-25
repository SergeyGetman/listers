import React, { memo, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';
import MuiModalDowngrade from '../../../modalsElements/containers/MuiModalDowngrade/MuiModalDowngrade';
import DowngradeContainer from './components/DowngradeContainer/DowngradeContainer';

const DowngradePlanModalNew = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [header, setNewHeader] = useState<JSX.Element | string>('');

  const onClose = () => modalObserver.removeModal(ModalNamesEnum.downgradePlanNew);
  const setNewHeaderName = (newName: string | JSX.Element) => setNewHeader(newName);

  return (
    <MuiModalDowngrade
      isShow={!!isOpen}
      onClose={onClose}
      headerName={header}
      customMaxWith="640px"
      isFullHeight={isMobile}
      isFullWidth={isMobile}
    >
      <DowngradeContainer
        downgradePlan={props?.downgradePlan}
        onClose={onClose}
        isMobile={isMobile}
        setNewHeader={setNewHeaderName}
      />
    </MuiModalDowngrade>
  );
};

export default memo(DowngradePlanModalNew);
