import { MetaModel } from '../meta.model';
import { NotesItemModel } from './notesItem.model';

export type GetNotesResponseModel = {
  data: NotesItemModel[];
  meta: MetaModel;
};
