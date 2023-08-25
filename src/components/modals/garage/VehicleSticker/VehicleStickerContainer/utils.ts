import moment from 'moment';
import { YesNoEnum } from '../../../../../shared/enums/gender.enum';
import {
  CreateTransportStickerModel,
  TransportStickerModel,
} from '../../../../../shared/models/garage.model';
import { getSelectOption } from '../../../../../shared/utils/generateSelectOptions';
import { FormStickerType } from './VehicleStickerContainer';

export const transportStickerFromToRequest = (
  {
    purchase_date,
    expiration,
    zone,
    zone_fee,
    sticker_fee,
    reference,
    number,
    late_fee,
    administrative_fee,
    renew,
    login,
    password,
    zone_number,
    name,
    address,
    type,
    documents,
  }: FormStickerType,
  id: number,
): CreateTransportStickerModel => {
  return {
    purchase_date: moment(purchase_date).format('YYYY-MM-DD'),
    transport_id: id,
    expiration: {
      date: moment(expiration.date).format('YYYY-MM'),
      is_notify: expiration.is_notify,
    },
    reference: reference || null,
    number: number || null,
    sticker_fee: sticker_fee,
    zone: zone?.value === YesNoEnum.yes ? true : false,
    zone_fee: zone_fee,
    zone_number: zone_number || null,
    late_fee: late_fee,
    type: type?.value || null,
    administrative_fee: administrative_fee,
    renew: renew.trim() !== '' ? renew : null,
    login: login.trim() !== '' ? login : null,
    password: password.trim() !== '' ? password : null,
    name: name === null ? null : name.label,
    address: address.address ? (address as { address: string; map: { lat: number; lng: number } }) : null,
    documents: documents.map((item) => ({ id: item.id })),
  };
};

export const transportStickerRequestToForm = (data: TransportStickerModel): FormStickerType => {
  const newData = {
    purchase_date: moment(data.purchase_date).toDate(),
    transport_id: data.transport_id,
    expiration: {
      date: moment(data.expiration.date).toDate(),
      is_notify: data.expiration.is_notify,
    },
    reference: data.reference || '',
    number: data.number || '',
    zone_fee: data.zone_fee,
    late_fee: data.late_fee,
    administrative_fee: data.administrative_fee,
    zone_number: data.zone_number || null,
    sticker_fee: data.sticker_fee,
    zone: getSelectOption(data.zone ? YesNoEnum.yes : YesNoEnum.no, 'general.buttons'),
    type: data.type ? getSelectOption(data.type, 'garage.stickerType') : null,
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
    documents: data.documents,
    id: data.id,
  };
  return newData;
};
