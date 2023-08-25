import * as Yup from 'yup';
import i18next from 'i18next';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const ProfileContactValidationSchema = Yup.object().shape({
  contacts: Yup.object().shape({
    emails: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string()
            .email(i18next.t('validation.email.valid'))
            .trim()
            .test('test', function (value) {
              if (value?.trim() === '' && this.parent.type !== null) {
                return this.createError({
                  path: this.path,
                  message: i18next.t('validation.general.required', {
                    field: i18next.t('general.fieldNames.email'),
                  }),
                });
              }
              return true;
            })
            .max(300, i18next.t('validation.email.valid')),
        }),
      )
      .test('test', function (value) {
        if (
          value &&
          value[0]?.value?.trim() === '' &&
          this.parent.phones &&
          this.parent.phones[0].value.trim() === ''
        ) {
          return this.createError({
            path: `${this.path}.[0].value`,
            message: i18next.t('validation.general.required', {
              field: i18next.t('general.fieldNames.email'),
            }),
          });
        }
        return true;
      }),
    phones: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().test('test', function (value) {
            if (value && value?.length > 2) {
              if (!isValidPhoneNumber(value)) {
                return this.createError({
                  path: this.path,
                  message: i18next.t('validation.general.invalid'),
                });
              }
              return true;
            }

            if (value?.trim() === '' && this.parent.type !== null) {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.required', {
                  field: i18next.t('general.fieldNames.phone'),
                }),
              });
            }
            if (!this.parent.country && value?.trim() !== '') {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.invalid'),
              });
            }
            return true;
          }),

          type: Yup.mixed().test('type', function (value) {
            if (value === null && this.parent.value.trim() !== '') {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.required', {
                  field: i18next.t('general.fieldNames.type'),
                }),
              });
            }
            return true;
          }),
        }),
      )
      .test('test', function (value) {
        if (
          value &&
          value[0]?.value?.trim() === '' &&
          this.parent.emails &&
          this.parent.emails[0].value.trim() === ''
        ) {
          return this.createError({
            path: `${this.path}.[0].value`,
            message: i18next.t('validation.general.required', {
              field: i18next.t('general.fieldNames.phone'),
            }),
          });
        }
        return true;
      }),
  }),
});
