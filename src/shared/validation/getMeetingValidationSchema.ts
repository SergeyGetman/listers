import * as Yup from 'yup';
import Moment from 'moment';
import { isValidPhoneNumber } from 'react-phone-number-input';
import i18next from '../locales/i18n';
import { RecurringTypeEnum } from '../enums/recurringType.enum';
const validateDate = (fieldName: string, isRequired: boolean = true): Yup.AnySchema => {
  let schema = Yup.mixed()
    .nullable()
    .test(
      'is-moment',
      i18next.t('validation.general.invalidField', {
        field: i18next.t(`general.fieldNames.${fieldName}`),
      }),
      (value: any) => {
        if (value === null) {
          return true;
        }

        return !!(Moment.isMoment(value) && value.isValid());
      },
    );

  if (isRequired) {
    schema = schema.required(
      i18next.t('validation.base.required', {
        field: i18next.t(`general.fieldNames.${fieldName}`),
      }),
    );
  }

  return schema;
};
// TODO need validation text
export const getMeetingValidationSchema = () => {
  return Yup.object({
    title: Yup.string()
      .trim()
      .test({
        name: 'title',
        test: (title, schema) => {
          if (!!title && title.length >= 1 && title.length <= 1) {
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
    start_time: Yup.mixed().when('is_all_day', {
      is: false,
      then: validateDate('startsTime'),
      otherwise: Yup.mixed(),
    }),
    start_date: validateDate('startsDate').test({
      name: 'start_date',
      test: (start_t, schema) => {
        if (start_t && schema.parent?.recurring_pattern?.frequency_type !== RecurringTypeEnum.NONE) {
          if (schema.parent?.recurring_pattern?.end_date) {
            const str = Moment(start_t).format('MM/DD/YYYY');
            const end = Moment(schema.parent?.recurring_pattern?.end_date).format('MM/DD/YYYY');

            if (Moment(str, 'MM/DD/YYYY').diff(Moment(end, 'MM/DD/YYYY'), 'day') >= 0) {
              return schema.createError({
                message: `Can't be earlier or the same as End date of Recurring`,
                path: 'start_date',
              });
            }
            return true;
          }
          return true;
        }
        return true;
      },
    }),
    recurring_pattern: Yup.object({
      repeat_interval: Yup.string().test({
        name: 'repeat_interval',
        test: (repeat, schema) => {
          if (!repeat && schema.parent.frequency_type) {
            return schema.createError({
              message: `The Period item field is required.`,
              path: 'recurring_pattern.repeat_interval',
            });
          }
          return true;
        },
      }),
    }),
  });
};
