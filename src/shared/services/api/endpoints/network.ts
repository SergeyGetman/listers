import axios from 'axios';
import {
  ConnectedUserModel,
  CreateContactModel,
  InviteUser,
  NetworkUserModel,
  UserPartInformation,
} from '../../../models/network';
import { MetaModel } from '../../../models/meta.model';
import { NetworkTypeEnum, NetworkTypeRequestEnum } from '../../../enums/networkType.enum';

const notesEndpoints = {
  getRoles: (): Promise<{}> => axios.get(`/connections/roles`),
  getInviteUsers: (page: number, query: string): Promise<{ data: InviteUser[]; meta: MetaModel }> =>
    axios.get(`/connections/search?query=${query}&page=${page}`),
  inviteUser: (data: { user_id: number; role: string; login: null | string }) =>
    axios.post(`/connections`, data),
  getNetworkUser: (
    type: NetworkTypeEnum,
    query: string,
    page: number,
    role?: string | null,
  ): Promise<{ data: NetworkUserModel[]; meta: MetaModel }> =>
    axios.get(`${NetworkTypeRequestEnum[type]}?page=${page}&query=${query}${role ? `&role=${role}` : ''}`),
  confirm: (userId: number) => axios.put(`/connections/users/${userId}/confirm`),
  cancel: (userId: number) => axios.put(`/connections/users/${userId}/cancel`),
  cancelFuture: (userId: number) => axios.delete(`/connections/future-requests/${userId}`),
  inviteFutureUser: (userId: number, data: { role: string; login?: string }) =>
    axios.post(`/connections/users/${userId}/invite`, data),
  resend: (friendId: number) => axios.put(`/connections/users/${friendId}/resend`),
  resendFutureRequest: (friendId: number, data: { login: string | null; country?: string; role: string }) =>
    axios.post(`/connections`, data),
  deleteUser: (friendId: number) => axios.delete(`/connections/users/${friendId}`),
  getPartUserInfo: (friendId: number): Promise<UserPartInformation> =>
    axios.get(`/network/contact?user_id=${friendId}`),
  share: (data: { users: { id: number }[] }, id: number): Promise<any> =>
    axios.post(`/connections/users/${id}/share`, data),
  getCounter: (): Promise<{ count: number }> => axios.get('/connections/incoming/count'),
  changeRole: (friendId: number, data: { role: string }) =>
    axios.put(`/connections/users/${friendId}/role`, data),
  createContact: (data: CreateContactModel) => axios.post('/connections/contacts', data),
  editContact: (data: CreateContactModel, id: number): Promise<NetworkUserModel> =>
    axios.put(`/connections/contacts/${id}`, data),
  editConnectionUser: (
    data: { role: string; note: any; documents: { id: number }[] },
    id: number,
  ): Promise<{ role: string; note: any; documents: any }> => axios.put(`/connections/users/${id}/data`, data),
  getUser: (id: number): Promise<ConnectedUserModel> => axios.get(`/connections/users/${id}`),
  getSentLogins: (id: number): Promise<{ login?: string }[]> =>
    axios.get(`/connections/users/${id}/sent-logins`),
  getOnlineUsers: (): Promise<number[]> => axios.get(`/connections/users/id`),
};

export default notesEndpoints;
