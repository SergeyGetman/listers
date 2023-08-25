import React, { useState, memo } from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import MuiModal from '../../../modalsElements/containers/MuiModal';
import ModalFooter from '../../../modalsElements/containers/Footer/ModalFooter';
import { ConfirmDeclineModalContainer } from './ConfirmDeclineModal.style';
import MuiBaseTextFiled from '../../../formElements/MuiBaseTextFiled';
import { createCommentsItem } from '../../../../store/comments/commentThunk';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const validationSchema = Yup.object().shape({
  message: Yup.string(),
});

type DeclineConfirmType = {
  message: string;
};

const ConfirmDeclineModal = ({ isOpen, props }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.confirmDeclineModal);
  };

  const initialValues = {
    message: '',
  };

  const { handleSubmit, control, reset } = useForm<DeclineConfirmType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const handleReject = () => {
    Promise.resolve()
      .then(() => onClose())
      .then(() => props?.handleConfirm())
      .finally(() => {
        reset();
        setIsShowConfirmLoader(false);
      });
  };

  const onSubmit = (data: DeclineConfirmType) => {
    Promise.resolve()
      .then(() => {
        if (data.message.length > 0) {
          dispatch(
            createCommentsItem({
              body: data.message,
              documents: [],
              entity_type: 'planner_item',
              entity_id: props?.entityId,
            }),
          );
        }
        return '';
      })
      .then(() => onClose())
      .then(() => props?.handleConfirm())
      .finally(() => {
        reset();
        setIsShowConfirmLoader(false);
      });
  };

  return (
    <MuiModal maxWidth="sm" isShow={!!isOpen} onClose={handleReject}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ConfirmDeclineModalContainer>
          <Typography sx={{ lineHeight: '45px' }} variant="h3">
            {props?.title}
          </Typography>

          <Box sx={{ width: '100%', mt: '4px' }}>
            <Typography sx={{ fontWeight: '400' }} variant="large">
              {props?.description1}
            </Typography>

            <Box sx={{ mb: '16px' }}>
              <Typography sx={{ fontWeight: '400' }} variant="large">
                {props?.description2}
              </Typography>
            </Box>

            <Controller
              name="message"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  {...field}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                  isToUpperCase={false}
                  placeholder={t('general.placeholders.writeSomething')}
                  size="medium"
                  multiline
                  rows={3}
                />
              )}
            />
          </Box>
        </ConfirmDeclineModalContainer>
        {props?.isHideFooter ? (
          <></>
        ) : (
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
              type: 'submit',
            }}
          />
        )}
      </form>
    </MuiModal>
  );
};

export default memo(ConfirmDeclineModal);
