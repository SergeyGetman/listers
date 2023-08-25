import { AssignPeopleSelectValueModel } from '../assignPeopleSelectValue.model';
import { PlannerItemColorEnum } from '../../enums/plannerItemColor.enum';

export type TodoFormPayloadModel = {
  users: AssignPeopleSelectValueModel[];
  documents: { id: number }[];
  photos: { id: number }[];
  description: string;
  title: string;
  due_dated_at: string | null;
  icon: any;
  color: PlannerItemColorEnum | null;
};
