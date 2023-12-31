import { PlannerItemStatusesEnum } from '../../enums/plannerItemStatuses.enum';
import { ItemUserModel } from '../itemUser.model';
import { PlannerItemPriorityEnum } from '../../enums/plannerItemPriority.enum';
import { AssignPeoplePermissionsEnum } from '../../enums/assignPeoplePermissions.enum';
import { MediaType } from '../media.model';
import { PlannerItemModelTypeEnum } from '../../enums/plannerItemModelType.enum';
import { RecurringPatternModal } from '../recurringPatternModal';

export interface TaskItemModel {
  tags?: any;
  notify_before?: any;
  comment_count: number;
  document_count?: number;
  photo_count: number;
  current_user: {
    is_archive: boolean;
    is_late: boolean;
    is_unread_documents: boolean;
    is_unread_comments: boolean;
    is_unread_photos: boolean;
    role: AssignPeoplePermissionsEnum;
    status: PlannerItemStatusesEnum;
  };
  description?: string;
  documents: MediaType[];
  due_dated_at?: string;
  finished_at?: string;
  global_status: PlannerItemStatusesEnum;
  priority: PlannerItemPriorityEnum | null;
  id: number;
  is_all_day: boolean;
  is_all_day_due_date: boolean;
  is_archive: boolean;
  is_global_late: boolean;
  is_hot: boolean;
  is_recurring: boolean;
  is_same: boolean;
  location?: { address: string; map: { lat: number; lng: number } };
  login?: string;
  model_type: PlannerItemModelTypeEnum;
  password?: string;
  meeting_id?: string;
  photos?: MediaType[];
  site?: string;
  started_at?: string;
  title: string;
  user_notifications: { actions: string[]; id: number } | null;
  owner: ItemUserModel;
  users: ItemUserModel[];
  recurring_pattern: RecurringPatternModal;
}
