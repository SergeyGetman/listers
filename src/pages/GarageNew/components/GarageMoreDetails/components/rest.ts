import { FormTypeGeneralInfo } from '../../types';
import {
  TransportBodyEnums,
  TransportColorEnum,
  TransportFuelTypeEnum,
  TransportMotorcycleType,
  TransportTransmissionTypeEnum,
  TransportTrimEnum,
  TransportTypeEnum,
  TransportTypeVehicle,
} from '../../../../../shared/enums/garage.enums';
import { generateSelectOptions } from '../../../../../shared/utils/generateSelectOptions';
import { USState } from '../../../enum/UsaStateEnum';

const initialValue: FormTypeGeneralInfo = {
  transport_type: TransportTypeEnum.car,
  year: null,
  make: null,
  model: null,
  style: null,
  trim: null,
  body: null,
  transmission: null,
  exterior_color: null,
  interior_color: null,
  fuel_type: TransportFuelTypeEnum.hybrid,
  vin: '',
  engine_type: '',
  mileage: '',
  drivetrain: '',
  country_of_assembly: '',
  state: '',
  number: '',
  description: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
};

export const initialValueMoreDetailBlock = {
  body: '',
  trim: '',
  exterior_color: '',
  interior_color: '',
  fuel_type: '',
  engine_type: '',
  transmission: '',
  mileage: '',
  drivetrain: '',
  country_of_assembly: '',
  vin: '',
};

export const initialValueMotoBlock = {
  body: '',
  trim: '',
  exterior_color: '',
  interior_color: '',
  fuel_type: '',
  engine_type: '',
  transmission: '',
  mileage: '',
  drivetrain: '',
  country_of_assembly: '',
  vin: '',
};

export const initialValueCustomBlock = {
  type_of_vehicle: '',
  exterior_color: '',
  fuel_type: '',
  interior_color: '',
  engine_type: '',
  transmission: '',
  mileage: '',
  drivetrain: '',
  country_of_assembly: '',
  vin: '',
};

const vehicleOptions = generateSelectOptions(Object.keys(TransportTypeVehicle), 'general.vehicleType');
const usaStateOptions = generateSelectOptions(Object.keys(USState), 'general.UsaState');
const bodyTypeOptions = generateSelectOptions(Object.values(TransportBodyEnums), 'garage.bodyType');
const motoBykeCircle = generateSelectOptions(Object.values(TransportMotorcycleType), 'garage.stickerType');
const trimTypeOptions = generateSelectOptions(Object.values(TransportTrimEnum), 'garage.trimType');
const colorTypeOptions = generateSelectOptions(Object.values(TransportColorEnum), 'garage.colorType');
const fuelTypeOptions = generateSelectOptions(Object.values(TransportFuelTypeEnum), 'garage.fuelType');
const transmissionTypeOptions = generateSelectOptions(
  Object.values(TransportTransmissionTypeEnum),
  'garage.transmissionType',
);

export const rest = {
  initialValue,
  bodyTypeOptions,
  trimTypeOptions,
  colorTypeOptions,
  fuelTypeOptions,
  transmissionTypeOptions,
  motoBykeCircle,
  usaStateOptions,
  vehicleOptions,
  initialValueMoreDetailBlock,
  initialValueMotoBlock,
  initialValueCustomBlock,
};
