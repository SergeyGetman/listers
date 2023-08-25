import TagManager from 'react-gtm-module';

export const selectGoogleTagManagerOnboardingPlansEvents = ({
  tag,
  period,
}: {
  tag: string;
  period: string;
}) => {
  if (process.env.REACT_APP_ENV === 'production') {
    if (tag === 'basic') {
      if (period === 'month') {
        TagManager.dataLayer({
          dataLayer: {
            event: 'onboarding_month_basic_plan',
          },
        });
      } else {
        TagManager.dataLayer({
          dataLayer: {
            event: 'onboarding_year_basic_plan',
          },
        });
      }
    }

    if (tag === 'premium') {
      if (period === 'month') {
        TagManager.dataLayer({
          dataLayer: {
            event: 'onboarding_month_premium_plan',
          },
        });
      } else {
        TagManager.dataLayer({
          dataLayer: {
            event: 'onboarding_year_premium_plan',
          },
        });
      }
    }
  }
};
