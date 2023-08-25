import { AvatarModel } from '../avatar.model';
import { HubModel } from '../hub.model';
import { HubsEnum } from '../../enums/hubs.enum';
import { ProfileViewDataEnum } from '../../enums/profileViewData.enum';
import { ProfileAppearanceFormModel } from './profileAppearanceForm.model';
import { GenderEnum } from '../../enums/gender.enum';
import { ProfileContactsFormModel } from './profileContactsForm.model';
import { ProfileBodyArtFormModel } from './profileBodyArtForm.model';
import { MediaType } from '../media.model';
import { PlanPeriodEnum } from '../../enums/planPeriodEnum';

export type ProfileExpiredModel = {
  amount: number;
  id: number;
  is_hubs: boolean;
  name: string;
  user_hubs: HubModel[];
  period: PlanPeriodEnum;
};

export type SubscriptionModel = {
  created_at: null | string;
  amount: number;
  is_first_buy: boolean;
  is_package_created: boolean;
  is_restricted: boolean;
  is_trial: boolean;
  name: string;
  package: string;
  package_canceled: null | string;
  package_end: string;
  package_id: number;
  period: string;
  real_package_end: string;
  hubs: HubModel[];
};

export type ProfileModel = {
  avatar?: AvatarModel;
  background?: AvatarModel;
  birth_day: string;
  first_name: string;
  last_name: string;
  documents: [];
  relationship_status?: string;
  middle_name: string;
  full_name: string;
  gender: GenderEnum;
  gallery: MediaType[];
  sidebar: {
    organizers: any;
  };
  phone?: string;
  email?: string;
  role?: string;
  access_data: { show_hubs_add_button: boolean };
  activated_at?: string;
  counters: {
    count_incoming: number;
    count_news: number;
    count_notification: number;
    count_requests: number;
  };
  default_package_id: number;
  hubs: { [key in HubsEnum]: HubModel };
  id: number;
  expired: ProfileExpiredModel[];
  is_package_created: boolean;
  is_trial: boolean;
  package: string;
  package_canceled?: string;
  package_end?: string;
  package_id: boolean;
  timezone: string;
  timezone_name: string;
  view_data: { [key in ProfileViewDataEnum]: boolean };
  appearance: ProfileAppearanceFormModel;
  contacts: ProfileContactsFormModel;
  bodyArts: ProfileBodyArtFormModel[];
  subscription: SubscriptionModel;
  next_subscription: SubscriptionModel;
};
