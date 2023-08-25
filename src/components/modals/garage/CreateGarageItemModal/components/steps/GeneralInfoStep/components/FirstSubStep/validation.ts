import * as Yup from 'yup';
import i18next from 'i18next';

export const validation = Yup.object().shape({
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
    if (option.value?.trim()?.length < 2) {
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
    if (option && option.value?.trim()?.length < 2) {
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
    if (option && option.value?.trim()?.length < 2) {
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
    if (option && option.value?.trim()?.length < 2) {
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
});

export const validationV2 = Yup.object().shape({
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
});
