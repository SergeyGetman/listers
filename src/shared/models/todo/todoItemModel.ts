import { ItemUserModel } from '../itemUser.model';
import { AssignPeoplePermissionsEnum } from '../../enums/assignPeoplePermissions.enum';
import { MediaType } from '../media.model';
import { PlannerItemModelTypeEnum } from '../../enums/plannerItemModelType.enum';
import { PlannerItemColorEnum } from '../../enums/plannerItemColor.enum';
import { ChecklistItemModel } from '../checklists/checklistItem.model';

export interface TodoItemModel {
  comment_count: number;
  document_count?: number;
  photo_count: number;
  is_open: number;
  is_done?: boolean;
  color: PlannerItemColorEnum | null;
  icon: string;
  userNotification: { actions: string[]; id: number } | null;
  current_user: {
    is_unread_documents: boolean;
    is_unread_comments: boolean;
    is_unread_photos: boolean;
    is_late?: boolean;
    role: AssignPeoplePermissionsEnum;
  };
  description?: string;
  documents: MediaType[];
  due_dated_at?: string;
  id: number;
  is_all_day_due_date: boolean;
  model_type: PlannerItemModelTypeEnum;
  photos: MediaType[];
  title: string;
  owner: ItemUserModel;
  users: ItemUserModel[];
  checklists: ChecklistItemModel[];
}
