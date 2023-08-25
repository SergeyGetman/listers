import { groupBy } from 'lodash';
import { NetworkUserStatus } from '../enums/networkUserStatus.enum';

type GroupedData<T> = {
  [key: string]: T[];
};

export const groupByKey = <T extends Record<string, unknown>>(
  data: T[],
  sortType: keyof T,
): { type: string; items: T[] }[] => {
  const sortedObject = groupBy(data, (item) => item[sortType]) as GroupedData<T>;

  const keysToKeep = [NetworkUserStatus.future_outgoing as string];

  const newObject: GroupedData<T> = {
    ...(sortedObject?.outgoing?.length > 0 || sortedObject?.future_outgoing?.length > 0
      ? {
          ...sortedObject,
          outgoing: data.filter((item) => {
            return (
              item.entity_type === NetworkUserStatus.future_outgoing ||
              item.entity_type === NetworkUserStatus.outgoing
            );
          }),
        }
      : sortedObject),
  };

  const formatObject: GroupedData<T> = Object.keys(newObject).reduce((acc, key) => {
    if (!keysToKeep.includes(key)) {
      acc[key as keyof GroupedData<T>] = newObject[key as keyof GroupedData<T>];
    }
    return acc;
  }, {} as GroupedData<T>);

  return Object.entries(formatObject).map(([key, value]) => ({
    type: key,
    items: value as T[],
  }));
};
