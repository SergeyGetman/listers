import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { EnhancedStore } from '@reduxjs/toolkit';
import { setAuth } from '../../../../store/Common/commonSlice';
import { NotificationService } from '../../notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../locales/i18n';
import router from '../../router';

const BASE_URL = process.env.REACT_APP_API_HOST;
const REACT_APP_HOST = process.env.REACT_APP_HOST;
export const onSuccessResponse = async (response: AxiosResponse): Promise<AxiosResponse['data']> => {
  return response.data;
};

export const onErrorResponse = async (error: AxiosError, store: EnhancedStore): Promise<AxiosError> => {
  const response = error?.response;

  if (response?.status === 401) {
    NotificationService.error(i18next.t('general.notifications.sessionTimeout'));

    // @ts-ignore
    store.dispatch(setAuth(false));
  }
  if (response?.status === 402) {
    window.location.href = `${REACT_APP_HOST}${router.settings.path}/${router.settings.children.plans.path}`;
  }
  return Promise.reject(error?.response);
};

export const initializeApi = (store: EnhancedStore) => {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const authToken = localStorage.getItem('token');
      config.baseURL = BASE_URL;
      if (config.headers === undefined) {
        // eslint-disable-next-line no-param-reassign
        config.headers = {};
      }
      if (authToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
  axios.interceptors.response.use(
    (response) => onSuccessResponse(response),
    (error) => onErrorResponse(error, store),
  );
};
