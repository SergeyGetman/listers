/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useMemo, Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import momentTZ from 'moment-timezone';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import router from '../../../shared/services/router';
import SocketConnect from '../../../shared/services/socket/index';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import Header from '../../layout/Header';
import Sidebar from '../../layout/navigation/Sidebar';
import PushNotification from '../../PushNotification/PushNotification';
import RightSidebar from '../../layout/navigation/RightSidebar';
import {
  changeProfileTimezone,
  getProfileInfo,
  getProfileSettings,
} from '../../../store/Profile/profile.actions';
import { getNetworkCounter } from '../../../store/Common/commonThunk';
import { getGlobalChatCounters } from '../../../store/chat/chatThunk';
import { resetProfileState } from '../../../store/Profile/profile.slice';
import GeneralSockets from '../../GeneralSockets';
import { changeRedirectLink } from '../../../store/Common/commonSlice';
import { getPlans } from '../../../store/settings/settingsThunk';
import { PlanPeriodEnum } from '../../../shared/enums/planPeriodEnum';
import NoInternetConnection from '../../stubs/NoInternetConnection';
import useOnline from '../../../shared/hooks/useOnline';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import { PrivateRouteContainerStyles } from './PrivateRoute.style';
import 'react-image-crop/dist/ReactCrop.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/lazy';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../shared/locales/i18n';

const PrivateRoute = () => {
  const { isAuth, isOpenLeftSidebar, redirectLink } = useAppSelector(({ common }) => common);
  const profileData = useAppSelector(({ profile }) => profile.data);
  const isFetchingProfileData = useAppSelector(({ profile }) => profile.isFetching);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const url = new URLSearchParams();
  url.set('redirect', location.pathname + location.search);
  const online = useOnline();

  const isChat = useMemo(() => {
    return location.pathname.includes('chat/personal') || location.pathname.includes('chat/group');
  }, [location.pathname]);

  const isMessage = useMemo(() => {
    return location.pathname.includes('chat/personal/') || location.pathname.includes('chat/group/');
  }, [location.pathname]);

  const redirect = useMemo(() => {
    return location.pathname !== `${router.settings.path}/${router.settings.children.logout.path}`
      ? url.toString()
      : '';
  }, [location]);
  const isShowRightSidebar = false;

  useEffect(() => {
    if (isFetchingProfileData && (!profileData?.first_name || !profileData?.last_name)) {
      modalObserver.addModal(ModalNamesEnum.userFullNameModal, {});
    }
  }, [profileData?.first_name, profileData?.last_name, isFetchingProfileData]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getProfileInfo()).then((res) => {
        dispatch(getProfileSettings());
        if (getProfileInfo.fulfilled.match(res)) {
          if (res?.payload?.view_data?.is_view_onboarding === false) {
            navigate('/onboarding');
          }
          if (
            res?.payload?.view_data?.is_view_onboarding === true &&
            !res?.payload?.expired[0]?.id &&
            !res?.payload?.subscription?.created_at
          ) {
            NotificationService.error(i18next.t('general.notifications.purchaseError'));
            navigate(`${router.settings.path}/${router.settings.children.plans.path}`);
          }
        }
      });
      dispatch(getNetworkCounter());
      dispatch(getGlobalChatCounters());
      dispatch(getPlans(PlanPeriodEnum.month));
    }
    return () => {
      dispatch(resetProfileState());
      SocketConnect.disconnect();
    };
  }, [isAuth, dispatch]);

  useEffect(() => {
    if (profileData?.timezone_name && profileData?.timezone_name !== momentTZ.tz.guess(true)) {
      dispatch(changeProfileTimezone({ timezone_name: momentTZ.tz.guess(true) }));
    }
  }, [profileData?.timezone_name, dispatch]);

  useEffect(() => {
    if (redirectLink !== '') {
      navigate(redirectLink);
      dispatch(changeRedirectLink(''));
    }
  }, [dispatch, navigate, redirectLink]);

  return isAuth ? (
    <PrivateRouteContainerStyles
      isChat={isChat}
      isMessage={isMessage}
      isOpenLeftSidebar={isOpenLeftSidebar}
      isShowRightSidebar={isShowRightSidebar}
      sx={{ pointerEvents: profileData && profileData?.expired?.length > 0 ? 'none' : 'initial' }}
    >
      <Header isShowRightSidebar={isShowRightSidebar} />
      <Sidebar />

      {online ? (
        <>
          <PushNotification />
          <GeneralSockets userId={profileData?.id} />
          <RightSidebar />
          <Suspense fallback={null}>{isFetchingProfileData ? <Outlet /> : <></>}</Suspense>
        </>
      ) : (
        <NoInternetConnection />
      )}
    </PrivateRouteContainerStyles>
  ) : (
    <Navigate
      to={{
        pathname: router.auth.signIn.path,
        search: redirect,
      }}
    />
  );
};

export default PrivateRoute;
