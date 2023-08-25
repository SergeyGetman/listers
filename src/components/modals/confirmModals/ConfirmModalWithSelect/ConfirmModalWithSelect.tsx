import React, { useState, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import i18next from '../../../../shared/locales/i18n';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import { BaseConfirmModalContainer } from '../BaseConfirmModal/BaseConfirmModal.style';
import ModalFooter from '../../../modalsElements/containers/Footer/ModalFooter';
import MuiSelect, { OptionType } from '../../../formElements/MuiSelect/MuiSelect';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

type FormType = {
  select: null | OptionType;
};

const validationSchema = Yup.object().shape({
  select: Yup.mixed().required(
    i18next.t('validation.general.required', {
      field: i18next.t('general.fieldNames.emailOrPhoneNumber'),
    }),
  ),
});

const ConfirmModalWithSelect = ({ isOpen, props }: ModalProps) => {
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);

  const initialValues = {
    select: null,
  };

  const { handleSubmit, control, reset } = useForm<FormType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onClose = () => {
    reset();
    modalObserver.removeModal(ModalNamesEnum.confirmModalWithSelect);
  };
  const handleReject = () => {
    Promise.resolve()
      .then(() => (props?.handleCancel ? props?.handleCancel() : true))
      .then(() => onClose())
      .finally(() => reset());
  };

  const onSubmit = (data: FormType) => {
    setIsShowConfirmLoader(true);
    Promise.resolve()
      .then(() => props?.handleConfirm(data.select?.value))
      .then(() => onClose())
      .finally(() => {
        reset();
        setIsShowConfirmLoader(false);
      });
  };

  return (
    <MuiModal maxWidth="sm" isShow={!!isOpen} onClose={onClose}>
      <BaseConfirmModalContainer>
        <Typography variant="h3">{props?.title}</Typography>

        <Box sx={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}>
          <Typography variant="default" sx={{ whiteSpace: 'pre-line' }}>
            {props?.text}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginBottom: '16px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="select"
              control={control}
              render={({ field, fieldState }) => (
                <MuiSelect
                  {...field}
                  {...props?.select}
                  isClearable
                  options={props?.options}
                  isError={!!fieldState?.error?.message}
                  helpText={fieldState?.error?.message}
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

export default memo(ConfirmModalWithSelect);
