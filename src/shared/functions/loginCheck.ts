import { parsePhoneNumber } from 'react-phone-number-input';
import { validateEmail } from './validationEmail';
import i18next from '../locales/i18n';
export const loginCheck = (data: string) => {
  const trimData = data.trim();

  if (validateEmail(trimData)) {
    return {
      login: trimData,
    };
  }

  const phoneNumber = parsePhoneNumber(trimData);

  if (phoneNumber && phoneNumber.isValid()) {
    return {
      login: phoneNumber.number,
      country: phoneNumber.country,
    };
  }

  // Return an error if a number is not starting with +
  if (!/^\+/.test(data[0]) && /^[0-9]+$/.test(data)) {
    throw new Error(i18next.t('general.errorMessage.phoneNumberRule'));
  }

  if (/^[0-9_@./#&-]+$/.test(data.slice(1, data.length))) {
    throw new Error(
      i18next.t('validation.general.formatInvalid', {
        field: i18next.t('general.containers.phoneNumber').toLowerCase(),
      }),
    );
  }

  if (/^[a-zA-Z_@./#&-]+$/.test(data.trim())) {
    throw new Error(
      i18next.t('validation.general.formatInvalid', {
        field: i18next.t('general.fieldNames.email').toLowerCase(),
      }),
    );
  }

  throw new Error(
    i18next.t('validation.general.formatInvalid', {
      field: i18next.t('general.fieldNames.login').toLowerCase(),
    }),
  );
};
