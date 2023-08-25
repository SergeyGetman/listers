import { ItemUserModel } from '../models/itemUser.model';
import { AssignPeoplePermissionsEnum } from '../enums/assignPeoplePermissions.enum';
import { PlannerItemStatusesEnum } from '../enums/plannerItemStatuses.enum';

export const transformToAssignUserSelectValueWithRole = (
  arr: ItemUserModel[],
  ownerId?: number,
  status?: PlannerItemStatusesEnum,
) => {
  return arr.map((item: ItemUserModel) => ({
    ...item,
    value: item.id,
    isOwner: item.id === ownerId,
    role: item.role ? item.role : AssignPeoplePermissionsEnum.editor,
    label: item.full_name ? item.full_name : `${item.first_name} ${item.last_name}`,
    status: item.status ? item.status : !item.is_fake && status ? status : undefined,
  }));
};
