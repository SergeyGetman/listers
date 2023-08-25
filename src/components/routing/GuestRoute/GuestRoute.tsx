import React, { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../shared/hooks/redux';
import useOnline from '../../../shared/hooks/useOnline';
import NoInternetConnection from '../../stubs/NoInternetConnection';
import router from '../../../shared/services/router';

const GuestRoute = () => {
  const { isAuth } = useAppSelector(({ common }) => common);
  const location = useLocation();
  const url = new URLSearchParams(location.search.slice(1));
  const online = useOnline();

  if (!online) {
    return <NoInternetConnection />;
  }

  return isAuth ? (
    <Navigate to={url.get('redirect') || router.todo.path} />
  ) : (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
};

export default GuestRoute;
