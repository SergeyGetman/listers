import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useAppDispatch } from '../../../shared/hooks/redux';
import router from '../../../shared/services/router';
import SignInEmailFormContainer from './components/SignInEmailFormContainer';
import { signInEmailValidationSchema } from './schema';
import { confirmationLoginRequest } from '../../../store/auth/authThunk';
import errorsHandler from '../../../shared/functions/errorsHandler';
import AuthContainer from '../components/AuthContainer';
import BackgroundImage from '../../../assets/Images/emailAuth.png';

export type SignInPhoneFormType = {
  login: string;
  country?: string;
};

const SignInEmail = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const initialValues = {
    login: '',
    country: '',
  };

  const { handleSubmit, control, setError } = useForm<SignInPhoneFormType>({
    defaultValues: initialValues,
    resolver: yupResolver(signInEmailValidationSchema),
  });

  const onSubmit: SubmitHandler<SignInPhoneFormType> = (formData) => {
    setIsShowConfirmLoader(true);
    dispatch(confirmationLoginRequest(formData))
      .then((result) => {
        if (confirmationLoginRequest.fulfilled.match(result)) {
          navigate(`${router.auth.activateAccount.path}?email=${formData.login}&&isSignIn=${true}`);
        } else {
          errorsHandler(result, setError);
        }
      })
      .then(() => setIsShowConfirmLoader(false));
  };

  return (
    <AuthContainer
      title={t('auth.title.continueEmail')}
      description={t('auth.text.sendEmail')}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isShowConfirmLoader={isShowConfirmLoader}
      img={BackgroundImage}
      goBackPath={router.auth.signIn.path}
    >
      <SignInEmailFormContainer control={control} />
    </AuthContainer>
  );
};

export default SignInEmail;
