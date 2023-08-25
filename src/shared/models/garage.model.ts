import { AvatarModel } from './avatar.model';
import { InsuranceModel } from './insurance.model';
import { MediaType } from './media.model';
import { GaragePaymentType } from '../enums/garage.enums';

export type GarageItemUserModel = {
  id: number;
  is_fake: boolean;
  gender: string; // TODO create global gender model
  first_name: string;
  middle_name: null | string;
  last_name: string;
  email: string | null;
  phone: null | string;
  birth_day: string;
  relationship_status: string;
  default_package_id: number;
  timezone_name: string;
  timezone: string;
  unverified_login: {
    phone: null;
    email: null;
  };
  last_activated_at: string;
  activated_at: string;
  deleted_at: null | string;
  avatar: AvatarModel;
  role: string | null;
  package: any; // TODO create global package model
  background: null;
  gallery: null;
  documents: null;
  appearanceValue: null;
  bodyArt: null;
  avatars: null;
  full_name: string;
};

export type GarageItemSharedUserModel = {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  avatar: AvatarModel;
  permission: string;
  connection_role: null | string;
  entity_type: null | string;
  isOwner?: boolean;
};

export type GarageItemModel = {
  id: number;
  is_shared: boolean;
  is_personal: boolean;
  permission: string; // TODO change permission
  transport_type: string; // TODO change permission
  year: number;
  make: string;
  model: string;
  user: GarageItemUserModel;
  shared_users: GarageItemSharedUserModel[];
  expiration_block: {
    label: string;
    name: string;
    expiration: string;
  };
  photos: MediaType[];
  documents: { all: MediaType[]; insurances: MediaType[] };
  insuranceImage: MediaType[];
  license_plate: string | null;
};

export type GarageTransportPaymentModel = {
  amount: number;
  status: string;
  expiration_at: string;
  id: number;
  name: null | string;
  object: GaragePaymentType;
  payments: {
    amount: number;
    description: string | null;
    documents: MediaType[];
    due_dated_at: string;
    global_status: string;
    id: number;
    is_global_late: boolean;
    late_fee: null | number;
    model_type: string;
    paid_at: string;
    photos: MediaType[];
    title: string;
    type: string;
  }[];
};

export type CreateGarageModel = {
  transport_type: string | null;
  year: number | null;
  make: string | null;
  model: string | null;
  style: string | null;
  trim: string | null;
  body: string | null;
  description: string | null;
  exterior_color: string | null;
  interior_color: string | null;
  fuel_type: string | null;
  hybrid_type: string | null;
  engine_type: string | null;
  transmission: string | null;
  country_of_assembly: string | null;
  mileage: string | null;
  drivetrain: string | null;
  state_on_license_plate: string | null;
  license_plate: string | null;
  purchase: string | null;
  vin: string | null;
  documents: {
    id: number;
  }[];
};

export type TransportLicenseModel = {
  administrative_fee: null | number;
  county: null | string;
  documents: MediaType[];
  id: number;
  late_fee: null | number;
  login: null | string;
  name: string | null;
  password: string | null;
  pin_code: string | null;
  purchase_date: string;
  registration_id: any;
  renew: string | null;
  renewal_fee: number | null;
  state: string | null;
  total_amount: null | number;
  transport_id: number;
  expiration: { date: string; is_notify: boolean };
  address: { map: { lat: number | null; lng: number | null }; address: string | null };
};

export type TransportStickerModel = {
  id: number;
  transport_id: number;
  purchase_date: string;
  expiration: { date: string; is_notify: boolean };
  reference: string | null;
  zone: boolean;
  zone_number: number | null;
  late_fee: number | null;
  sticker_fee: number | null;
  zone_fee: number | null;
  administrative_fee: number | null;
  total_amount: number;
  type: string | null;
  renew: string | null;
  number: string | null;
  login: string | null;
  password: string | null;
  name: string | null;
  address: null | {
    address: string;
    map: { lat: number; lng: number };
  };
  documents: MediaType[];
};

export type TransportItemModel = {
  id: number;
  is_shared: boolean;
  is_personal: boolean;
  permission: string;
  shared_users: GarageItemSharedUserModel[];
  transport_type: string;
  year: number;
  make: string;
  model: string;
  style: string | null;
  body: string | null;
  trim: string | null;
  description: string | null;
  exterior_color: string | null;
  interior_color: string | null;
  fuel_type: string | null;
  hybrid_type: string | null;
  engine_type: string | null;
  transmission: string | null;
  country_of_assembly: string | null;
  mileage: string | null;
  drivetrain: string | null;
  vin: string | null;
  state_on_license_plate: string | null;
  license_plate: string | null;
  purchase: string | null;
  created_at: string;
  updated_at: string;
  photos: MediaType[];
  payments: GarageTransportPaymentModel[];
  insurance_list: InsuranceModel[];
  license_list: TransportLicenseModel[];
  custom: {
    transport_type: 'other';
    make: 'Acura';
    model: 'CL';
    body: 'other';
    style: 'other';
    exterior_color: 'other';
    interior_color: 'other';
    fuel_type: 'other';
    transmission: 'other';
    trim: 'other';
  };
  documents: MediaType[];
  sections: any[];
  stickers: TransportStickerModel[];
};

export type CreateTransportLicenseModel = {
  purchase_date: string;
  transport_id: number;
  expiration: {
    date: string;
    is_notify: boolean;
  };
  registration_id: string | null;
  pin_code: string | null;
  renewal_fee: number | null;
  late_fee: number | null;
  administrative_fee: number | null;
  renew: null | string;
  login: null | string;
  password: null | string;

  name: null | string;
  address: null | {
    address: string;
    map: { lat: number; lng: number };
  };
  state: null | string;
  county: null | string;
  documents: {
    id: number;
  }[];
};

export type CreateTransportStickerModel = {
  purchase_date: string;
  transport_id: number;
  expiration: {
    date: string;
    is_notify: boolean;
  };
  late_fee: number | null;
  administrative_fee: number | null;
  renew: null | string;
  login: null | string;
  password: null | string;
  name: null | string;
  address: null | {
    address: string;
    map: { lat: number; lng: number };
  };
  documents: {
    id: number;
  }[];
  number: string | null;
  sticker_fee: number | null;
  zone_fee: number | null;
  type: string | null;
  zone: boolean;
  zone_number: number | null;
  reference: string | null;
};
