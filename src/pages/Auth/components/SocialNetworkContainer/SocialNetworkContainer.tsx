/* eslint-disable no-console */
import React, { FC } from 'react';
import {
  IResolveParams,
  LoginSocialApple,
  LoginSocialFacebook,
  LoginSocialGoogle,
} from 'reactjs-social-login';
import { useNavigate } from 'react-router';
import router from '../../../../shared/services/router';
import { SocialNetworkBoxVariants } from '../WelcomeToHubmee/WelcomeToHubmee.style';
import {
  socialNetworkAuthConfig,
  SocialNetworkAuthEnum,
} from '../../../../shared/configs/socidaNetwork.config';
import SocialMediaBox from './components/SocialMediaBox';
import { handleConformOauth } from '../../../../store/Common/commonThunk';
import { selectGoogleTagManagerSocialEvents } from '../../../../shared/utils/selectGoogleTagManagerSocialEvents';
import SocketConnect from '../../../../shared/services/socket';
import { setAuth } from '../../../../store/Common/commonSlice';
import { useAppDispatch } from '../../../../shared/hooks/redux';

type Props = {};

const SocialNetworkContainer: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSocialAuth = (provider: SocialNetworkAuthEnum, code: string) => {
    dispatch(handleConformOauth({ driver: provider, code, isLogin: false })).then((result) => {
      if (handleConformOauth.fulfilled.match(result)) {
        if (result.payload.token) {
          selectGoogleTagManagerSocialEvents({ provider, isLogin: result.payload.is_login });
          localStorage.setItem('token', result.payload.token);
          SocketConnect.setAuthorizationToken(result.payload.token);
          dispatch(setAuth(true));
        }
      } else {
        if (result.payload?.message === 'You need to activate your account.') {
          if (!!result.payload?.phone) {
            navigate(`${router.auth.activateAccount.path}?phone=${result.payload.phone}`);
          } else {
            navigate(`${router.auth.signIn.path}?error=noActivateAccount&&email=${result.payload.email}`);
          }
        } else {
          navigate(router.auth.signUp.path);
        }
      }
    });
  };

  return (
    <SocialNetworkBoxVariants>
      <LoginSocialGoogle
        client_id={process.env.REACT_APP_GG_APP_ID || ''}
        onLoginStart={() => true}
        onResolve={({ provider, data }: IResolveParams) => {
          handleSocialAuth(provider as SocialNetworkAuthEnum, data ? data.access_token : '');
        }}
        redirect_uri={window.location.href}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onReject={(err) => {
          console.error(err);
        }}
      >
        <SocialMediaBox onClick={() => true}>
          <socialNetworkAuthConfig.google.icon />
        </SocialMediaBox>
      </LoginSocialGoogle>

      <LoginSocialFacebook
        isOnlyGetToken
        appId={process.env.REACT_APP_FB_APP_ID || ''}
        onLoginStart={() => true}
        redirect_uri={window.location.href}
        fieldsProfile="id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        onResolve={({ provider, data }: IResolveParams) => {
          handleSocialAuth(provider as SocialNetworkAuthEnum, data ? data.accessToken : '');
        }}
        onReject={(err) => {
          console.error(err);
        }}
      >
        <SocialMediaBox onClick={() => true}>
          <socialNetworkAuthConfig.facebook.icon />
        </SocialMediaBox>
      </LoginSocialFacebook>

      <LoginSocialApple
        client_id={process.env.REACT_APP_APPLE_APP_ID || ''}
        scope="name email"
        redirect_uri={`${process.env.REACT_APP_HOST}${router.auth.signUp.path}`}
        onLoginStart={() => true}
        onResolve={({ provider, data }: IResolveParams) => {
          handleSocialAuth(provider as SocialNetworkAuthEnum, data ? data.authorization.id_token : '');
        }}
        onReject={(err) => {
          console.error(err);
        }}
      >
        <SocialMediaBox onClick={() => true}>
          <socialNetworkAuthConfig.apple.icon />
        </SocialMediaBox>
      </LoginSocialApple>
    </SocialNetworkBoxVariants>
  );
};

export default SocialNetworkContainer;
