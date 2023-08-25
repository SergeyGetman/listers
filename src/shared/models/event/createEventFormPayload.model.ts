import { ItemUserModel } from '../itemUser.model';
import { ReminderTimeEnum } from '../../enums/reminderTime.enum';

export type CreateEventFromPayloadModel = {
  users: ItemUserModel[];
  documents: { id: number }[];
  notify_before?: ReminderTimeEnum | null;
  money_action?: any;
  fee?: any;
  description: string;
  title: string;
  is_all_day: boolean;
  started_at: string | null;
  finished_at: string | null;
  meeting_id?: string;
  site?: string;
  login?: string;
  password?: string;
  phone?: string;
  country?: string;
  role?: string;
  type?: string;
  location: {
    address: string;
    map: { lat: number; lng: number };
  } | null;
};
