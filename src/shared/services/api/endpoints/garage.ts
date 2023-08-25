import axios from 'axios';
import {
  CreateGarageModel,
  CreateTransportLicenseModel,
  CreateTransportStickerModel,
  GarageItemModel,
  GarageItemSharedUserModel,
  TransportItemModel,
  TransportLicenseModel,
  TransportStickerModel,
} from '../../../models/garage.model';
import { InsuranceModel, InsuranceRequestModel } from '../../../models/insurance.model';
import { MetaModel } from '../../../models/meta.model';
import { CreateTransportForm_GeneralInfo_FirstSubStepType } from '../../../models/garage/garageCreateItemForms.model';
import { ResponseFormStepperModel } from '../../../models/formStepper.model';

const garageEndpoints = {
  getMake: (transportType: string): Promise<{ id: number; name: string }[]> =>
    axios.get(`/${transportType}/makes`),
  getModel: (transportType: string, make: string): Promise<{ id: number; name: string }[]> =>
    axios.get(`/${transportType}/models?make=${make}`),
  createNewTransport: (data: CreateTransportForm_GeneralInfo_FirstSubStepType): Promise<any> =>
    axios.post('/v1/transports', data),
  getDraftTransport: (id: number): Promise<{ steps: ResponseFormStepperModel }> =>
    axios.get(`/v1/transports/${id}`),
  getFirstStepFirstSubStep: (id: number): Promise<any> =>
    axios.get(`/v1/transports/${id}/steps/first/sub-steps/first`),
  // OLD API
  createTransport: (data: CreateGarageModel): Promise<GarageItemModel> => axios.post('/transports', data),
  editTransport: (data: CreateGarageModel, id: number): Promise<TransportItemModel> =>
    axios.put(`/transports/${id}`, data),
  getTransports: (page: number): Promise<{ data: GarageItemModel[]; meta: MetaModel }> =>
    axios.get(`/transports?page=${page}`),
  sortTransports: (id: number, data: { possition: number }) => axios.put(`/transports/${id}/sort`, data),
  getTransport: (id: number): Promise<TransportItemModel> => axios.get(`/transports/${id}`),
  createTransportLicense: (data: CreateTransportLicenseModel): Promise<TransportLicenseModel> =>
    axios.post('/garage/licenses', data),
  editTransportLicense: (data: CreateTransportLicenseModel, id: number): Promise<TransportLicenseModel> =>
    axios.put(`/garage/licenses/${id}`, data),
  createInsurance: (data: InsuranceRequestModel): Promise<InsuranceModel> => axios.post(`/insurances`, data),
  editInsurance: (data: InsuranceRequestModel, id: number): Promise<InsuranceModel> =>
    axios.put(`/insurances/${id}`, data),
  deleteTransport: (id: number) => axios.delete(`/transports/${id}`),
  deleteInsurance: (id: number) => axios.delete(`/insurances/${id}`),
  deleteLicense: (id: number) => axios.delete(`/garage/licenses/${id}`),
  deleteSticker: (id: number) => axios.delete(`/garage/vehicle-stickers/${id}`),
  shareTransport: (
    id: number,
    data: { users: { id: number; permission: string }[] },
  ): Promise<GarageItemSharedUserModel[]> => axios.post(`/sharing/transport/${id}/share`, data),
  createTransportSticker: (data: CreateTransportStickerModel): Promise<TransportStickerModel> =>
    axios.post(`/garage/vehicle-stickers`, data),
  editTransportSticker: (data: CreateTransportStickerModel, id: number): Promise<TransportStickerModel> =>
    axios.put(`/garage/vehicle-stickers/${id}`, data),
  unshareTransport: (id: number) => axios.delete(`/sharing/transport/${id}/unshare`),
};

export default garageEndpoints;
