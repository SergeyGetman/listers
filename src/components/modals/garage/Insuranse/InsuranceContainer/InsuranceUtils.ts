import moment from 'moment';
import { FrequencyTypeConfig } from '../../../../../shared/configs/selectors/insurance.config';
import { InsuranceRequestModel } from '../../../../../shared/models/insurance.model';
import { MediaType } from '../../../../../shared/models/media.model';
import { OptionType } from '../../../../formElements/MuiSelect/MuiSelect';

export type InsuranceForm = {
  issued_by: string;
  policy_number: string;
  naic: string;
  effective: {
    date: Date | null;
    is_notify: boolean;
  };
  expiration: {
    date: Date | null;
    is_notify: boolean;
  };
  payment_due_day: {
    date: Date | null;
    is_notify: boolean;
  };
  is_paid_in_full: boolean;
  discount: number | null;
  paid: number | null;
  frequency: OptionType;
  amount: null | number;
  account_balance: null | number;
  minimum_due: null | number;
  collision: null | number;
  comprehensive: null | number;
  insurance_card_front: MediaType[];
  insurance_card_back: MediaType[];
  agency: {
    newName?: { value: string; label: string };
    name: { value: string; label: string } | null;
    address: {
      address: string;
      map?: {
        lat: number;
        lng: number;
      };
    };
    emails: {
      email: string;
    }[];
    phones: {
      phone: string;
      country: string;
    }[];
    sites: {
      url: string;
      login: string;
      password: string;
    }[];
  };
  agents: {
    name: { value: string; label: string } | null;
    emails: {
      email: string;
    }[];
    phones: {
      phone: string;
      country: string;
    }[];
  }[];
  covered_people: { full_name: string }[];
  documents: MediaType[];
};

export const insuranceDefaultValues: InsuranceForm = {
  issued_by: '',
  policy_number: '',
  naic: '',
  effective: {
    date: null,
    is_notify: false,
  },
  expiration: {
    date: null,
    is_notify: false,
  },
  payment_due_day: {
    date: null,
    is_notify: false,
  },
  frequency: { value: 'none', label: 'None' },
  is_paid_in_full: false,
  discount: null,
  paid: null,
  amount: null,
  account_balance: null,
  minimum_due: 0,
  collision: null,
  comprehensive: null,
  documents: [],
  insurance_card_front: [],
  insurance_card_back: [],
  agency: {
    name: null,
    address: {
      address: '',
    },
    emails: [
      {
        email: '',
      },
    ],
    phones: [
      {
        phone: '',
        country: '',
      },
    ],
    sites: [
      {
        url: '',
        login: '',
        password: '',
      },
    ],
  },
  agents: [
    {
      name: null,

      emails: [
        {
          email: '',
        },
      ],
      phones: [
        {
          phone: '',
          country: '',
        },
      ],
    },
  ],
  covered_people: [{ full_name: '' }],
};

export const insuranceFormToRequest = (form: InsuranceForm, id: number): InsuranceRequestModel => {
  const newData = {
    entity_type: 'transport',
    entity_id: id,
    issued_by: form.issued_by || null,
    policy_number: form.policy_number || null,
    effective: { ...form.effective, date: moment(form.effective.date).format('YYYY-MM-DD') },
    expiration: { ...form.expiration, date: moment(form.expiration.date).format('YYYY-MM-DD') },
    amount: form.amount,
    account_balance: form.account_balance,
    minimum_due: form.minimum_due,
    payment_due_day: form.payment_due_day.date
      ? {
          ...form.payment_due_day,
          date: moment(form.payment_due_day.date).format('YYYY-MM-DD'),
        }
      : null,
    frequency: form.frequency.value,
    is_paid_in_full: form.is_paid_in_full,
    discount: form.discount,
    paid: form.paid,
    naic: form.naic || null,
    covered_people: form.covered_people.filter((item) => item.full_name.trim() !== ''),
    collision: form.collision,
    comprehensive: form.comprehensive,
    documents: form.documents.map((item) => ({ id: item.id })),
    insurance_card_front: form.insurance_card_front.map((item) => ({ id: item.id })),
    insurance_card_back: form.insurance_card_back.map((item) => ({ id: item.id })),
    agency: {
      name: form.agency.name?.label || '',
      address: form.agency.address.address ? form.agency.address : null,
      phones: form.agency.phones.filter((item) => item.phone.trim() !== ''),
      emails: form.agency.emails.filter((item) => item.email.trim() !== ''),
      sites: form.agency.sites
        .filter((item) => item.url.trim() !== '' || item.login.trim() !== '' || item.password.trim() !== '')
        .map((el) => ({
          ...el,
          login: el.login === null ? '' : el.login,
          password: el.password === null ? '' : el.password,
        })),
    },
    agents: form.agents
      .map((agent) => ({
        ...agent,
        name: agent.name?.label || '',
        phones: agent.phones.filter((item) => item.phone.trim() !== ''),
        emails: agent.emails.filter((item) => item.email.trim() !== ''),
      }))
      .filter((el) => el.emails.length > 0 || el.phones.length > 0 || el.name.trim() !== ''),
  };

  return newData;
};

export const insuranceRequestToForm = (data: InsuranceRequestModel): InsuranceForm => {
  return {
    issued_by: data.issued_by || '',
    policy_number: data.policy_number || '',
    naic: data.naic || '',
    effective: { ...data.effective, date: moment(data.effective.date).toDate() },
    expiration: { ...data.expiration, date: moment(data.expiration.date).toDate() },
    payment_due_day: data.payment_due_day?.date
      ? {
          date: moment(data.payment_due_day.date).toDate(),
          is_notify: !!data.payment_due_day.is_notify,
        }
      : insuranceDefaultValues.payment_due_day,
    frequency: FrequencyTypeConfig[data.frequency],
    amount: data.amount,
    account_balance: data.account_balance,
    minimum_due: data.minimum_due,
    collision: data.collision,
    comprehensive: data.comprehensive,
    documents: data.documents as MediaType[],
    insurance_card_front: data.insurance_card_front as MediaType[],
    insurance_card_back: data.insurance_card_back as MediaType[],
    is_paid_in_full: data.is_paid_in_full,
    discount: data.discount,
    paid: data.paid,
    agency: {
      name: data.agency?.name ? { value: data.agency?.name, label: data.agency?.name } : null,
      address: data.agency?.address || insuranceDefaultValues.agency.address,
      emails: data.agency?.emails.length > 0 ? data.agency?.emails : insuranceDefaultValues.agency.emails,
      phones: data.agency?.phones.length > 0 ? data.agency?.phones : insuranceDefaultValues.agency.phones,
      sites: data.agency?.sites.length > 0 ? data.agency?.sites : insuranceDefaultValues.agency.sites,
    },
    agents:
      data.agents.length > 0
        ? data.agents.map((item) => ({
            name: item.name ? { value: item.name, label: item.name } : null,
            emails: item.emails.length > 0 ? item.emails : insuranceDefaultValues.agents[0].emails,
            phones: item.phones.length > 0 ? item.phones : insuranceDefaultValues.agents[0].phones,
          }))
        : insuranceDefaultValues.agents,
    covered_people:
      data.covered_people.length > 0 ? data.covered_people : insuranceDefaultValues.covered_people,
  };
};
