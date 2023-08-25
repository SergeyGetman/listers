import { OptionType } from '../../../../../components/formElements/MuiSelect/types';

type SelectType = OptionType | null;
export type FormTypeDudictibles = {
  collision: SelectType;
  comprehensive: SelectType;
  amount: SelectType;
  peopleCovered: SelectType;
};
