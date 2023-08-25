import { PlannerItemStatusesEnum } from '../../enums/plannerItemStatuses.enum';
import { PlannerItemPriorityEnum } from '../../enums/plannerItemPriority.enum';
import { ItemUserModel } from '../itemUser.model';

export type TaskFormPayloadModel = {
  global_status: PlannerItemStatusesEnum;
  status?: {
    is_common: boolean;
    status: PlannerItemStatusesEnum;
  }[];
  checklists?: any;
  notes?: any;
  users: ItemUserModel[];
  priority: PlannerItemPriorityEnum | null;
  documents: { id: number }[];
  photos?: { id: number }[];
  description: string;
  title: string;
  due_dated_at: string | null;
  is_all_day_due_date: boolean;
  is_all_day: boolean;
  started_at: string | null;
  finished_at: string | null;
  is_same: boolean;
  meeting_id?: string;
  site?: string;
  login?: string;
  password?: string;
  location: {
    address: string;
    map: { lat: number; lng: number };
  } | null;
};
