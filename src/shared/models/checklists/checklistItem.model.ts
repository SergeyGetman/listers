import { ChecklistItemStatusEnum } from '../../enums/checklistItemStatus.enum';
import { ItemUserModel } from '../itemUser.model';

export interface ChecklistItemModel {
  body: string;
  status: ChecklistItemStatusEnum;
  id: number;
  updated_at: string;
  creator: ItemUserModel;
}
