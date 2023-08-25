import { ItemUserModel } from '../itemUser.model';
import { ReminderTimeEnum } from '../../enums/reminderTime.enum';
import { DurationTimeEnum } from '../../enums/duration.enum';

export type CreateMeetingFormPayloadModel = {
  users: ItemUserModel[];
  documents: { id: number }[];
  notify_before?: ReminderTimeEnum | null;
  description: string;
  title: string;
  duration?: DurationTimeEnum;
  is_all_day: boolean;
  started_at: string | null;
  site?: string;
  phone?: string;
  country?: string;
  type?: string;
  location: {
    address: string;
    map: { lat: number; lng: number };
  } | null;
};
