import { ItemUserModel } from '../itemUser.model';

export interface CommentsItemModel {
  body: string;
  id: number;
  created_at: string;
  documents: [];
  user: ItemUserModel;
}
