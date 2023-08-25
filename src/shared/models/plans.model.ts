import { PlansPricingItemEnum } from '../enums/plansPricingItem.enum';
import { HubModel } from './hub.model';

export type PlanModel = {
  id: number;
  name: string;
  period: string;
  amount: number;
  hubs: HubModel[];
  priority: number;
  tag: PlansPricingItemEnum;
};

export type BankCardModel = {
  data: { name: string; last4: string; exp_year: number; exp_month: number };
  id: number;
  is_main: boolean;
  source: string;
};

export type SubscriptionPlan = {
  id: number;
  type: string;
  is_user_owner: boolean;
  period: string;
  amount: number;
  is_trial: boolean;
  price: number;
  card_data: any[];
  package_id: number;
  payment_id: string;
  payment_url: null | string;
  user_status: null | string;
  created_at: string;
  expired_at: string;
  canceled_at: string | null;
  users: any[];
  hubs: HubModel[];
};

export type SubscriptionInfoModel = {
  subscription: SubscriptionPlan;
  card: BankCardModel;
};

export type PaymentMethodModel = {
  data: BankCardModel;
};

export type DiscountModel = {
  id: number;
  name: string;
  percent_off: number;
  data: {
    duration: string;
    duration_in_months: string;
    id: string;
    percent_off: number;
  };
};

export type SubscriptionFeedback = {
  checkboxes: { text: string }[];
  message: string;
};

export type CouponModel = {
  amount: null;
  percent_off: null;
  coupon: {
    id: string;
    object: string;
    amount_off: null;
    created: number;
    currency: null;
    duration: string;
    duration_in_months: number;
    livemode: boolean;
    max_redemptions: null;
    metadata: [];
    name: string;
    percent_off: number;
    redeem_by: null;
    times_redeemed: number;
    valid: boolean;
  };
};
