import moment from 'moment';

import htmlToDraft from 'html-to-draftjs';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { TransportGeneralInformationForm } from './GeneralnformationContainer/GeneralInformationContainer';
import { TransportItemModel } from '../../../../shared/models/garage.model';
import { getSelectOption } from '../../../../shared/utils/generateSelectOptions';

export const garageGeneralInfoFormToRequest = (form: TransportGeneralInformationForm) => {
  const newData = {
    transport_type: form.transport_type ? form.transport_type.value : null,
    year: form.year ? +moment(form.year.value).format('YYYY') : null,
    make: form.make ? form.make.value : null,
    model: form.model ? form.model.value : null,
    style: form.style ? form.style.value : null,
    trim: form.trim ? form.trim.value : null,
    body: form.body ? form.body.value : null,
    description:
      form.description.getCurrentContent().getPlainText().trim() !== ''
        ? draftToHtml(convertToRaw(form.description.getCurrentContent()))
        : '',
    exterior_color: form.exterior_color ? form.exterior_color.value : null,
    interior_color: form.interior_color ? form.interior_color.value : null,
    fuel_type: form.fuel_type ? form.fuel_type.value : null,
    hybrid_type: form.hybrid_type ? form.hybrid_type.value : null,
    engine_type: form.engine_type || null,
    transmission: form.transmission ? form.transmission.value : null,
    country_of_assembly: form.country_of_assembly || null,
    mileage: form.mileage || null,
    drivetrain: form.drivetrain || null,
    state_on_license_plate: form.state_on_license_plate || null,
    license_plate: form.license_plate || null,
    purchase: form.purchase || null,
    vin: form.vin || null,
    documents: form.documents.map((item) => ({ id: item.id })),
  };
  return newData;
};

export const garageGeneralInformationDataToForm = (data: TransportItemModel) => {
  const blocksFromHTML = htmlToDraft(data.description || '');
  const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
  const newData = {
    transport_type: getSelectOption(data.transport_type, 'garage.transportType'),
    year: getSelectOption(data.year, 'garage.transportType'),
    make: getSelectOption(data.make, 'garage.make'),
    model: getSelectOption(data.model, 'garage.model'),
    style: getSelectOption(data.style, 'garage.styleType'),
    trim: getSelectOption(data.trim, 'garage.trimType'),
    body: getSelectOption(data.body, 'garage.bodyType'),
    description: EditorState.createWithContent(contentState),
    exterior_color: getSelectOption(data.exterior_color, 'garage.colorType'),
    interior_color: getSelectOption(data.interior_color, 'garage.colorType'),
    fuel_type: getSelectOption(data.fuel_type, 'garage.fuelType'),
    hybrid_type: getSelectOption(data.hybrid_type, 'garage.hybridType'),
    engine_type: data.engine_type || '',
    transmission: getSelectOption(data.transmission, 'garage.transmissionType'),
    country_of_assembly: data.country_of_assembly || '',
    mileage: data.mileage || '',
    drivetrain: data.drivetrain || '',
    state_on_license_plate: data.state_on_license_plate || '',
    license_plate: data.license_plate || '',
    purchase: data.purchase || '',
    vin: data.vin || '',
    documents: data.documents,
  };
  return newData;
};
