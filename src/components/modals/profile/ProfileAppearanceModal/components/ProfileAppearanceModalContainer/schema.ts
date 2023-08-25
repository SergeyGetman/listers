import * as Yup from 'yup';
import i18next from '../../../../../../shared/locales/i18n';

export const ProfileAppearanceSchema = Yup.object().shape({
  weight: Yup.lazy((value) => {
    return value === ''
      ? Yup.string()
      : Yup.number()
          .min(
            10,
            i18next.t('validation.general.numberMin', {
              field: i18next.t('general.fieldNames.weightLB'),
              count: 10,
            }),
          )
          .max(
            999,
            i18next.t('validation.general.numberMax', {
              field: i18next.t('general.fieldNames.weightLB'),
              count: 999,
            }),
          );
  }),
  heightIn: Yup.lazy((value) => {
    return value === ''
      ? Yup.string()
      : Yup.number().max(
          11,
          i18next.t('validation.general.numberMax', {
            field: i18next.t('general.fieldNames.heightIN'),
            count: 11,
          }),
        );
  }),

  heightFt: Yup.lazy((value) => {
    return value === ''
      ? Yup.string().test({
          name: 'heightIn',
          test: (heightFt, schema) => {
            // @ts-ignore
            if (schema.parent.heightIn && schema.parent.heightIn > 1 && +heightFt < 1) {
              return schema.createError({
                path: schema.path,
                message: i18next.t('validation.general.required', {
                  field: i18next.t('general.fieldNames.heightFT'),
                }),
              });
            }
            return true;
          },
        })
      : Yup.number()
          .min(
            2,
            i18next.t('validation.general.numberMin', {
              field: i18next.t('general.fieldNames.heightFT'),
              count: 2,
            }),
          )
          .max(
            7,
            i18next.t('validation.general.numberMax', {
              field: i18next.t('general.fieldNames.heightFT'),
              count: 7,
            }),
          )
          .test({
            name: 'heightFt',
            test: (heightFt, schema) => {
              // @ts-ignore
              if (schema.parent.heightIn >= 1 && +heightFt < 1) {
                return schema.createError({
                  path: schema.path,
                  message: i18next.t('validation.general.required', {
                    field: i18next.t('general.fieldNames.heightFT'),
                  }),
                });
              }
              return true;
            },
          });
  }),
  waist: Yup.lazy((value) =>
    value === ''
      ? Yup.string()
      : Yup.number()
          .min(
            10,
            i18next.t('validation.general.numberMin', {
              field: i18next.t('general.fieldNames.waistIN'),
              count: 10,
            }),
          )
          .max(
            99,
            i18next.t('validation.general.numberMax', {
              field: i18next.t('general.fieldNames.waistIN'),
              count: 99,
            }),
          ),
  ),

  hips: Yup.lazy((value) =>
    value === ''
      ? Yup.string()
      : Yup.number()
          .min(
            10,
            i18next.t('validation.general.numberMin', {
              field: i18next.t('general.fieldNames.hipsIN'),
              count: 10,
            }),
          )
          .max(
            99,
            i18next.t('validation.general.numberMax', {
              field: i18next.t('general.fieldNames.hipsIN'),
              count: 99,
            }),
          ),
  ),
});
