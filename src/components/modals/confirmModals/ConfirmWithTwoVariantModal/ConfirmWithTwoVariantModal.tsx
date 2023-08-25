import React, { useState, memo } from 'react';
import { Box, RadioGroup, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import ModalFooter from '../../../modalsElements/containers/Footer/ModalFooter';
import { ConfirmWithTwoVariantModalContainer } from './ConfirmWithTwoVariantModal.style';
import MuiRadioButton from '../../../formElements/MuiRadioButton';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const ConfirmWithTwoVariantModal = ({ isOpen, props }: ModalProps) => {
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>('false');
  const { t } = useTranslation();

  const onClose = () => {
    setRadioValue('false');
    modalObserver.removeModal(ModalNamesEnum.confirmWithTwoVariantModal);
  };

  const handleReject = () => {
    Promise.resolve()
      .then(() => (props?.handleCancel ? props?.handleCancel() : true))
      .then(() => onClose());
  };

  const handleAccept = () => {
    setIsShowConfirmLoader(true);
    Promise.resolve()
      .then(() => props?.handleConfirm(JSON.parse(radioValue)))
      .then(() => onClose())
      .finally(() => setIsShowConfirmLoader(false));
  };

  return (
    <MuiModal maxWidth="sm" isShow={!!isOpen} onClose={onClose}>
      <ConfirmWithTwoVariantModalContainer>
        <Typography variant="h3">{props?.title}</Typography>

        <Box sx={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}>
          <RadioGroup
            sx={{ display: 'flex', width: '100%', flexDirection: 'row' }}
            aria-label="quiz"
            name="quiz"
            value={radioValue}
            onChange={(event: any) => setRadioValue(event.target.value)}
          >
            <Box sx={{ mr: '30px' }}>
              <MuiRadioButton value="false" label={t('general.fieldNames.onlyForYourself')} />
            </Box>
            <MuiRadioButton value="true" label={t('general.fieldNames.forAllUsers')} />
          </RadioGroup>
        </Box>
      </ConfirmWithTwoVariantModalContainer>
      <ModalFooter
        position="sticky"
        middleBtnProps={{
          isShow: true,
          label: props?.cancelBtnText,
          variant: 'outlined',
          onClick: () => handleReject(),
        }}
        rightBtnProps={{
          isShow: true,
          isLoadingBtn: true,
          loading: isShowConfirmLoader,
          label: props?.confirmBtnText,
          variant: 'contained',
          onClick: () => handleAccept(),
        }}
      />
    </MuiModal>
  );
};

export default memo(ConfirmWithTwoVariantModal);
