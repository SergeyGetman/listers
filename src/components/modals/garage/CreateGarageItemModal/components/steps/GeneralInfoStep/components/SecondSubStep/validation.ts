import * as Yup from 'yup';
import i18next from 'i18next';

export const validation = Yup.object().shape({
  fuel_type: Yup.mixed().test('fuel_type', function (option) {
    if (option && option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.fuelType'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.fuelType'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  hybrid_type: Yup.mixed().test('hybrid_type', function (option) {
    if (option && option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.hybridType'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.hybridType'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  transmission: Yup.mixed().test('transmission', function (option) {
    if (option && option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.transmission'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.transmission'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  engine_type: Yup.string().test('engine_type', function (option) {
    if (option && option.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.engineType'),
          count: 2,
        }),
      });
    }
    if (option && option?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.engineType'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  country_of_assembly: Yup.string().test('country_of_assembly', function (option) {
    if (option && option.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.countryOfAssembly'),
          count: 2,
        }),
      });
    }
    if (option && option?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.countryOfAssembly'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  mileage: Yup.string().test('mileage', function (option) {
    if (option && option.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.mileage'),
          count: 2,
        }),
      });
    }
    if (option && option?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.mileage'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  drivetrain: Yup.string().test('drivetrain', function (option) {
    if (option && option.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.drivetrain'),
          count: 2,
        }),
      });
    }
    if (option && option?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.drivetrain'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  vin: Yup.string().test('state_on_license_plate', function (option) {
    if (option && option.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.vinNumber'),
          count: 2,
        }),
      });
    }
    if (option && option?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.vinNumber'),
          count: 72,
        }),
      });
    }
    return true;
  }),
});
