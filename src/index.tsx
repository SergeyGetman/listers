import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, Slide, ThemeProvider } from '@mui/material';
import TagManager from 'react-gtm-module';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import SnackbarUtilsConfigurator from './shared/services/notifications/SnackbarUtilsConfigurator';
import App from './App';
import theme from './theme/theme';
import { store } from './store/store';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';

if (process.env.REACT_APP_ENV === 'production') {
  const tagManagerArgs = {
    gtmId: `${process.env.REACT_APP_GTM_ID}`,
    events: {
      registration_finish: 'registration_finish',
      registration_form_submit: 'registration_form_submit',
      cancel_subscription_btn_click: 'cancel_subscription_btn_click',
      payment_info_send: 'payment_info_send',
      sign_in_finish: 'sign_in_finish',
      sign_in_google: 'sign_in_google',
      sign_in_facebook: 'sign_in_facebook',
      sign_in_apple: 'sign_in_apple',
      sign_up_google: 'sign_up_google',
      sign_up_facebook: 'sign_up_facebook',
      sign_up_apple: 'sign_up_apple',
      logout_finish: 'logout_finish',
      onboarding_paid: 'onboarding_paid',
      onboarding_paid_with_discount: 'onboarding_paid_with_discount',
      onboarding_paid_with_trial: 'onboarding_paid_with_trial',
      activate_garage_hub: 'activate_garage_hub',
      deactivate_garage_hub: 'deactivate_garage_hub',
      activate_month_starter_plan: 'activate_month_starter_plan',
      activate_year_starter_plan: 'activate_year_starter_plan',
      activate_month_basic_plan: 'activate_month_basic_plan',
      activate_year_basic_plan: 'activate_year_basic_plan',
      activate_month_premium_plan: 'activate_month_premium_plan',
      activate_year_premium_plan: 'activate_year_premium_plan',
      onboarding_month_basic_plan: 'onboarding_month_basic_plan',
      onboarding_year_basic_plan: 'onboarding_year_basic_plan',
      onboarding_month_premium_plan: 'onboarding_month_premium_plan',
      onboarding_year_premium_plan: 'onboarding_year_premium_plan',
    },
  };

  TagManager.initialize(tagManagerArgs);
}
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <CssBaseline enableColorScheme />
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            {GlobalStyles}
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              TransitionComponent={Slide}
            >
              <SnackbarUtilsConfigurator />
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </Router>
      </Provider>
    </LocalizationProvider>
  </>,
);
