import { FieldsTypeEnum } from '../../enums/phoneType.enum';

export interface ProfileContactsFormModel {
  phones: {
    type: FieldsTypeEnum | null;
    country?: string;
    value: string;
  }[];
  emails: { type: FieldsTypeEnum | null; value: string }[];
  addresses: {
    type: FieldsTypeEnum;
    map: {
      lat: number;
      lng: number;
    };
    address: string;
  }[];
  is_same_hometown: boolean;
}
