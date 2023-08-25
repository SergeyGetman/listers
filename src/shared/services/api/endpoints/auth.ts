import axios from 'axios';
import { SignUpFormType } from '../../../../pages/Auth/SignUpPhone/SignUpPhone';
import { OnboardingModel, OnboardingSaveModel } from '../../../models/onboarding.model';
import { SignInPhoneFormType } from '../../../../pages/Auth/SignInPhone/SignInPhone';
import { VerificationLoginFormModel } from '../../../models/verificationLoginFormModel';

const authEndpoints = {
  login: (data: { login: string; code: string }): Promise<{ token: string; is_login: boolean }> =>
    axios.post('/v1/login', data),
  activateUser: (data: VerificationLoginFormModel): Promise<any> => axios.post('/v1/verify', data),
  activationResendCode: (data: { login?: string | null }): Promise<any> =>
    axios.post('/v1/verification/resend', data),
  registration: (data: SignUpFormType): Promise<any> => axios.post('/v1/registration', data),
  confirmationLogin: (data: SignInPhoneFormType): Promise<any> =>
    axios.post('/v1/send-confirmation-code', data),
  logout: () => axios.get('/logout'),
  callback: (driver: string, code: string, isLogin: boolean) =>
    axios.get(`/callback?driver=${driver}&code=${code}&is_login=${isLogin ? 1 : 0}`),
  deleteSocialNetwork: (provider: string, data: { password: string | null }) =>
    axios.put(`/social/${provider}`, data),
  getOnboarding: (): Promise<OnboardingModel> => axios.get('/onboarding'),
  setOnboarding: (data: OnboardingSaveModel) => axios.post('/onboarding', data),
};

export default authEndpoints;
