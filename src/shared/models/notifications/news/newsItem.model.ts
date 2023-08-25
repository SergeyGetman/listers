import { ItemUserModel } from '../../itemUser.model';
import { NotificationsTypesEnum } from '../../../enums/notificationsEnum';

export interface NewsItemModel {
  text: string;
  type: string;
  viewed_at: boolean;
  created_at: string;
  id: number;
  updated_at: string;
  user: ItemUserModel;
  entity_id: number;
  entity_type: string;
  // TODO any
  entity: any;
  data: NewsItemDataModal;
}

export interface NewsItemDataModal {
  entity: string;
  owner_full_name: string;
  owner_id: number;
  title: string;
  user_full_name: string;
  status: string | NotificationsTypesEnum;
}
