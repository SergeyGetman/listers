import * as Yup from 'yup';
import i18next from '../../../shared/locales/i18n';

export const signInEmailValidationSchema = Yup.object().shape({
  login: Yup.string()
    .trim()
    .email(
      i18next.t('validation.general.formatInvalid', {
        field: i18next.t('general.fieldNames.email'),
      }),
    )
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.email'),
      }),
    ),
});
