import i18next from 'i18next';
import * as Yup from 'yup';

export const transportLicenseSchema = Yup.object().shape({
  renewal_fee: Yup.mixed().test('renewal_fee', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
  registration_id: Yup.string()
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
      field: i18next.t('general.fieldNames.pin'),
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

  administrative_fee: Yup.mixed().test('renewal_fee', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
  late_fee: Yup.mixed().test('renewal_fee', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
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
  name: Yup.mixed().test('type', function (value) {
    if (value !== null && value.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.name'),
          count: 2,
        }),
      });
    }

    if (value !== null && value.value.trim().length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.name'),
          count: 72,
        }),
      });
    }

    if (
      (this.parent.state !== null ||
        this.parent.county !== null ||
        !!this.parent.address?.address !== false) &&
      value === null
    ) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.required', {
          field: i18next.t('general.fieldNames.name'),
        }),
      });
    }

    return true;
  }),
  address: Yup.mixed().test('type', function (value) {
    if (value && value.address && value.map.lat === null) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
});
