import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getToken, onMessageListener } from '../../shared/services/firebase/firebase';
import { setDeviceToken } from '../../store/Profile/profile.actions';

const PushNotification = () => {
  const dispatch = useDispatch();

  // To load once
  useEffect(() => {
    let data;
    const isSafari = window.safari !== undefined;

    async function tokenFunc() {
      const token = await getToken();
      if (token) {
        dispatch(setDeviceToken({ push_token: token, platform: isSafari ? 'Safari' : 'Chrome' }));
        // console.log("Token is", data);
      }

      return data;
    }

    tokenFunc();
  }, [dispatch]);

  useEffect(() => {
    onMessageListener()
      .then(() => {})
      .catch(() => {});
  }, []);

  // eslint-disable-next-line react/jsx-filename-extension
  return <></>;
};

export default PushNotification;
