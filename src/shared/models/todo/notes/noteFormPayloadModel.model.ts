import { AssignPeopleSelectValueModel } from '../../assignPeopleSelectValue.model';

export type NoteFormPayloadModel = {
  users: AssignPeopleSelectValueModel[];
  documents: { id: number }[];
  photos: { id: number }[];
  description: string;
  title: string;
};
