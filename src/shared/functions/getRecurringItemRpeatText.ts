import Moment from 'moment';

import i18next from '../locales/i18n';
import { RecurringPatternModal } from '../models/recurringPatternModal';
import { RecurringTypeEnum } from '../enums/recurringType.enum';
import { RecurringWeeklyDaysConfig } from '../configs/selectors/recurringWeeklyDays.config';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

const getRecurringWeeksDayFromEnum = (arr: string[]) => {
  return arr.map((item) => RecurringWeeklyDaysConfig[item].label);
};

export const getRecurringItemRepeatText = (recurringPattern: RecurringPatternModal) => {
  switch (recurringPattern.recurring_type) {
    case RecurringTypeEnum.DAILY:
      return ` ${capitalizeFirstLetter(i18next.t('general.period.every'))} ${
        recurringPattern.repeat_interval
      } ${i18next.t('general.period.days')}, ${
        recurringPattern.is_endless
          ? i18next.t('general.period.indefinitely')
          : ` ${i18next.t('general.period.until')} ${Moment(recurringPattern.end_date).format('MM/DD/YYYY')}`
      } `;
    case RecurringTypeEnum.WEEKLY:
      return `${i18next.t('general.on')} ${getRecurringWeeksDayFromEnum(recurringPattern.repeat_by_days).join(
        ', ',
      )} ${i18next.t('general.period.every')} ${recurringPattern.repeat_interval} ${i18next.t(
        'general.period.week',
      )}, ${
        recurringPattern.is_endless
          ? i18next.t('general.period.indefinitely')
          : ` ${i18next.t('general.period.until')} ${Moment(recurringPattern.end_date).format('MM/DD/YYYY')}`
      }`;
    case RecurringTypeEnum.MONTHLY:
    default:
      return `${i18next.t('general.on')} ${Moment(recurringPattern.start_date).format('DD')}${i18next.t(
        'general.period.th',
      )} ${i18next.t('general.period.every')} ${recurringPattern.repeat_interval} ${i18next.t(
        'general.period.month',
      )}, ${
        recurringPattern.is_endless
          ? i18next.t('general.period.indefinitely')
          : ` ${i18next.t('general.period.until')} ${Moment(recurringPattern.end_date).format('MM/DD/YYYY')}`
      }`;
  }
};
