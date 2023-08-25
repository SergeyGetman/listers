import * as Yup from 'yup';
import i18next from 'i18next';

export const validation = Yup.object().shape({
  registration_id: Yup.string()
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.registrationID'),
      }),
    )
    .max(
      72,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.registrationID'),
        count: 72,
      }),
    )
    .nullable(),
  pin_code: Yup.string().max(
    32,
    i18next.t('validation.general.max', {
      field: i18next.t('general.fieldNames.pinCode'),
      count: 32,
    }),
  ),
  renew: Yup.string().max(
    255,
    i18next.t('validation.general.max', {
      field: i18next.t('general.fieldNames.website'),
      count: 255,
    }),
  ),
  login: Yup.string().max(
    255,
    i18next.t('validation.general.max', {
      field: i18next.t('general.fieldNames.login'),
      count: 255,
    }),
  ),
  password: Yup.string()
    .max(
      32,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.password'),
        count: 32,
      }),
    )
    .test('password', function (value) {
      if (value && value.trim() !== '' && value.length < 3) {
        return this.createError({
          path: this.path,
          message: i18next.t('validation.general.min', {
            field: i18next.t('general.fieldNames.password'),
            count: 3,
          }),
        });
      }
      return true;
    }),
});
