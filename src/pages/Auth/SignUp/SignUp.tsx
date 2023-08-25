import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../shared/hooks/redux';
import router from '../../../shared/services/router';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { setBreadcrumbs } from '../../../store/Common/commonThunk';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import WelcomeToHubmee from '../components/WelcomeToHubmee';

const SignUp = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: 'Sign-up' }]));
  }, [dispatch]);

  const handleOpenTermsModal = () => {
    modalObserver.addModal(ModalNamesEnum.termsModal, {});
  };

  const handleOpenPolicyModal = () => {
    modalObserver.addModal(ModalNamesEnum.policyModal, {});
  };

  return (
    <WelcomeToHubmee
      title={t('auth.title.welcomeToHubmee')}
      subtitle={t('auth.text.SmartHelper')}
      onClickFirst={() => navigate(router.auth.signUpEmail.path)}
      onClickSecond={() => navigate(router.auth.signUpPhone.path)}
      linkBlockData={{
        text: t('auth.text.alreadyHaveAnAccount'),
        link: router.auth.signIn.path,
        buttonLabel: t('auth.links.signIn'),
      }}
      handleOpenTermsModal={handleOpenTermsModal}
      handleOpenPolicyModal={handleOpenPolicyModal}
    />
  );
};

export default SignUp;
