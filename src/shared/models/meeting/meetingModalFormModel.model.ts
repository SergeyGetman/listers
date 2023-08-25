import { Moment } from 'moment';
import { RecurringPatternModal } from '../recurringPatternModal';
import { TagsEnum } from '../../enums/tags.enum';
import { ReminderTimeEnum } from '../../enums/reminderTime.enum';
import { DurationTimeEnum } from '../../enums/duration.enum';

export type MeetingModalFormModel = {
  tag_id: TagsEnum;
  duration?: { value: DurationTimeEnum; label: string };
  notify_before?: ReminderTimeEnum | null;
  title: string;
  documents: any;
  description: any;
  is_all_day: boolean;
  start_date?: null | Moment;
  start_time?: null | Moment;
  physicalAddress?: { address?: string; map?: { lat: number; lng: number } };
  phone?: string;
  country?: string;
  site: string;
  type?: { value: string; label: string };
  is_recurring?: boolean;
  recurring_pattern: RecurringPatternModal;
};
