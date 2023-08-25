import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const SignIn = memo(lazy(() => componentLoader(() => import('../../../../pages/Auth/SignIn'))));
const SignUp = memo(lazy(() => componentLoader(() => import('../../../../pages/Auth/SignUp'))));
const SignUpPhone = memo(lazy(() => componentLoader(() => import('../../../../pages/Auth/SignUpPhone'))));
const SignUpEmail = memo(lazy(() => componentLoader(() => import('../../../../pages/Auth/SignUpEmail'))));
const SignInPhone = memo(lazy(() => componentLoader(() => import('../../../../pages/Auth/SignInPhone'))));
const SignInEmail = memo(lazy(() => componentLoader(() => import('../../../../pages/Auth/SignInEmail'))));
const VerificationAccount = memo(
  lazy(() => componentLoader(() => import('../../../../pages/Auth/VerificationAccount'))),
);

const Redirect = memo(lazy(() => componentLoader(() => import('../../../../pages/Auth/Redirect'))));

const Onboarding = memo(lazy(() => componentLoader(() => import('../../../../pages/Onboarding'))));

const authRoute = {
  signIn: {
    path: '/auth/sign-in',
    index: true,
    component: <SignIn />,
  },
  signUp: {
    path: '/auth/sign-up',
    index: true,
    component: <SignUp />,
  },
  signUpPhone: {
    path: '/auth/sign-up/phone',
    index: true,
    component: <SignUpPhone />,
  },
  signUpEmail: {
    path: '/auth/sign-up/email',
    index: true,
    component: <SignUpEmail />,
  },
  signInPhone: {
    path: '/auth/sign-in/phone',
    index: true,
    component: <SignInPhone />,
  },
  SignInEmail: {
    path: '/auth/sign-in/email',
    index: true,
    component: <SignInEmail />,
  },

  activateAccount: {
    path: '/activate',
    index: true,
    component: <VerificationAccount />,
  },
  redirect: {
    path: '/redirect',
    index: true,
    component: <Redirect />,
  },
  onboarding: {
    path: '/onboarding',
    index: true,
    component: <Onboarding />,
  },
};
export default authRoute;
