import i18next from 'i18next';
import * as Yup from 'yup';

export const transportStickerSchema = Yup.object().shape({
  reference: Yup.string()
    .max(
      72,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.reference'),
        count: 72,
      }),
    )
    .nullable(),
  number: Yup.string()
    .max(
      72,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.number'),
        count: 72,
      }),
    )
    .nullable(),
  zone_fee: Yup.mixed().test('renewal_fee', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
  sticker_fee: Yup.mixed().test('renewal_fee', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
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
  zone_number: Yup.mixed().test('zone_number', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    if (value && value.toString().length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.zoneNumber'),
          count: 72,
        }),
      });
    }
    return true;
  }),
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

    if (!!this.parent.address?.address !== false && value === null) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.required', {
          field: i18next.t('general.fieldNames.name'),
        }),
      });
    }
    return true;
  }),
});
