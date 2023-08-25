import { OptionType } from '../../../../../../../../formElements/MuiSelect/types';
import { TransportTypeEnum } from '../../../../../../../../../shared/enums/garage.enums';

type SelectType = OptionType | null;
export type FormType = {
  transport_type: TransportTypeEnum;
  year: SelectType;
  make: SelectType;
  model: SelectType;
  style: SelectType;
  trim: SelectType;
  body: SelectType;
  exterior_color: SelectType;
  interior_color: SelectType;
};
