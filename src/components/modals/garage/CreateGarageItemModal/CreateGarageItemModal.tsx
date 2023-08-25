import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import CreateGarageItemContainer from './components/CreateGarageItemContainer';
import { CreateGarageItemModalContextProvider } from './context/CreateGarageItemModalContext';
// TODO Need Typography from DS
const CreateGarageItemModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal] = useState<boolean>(true);
  const theme = useTheme();

  const { t } = useTranslation();

  const onClose = (progress: string | number) => {
    if (isShowUnsavedDataModal) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedDataWithProgress.title'),
          textComponent: (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="large"
                sx={{ whiteSpace: 'pre-line', fontWeight: '400', color: theme.palette.case.neutral.n800 }}
              >
                {t('general.modals.unsavedDataWithProgress.text', { progress })}
              </Typography>
              <Typography
                variant="large"
                sx={{
                  whiteSpace: 'pre-line',
                  fontWeight: '400',
                  mt: '24px',
                  color: theme.palette.case.neutral.n800,
                }}
              >
                {t('general.modals.unsavedDataWithProgress.subText')}
              </Typography>
            </Box>
          ),
          cancelBtnText: t('general.buttons.leave'),
          confirmBtnText: t('general.buttons.stay'),
          handleCancel: () => modalObserver.removeModal(ModalNamesEnum.createGarageItem),
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.createGarageItem);
    }
  };

  return (
    <MuiModal isShow={!!isOpen} isHideCloseBtn isFullHeight isFullWidth>
      <CreateGarageItemModalContextProvider>
        <CreateGarageItemContainer onClose={onClose} transportType={props?.type} />
      </CreateGarageItemModalContextProvider>
    </MuiModal>
  );
};

export default memo(CreateGarageItemModal);
