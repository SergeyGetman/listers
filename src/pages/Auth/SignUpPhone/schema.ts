import * as Yup from 'yup';
import i18next from '../../../shared/locales/i18n';

export const signUpPhoneValidationSchema = Yup.object().shape({
  login: Yup.string()
    .trim()
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.phoneNumber'),
      }),
    )
    .max(
      255,
      i18next.t('validation.general.invalidField', {
        field: i18next.t('general.fieldNames.phoneNumber'),
      }),
    ),
  first_name: Yup.string()
    .trim()
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.firstName'),
      }),
    )
    .matches(
      /^([^0-9]*)$/,
      i18next.t('validation.general.onlyCharacters', { field: i18next.t('general.fieldNames.firstName') }),
    )
    .min(
      2,
      i18next.t('validation.general.min', {
        field: i18next.t('general.fieldNames.firstName'),
        count: 2,
      }),
    )
    .max(
      36,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.firstName'),
        count: 36,
      }),
    ),
  last_name: Yup.string()
    .trim()
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.lastName'),
      }),
    )
    .matches(
      /^([^0-9]*)$/,
      i18next.t('validation.general.onlyCharacters', { field: i18next.t('general.fieldNames.lastName') }),
    )
    .min(
      2,
      i18next.t('validation.general.min', {
        field: i18next.t('general.fieldNames.lastName'),
        count: 2,
      }),
    )
    .max(
      36,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.lastName'),
        count: 36,
      }),
    ),
});
