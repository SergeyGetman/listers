import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import TagManager from 'react-gtm-module';
import api from '../../shared/services/api';
import { setAuth } from '../../store/Common/commonSlice';
import { useAppDispatch } from '../../shared/hooks/redux';
import { resetProfileState } from '../../store/Profile/profile.slice';

const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      api.auth.logout().then(() => {
        localStorage.removeItem('token');
        dispatch(setAuth(false));
        dispatch(resetProfileState());
        if (process.env.REACT_APP_ENV === 'production') {
          TagManager.dataLayer({
            dataLayer: {
              event: 'logout_finish',
            },
          });
        }
      });
    } catch (e) {
      throw new Error('Error');
    }
  }, [dispatch]);

  return <Box />;
};

export default Logout;
