import { Moment } from 'moment';
import { RecurringPatternModal } from '../recurringPatternModal';
import { TagsEnum } from '../../enums/tags.enum';
import { ReminderTimeEnum } from '../../enums/reminderTime.enum';

export type EventModalFormModel = {
  tag_id: TagsEnum;
  notify_before?: ReminderTimeEnum | null;
  title: string;
  money_action?: any;
  fee?: any;
  documents: any;
  description: any;
  is_all_day: boolean;
  start_date?: null | Moment;
  start_time?: null | Moment;
  finish_date?: null | Moment;
  finish_time?: null | Moment;
  physicalAddress?: { address?: string; map?: { lat: number; lng: number } };
  phone?: string;
  country?: string;
  role?: { value: string; label: string };
  type?: { value: string; label: string };
  site: string;
  recurring_pattern: RecurringPatternModal;
};
