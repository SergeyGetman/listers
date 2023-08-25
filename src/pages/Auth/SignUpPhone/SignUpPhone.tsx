import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import TagManager from 'react-gtm-module';
import { useAppDispatch } from '../../../shared/hooks/redux';
import router from '../../../shared/services/router';
import SignUpPhoneFormContainer from './components/SignUpPhoneFormContainer';
import { signUpPhoneValidationSchema } from './schema';
import { registrationRequest } from '../../../store/auth/authThunk';
import errorsHandler from '../../../shared/functions/errorsHandler';
import AuthContainer from '../components/AuthContainer';
import BackgroundImage from '../../../assets/Images/phoneAuth.png';
import { loginCheck } from '../../../shared/functions/loginCheck';

export type SignUpFormType = {
  login: string;
  first_name: string;
  last_name: string;
  policy: boolean;
  default_package_id: number;
  country?: string;
};

const SignUpPhone = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const initialValues = {
    first_name: '',
    last_name: '',
    login: '',
    country: '',
  };

  const { handleSubmit, control, setValue, setError } = useForm<SignUpFormType>({
    defaultValues: initialValues,
    resolver: yupResolver(signUpPhoneValidationSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormType> = (formData: SignUpFormType) => {
    setIsShowConfirmLoader(true);
    let login: { login: string; country?: undefined } | { login: string; country: string | undefined };

    try {
      login = loginCheck(formData.login);
    } catch (error: any) {
      setIsShowConfirmLoader(false);
      setError('login', { type: 'manual', message: error?.message });
      return;
    }
    dispatch(registrationRequest({ ...formData, ...login, policy: true, default_package_id: 1 }))
      .then((result) => {
        if (registrationRequest.fulfilled.match(result)) {
          if (process.env.REACT_APP_ENV === 'production') {
            TagManager.dataLayer({
              dataLayer: {
                event: 'registration_form_submit',
              },
            });
          }
          navigate(`${router.auth.activateAccount.path}?phone=${formData.login}`);
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
      goBackPath={router.auth.signUp.path}
    >
      <SignUpPhoneFormContainer handleChangePhone={handleChangePhone} control={control} />
    </AuthContainer>
  );
};

export default SignUpPhone;
