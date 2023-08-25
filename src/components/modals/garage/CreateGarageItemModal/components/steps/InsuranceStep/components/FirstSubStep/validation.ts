import * as Yup from 'yup';
import i18next from 'i18next';

export const validation = Yup.object().shape({
  issued_by: Yup.string()
    .test('issued_by', function (value) {
      if (value && value.trim().length < 2) {
        return this.createError({
          path: this.path,
          message: i18next.t('validation.general.min', {
            field: i18next.t('general.fieldNames.issuedBy'),
            count: 2,
          }),
        });
      }

      return true;
    })
    .max(
      255,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.issuedBy'),
        count: 255,
      }),
    ),
  policy_number: Yup.string()
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.policyNumber'),
      }),
    )
    .max(
      255,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.policyNumber'),
        count: 255,
      }),
    ),
  naic: Yup.string().max(
    255,
    i18next.t('validation.general.max', {
      field: i18next.t('general.fieldNames.naic'),
      count: 255,
    }),
  ),
  collision: Yup.mixed().test('collision', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
  comprehensive: Yup.mixed().test('comprehensive', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
});
