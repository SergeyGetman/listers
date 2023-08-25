import * as Yup from 'yup';
import i18next from 'i18next';

export const validation = Yup.object().shape({
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
});
