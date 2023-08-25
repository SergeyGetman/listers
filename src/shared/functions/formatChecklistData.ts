import { groupBy } from 'lodash';
import { ChecklistItemModel } from '../models/checklists/checklistItem.model';
import { ChecklistItemStatusEnum } from '../enums/checklistItemStatus.enum';
import { ItemUserModel } from '../models/itemUser.model';

export const formatChecklistData = (data: ChecklistItemModel[], userId: number) => {
  let usersData: {
    owner: ItemUserModel;
    items: ChecklistItemModel[];
  }[] = [];
  let currentUserData: ChecklistItemModel[] = [];

  const obj = groupBy(data, (item) => {
    return item.creator.id;
  });

  Object.keys(obj).forEach((item) => {
    if (item) {
      const doneStatus = obj[item].filter((i) => i.status === ChecklistItemStatusEnum.done);
      const todoStatus = obj[item].filter((i) => i.status === ChecklistItemStatusEnum.todo);
      const resultSort = [...todoStatus, ...doneStatus];

      if (userId === +item) {
        currentUserData = resultSort;
      } else {
        usersData = [...usersData, { owner: obj[item][0].creator, items: resultSort }];
      }
    }
  });

  return { usersData, currentUserData };
};
