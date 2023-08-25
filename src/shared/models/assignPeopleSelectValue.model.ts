import { ItemUserModel } from './itemUser.model';
import { AssignPeoplePermissionsEnum } from '../enums/assignPeoplePermissions.enum';

export type AssignPeopleSelectValueModel = ItemUserModel & {
  value: number;
  role: AssignPeoplePermissionsEnum;
  label: string;
};

export type AssignPeopleChatModel = ItemUserModel & {
  value: number;
  label: string;
};
