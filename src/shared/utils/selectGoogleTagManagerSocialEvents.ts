import TagManager from 'react-gtm-module';
import { SocialNetworkAuthEnum } from '../configs/socidaNetwork.config';

export const selectGoogleTagManagerSocialEvents = ({
  provider,
  isLogin = true,
}: {
  provider: SocialNetworkAuthEnum;
  isLogin?: boolean;
}) => {
  if (process.env.REACT_APP_ENV === 'production') {
    if (isLogin) {
      if (provider === SocialNetworkAuthEnum.google) {
        TagManager.dataLayer({
          dataLayer: {
            event: 'sign_in_google',
          },
        });
      } else if (provider === SocialNetworkAuthEnum.facebook) {
        TagManager.dataLayer({
          dataLayer: {
            event: 'sign_in_facebook',
          },
        });
      } else {
        TagManager.dataLayer({
          dataLayer: {
            event: 'sign_in_apple',
          },
        });
      }
    } else {
      if (provider === SocialNetworkAuthEnum.google) {
        TagManager.dataLayer({
          dataLayer: {
            event: 'sign_up_google',
          },
        });
      } else if (provider === SocialNetworkAuthEnum.facebook) {
        TagManager.dataLayer({
          dataLayer: {
            event: 'sign_up_facebook',
          },
        });
      } else {
        TagManager.dataLayer({
          dataLayer: {
            event: 'sign_up_apple',
          },
        });
      }
    }
  }
};
