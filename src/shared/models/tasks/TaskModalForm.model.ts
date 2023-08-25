import { RecurringPatternModal } from '../recurringPatternModal';
import { ReminderTimeEnum } from '../../enums/reminderTime.enum';
import { PlannerItemPriorityEnum } from '../../enums/plannerItemPriority.enum';
import { TagsEnum } from '../../enums/tags.enum';
import { MediaType } from '../media.model';

export type TaskModalFormModel = {
  tag_id: TagsEnum;
  documents: MediaType[];
  priority: PlannerItemPriorityEnum;
  title: string;
  description: any;
  is_show_time_frame?: boolean;
  is_all_day_due_date: boolean;
  notify_before?: ReminderTimeEnum | null;
  is_all_day: boolean;
  start_date?: any | string | Date;
  start_time?: any | string | Date;
  finish_date?: any | string | Date;
  finish_time?: any | string | Date;
  due_date?: any | string | Date;
  due_time?: any | string | Date;
  physicalAddress?: { address?: string; map?: { lat: number; lng: number } };
  meeting_id: string;
  site: string;
  login: string;
  password: string;
  recurring_pattern: RecurringPatternModal;
};
