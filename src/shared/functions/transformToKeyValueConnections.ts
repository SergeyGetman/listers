import { ItemUserModel } from '../models/itemUser.model';
import { byPersonFiltersConfig } from '../configs/byPersonFilters.config';

export const transformToKeyValueConnections = (arr: ItemUserModel[]) => {
  const newArr = arr.map((item: ItemUserModel) => ({
    value: item.id ? item.id : '',
    label: item.full_name,
  }));
  newArr.unshift({ value: byPersonFiltersConfig.all.value, label: byPersonFiltersConfig.all.label });
  return newArr;
};
