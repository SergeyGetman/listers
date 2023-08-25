import Moment from 'moment';
import momentTZ from 'moment-timezone';
import { RecurringTypeEnum } from '../enums/recurringType.enum';
import { getWeekDayEnumFromNumber } from './getWeekDayEnumFromNumber';
import { RecurringPatternModal } from '../models/recurringPatternModal';

export const formatRecurringValue = (value: RecurringPatternModal, startedAt: string) => {
  if (!!value.frequency_type) {
    if (value.frequency_type === RecurringTypeEnum.DAILY) {
      return {
        is_recurring: true,
        recurring_pattern: {
          recurring_type: RecurringTypeEnum.DAILY,
          frequency_type: RecurringTypeEnum.DAILY,
          end_date: null,
          is_endless: true,
          start_date: Moment.utc(startedAt).local().format(`YYYY-MM-DD`),
          repeat_by_days: null,
          repeat_interval: 1,
          timezone_name: momentTZ.tz.guess(true),
        },
      };
    }
    if (value.frequency_type === RecurringTypeEnum.WEEKLY) {
      return {
        is_recurring: true,
        recurring_pattern: {
          recurring_type: RecurringTypeEnum.WEEKLY,
          frequency_type: RecurringTypeEnum.WEEKLY,
          end_date: null,
          is_endless: true,
          start_date: Moment.utc(startedAt).local().format(`YYYY-MM-DD`),
          repeat_by_days: [getWeekDayEnumFromNumber(Moment.utc(startedAt).local().isoWeekday())],
          repeat_interval: 1,
          timezone_name: momentTZ.tz.guess(true),
        },
      };
    }
    if (value.frequency_type === RecurringTypeEnum.MONTHLY) {
      return {
        is_recurring: true,
        recurring_pattern: {
          recurring_type: RecurringTypeEnum.MONTHLY,
          frequency_type: RecurringTypeEnum.MONTHLY,
          end_date: null,
          is_endless: true,
          start_date: Moment.utc(startedAt).local().format(`YYYY-MM-DD`),
          repeat_by_days: null,
          repeat_interval: 1,
          timezone_name: momentTZ.tz.guess(true),
        },
      };
    }
  }

  if (value.frequency_type === RecurringTypeEnum.CUSTOM) {
    if (value.recurring_type === RecurringTypeEnum.DAILY) {
      return {
        is_recurring: true,
        recurring_pattern: {
          recurring_type: RecurringTypeEnum.DAILY,
          frequency_type: RecurringTypeEnum.CUSTOM,
          end_date: !!value.end_date ? Moment(value.end_date).utc().format(`YYYY-MM-DD`) : null,
          is_endless: !value.end_date,
          start_date: Moment.utc(startedAt).local().format(`YYYY-MM-DD`),
          repeat_by_days: null,
          repeat_interval: value.repeat_interval,
          timezone_name: momentTZ.tz.guess(true),
        },
      };
    }
    if (value.recurring_type === RecurringTypeEnum.WEEKLY) {
      return {
        is_recurring: true,
        recurring_pattern: {
          recurring_type: RecurringTypeEnum.WEEKLY,
          frequency_type: RecurringTypeEnum.CUSTOM,
          end_date: !!value.end_date ? Moment(value.end_date).utc().format(`YYYY-MM-DD`) : null,
          is_endless: !value.end_date,
          start_date: Moment.utc(startedAt).local().format(`YYYY-MM-DD`),
          repeat_by_days: value.repeat_by_days,
          repeat_interval: value.repeat_interval,
          timezone_name: momentTZ.tz.guess(true),
        },
      };
    }
    if (value.recurring_type === RecurringTypeEnum.MONTHLY) {
      return {
        is_recurring: true,
        recurring_pattern: {
          recurring_type: RecurringTypeEnum.MONTHLY,
          frequency_type: RecurringTypeEnum.CUSTOM,
          end_date: !!value.end_date ? Moment(value.end_date).utc().format(`YYYY-MM-DD`) : null,
          is_endless: !value.end_date,
          start_date: Moment.utc(startedAt).local().format(`YYYY-MM-${value.start_date}`),
          repeat_by_days: null,
          repeat_interval: value.repeat_interval,
          timezone_name: momentTZ.tz.guess(true),
        },
      };
    }
  }

  return {
    is_recurring: false,
    recurring_pattern: null,
  };
};
