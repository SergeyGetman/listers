import * as Yup from 'yup';
import i18next from '../../../shared/locales/i18n';

export const loginValidationSchema = Yup.object().shape({
  token: Yup.string()
    .trim()
    .required(
      i18next.t('validation.verificationCode.required', {
        field: i18next.t('general.fieldNames.code'),
      }),
    )
    .min(6, i18next.t('validation.verificationCode.min', { count: 6 }))
    .max(6, i18next.t('validation.verificationCode.max', { count: 6 })),
});
