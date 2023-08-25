import axios from 'axios';
import {
  CouponModel,
  DiscountModel,
  PaymentMethodModel,
  PlanModel,
  SubscriptionFeedback,
  SubscriptionInfoModel,
} from '../../../models/plans.model';
import { PlanPeriodEnum } from '../../../enums/planPeriodEnum';

const settingsEndpoints = {
  getPlans: (period: PlanPeriodEnum): Promise<PlanModel[]> => axios.get(`/subscriptions?period=${period}`),
  createSubscription: (id: number, code: string | undefined, isTrial: boolean = false): Promise<any> =>
    axios.post(`/packages/${id}`, { code: code || null, is_trial: isTrial }),
  getSubscriptionInfo: (): Promise<SubscriptionInfoModel> => axios.get(`/packages`),
  createPaymentMethod: (data: { source: string }): Promise<PaymentMethodModel> => axios.post('/cards', data),
  cancelSubscription: (id: number) => axios.put(`/packages/${id}/cancel`),
  billingPay: (id: number) => axios.post(`/packages/${id}/pay`),
  deletePaymentMethod: (cardId: string) => axios.delete(`/cards/${cardId}`),
  getDowngradeDiscount: (): Promise<DiscountModel[]> => axios.get(`/coupons?name=downgrade50`),
  setCoupon: (coupon: string) => axios.post(`/coupons/${coupon}/apply`),
  setSubscriptionFeedback: (data: SubscriptionFeedback) => axios.post(`/cancel-subscription/feedback`, data),
  getProrate: (id: number): Promise<{ total: number }> => axios.get(`/packages/${id}/prorate`),
  getCouponInfo: (name: string, package_id: number): Promise<CouponModel> =>
    axios.get(`/coupons/info?name=${name}&package_id=${package_id}`),
  setSupportMeetingTime: (supportTimeStart: string, supportTimeEnd: string) =>
    axios.post(`/support-meet`, { started_at: supportTimeStart, finished_at: supportTimeEnd }),
};

export default settingsEndpoints;
