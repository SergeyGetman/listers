import * as Yup from 'yup';
import i18next from '../locales/i18n';

export const getTodoValidationSchema = () => {
  return Yup.object({
    title: Yup.string()
      .trim()
      .test({
        name: 'title',
        test: (middle_name, schema) => {
          if (!!middle_name && middle_name.length >= 1 && middle_name.length <= 1) {
            return schema.createError({
              path: schema.path,
              message: i18next.t('validation.general.min', {
                field: i18next.t('general.fieldNames.title'),
                count: 2,
              }),
            });
          }
          return true;
        },
      })
      .max(36, i18next.t('validation.title.max', { count: 36 })),
  });
};
