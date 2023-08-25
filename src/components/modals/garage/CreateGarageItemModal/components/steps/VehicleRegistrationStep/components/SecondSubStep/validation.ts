import * as Yup from 'yup';
import i18next from 'i18next';

export const validation = Yup.object().shape({
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
});
