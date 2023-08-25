import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm, UseFormSetError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18next from '../../../../../../shared/locales/i18n';
import { BaseConfirmModalContainer } from '../../../BaseConfirmModal/BaseConfirmModal.style';
import MuiBaseTextFiled from '../../../../../formElements/MuiBaseTextFiled';
import ModalFooter from '../../../../../modalsElements/containers/Footer/ModalFooter';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .test({
      name: 'title',
      test: (middle_name, schema) => {
        if (!!middle_name && middle_name.length >= 1 && middle_name.length <= 2) {
          return schema.createError({
            path: schema.path,
            message: i18next.t('validation.general.min', {
              field: i18next.t('general.fieldNames.title'),
              count: 3,
            }),
          });
        }
        return true;
      },
    })
    .max(36, i18next.t('validation.title.max', { count: 36 })),
});
type TodoConfirmModalContainerProps = {
  selectedStatus: string;
  handleConfirm: (
    data: { title: string },
    setError: UseFormSetError<{ title: string }>,
    onClose: () => void,
  ) => void;
  onClose: () => void;
};
const TodoConfirmModalContainer: FC<TodoConfirmModalContainerProps> = ({
  selectedStatus,
  handleConfirm,
  onClose,
}) => {
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const { t } = useTranslation();

  const initialValues = {
    title: selectedStatus,
  };
  const { handleSubmit, control, reset, setError, setFocus } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setFocus('title');
    return () => {
      reset();
    };
  }, [reset, setFocus]);

  const handleAccept = (data: { title: string }) => {
    setIsShowConfirmLoader(true);
    Promise.resolve()
      .then(() => handleConfirm(data, setError, onClose))
      .finally(() => setIsShowConfirmLoader(false));
  };

  const onSubmit = (data: { title: string }) => {
    handleAccept(data);
  };

  return (
    <Box>
      <BaseConfirmModalContainer>
        <Typography variant="h3">{t('general.fieldNames.title')}</Typography>

        <Box sx={{ width: '100%', marginBottom: '16px', mt: '16px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={12} sm={12} md={6} item>
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      isRequired
                      type="text"
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </BaseConfirmModalContainer>
      <ModalFooter
        position="sticky"
        rightBtnProps={{
          isShow: true,
          isLoadingBtn: true,
          loading: isShowConfirmLoader,
          label: t('general.buttons.submit'),
          variant: 'contained',
          onClick: handleSubmit(onSubmit),
        }}
      />
    </Box>
  );
};

export default TodoConfirmModalContainer;
