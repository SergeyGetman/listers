import * as Yup from 'yup';
import i18next from '../../../shared/locales/i18n';

export const loginValidationSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.password'),
      }),
    )
    .min(8, i18next.t('validation.password.min', { count: 8 }))
    .max(32, i18next.t('validation.password.max', { count: 32 })),
  login: Yup.string()
    .trim()
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.login'),
      }),
    )
    .max(
      255,
      i18next.t('validation.general.invalidField', {
        field: i18next.t('general.fieldNames.login'),
      }),
    ),
});
