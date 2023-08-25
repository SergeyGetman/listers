import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import router from '../../shared/services/router';

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: 'Home' }]));
  }, [dispatch]);
  const { isAuth } = useAppSelector(({ common }) => common);

  return isAuth ? (
    <Navigate
      to={{
        pathname: router.todo.path,
      }}
    />
  ) : (
    <Navigate
      to={{
        pathname: router.auth.signIn.path,
      }}
    />
  );
};

export default Home;
