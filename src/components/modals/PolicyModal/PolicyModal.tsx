import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiModal from '../../modalsElements/containers/MuiModal';
import { policyConfig } from '../../../shared/configs/policy.config';
import PolicyModalBlock from './components/PolicyModalBlock';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const PolicyModal = ({ isOpen }: ModalProps) => {
  const { t } = useTranslation();

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.policyModal);
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
          <Typography variant="h3">{t('policy.header')}</Typography>

          {policyConfig.map((item, index: number) => (
            <PolicyModalBlock
              title={item.title}
              listTitle={item.listTitle}
              list={item.list}
              link={item.link}
              description={item.description}
              key={index}
            />
          ))}
        </Box>
      </Box>
    </MuiModal>
  );
};

export default memo(PolicyModal);
