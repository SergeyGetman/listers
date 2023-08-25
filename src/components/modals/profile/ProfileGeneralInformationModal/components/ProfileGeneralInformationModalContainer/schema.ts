import * as Yup from 'yup';
import i18next from '../../../../../../shared/locales/i18n';

export const ProfileGeneralInfoSchema = Yup.object().shape({
  first_name: Yup.string()
    .trim()
    .matches(
      /^([^0-9]*)$/,
      i18next.t('validation.general.onlyCharacters', { field: i18next.t('general.fieldNames.firstName') }),
    )
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.firstName'),
      }),
    )
    .min(
      2,
      i18next.t('validation.general.min', {
        field: i18next.t('general.fieldNames.firstName'),
        count: 2,
      }),
    )
    .max(
      36,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.firstName'),
        count: 36,
      }),
    ),
  last_name: Yup.string()
    .trim()
    .matches(
      /^([^0-9]*)$/,
      i18next.t('validation.general.onlyCharacters', { field: i18next.t('general.fieldNames.lastName') }),
    )
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.lastName'),
      }),
    )
    .min(
      2,
      i18next.t('validation.general.min', {
        field: i18next.t('general.fieldNames.lastName'),
        count: 2,
      }),
    )
    .max(
      36,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.lastName'),
        count: 36,
      }),
    ),
  middle_name: Yup.string()
    .test({
      name: 'middle_name',
      test: (middle_name, schema) => {
        if (!!middle_name && middle_name.length >= 1 && middle_name.length <= 1) {
          return schema.createError({
            path: schema.path,
            message: i18next.t('validation.general.min', {
              field: i18next.t('general.fieldNames.middleName'),
              count: 2,
            }),
          });
        }
        return true;
      },
    })
    .max(
      36,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.middleName'),
        count: 36,
      }),
    ),
});
