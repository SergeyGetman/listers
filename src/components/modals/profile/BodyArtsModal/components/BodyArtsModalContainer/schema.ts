import * as Yup from 'yup';
import i18next from 'i18next';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const ProfileBodyArtValidationSchema = Yup.object().shape({
  type: Yup.mixed().required(
    i18next.t('validation.general.required', {
      field: i18next.t('general.fieldNames.type'),
    }),
  ),
  title: Yup.string()
    .trim()
    .required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.title'),
      }),
    )
    .min(
      2,
      i18next.t('validation.general.min', {
        field: i18next.t('general.fieldNames.title'),
        count: 2,
      }),
    )
    .max(
      36,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.title'),
        count: 36,
      }),
    ),
  artist: Yup.string()
    .trim()
    .test({
      name: 'artist',
      test: (artist, schema) => {
        if (!!artist && artist.length >= 1 && artist.length <= 1) {
          return schema.createError({
            path: schema.path,
            message: i18next.t('validation.general.min', {
              field: i18next.t('general.fieldNames.artist'),
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
        field: i18next.t('general.fieldNames.artist'),
        count: 36,
      }),
    ),
  salon: Yup.string()
    .trim()
    .test({
      name: 'salon',
      test: (salon, schema) => {
        if (!!salon && salon.length >= 1 && salon.length <= 1) {
          return schema.createError({
            path: schema.path,
            message: i18next.t('validation.general.min', {
              field: i18next.t('general.fieldNames.salon'),
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
        field: i18next.t('general.fieldNames.salon'),
        count: 36,
      }),
    ),
  email: Yup.string().trim().email(i18next.t('validation.general.invalid')),
  phone: Yup.mixed().test({
    name: 'phone',
    test: (value, schema) => {
      if (value?.length > 2) {
        if (!isValidPhoneNumber(value)) {
          return schema.createError({
            message: `The phone number is invalid`,
            path: 'phone',
          });
        }
        return true;
      }
      return true;
    },
  }),
  price: Yup.number()
    .nullable()
    .max(
      999999,
      i18next.t('validation.general.numberMax', {
        field: i18next.t('general.fieldNames.price'),
        count: 9999,
      }),
    ),
});
