import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../shared/hooks/redux';
import router from '../../../shared/services/router';

const PrivateRouteWithoutLayouts = () => {
  const { isAuth } = useAppSelector(({ common }) => common);

  return isAuth ? (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate
      to={{
        pathname: router.auth.signIn.path,
      }}
    />
  );
};

export default PrivateRouteWithoutLayouts;
