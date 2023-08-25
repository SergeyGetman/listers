import { MediaType } from './media.model';

export type InsuranceModel = {
  id?: number;
  entity_type: string | null;
  entity_id: number | null;
  issued_by: string | null;
  policy_number: string | null;
  effective: Date;
  expiration: Date;
  amount: number | null;
  account_balance: number | null;
  discount: number | null;
  minimum_due: number | null;
  payment_due_day: Date | null;
  is_paid_in_full: boolean;
  paid: number | null;
  frequency: string;
  naic: string | null;
  covered_people: Coveredperson[];
  collision: number | null;
  comprehensive: number | null;
  documents: MediaType[];
  insurance_card_front: MediaType[];
  insurance_card_back: MediaType[];
  agency: Agency;
  agents: Agents[];
};

export type InsuranceRequestModel = {
  id?: number;
  entity_type: string | null;
  entity_id: number | null;
  issued_by: string | null;
  policy_number: string | null;
  effective: Date;
  expiration: Date;
  amount: number | null;
  account_balance: number | null;
  discount: number | null;
  paid: number | null;
  minimum_due: number | null;
  payment_due_day: Date | null;
  frequency: string;
  naic: string | null;
  covered_people: Coveredperson[];
  is_paid_in_full: boolean;
  collision: number | null;
  comprehensive: number | null;
  documents: Document[];
  insurance_card_front: Document[];
  insurance_card_back: Document[];
  agency: Agency;
  agents: Agents[];
};

type Agency = {
  name: string;
  address: Address | null;
  emails: Email[];
  phones: Phone[];
  sites: Site[];
};

type Agents = {
  name: string;
  emails: Email[];
  phones: Phone[];
};

type Site = {
  url: string;
  login: string;
  password: string;
};

type Phone = {
  phone: string;
  country: string;
};

type Email = {
  email: string;
};

type Address = {
  address: string;
  map?: Map;
};

type Map = {
  lat: number;
  lng: number;
};

type Document = {
  id: number;
};

type Coveredperson = {
  full_name: string;
};

type Date = {
  date: string;
  is_notify: boolean;
};
