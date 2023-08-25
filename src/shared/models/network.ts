import { AvatarModel } from './avatar.model';
import { MediaType } from './media.model';
import { FieldsTypeEnum } from '../enums/phoneType.enum';
import { TagsConfigType } from '../configs/tags.config';
import { EmailOrPhone } from './emailOrPhone.model';

export type PhoneType = {
  type: string;
  value: string;
  country?: string;
};

export type EmailType = {
  type: string;
  value: string;
};

export type AddressType = {
  map: { lat: number | null; lng: number | null };
  physical_address: string | null;
};

export type UserPartInformation = {
  current_address: AddressType;
  emails: EmailType[];
  hometown_address: AddressType;
  phones: PhoneType[];
};

export type InviteUser = {
  avatar: AvatarModel;
  id: number;
  last_name: string;
  first_name: string;
  selectedRole?: string;
  userLoading?: boolean;
  isSendInvite?: boolean;
};

export type ContactsType = {
  is_company: boolean;
  is_same_hometown: boolean;
  note?: string;
  company: string;
  contact_list: EmailOrPhone[];
  socials: { value: string; type: string }[];
  urls: { value: string; type: string }[];
  addresses: {
    map: {
      lat: number;
      lng: number;
    };
    address: string;
    type: FieldsTypeEnum;
  }[];
};

export type NetworkUserModel = {
  id: number;
  friend_id: number;
  tag?: string;
  avatar: AvatarModel;
  email: string;
  company?: string | null;
  contacts: ContactsType | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  middle_name: null | string;
  gender: string;
  data: null;
  role: string;
  description: null | string;
  user_id: number;
  sender_id: number;
  birth_day?: null | string;
  recipient_id: number;
  entity_type: string;
  canceled_at: null | string;
  is_invited: boolean;
  chat_id: number | null;
  full_name: string;
  is_resend: boolean;
};

export type CreateContactModel = {
  first_name: string;
  tag_id: TagsConfigType | null | any;
  last_name: string;
  country: string;
  role: string | null;
  birth_day: string | null;
  gender: string | null;
  documents: { id: number }[];
  contacts: ContactsType;
};

export type ConnectedUserModel = {
  id: number;
  note?: any;
  description: string | null;
  gender: string | null;
  full_name: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  birth_day: null | string;
  relationship_status: string | null;
  last_activated_at: string | null;
  activated_at: string | null;
  avatar: AvatarModel;
  // TODO avatars[]?????
  avatars: [];
  package: string | null;
  is_contact: boolean;
  contacts: ContactsType;
  // TODO Didn't do the below. Continue when user modal will be developed
  appearance: {
    hair: {
      color: null;
      length: null;
      type: null;
    };
    eye: {
      color: null;
      wear: null;
    };
    body: {
      height: null;
      weight: null;
      type: null;
      bust_cup: null;
      bust: null;
      waist: null;
      hips: null;
      shoe_size: null;
    };
  };
  bodyArts: [];
  education: [];
  work: [];
  gallery: [];
  recipient_request: {
    id: number;
    sender_id: number;
    recipient_id: number;
    is_contact: number;
    role: string;
    status: string;
    first_name: null;
    last_name: null;
    email: null;
    phone: null;
    comment: null;
    company: null;
    canceled_at: null;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    isResend: false;
    media: [];
  };
  allow: [];
  background: null;
  documents: MediaType[];
  attached_documents: [];
};
