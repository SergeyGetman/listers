import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../shared/hooks/redux';
import router from '../../../shared/services/router';
import { setBreadcrumbs } from '../../../store/Common/commonThunk';
import i18next from '../../../shared/locales/i18n';
import WelcomeToHubmee from '../components/WelcomeToHubmee';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: i18next.t('auth.title.signIn') }]));
  }, [dispatch]);

  return (
    <WelcomeToHubmee
      title={t('auth.title.welcomeBack')}
      subtitle={t('auth.text.SmartHelper')}
      onClickFirst={() => navigate(router.auth.SignInEmail.path)}
      onClickSecond={() => navigate(router.auth.signInPhone.path)}
      linkBlockData={{
        text: t('auth.text.haveNotAccount'),
        link: router.auth.signUp.path,
        buttonLabel: t('auth.links.signUp'),
      }}
    />
  );
};

export default SignIn;
