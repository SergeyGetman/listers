export interface IOption {
  value: string | number;
  label: string | number;
}

export interface IFormTypes {
  transport_type: string;
  year: IOption | string | number;
  make: IOption | string;
  model: IOption | string;
  setData?: any;
  readySubmit?: boolean;
}
