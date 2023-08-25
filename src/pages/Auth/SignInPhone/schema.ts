import * as Yup from 'yup';
import i18next from '../../../shared/locales/i18n';

export const signInPhoneValidationSchema = Yup.object().shape({
  login: Yup.string()
    .trim()
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.phoneNumber'),
      }),
    )
    .max(
      15,
      i18next.t('validation.general.onlyDigits', {
        field: i18next.t('general.fieldNames.phoneNumber'),
        count: 15,
      }),
    ),
});
