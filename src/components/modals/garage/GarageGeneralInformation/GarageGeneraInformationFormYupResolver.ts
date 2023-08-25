import * as Yup from 'yup';
import i18next from 'i18next';

export const garageGeneraInformationFormYupResolver = Yup.object().shape({
  transport_type: Yup.mixed().test('transport_type', function (option) {
    if (option === null) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.required', {
          field: i18next.t('general.fieldNames.transportType'),
        }),
      });
    }
    if (option?.value?.trim()?.length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.transportType'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.transportType'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  year: Yup.mixed().required(
    i18next.t('validation.general.required', {
      field: i18next.t('general.fieldNames.year'),
    }),
  ),
  make: Yup.mixed().test('make', function (option) {
    if (!option) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.required', {
          field: i18next.t('general.fieldNames.make'),
        }),
      });
    }

    if (option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.make'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.make'),
          count: 72,
        }),
      });
    }

    return true;
  }),
  model: Yup.mixed().test('make', function (option) {
    if (!option) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.required', {
          field: i18next.t('general.fieldNames.model'),
        }),
      });
    }
    if (option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.model'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.model'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  trim: Yup.mixed().test('trim', function (option) {
    if (option && option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.trim'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.trim'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  body: Yup.mixed().test('body', function (option) {
    if (option && option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.bodyStyle'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.bodyStyle'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  style: Yup.mixed().test('style', function (option) {
    if (option && option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.style'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.style'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  exterior_color: Yup.mixed().test('exterior_color', function (option) {
    if (option && option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.exteriorColor'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.exteriorColor'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  interior_color: Yup.mixed().test('interior_color', function (option) {
    if (option && option.value.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.interiorColor'),
          count: 2,
        }),
      });
    }
    if (option?.value?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.interiorColor'),
          count: 72,
        }),
      });
    }
    return true;
  }),
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
  state_on_license_plate: Yup.string().test('state_on_license_plate', function (option) {
    if (option && option.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.state'),
          count: 2,
        }),
      });
    }
    if (option && option?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.state'),
          count: 72,
        }),
      });
    }
    return true;
  }),
  license_plate: Yup.string().test('state_on_license_plate', function (option) {
    if (option && option.trim().length < 2) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.min', {
          field: i18next.t('general.fieldNames.number'),
          count: 2,
        }),
      });
    }
    if (option && option?.trim()?.length > 72) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.max', {
          field: i18next.t('general.fieldNames.number'),
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
