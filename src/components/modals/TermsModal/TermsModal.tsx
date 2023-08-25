import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiModal from '../../modalsElements/containers/MuiModal';
import { termsConfig } from '../../../shared/configs/terms.config';
import TermsModalBlock from './components/TermsModalBlock';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const TermsModal = ({ isOpen }: ModalProps) => {
  const { t } = useTranslation();

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.termsModal);
  };

  return (
    <MuiModal maxWidth="sm" isShow={!!isOpen} onClose={onClose}>
      <Box sx={{ padding: '30px 10px' }}>
        <Box
          sx={{
            height: '70vh',
            overflow: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '& ::-webkit-scrollbar': {
              width: '0px !important',
            },
          }}
        >
          <Typography variant="h3">{t('terms.header')}</Typography>
          {termsConfig.map((item, index: number) => (
            <TermsModalBlock title={item.title} description={item.description} key={index} />
          ))}
        </Box>
      </Box>
    </MuiModal>
  );
};

export default memo(TermsModal);
