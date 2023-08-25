import axios from 'axios';
import { VinAndLicensePlateInfoType } from '../../../models/garage/vin-info';
import { TransportData } from '../../../../pages/GarageNew/components/types';
import {
  CreateTransportFormType,
  GetTransportsParams,
  ResultInfo,
  RootGarageItemsData,
  RootResponseGarage,
} from '../../../../pages/GarageNew/store/types';
import { AssignPeopleSelectValueModel } from '../../../models/assignPeopleSelectValue.model';

const VEHICLE_INFO_INSTANCE = axios.create({
  baseURL: 'https://vehicle-info-service.hubmee.org',
});

const garageEndpointsV2 = {
  getVehicleInfoByVin: (vin: string): Promise<ResultInfo<VinAndLicensePlateInfoType>> => {
    return VEHICLE_INFO_INSTANCE.get(`/api/v1/vehicle/info/vin/${vin}`);
  },
  getVehicleInfoByLicensePlate: (
    licensePlate: string,
    state: string,
  ): Promise<ResultInfo<VinAndLicensePlateInfoType>> => {
    return VEHICLE_INFO_INSTANCE.get(`/api/v1/vehicle/info/license/${licensePlate}?state=${state}`);
  },
  getModelInfo: (make: string, year: number | string, vehicleType: string): Promise<ResultInfo<string[]>> => {
    return VEHICLE_INFO_INSTANCE.get(
      `/api/v1/vehicle/info/model?make=${make}&year=${year}&vehicleType=${vehicleType}`,
    );
  },
  getMakeInfo: (vehicleType: string): Promise<ResultInfo<string[]>> => {
    return VEHICLE_INFO_INSTANCE.get(`/api/v1/vehicle/info/make?vehicleType=${vehicleType}`);
  },

  createNewTransport: (data: CreateTransportFormType): Promise<any> => axios.post('/transports', data),
  createNewTransportAllForm: (data: TransportData) => axios.post('/transports', data),
  uploadInsurance: (mediaId: number) => {
    return axios.post(`/insurance/card-documents/${mediaId}`);
  },
  getTransports: (params: GetTransportsParams): Promise<RootResponseGarage> =>
    axios.get(`/transports`, { params }),
  deleteTransport: (transportID: number) => axios.delete(`/transports/${transportID}`),
  setNewTransportPosition: (transportID: number, position: number) =>
    axios.put(`/transports/${transportID}/position`, { position }),
  getTransport: (id: number): Promise<RootGarageItemsData> => axios.get(`/transports/${id}`),
  cancelShare: (transportID: number) => axios.delete(`/transports/${transportID}/users/self`),
  syncUsersShare: (params: { users: AssignPeopleSelectValueModel[]; transportID: number }): any =>
    axios.put(`/transports/${params.transportID}/users`, params),
};
export default garageEndpointsV2;
