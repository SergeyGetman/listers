import { Control } from 'react-hook-form';
import { OptionType } from '../../../components/formElements/MuiSelect/types';
import { TransportFuelTypeEnum, TransportTypeEnum } from '../../../shared/enums/garage.enums';
import { IOption } from './GarageNewCarInfo/types';

type SelectType = OptionType | null;
export type FormTypeGeneralInfo = {
  transport_type: TransportTypeEnum;
  year: SelectType;
  make: SelectType;
  model: SelectType;
  style: SelectType;
  trim: SelectType;
  body: SelectType;
  exterior_color: SelectType;
  interior_color: SelectType;
  fuel_type: TransportFuelTypeEnum;
  engine_type: string;
  transmission: SelectType;
  mileage: string;
  drivetrain: string;
  country_of_assembly?: string;
  vin: string;
  state: string;
  number: string;
  description?: any;
};

export type FormMoreDetails = {
  body: string | number | IOption;
  trim: string | IOption;
  exterior_color: string | IOption;
  interior_color: string | IOption;
  fuel_type: string | IOption;
  engine_type: string;
  transmission: string | IOption;
  mileage: string | IOption;
  drivetrain: string | IOption;
  country_of_assembly: string;
  vin: string | number;
};

export type FormMotoBlock = {
  style: string | number;
  trim: string | IOption;
  fuel_type: string;
  exterior_color: string | IOption;
  engine_type: string;
  transmission: string | IOption;
  mileage: string | IOption;
  drivetrain: string | IOption;
  country_of_assembly: string;
  vin: string | number;
};

export type FormCustomBlock = {
  type_of_vehicle: string;
  interior_color: string | IOption;
  exterior_color: string | IOption;
  engine_type: string;
  transmission: string | IOption;
  mileage: string | IOption;
  drivetrain: string | IOption;
  country_of_assembly: string;
  vin: string | number;
};

export interface TransportData {
  id?: number;
  style?: string;
  trim?: string;
  body?: string;
  exterior_color?: string;
  interior_color?: string;
  fuel_type?: string;
  hybrid_type?: string;
  engine_type?: string;
  transmission?: string;
  country_of_assembly?: string;
  mileage?: string;
  drivetrain?: string;
  state_on_license_plate?: string;
  license_plate?: string;
  purchase?: string;
  vin?: string;
  description?: string;
  documents?: any[];
}

export type GarageEditorContainerProps = {
  control?: Control<any>;
  blockTitle?: string;
  label?: string;
  isShowHint?: boolean;
  maxHintValue?: number;
  placeholder?: string;
};
