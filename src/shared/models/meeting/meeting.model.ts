import { AssignPeoplePermissionsEnum } from '../../enums/assignPeoplePermissions.enum';
import { PlannerItemStatusesEnum } from '../../enums/plannerItemStatuses.enum';
import { MediaType } from '../media.model';
import { PlannerItemModelTypeEnum } from '../../enums/plannerItemModelType.enum';
import { ItemUserModel } from '../itemUser.model';
import { EventTypeEnum } from '../../enums/eventType.enum';
import { RecurringPatternModal } from '../recurringPatternModal';
import { DurationTimeEnum } from '../../enums/duration.enum';

export interface MeetingModel {
  comment_count: number;
  document_count: number;
  photo_count: number;
  notify_before?: any;
  tags?: any;
  user_notifications: { actions: string[]; id: number } | null;
  current_user: {
    is_archive: boolean;
    is_can_view_media: boolean;
    is_unread_documents: boolean;
    is_unread_comments: boolean;
    is_unread_photos: boolean;
    money_action?: any;
    role: AssignPeoplePermissionsEnum;
    status: PlannerItemStatusesEnum;
  };
  description?: string;
  documents: MediaType[];
  duration: DurationTimeEnum;
  status: PlannerItemStatusesEnum;
  id: number;
  type: EventTypeEnum;
  is_all_day: boolean;
  is_archive: boolean;
  is_recurring: boolean;
  location?: { address: string; map: { lat: number; lng: number } };
  model_type: PlannerItemModelTypeEnum.event;
  phone?: string;
  country?: string;
  photos: MediaType[];
  site?: string;
  started_at?: string;
  finished_at?: string;
  title: string;
  owner: ItemUserModel;
  users: ItemUserModel[];
  recurring_pattern: RecurringPatternModal;
}
