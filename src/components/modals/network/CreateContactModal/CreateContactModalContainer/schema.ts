import * as Yup from 'yup';
import i18next from 'i18next';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const createContactSchema = Yup.object().shape({
  first_name: Yup.string()
    .test('test', function (value) {
      if (this.parent.contacts.is_company === false) {
        if (value?.trim() === '') {
          return this.createError({
            path: this.path,
            message: i18next.t('validation.general.required', {
              field: i18next.t('general.fieldNames.firstName'),
            }),
          });
        }
        if ((value?.trim() as string).length < 2) {
          return this.createError({
            path: this.path,
            message: i18next.t('validation.general.min', {
              field: i18next.t('general.fieldNames.firstName'),
              count: 2,
            }),
          });
        }
        return true;
      }

      return true;
    })
    .max(
      36,
      i18next.t('validation.general.max', { count: 36, field: i18next.t('general.fieldNames.firstName') }),
    ),
  last_name: Yup.string()
    .test('test', function (value) {
      if (this.parent.contacts.is_company === false) {
        if (value?.trim() === '') {
          return this.createError({
            path: this.path,
            message: i18next.t('validation.general.required', {
              field: i18next.t('general.fieldNames.lastName'),
            }),
          });
        }
        if ((value?.trim() as string).length < 2) {
          return this.createError({
            path: this.path,
            message: i18next.t('validation.general.min', {
              field: i18next.t('general.fieldNames.lastName'),
              count: 2,
            }),
          });
        }
        return true;
      }
      return true;
    })
    .max(
      36,
      i18next.t('validation.general.max', { count: 36, field: i18next.t('general.fieldNames.lastName') }),
    ),
  role: Yup.string()
    .nullable()
    .required(
      i18next.t('validation.title.required', {
        field: i18next.t('general.fieldNames.role'),
      }),
    ),
  contacts: Yup.object().shape({
    company: Yup.string()
      .test('test', function (value) {
        if (this.parent.is_company) {
          if (value?.trim() === '') {
            return this.createError({
              path: this.path,
              message: i18next.t('validation.general.required', {
                field: i18next.t('general.fieldNames.company'),
              }),
            });
          }
          if ((value?.trim() as string).length < 2) {
            return this.createError({
              path: this.path,
              message: i18next.t('validation.general.min', {
                field: i18next.t('general.fieldNames.company'),
                count: 2,
              }),
            });
          }
          return true;
        }
        return true;
      })
      .max(
        72,
        i18next.t('validation.general.max', { count: 72, field: i18next.t('general.fieldNames.company') }),
      ),

    contact_list: Yup.array().of(
      Yup.object().shape({
        contact_type: Yup.string().required(),
        value: Yup.string().test('validation', function (value: any) {
          const { contact_type } = this.parent;

          if (contact_type === 'email') {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.invalid'),
              });
            }

            if (value?.trim() === '' && contact_type) {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.required', {
                  field: i18next.t('general.fieldNames.email'),
                }),
              });
            }

            return true;
          }

          if (value && value?.length > 2) {
            if (!isValidPhoneNumber(value)) {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.invalid'),
              });
            }
            return true;
          }
          if (value?.trim() === '' && contact_type) {
            return this.createError({
              path: this.path,
              message: i18next.t('validation.general.required', {
                field: i18next.t('general.fieldNames.phone'),
              }),
            });
          }
          return true;
        }),
      }),
    ),
    socials: Yup.array().of(
      Yup.object().shape({
        value: Yup.string()
          .test('email', function (value) {
            if (value?.trim() === '' && this.parent.type !== null) {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.required', {
                  field: i18next.t('general.fieldNames.nickName'),
                }),
              });
            }
            if (value && value?.trim() !== '' && value.length < 2) {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.min', {
                  field: i18next.t('general.fieldNames.nickName'),
                  count: 2,
                }),
              });
            }
            return true;
          })
          .max(
            255,
            i18next.t('validation.general.max', {
              count: 255,
              field: i18next.t('general.fieldNames.nickName'),
            }),
          ),
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
    ),
    urls: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().test('email', function (value) {
          if (value?.trim() === '' && this.parent.type !== null) {
            return this.createError({
              path: this.path,
              message: i18next.t('validation.general.required', {
                field: i18next.t('general.fieldNames.url'),
              }),
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
    ),
    addresses: Yup.array().of(
      Yup.object().shape({
        address: Yup.string().test('email', function (value) {
          if (value?.trim() === '' && this.parent.type !== null) {
            return this.createError({
              // @ts-ignore
              path: `contacts.address[${this.options.index}]`,
              message: i18next.t('validation.general.required', {
                field: i18next.t('general.fieldNames.address'),
              }),
            });
          }
          return true;
        }),
        type: Yup.mixed().test('type', function (value) {
          if (value === null && this.parent.address.trim() !== '') {
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
    ),
  }),
});
