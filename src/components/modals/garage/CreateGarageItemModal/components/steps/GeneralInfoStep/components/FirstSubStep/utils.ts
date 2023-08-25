import moment from 'moment';
import { FormType } from './types';

export const formatFormDataForRequest = (formData: FormType) => {
  return {
    transport_type: formData.transport_type,
    year: formData.year ? +moment(formData.year.value).format('YYYY') : null,
    make: formData.make ? formData.make.value : null,
    model: formData.model ? formData.model.value : null,
    style: formData.style ? formData.style.value : null,
    trim: formData.trim ? formData.trim.value : null,
    body: formData.body ? formData.body.value : null,
    exterior_color: formData.exterior_color ? formData.exterior_color.value : null,
    interior_color: formData.interior_color ? formData.interior_color.value : null,
  };
};
