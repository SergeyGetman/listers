import React, { FC, useCallback, useMemo, useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import MuiBaseAccordion from '../../../../../../components/accordions/MuiBaseAccordion';
import MuiBaseMobileAccordion from '../../../../../../components/accordions/MuiBaseMobileAccordion';
import { UnverifiedLoginResendLink, UnverifiedLoginContainer } from './UnverifiedLoginBlock.style';
import i18next from '../../../../../../shared/locales/i18n';
import { activateLogin, resendVerificationCode } from '../../../../../../store/Profile/profile.actions';
import { NotificationService } from '../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import MuiLoadingButton from '../../../../../../components/buttons/MuiLoadingButton';
import useTimer from '../../../../../../shared/hooks/useTimer';
import { VerificationLoginFormModel } from '../../../../../../shared/models/verificationLoginFormModel';
import VerificationField from '../../../../../../components/formElements/VereficationField/VerificationField';

const validationSchema = Yup.object().shape({
  token: Yup.string()
    .trim()
    .required(
      i18next.t('validation.verificationCode.required', {
        field: i18next.t('general.fieldNames.code'),
      }),
    )
    .min(6, i18next.t('validation.verificationCode.min', { count: 6 }))
    .max(6, i18next.t('validation.verificationCode.max', { count: 6 })),
});

type UnverifiedLoginBlockProps = {
  isSmallDisplay: boolean;
  login: string;
  isPhone?: boolean;
};

const UnverifiedLoginBlock: FC<UnverifiedLoginBlockProps> = ({ isSmallDisplay, login, isPhone = false }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const { start, getTime } = useTimer();

  useEffect(() => {
    start({
      startInMs: new Date().getTime(),
      endInMs: new Date().getTime() + 120000,
    });
  }, [start]);

  const initialValues = {
    token: '',
    login: login,
  };

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    reset({ login: login });
  }, [login, reset]);

  const onSubmit = (data: VerificationLoginFormModel) => {
    setIsShowConfirmLoader(true);

    dispatch(activateLogin({ ...data, isPhone: isPhone }))
      .then((result) => {
        if (activateLogin.fulfilled.match(result)) {
          if (isPhone) {
            NotificationService.success(t('general.notifications.verifyPhone'));
          } else {
            NotificationService.success(t('general.notifications.verifyEmail'));
          }
          reset();
        } else {
          if (result?.payload?.message === 'Time expired activate') {
            start({
              startInMs: 0,
              endInMs: 0,
            });
          }

          if (result.payload?.status === 403) {
            setError('token', { type: 'manual', message: result.payload?.message });
          }
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });
  };

  const handleResendVerificationCode = useCallback(() => {
    dispatch(resendVerificationCode({ login })).then((result) => {
      if (resendVerificationCode.fulfilled.match(result)) {
        NotificationService.success(t('general.notifications.resendVerificationCode'));
        start({
          startInMs: new Date().getTime(),
          endInMs: new Date().getTime() + 120000,
        });
      }
    });
  }, [start, dispatch, login, t]);

  const getUnverifiedPhoneNumberContent = useMemo(() => {
    return (
      <UnverifiedLoginContainer>
        <Typography
          sx={{ display: 'flex', justifyContent: 'start', width: '100%' }}
          align="left"
          variant="default"
        >
          <WarningRoundedIcon
            sx={{ color: theme.palette.case.main.yellow.high, paddingBottom: '3px', marginRight: '2px' }}
          />
          {t('generalSettings.unverifiedPhoneNumber.contentText', { phone: login })}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              marginTop: '16px',
              justifyContent: 'center',
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: '248px' }}>
              <Controller
                name="token"
                control={control}
                render={({ field, fieldState }) => (
                  <VerificationField
                    {...field}
                    validChars="0-9"
                    autoFocus
                    placeholder=""
                    inputProps={{ inputMode: 'numeric', autoComplete: 'one-time-code' }}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                  />
                )}
              />
            </Box>

            <Box sx={{ mt: '8px', width: '165чpx' }}>
              <UnverifiedLoginResendLink
                noWrap
                variant="default"
                onClick={() => handleResendVerificationCode()}
                isDisabled={getTime() !== 0}
              >
                {`${t('general.buttons.resendCode')}`}
              </UnverifiedLoginResendLink>

              {getTime() !== 0 && <Typography variant="default">&nbsp;({getTime()} sec)</Typography>}
            </Box>
          </Box>
          <Box sx={{ marginTop: '16px' }}>
            <MuiLoadingButton
              type="submit"
              isStopPropagation={false}
              loading={isShowConfirmLoader}
              isDisabled={!isValid}
              label={t('general.buttons.confirm')}
              size="small"
            />
          </Box>
        </Box>
      </UnverifiedLoginContainer>
    );
  }, [
    theme.palette.case.main.yellow.high,
    t,
    login,
    control,
    isValid,
    getTime,
    isShowConfirmLoader,
    handleResendVerificationCode,
  ]);

  return isSmallDisplay ? (
    <Box sx={{ marginTop: '20px', width: '100%' }}>
      <MuiBaseMobileAccordion
        title={
          isPhone
            ? t('generalSettings.unverifiedPhoneNumber.containerLabel')
            : t('generalSettings.unverifiedEmail.containerLabel')
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ padding: '0 10px 10px 10px' }}>{getUnverifiedPhoneNumberContent}</Box>
        </form>
      </MuiBaseMobileAccordion>
    </Box>
  ) : (
    <Box sx={{ width: '100%', maxWidth: '460px', marginBottom: '30px' }}>
      <MuiBaseAccordion
        label={
          isPhone
            ? t('generalSettings.unverifiedPhoneNumber.containerLabel')
            : t('generalSettings.unverifiedEmail.containerLabel')
        }
        isShowInfoDialog={false}
        isDisabledExpand
        withHover
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {getUnverifiedPhoneNumberContent}
        </form>
      </MuiBaseAccordion>
    </Box>
  );
};

export default UnverifiedLoginBlock;
