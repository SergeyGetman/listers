export type ProfileSettingsModel = {
  email?: string;
  phone?: string;
  social: {
    apple: boolean;
    feedback: boolean;
    google: boolean;
  };
  subscription: {
    is_trial: boolean;
    is_package_created: boolean;
    package: string;
    package_canceled?: string;
    package_end?: string;
    package_id: number;
    real_package_end?: string;
    timezone: string;
    timezone_name: string;
  };
  unverified_login: {
    email?: string;
    phone?: string;
  };
};
