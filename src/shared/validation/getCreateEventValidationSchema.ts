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
export const getCreateEventValidationSchema = () => {
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
    start_date: validateDate('startsDate'),
    start_time: Yup.mixed().when('is_all_day', {
      is: false,
      then: validateDate('startsTime'),
      otherwise: Yup.mixed(),
    }),
    money_action: Yup.mixed().test({
      name: 'money_action',
      test: (value, schema) => {
        if (schema.parent?.fee) {
          if (!value) {
            return schema.createError({
              message: `The type is required`,
              path: 'money_action',
            });
          }
          return true;
        }
        return true;
      },
    }),
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

    finish_date: validateDate('endsDate').test({
      name: 'finish_date',
      test: (finish_t, schema) => {
        if (finish_t && schema.parent?.recurring_pattern?.frequency_type !== RecurringTypeEnum.NONE) {
          const finish = `${
            schema.parent.is_all_day
              ? Moment(
                  `${Moment(schema.parent.finish_date).format('MM/DD/YYYY')} ${Moment(
                    '12:00:00',
                    'HH:mm:ss',
                  ).format('HH:mm:ss')}`,
                ).format('YYYY-MM-DD HH:mm:ss')
              : Moment(
                  `${Moment(schema.parent.finish_date).format('MM/DD/YYYY')} ${Moment(
                    schema.parent.finish_time,
                  ).format('HH:mm:ss')}`,
                ).format('YYYY-MM-DD')
          } ${schema.parent.is_all_day ? '' : Moment(schema.parent.finish_time).format('HH:mm:ss')}`;

          const start = `${
            schema.parent.is_all_day
              ? Moment(
                  `${Moment(schema.parent.start_date).format('MM/DD/YYYY')} ${Moment(
                    '12:00:00',
                    'HH:mm:ss',
                  ).format('HH:mm:ss')}`,
                ).format('YYYY-MM-DD HH:mm:ss')
              : Moment(
                  `${Moment(schema.parent.start_date).format('MM/DD/YYYY')} ${Moment(
                    schema.parent.start_time,
                  ).format('HH:mm:ss')}`,
                ).format('YYYY-MM-DD')
          } ${schema.parent.is_all_day ? '' : Moment(schema.parent.start_time).format('HH:mm:ss')}`;

          if (Moment(finish, 'YYYY-MM-DD HH:mm:ss').diff(Moment(start, 'YYYY-MM-DD HH:mm:ss'), 'day') !== 0) {
            return schema.createError({
              message: `The event which is longer than 24 hours can’t be recurred!`,
              path: 'finish_date',
            });
          }
          if (schema.parent?.recurring_pattern?.end_date) {
            const fin = Moment(finish_t).format('MM/DD/YYYY');
            const end = Moment(schema.parent?.recurring_pattern?.end_date).format('MM/DD/YYYY');

            if (Moment(fin, 'MM/DD/YYYY').diff(Moment(end, 'MM/DD/YYYY'), 'day') >= 0) {
              return schema.createError({
                message: `Can't be earlier or the same as End date of Event`,
                path: 'recurring_pattern.end_date',
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
    finish_time: Yup.mixed().test({
      name: 'finish_time',
      test: (finish_t, schema) => {
        if (
          schema.parent.start_date &&
          schema.parent.start_time &&
          schema.parent.finish_date &&
          finish_t &&
          !schema.parent.is_all_day
        ) {
          const startAt = Moment(
            `${Moment(schema.parent.start_date).format('MM/DD/YYYY')} ${Moment(
              schema.parent.start_time,
            ).format('HH:mm:ss')}`,
          ).format('MM/DD/YYYY HH:mm:ss');

          const finishAt = Moment(
            `${Moment(schema.parent.finish_date).format('MM/DD/YYYY')} ${Moment(finish_t).format(
              'HH:mm:ss',
            )}`,
          ).format('MM/DD/YYYY HH:mm:ss');

          if (
            Moment(finishAt, 'MM/DD/YYYY HH:mm:ss').diff(Moment(startAt, 'MM/DD/YYYY HH:mm:ss'), 'minutes') >
            0
          ) {
            return true;
          }

          return schema.createError({
            message: `End time must be later than Start`,
            path: 'finish_time',
          });
        }

        if (!schema.parent.is_all_day) {
          if (!finish_t) {
            return schema.createError({
              message: `The Finish time is required`,
              path: 'finish_time',
            });
          }
        }
        return true;
      },
    }),
  });
};
