import React, { FC, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import TagManager from 'react-gtm-module';
import HubmeeLogoContainer from '../../../pages/Auth/components/HubmeeLogoContainer';
import AuthBtn from '../../buttons/AuthBtn';
import router from '../../../shared/services/router';
import MuiLinkTextButton from '../../buttons/MuiLinkTextButton';
import theme from '../../../theme/theme';
import {
  activateUserRequest,
  loginRequest,
  resendActivateUserVerificationCode,
} from '../../../store/auth/authThunk';
import { setAuth } from '../../../store/Common/commonSlice';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../shared/locales/i18n';
import useTimer from '../../../shared/hooks/useTimer';
import SocketConnect from '../../../shared/services/socket';
import VerificationField from '../../formElements/VereficationField/VerificationField';

type VerificationFormContainerProps = {
  login: string;
  isPhone: boolean;
  isSignIn?: boolean;
};

const VerificationFormContainer: FC<VerificationFormContainerProps> = ({
  login,
  isPhone,
  isSignIn = false,
}) => {
  const { t } = useTranslation();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const [isDisableButton, setIsDisableButton] = useState<boolean>(true);
  const [code, setCode] = useState<string>('');
  const dispatch = useAppDispatch();
  const { start, getTime } = useTimer();

  const navigate = useNavigate();

  useEffect(() => {
    if (login.length > 1) {
      const verificationLogin = JSON.parse(localStorage.getItem('verificationLogin') as string);
      const verificationTime = localStorage.getItem('verificationTime')
        ? JSON.parse(localStorage.getItem('verificationTime') as string)
        : undefined;

      start({
        startInMs: new Date().getTime(),
        endInMs:
          verificationLogin === login && verificationTime !== undefined
            ? new Date().getTime() + verificationTime * 1000
            : new Date().getTime() + 120000,
      });
    }
  }, [start, login]);

  useEffect(() => {
    if (login.length > 1) {
      localStorage.setItem('verificationLogin', JSON.stringify(login));
    }
    if (getTime() !== undefined) {
      localStorage.setItem('verificationTime', JSON.stringify(getTime()));
    }
  }, [getTime, login]);

  const handleGoBack = () => {
    if (isSignIn) {
      if (isPhone) {
        navigate(router.auth.signInPhone.path);
      } else {
        navigate(router.auth.SignInEmail.path);
      }
    } else {
      if (isPhone) {
        navigate(router.auth.signUpPhone.path);
      } else {
        navigate(router.auth.signUpEmail.path);
      }
    }
  };

  const activateUser = (e: any) => {
    e.preventDefault();
    setIsShowConfirmLoader(true);
    if (isSignIn) {
      dispatch(loginRequest({ login, code }))
        .then((result) => {
          if (loginRequest.fulfilled.match(result)) {
            localStorage.setItem('token', result.payload.token);
            SocketConnect.setAuthorizationToken(result.payload.token);
            dispatch(setAuth(true));
            navigate(`${router.todo.path}`);
            localStorage.removeItem('verificationTime');
            localStorage.removeItem('verificationLogin');
            if (process.env.REACT_APP_ENV === 'production' && result.payload.is_login) {
              TagManager.dataLayer({
                dataLayer: {
                  event: 'sign_in_finish',
                },
              });
            }
          } else if (result.payload?.status === 403) {
            NotificationService.error(result.payload?.message);
          }
        })
        .then(() => setIsShowConfirmLoader(false));
    } else {
      dispatch(activateUserRequest({ login, token: code }))
        .then((result) => {
          if (activateUserRequest.fulfilled.match(result)) {
            localStorage.setItem('token', result.payload.token);
            SocketConnect.setAuthorizationToken(result.payload.token);

            dispatch(setAuth(true));
            navigate(`${router.todo.path}`);
            localStorage.removeItem('verificationTime');
            localStorage.removeItem('verificationLogin');
          } else if (result.payload?.status === 403) {
            NotificationService.error(result.payload?.message);
          }
        })
        .then(() => setIsShowConfirmLoader(false));
    }
  };

  const activateUserResendCode = () => {
    dispatch(resendActivateUserVerificationCode({ login })).then((result) => {
      if (resendActivateUserVerificationCode.fulfilled.match(result)) {
        start({
          startInMs: new Date().getTime(),
          endInMs: new Date().getTime() + 120000,
        });
      } else {
        NotificationService.error(i18next.t('general.notifications.defaultError'));
      }
    });
  };

  const handleResend = () => {
    activateUserResendCode();
  };

  useEffect(() => {
    if (code.length === 6) {
      setIsDisableButton(false);
    } else {
      setIsDisableButton(true);
    }
  }, [code]);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      xs={12}
      xl={6}
      item
    >
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          maxWidth: '514px',
          padding: '40px 0 40px 0',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <HubmeeLogoContainer />
        <form noValidate onSubmit={(e) => (isDisableButton ? true : activateUser(e))}>
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              maxWidth: '514px',
              [theme.breakpoints.down('sm')]: {
                maxWidth: '343px',
              },
            }}
          >
            <Typography variant="h1" sx={{ color: theme.palette.case.neutral.n900 }}>
              {t('auth.title.verifyEmail', { props: isPhone ? t('general.phone') : t('general.email') })}
            </Typography>
            <Box
              sx={{
                m: '24px 0',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="default">
                {t('auth.text.typeVerificationCode', {
                  props: isPhone ? t('general.phone') : t('general.emailAddress'),
                })}
                &nbsp;
                <b style={{ fontWeight: '500', color: theme.palette.case.neutral.n900 }}>{login}</b>
              </Typography>
              <MuiLinkTextButton
                sx={{ color: theme.palette.case.neutral.n700, fontWeight: '500', mt: '8px' }}
                onClick={handleGoBack}
                label={isPhone ? t('auth.links.wrongPhone') : t('auth.links.wrongEmail')}
              />
            </Box>
            <Box sx={{ width: '248px', margin: ' 0 auto 24px auto' }}>
              <VerificationField
                onChange={(value) => setCode(value)}
                validChars="0-9"
                autoFocus
                placeholder=""
                inputProps={{ inputMode: 'numeric', autoComplete: 'one-time-code' }}
              />
            </Box>

            <Box sx={{ width: '200px', margin: '0 auto' }}>
              <AuthBtn
                type="submit"
                onClick={activateUser}
                label={t('auth.links.verify')}
                loading={isShowConfirmLoader}
                isDisabled={isDisableButton}
                isStopPropagation={false}
              />
            </Box>
            <Box sx={{ mt: '24px' }}>
              <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="subheader3">
                {t('auth.text.didntCode')}
              </Typography>
              &nbsp;
              {getTime() === 0 ? (
                <MuiLinkTextButton
                  sx={{ color: theme.palette.case.blue.b600, fontWeight: '700' }}
                  onClick={handleResend}
                  label={t('auth.links.resend')}
                />
              ) : (
                <Typography sx={{ color: theme.palette.case.neutral.n500 }} variant="subheader3">
                  {t('auth.text.resendIn', { count: getTime() })}
                </Typography>
              )}
            </Box>
          </Box>
        </form>

        <Box
          sx={{
            width: '244px',
            height: '40px',
          }}
        />
      </Box>
    </Grid>
  );
};

export default VerificationFormContainer;
