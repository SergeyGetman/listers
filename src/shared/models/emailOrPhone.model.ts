import { ContactTypeEnum } from '../enums/contactType.enum';

export type EmailOrPhone =
  | {
      type: string | null;
      contact_type: ContactTypeEnum;
      country: string;
      value: string;
    }
  | {
      type: string | null;
      contact_type: ContactTypeEnum;
      country?: string;
      value: string;
    };
