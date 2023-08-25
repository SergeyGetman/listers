import { ChecklistItemModel } from './checklistItem.model';
import { MetaModel } from '../meta.model';

export type GetChecklistsResponseModel = {
  data: ChecklistItemModel[];
  meta: MetaModel;
};
