import React, { useState, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import i18next from '../../../../shared/locales/i18n';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import { BaseConfirmModalContainer } from '../BaseConfirmModal/BaseConfirmModal.style';
import ModalFooter from '../../../modalsElements/containers/Footer/ModalFooter';
import MuiBaseTextFiled from '../../../formElements/MuiBaseTextFiled';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .required(
      i18next.t('validation.password.required', {
        field: i18next.t('general.fieldNames.password'),
      }),
    )
    .min(8, i18next.t('validation.password.min', { count: 8 }))
    .max(32, i18next.t('validation.password.max', { count: 32 })),
});

const ConfirmModalWithPassword = ({ isOpen, props }: ModalProps) => {
  const { t } = useTranslation();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);

  const initialValues = {
    password: '',
  };

  const { handleSubmit, control, reset, setError } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onClose = () => {
    reset();
    modalObserver.removeModal(ModalNamesEnum.confirmModalWithPassword);
  };
  const handleReject = () => {
    Promise.resolve()
      .then(() => (props?.handleCancel ? props?.handleCancel() : true))
      .then(() => onClose())
      .finally(() => reset());
  };

  const handleAccept = (data: { password: string }) => {
    setIsShowConfirmLoader(true);
    Promise.resolve()
      .then(() => props?.handleConfirm(data, setError, onClose))
      .finally(() => setIsShowConfirmLoader(false));
  };

  const onSubmit = (data: { password: string }) => {
    handleAccept(data);
  };

  return (
    <MuiModal maxWidth="sm" isShow={!!isOpen} onClose={onClose}>
      <BaseConfirmModalContainer sx={{ padding: '24px' }}>
        <Typography variant="h3">{props?.title}</Typography>

        <Box sx={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}>
          <Typography variant="default" sx={{ whiteSpace: 'pre-line' }}>
            {props?.text}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginBottom: '16px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  label={t('general.fieldNames.password')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                  isRequired
                  type="password"
                  {...field}
                />
              )}
            />
          </form>
        </Box>
      </BaseConfirmModalContainer>
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
          onClick: handleSubmit(onSubmit),
        }}
      />
    </MuiModal>
  );
};

export default memo(ConfirmModalWithPassword);
