import { TransportTypeEnum } from '../../enums/garage.enums';

export type VinAndLicensePlateInfoType = {
  year: number;
  make: string;
  model: string;
  bodyStyle: string;
  trim: string;
  exteriorColor: string;
  interiorColor: string;
  fuelType: string;
  engine: VinAndLicensePlateInfoEngine;
  transmission: VinAndLicensePlateInfoTransmission;
  mileage: string;
  drivetrain: string;
  manufacturer: VinAndLicensePlateInfoManufacturer;
  vinNumber: string;
  transport_type: TransportTypeEnum;
};
export type VinAndLicensePlateInfoEngine = {
  model: string;
  power: number;
  cylinders: number;
  configuration: string;
};
export type VinAndLicensePlateInfoTransmission = {
  style: string;
  speed: number;
};
export type VinAndLicensePlateInfoManufacturer = {
  name: string;
  country: string;
  city: string;
};
