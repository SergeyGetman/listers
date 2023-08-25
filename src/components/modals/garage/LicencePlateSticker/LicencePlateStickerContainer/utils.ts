import moment from 'moment';

import {
  CreateTransportLicenseModel,
  TransportLicenseModel,
} from '../../../../../shared/models/garage.model';
import { FormStickerLicenseValues } from './LicencePlateStickerContainer';

export const transportLicenseFormToRequest = ({
  purchase_date,
  expiration,
  pin_code,
  renewal_fee,
  late_fee,
  administrative_fee,
  renew,
  login,
  password,
  name,
  address,
  state,
  county,
  documents,
  registration_id,
}: FormStickerLicenseValues): CreateTransportLicenseModel => {
  return {
    purchase_date: moment(purchase_date).format('YYYY-MM-DD'),
    transport_id: 0,
    expiration: {
      date: moment(expiration.date).format('YYYY-MM'),
      is_notify: expiration.is_notify,
    },
    registration_id: registration_id || null,
    pin_code: pin_code.trim() !== '' ? pin_code : null,
    renewal_fee: renewal_fee,
    late_fee: late_fee,
    administrative_fee: administrative_fee,
    renew: renew.trim() !== '' ? renew : null,
    login: login.trim() !== '' ? login : null,
    password: password.trim() !== '' ? password : null,
    name: name === null ? null : name.label,
    address: address.address ? (address as { address: string; map: { lat: number; lng: number } }) : null,
    state: state === null ? null : state.value,
    county: county === null ? null : county.value,
    documents: documents.map(({ id }) => ({ id })),
  };
};

export const transportLicenseRequestToForm = (data: TransportLicenseModel): FormStickerLicenseValues => {
  const newData = {
    purchase_date: moment(data.purchase_date).toDate(),
    transport_id: data.transport_id,
    expiration: {
      date: moment(data.expiration.date).toDate(),
      is_notify: data.expiration.is_notify,
    },
    registration_id: data.registration_id,
    pin_code: data.pin_code || '',
    renewal_fee: data.renewal_fee,
    late_fee: data.late_fee,
    administrative_fee: data.administrative_fee,
    renew: data.renew || '',
    login: data.login || '',
    password: data.password || '',
    name: data.name !== null ? { value: data.name, label: data.name } : null,
    address:
      data.address === null
        ? {
            map: { lat: null, lng: null },
            address: null,
          }
        : data.address,
    state: data.state !== null ? { value: data.state, label: data.state } : null,
    county: data.county !== null ? { value: data.county, label: data.county } : null,
    documents: data.documents,
    id: data.id,
  };
  return newData;
};
