import { Moment } from 'moment';
import { RecurringTypeEnum } from '../enums/recurringType.enum';

export type RecurringPatternModal = {
  frequency_type: RecurringTypeEnum;
  end_date: null | Moment;
  is_endless: boolean;
  recurring_type: RecurringTypeEnum;
  repeat_by_days: string[];
  repeat_by_months: null;
  repeat_interval: number;
  start_date: null | number | string;
};
