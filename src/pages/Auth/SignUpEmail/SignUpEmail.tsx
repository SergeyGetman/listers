import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import TagManager from 'react-gtm-module';
import { useAppDispatch } from '../../../shared/hooks/redux';
import router from '../../../shared/services/router';
import SignUpEmailFormContainer from './components/SignUpEmailFormContainer';
import { signUpEmailValidationSchema } from './schema';
import { registrationRequest } from '../../../store/auth/authThunk';
import errorsHandler from '../../../shared/functions/errorsHandler';
import AuthContainer from '../components/AuthContainer';
import BackgroundImage from '../../../assets/Images/emailAuth.png';

export type SignUpFormType = {
  login: string;
  first_name: string;
  last_name: string;
  policy: boolean;
  default_package_id: number;
  country?: string;
};

const SignUpEmail = () => {
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

  const { handleSubmit, control, setError } = useForm<SignUpFormType>({
    defaultValues: initialValues,
    resolver: yupResolver(signUpEmailValidationSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormType> = (formData) => {
    setIsShowConfirmLoader(true);
    dispatch(registrationRequest({ ...formData, policy: true, default_package_id: 1 }))
      .then((result) => {
        if (registrationRequest.fulfilled.match(result)) {
          if (process.env.REACT_APP_ENV === 'production') {
            TagManager.dataLayer({
              dataLayer: {
                event: 'registration_form_submit',
              },
            });
          }
          navigate(`${router.auth.activateAccount.path}?email=${formData.login}`);
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
      goBackPath={router.auth.signUp.path}
    >
      <SignUpEmailFormContainer control={control} />
    </AuthContainer>
  );
};

export default SignUpEmail;
