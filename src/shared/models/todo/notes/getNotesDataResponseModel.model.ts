import { MetaModel } from '../../meta.model';
import { NoteItemModel } from './noteItemModel';

export type GetNotesDataResponseModel = {
  data: NoteItemModel[];
  meta: MetaModel;
};
