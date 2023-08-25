import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useAppDispatch } from '../../../shared/hooks/redux';
import router from '../../../shared/services/router';
import SignInPhoneFormContainer from './components/SignInPhoneFormContainer';
import { signInPhoneValidationSchema } from './schema';
import { confirmationLoginRequest } from '../../../store/auth/authThunk';
import errorsHandler from '../../../shared/functions/errorsHandler';
import AuthContainer from '../components/AuthContainer';
import BackgroundImage from '../../../assets/Images/phoneAuth.png';
import { loginCheck } from '../../../shared/functions/loginCheck';

export type SignInPhoneFormType = {
  login: string;
  country?: string;
};

const SignInPhone = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const initialValues = {
    login: '',
    country: '',
  };

  const { handleSubmit, control, setValue, setError } = useForm<SignInPhoneFormType>({
    defaultValues: initialValues,
    resolver: yupResolver(signInPhoneValidationSchema),
  });

  const onSubmit: SubmitHandler<SignInPhoneFormType> = (formData) => {
    setIsShowConfirmLoader(true);
    let login: { login: string; country?: undefined } | { login: string; country: string | undefined };

    try {
      login = loginCheck(formData.login);
    } catch (error: any) {
      setIsShowConfirmLoader(false);
      setError('login', { type: 'manual', message: error?.message });
      return;
    }
    dispatch(confirmationLoginRequest(login))
      .then((result) => {
        if (confirmationLoginRequest.fulfilled.match(result)) {
          navigate(`${router.auth.activateAccount.path}?phone=${formData.login}&&isSignIn=${true}`);
        } else {
          errorsHandler(result, setError);
        }
      })
      .then(() => setIsShowConfirmLoader(false));
  };

  const handleChangePhone = (phone: string, country: string) => {
    setValue(`login`, phone, {
      shouldValidate: true,
    });
    setValue(`country`, country);
  };

  return (
    <AuthContainer
      title={t('auth.title.continuePhone')}
      description={t('auth.text.sendVerificationCode')}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isShowConfirmLoader={isShowConfirmLoader}
      img={BackgroundImage}
      goBackPath={router.auth.signIn.path}
    >
      <SignInPhoneFormContainer handleChangePhone={handleChangePhone} control={control} />
    </AuthContainer>
  );
};

export default SignInPhone;
