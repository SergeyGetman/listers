import { SidebarEnum } from '../enums/socialNetwork.enum';
import { ReactComponent as GoogleIcon } from '../../assets/Images/google-social-network.svg';
import { ReactComponent as FacebookIcon } from '../../assets/Images/facebook-social-network.svg';

import { ReactComponent as AppleIcon } from '../../assets/Images/apple-social-network.svg';

export enum SocialNetworkAuthEnum {
  google = 'google',
  facebook = 'facebook',
  apple = 'apple',
}

export type SocialNetworkConfigType = {
  id: number;
  name: string;
  provider: SidebarEnum;
  isComingSoon: boolean;
  icon: any;
}[];

export type SocialNetworkAuthConfigType = {
  [key: string]: {
    id: number;
    name: string;
    provider: SidebarEnum;
    isComingSoon: boolean;
    icon: any;
  };
};

export const socialNetworkConfig: SocialNetworkConfigType = [
  {
    id: 2,
    name: 'Google',
    provider: SidebarEnum.google,
    isComingSoon: false,
    icon: GoogleIcon,
  },
  {
    id: 1,
    name: 'Facebook',
    provider: SidebarEnum.facebook,
    isComingSoon: true,
    icon: FacebookIcon,
  },
  {
    id: 3,
    name: 'Apple',
    provider: SidebarEnum.apple,
    isComingSoon: false,
    icon: AppleIcon,
  },
];

export const socialNetworkAuthConfig: SocialNetworkAuthConfigType = {
  google: {
    id: 2,
    name: 'Google',
    provider: SidebarEnum.google,
    isComingSoon: false,
    icon: GoogleIcon,
  },
  facebook: {
    id: 1,
    name: 'Facebook',
    provider: SidebarEnum.facebook,
    isComingSoon: true,
    icon: FacebookIcon,
  },
  apple: {
    id: 3,
    name: 'Apple',
    provider: SidebarEnum.apple,
    isComingSoon: false,
    icon: AppleIcon,
  },
};
