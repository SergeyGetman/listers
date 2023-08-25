export type UserContactModel = {
  current_address: {
    map: {
      lat?: number;
      lng?: number;
    };
    physical_address?: string;
  };
  emails: { type: string; value: string }[] | [];
  hometown_address: {
    map: {
      lat?: number;
      lng?: number;
    };
    physical_address?: string;
  };
  is_same_hometown: boolean;
  addresses?: {
    map: {
      lat?: number;
      lng?: number;
    };
    type?: string;
    physical_address?: string;
    address?: string;
  }[];
  phones: { type: string; value: string; country: string }[] | [];
  urls: { type: string; value: string }[];
  is_company: boolean;
  company?: string;
};
