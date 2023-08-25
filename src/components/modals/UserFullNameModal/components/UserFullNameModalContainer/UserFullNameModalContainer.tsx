import React, { FC, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { updateProfileFullName } from '../../../../../store/Profile/profile.actions';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { BaseConfirmModalContainer } from '../../../confirmModals/BaseConfirmModal/BaseConfirmModal.style';
import { UserFullNameModalSchema } from './schema';

type UserFullNameModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
};

export type UserFullNameModalPayload = {
  first_name: string;
  last_name: string;
};

const UserFullNameModalContainer: FC<UserFullNameModalContainerProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const { t } = useTranslation();
  const initialValues = {
    first_name: '',
    last_name: '',
  };

  const { handleSubmit, control, setError, formState, reset } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(UserFullNameModalSchema),
  });

  const onSubmit = (data: UserFullNameModalPayload) => {
    setIsShowConfirmLoader(true);
    dispatch(updateProfileFullName(data))
      .then((result) => {
        if (updateProfileFullName.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.success'));
          reset();
          onClose();
        } else {
          errorsHandler(result, setError);
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });
  };

  return (
    <>
      <BaseConfirmModalContainer sx={{ padding: '24px' }}>
        <Typography sx={{ textAlign: 'center' }} variant="h2">
          {t('general.modals.userFullNameModal.title')}
        </Typography>
        <Box sx={{ marginTop: '16px', marginBottom: '16px', textAlign: 'center' }}>
          <Typography variant="large_bolt" sx={{ whiteSpace: 'pre-line' }}>
            {t('general.modals.userFullNameModal.text')}
          </Typography>
        </Box>

        <Box sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={12} item>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('general.fieldNames.firstName')}
                      isError={!!fieldState?.error?.message}
                      placeholder={t('general.placeholders.enter_your_first_name')}
                      errorMessage={fieldState?.error?.message}
                      isRequired
                      type="text"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} item>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('general.fieldNames.lastName')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      isRequired
                      placeholder={t('general.placeholders.enter_your_last_name')}
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
        isShowSecurityInfo={false}
        position="sticky"
        rightBtnProps={{
          isShow: true,
          isLoadingBtn: true,
          loading: isShowConfirmLoader,
          isDisabled: !formState.isDirty,
          label: t('general.buttons.save'),
          variant: 'contained',
          onClick: handleSubmit(onSubmit),
        }}
      />
    </>
  );
};

export default UserFullNameModalContainer;
