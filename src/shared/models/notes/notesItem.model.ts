import { ItemUserModel } from '../itemUser.model';

export interface NotesItemModel {
  body: string;
  id: number;
  title: string;
  updated_at: string;
  creator: ItemUserModel;
}
