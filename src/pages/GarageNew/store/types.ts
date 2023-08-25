import { TransportTypeEnum } from '../../../shared/enums/garage.enums';

export enum TransportsSorting {
  IS_MY,
  IS_PENDING,
}
export interface FilterParams {
  query: string | null;
  shared_filters: string[] | [];
}
export interface GetTransportsParams extends Partial<FilterParams> {
  page?: number;
  is_need_action: TransportsSorting;
}

export type ResultInfo<T> = {
  data: T;
  status: number;
};

export type CreateTransportFormType = {
  transport_type: TransportTypeEnum;
  year: number | null;
  make: string | null;
  model: string | null;
};

export type ResultDataRecognitionData = {
  recognition_data: {
    data: RecognitionDataType;
  };
};

// -- response scan insurance --
export interface RecognitionDataType {
  naic: string;
  agency: Agency;
  vehicles: Vehicles[];
  effective: Effective;
  expiration: Expiration;
  policy_number: string;
  covered_people: any[];
}

interface Agency {
  name: string;
  phone: string;
}

interface Effective {
  date: string;
}

interface Expiration {
  date: string;
}
export interface Vehicles {
  vin: string;
  make: string;
  year: number;
  model: string;
}

// -- Garage response data --

// TODO delete any
export type RootResponseGarage = {
  data: RootGarageItemsData[];
  links: RootObjectLinks;
  meta: RootMeta;
};
export type RootObjectDataUsersContactsEmails = {
  type: string;
  value: string;
};
export type RootObjectDataUsersContactsHometown_addressMap = {
  lat?: any;
  lng?: any;
};
export type RootObjectDataUsersContactsHometown_address = {
  physical_address?: any;
  map: RootObjectDataUsersContactsHometown_addressMap;
};
export type RootObjectDataUsersContactsOther_addressMap = {
  lat?: any;
  lng?: any;
};
export type RootObjectDataUsersContactsOther_address = {
  physical_address?: any;
  map: RootObjectDataUsersContactsOther_addressMap;
};
export type RootObjectDataUsersContactsCurrent_addressMap = {
  lat?: any;
  lng?: any;
};
export type RootObjectDataUsersContactsCurrent_address = {
  physical_address?: any;
  map: RootObjectDataUsersContactsCurrent_addressMap;
};
export type RootObjectDataUsersContacts = {
  is_company: boolean;
  is_same_hometown: boolean;
  note?: any;
  company?: any;
  phones: any[];
  emails: RootObjectDataUsersContactsEmails[];
  socials: any[];
  urls: any[];
  hometown_address: RootObjectDataUsersContactsHometown_address;
  school_address: any[];
  other_address: RootObjectDataUsersContactsOther_address;
  current_address: RootObjectDataUsersContactsCurrent_address;
};
export type RootObjectDataUsers = {
  role: string;
  position: number;
  permissions: any[];
  id: number;
  is_fake: boolean;
  first_name: string;
  last_name: string;
  avatar?: any;
  contacts: RootObjectDataUsersContacts;
  package: string;
  connection_role?: any;
  entity_type?: any;
};
export type RootGarageItemsData = {
  id: number;
  is_public: boolean;
  transport_type: string;
  year: number;
  make: string;
  model: string;
  style?: any;
  body?: any;
  trim?: any;
  description?: any;
  exterior_color?: any;
  interior_color?: any;
  fuel_type?: any;
  hybrid_type?: any;
  engine_type?: any;
  transmission?: any;
  country_of_assembly?: any;
  mileage?: any;
  drivetrain?: any;
  vin?: any;
  state_on_license_plate?: any;
  license_plate?: any;
  purchase?: any;
  created_at: string;
  updated_at: string;
  photos: any[];
  documents: any[];
  cover_photo?: any;
  position: number;
  steps: any[];
  insurances: any[];
  stickers: any[];
  licenses: any[];

  owner: RootObjectDataOwner | any;
  current: RootObjectDataCurrent;
  users: RootObjectDataUsers[] | any;
};
export type RootObjectLinks = {
  first: string;
  last: string;
  prev?: any;
  next?: any;
};
export type RootObjectMetaLinks = {
  url?: any;
  label: string;
  active: boolean;
};
export type RootMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: RootObjectMetaLinks[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type RootObjectDataOwnerContactsEmails = {
  type: string;
  value: string;
};
export type RootObjectDataOwnerContactsHometown_addressMap = {
  lat?: any;
  lng?: any;
};
export type RootObjectDataOwnerContactsHometown_address = {
  physical_address?: any;
  map: RootObjectDataOwnerContactsHometown_addressMap;
};
export type RootObjectDataOwnerContactsOther_addressMap = {
  lat?: any;
  lng?: any;
};
export type RootObjectDataOwnerContactsOther_address = {
  physical_address?: any;
  map: RootObjectDataOwnerContactsOther_addressMap;
};
export type RootObjectDataOwnerContactsCurrent_addressMap = {
  lat?: any;
  lng?: any;
};
export type RootObjectDataOwnerContactsCurrent_address = {
  physical_address?: any;
  map: RootObjectDataOwnerContactsCurrent_addressMap;
};
export type RootObjectDataOwnerContacts = {
  is_company: boolean;
  is_same_hometown: boolean;
  note?: any;
  company?: any;
  phones: any[];
  emails: RootObjectDataOwnerContactsEmails[];
  socials: any[];
  urls: any[];
  hometown_address: RootObjectDataOwnerContactsHometown_address;
  school_address: any[];
  other_address: RootObjectDataOwnerContactsOther_address;
  current_address: RootObjectDataOwnerContactsCurrent_address;
};
export type RootObjectDataOwner = {
  role: string;
  confirm_status?: any;
  position: number;
  permissions: any[];
  id: number;
  is_fake: boolean;
  first_name: string;
  last_name: string;
  avatar?: any;
  contacts: RootObjectDataOwnerContacts;
  package: string;
  connection_role?: any;
  entity_type?: any;
};
export type RootObjectDataCurrentContactsEmails = {
  type: string;
  value: string;
};
export type RootObjectDataCurrentContactsHometown_addressMap = {
  lat?: any;
  lng?: any;
};
export type RootObjectDataCurrentContactsHometown_address = {
  physical_address?: any;
  map: RootObjectDataCurrentContactsHometown_addressMap;
};
export type RootObjectDataCurrentContactsOther_addressMap = {
  lat?: any;
  lng?: any;
};
export type RootObjectDataCurrentContactsOther_address = {
  physical_address?: any;
  map: RootObjectDataCurrentContactsOther_addressMap;
};
export type RootObjectDataCurrentContactsCurrent_addressMap = {
  lat?: any;
  lng?: any;
};
export type RootObjectDataCurrentContactsCurrent_address = {
  physical_address?: any;
  map: RootObjectDataCurrentContactsCurrent_addressMap;
};
export type RootObjectDataCurrentContacts = {
  is_company: boolean;
  is_same_hometown: boolean;
  note?: any;
  company?: any;
  phones: any[];
  emails: RootObjectDataCurrentContactsEmails[];
  socials: any[];
  urls: any[];
  hometown_address: RootObjectDataCurrentContactsHometown_address;
  school_address: any[];
  other_address: RootObjectDataCurrentContactsOther_address;
  current_address: RootObjectDataCurrentContactsCurrent_address;
};
export type RootObjectDataCurrent = {
  role: string;
  confirm_status?: any;
  position: number;
  permissions: any[];
  id: number;
  is_fake: boolean;
  first_name: string;
  last_name: string;
  avatar?: any;
  contacts: RootObjectDataCurrentContacts;
  package: string;
  connection_role?: any;
  entity_type?: any;
};
