import axios from 'axios';
import { EventItemModel } from '../../../models/event/eventItem.model';
import { UpdatePaymentsFormPayload } from '../../../models/payments/updatePaymentsFormPayload.model';
import { PlannerItemStatusesEnum } from '../../../enums/plannerItemStatuses.enum';

const paymentEndpoint = {
  getPayment: (params: { paymentId: number; is_list?: number }): Promise<any> =>
    axios.get(`/planner/payments/${params?.paymentId}`, { params }),
  updatePayment: (params: UpdatePaymentsFormPayload, paymentId: number): Promise<EventItemModel> =>
    axios.put(`/planner/payments/${paymentId}`, { ...params }),
  changeStatus: (params: { paymentId: number; status: PlannerItemStatusesEnum }): Promise<EventItemModel> =>
    axios.post(`planner/payments/${params.paymentId}/status`, params),
  deleteCard: (cardId: number) => axios.delete(`/cards/${cardId}`),
};

export default paymentEndpoint;
