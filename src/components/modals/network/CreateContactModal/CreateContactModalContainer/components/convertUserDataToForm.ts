import moment from 'moment';
import { ConnectedUserModel } from '../../../../../../shared/models/network';
import { FieldTypeConfig } from '../../../../../../shared/configs/selectors/fieldType.config';
import { GenderConfig } from '../../../../../../shared/configs/gender.config';

const toOptionType = (value: string) => ({
  value,
  label: FieldTypeConfig[value]?.label ? FieldTypeConfig[value]?.label : GenderConfig[value]?.label,
});

export const convertUserDataToForm = (user: ConnectedUserModel) => {
  const newData = {
    first_name: user.first_name ? user.first_name : '',
    last_name: user.last_name ? user.last_name : '',
    country: '',
    birth_day: user.birth_day ? moment(user.birth_day).toDate() : null,
    gender: user.gender ? toOptionType(user.gender) : null,
    documents: user.attached_documents,
    role: user.recipient_request.role,
  };
  return newData;
};
