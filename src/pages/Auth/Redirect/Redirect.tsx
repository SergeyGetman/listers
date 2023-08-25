import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { handleConformOauth } from '../../../store/Common/commonThunk';
import router from '../../../shared/services/router';
import MuiPreloader from '../../../components/MuiPreloader';
import { setAuth } from '../../../store/Common/commonSlice';
import SocketConnect from '../../../shared/services/socket';

type ParsedUrlType = {
  code: string;
  is_login: boolean;
  driver: string;
  return_url: string;
};

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleConfirm = (data: ParsedUrlType) => {
    dispatch(
      handleConformOauth({
        driver: data.driver,
        code: data.code,
        isLogin: data.is_login,
      }),
    ).then((result) => {
      if (handleConformOauth.fulfilled.match(result)) {
        if (result.payload.token) {
          localStorage.setItem('token', result.payload.token);
          SocketConnect.setAuthorizationToken(result.payload.token);
          dispatch(setAuth(true));
        } else {
          localStorage.setItem('social_id', result.payload.id);
          localStorage.setItem('first_name', result.payload.first_name || '');
          localStorage.setItem('last_name', result.payload.last_name || '');
          localStorage.setItem('email', result.payload.email || '');
          localStorage.setItem('driver', data.driver);
          navigate(router.auth.signUp.path);
        }
      } else {
        localStorage.removeItem('social_id');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('email');
        localStorage.removeItem('driver');
        if (result.payload?.message === 'You need to activate your account.') {
          if (!!result.payload?.phone) {
            navigate(`${router.auth.activateAccount.path}?phone=${result.payload.phone}`);
          } else {
            navigate(`${router.auth.signIn.path}?error=noActivateAccount&&email=${result.payload.email}`);
          }
        } else {
          navigate(router.auth.signIn.path);
        }
      }
    });
  };

  useEffect(() => {
    const state = searchParams.get('state') as string;
    const code = searchParams.get('code') as string;
    handleConfirm({ code, ...JSON.parse(state) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return <MuiPreloader isShow />;
};

export default Redirect;
