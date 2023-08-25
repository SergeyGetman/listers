import TagManager from 'react-gtm-module';

export const selectGoogleTagManagerPlansEvents = ({ tag, period }: { tag: string; period: string }) => {
  if (process.env.REACT_APP_ENV === 'production') {
    if (tag === 'starter') {
      if (period === 'month') {
        TagManager.dataLayer({
          dataLayer: {
            event: 'activate_month_starter_plan',
          },
        });
      } else {
        TagManager.dataLayer({
          dataLayer: {
            event: 'activate_year_starter_plan',
          },
        });
      }
    }

    if (tag === 'basic') {
      if (period === 'month') {
        TagManager.dataLayer({
          dataLayer: {
            event: 'activate_month_basic_plan',
          },
        });
      } else {
        TagManager.dataLayer({
          dataLayer: {
            event: 'activate_year_basic_plan',
          },
        });
      }
    }

    if (tag === 'premium') {
      if (period === 'month') {
        TagManager.dataLayer({
          dataLayer: {
            event: 'activate_month_premium_plan',
          },
        });
      } else {
        TagManager.dataLayer({
          dataLayer: {
            event: 'activate_year_premium_plan',
          },
        });
      }
    }
  }
};
