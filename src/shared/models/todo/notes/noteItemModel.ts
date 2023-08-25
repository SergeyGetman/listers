import { ItemUserModel } from '../../itemUser.model';
import { AssignPeoplePermissionsEnum } from '../../../enums/assignPeoplePermissions.enum';
import { MediaType } from '../../media.model';
import { PlannerItemModelTypeEnum } from '../../../enums/plannerItemModelType.enum';

export interface NoteItemModel {
  document_count?: number;
  photo_count: number;
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
  id: number;
  model_type: PlannerItemModelTypeEnum;
  photos: MediaType[];
  title: string;
  owner: ItemUserModel;
  users: ItemUserModel[];
}
