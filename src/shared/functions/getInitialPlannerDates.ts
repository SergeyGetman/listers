import Moment from 'moment/moment';
import { getLargerSmallerDateFromArr } from './getLargerSmallerDateFromArr';
import typeGuardFormActionMenu from './typeGuardFormActionMenu';

export const getInitialPlannerDates = (dates: string[]) => {
  const today = Moment().format('YYYY-MM-DD');
  const itemCount = 6;
  let result: string[] = [];
  let hasNextSmallerItem = false;
  let hasNextLargerItem = false;
  let smallerItem = '';
  let largerItem = '';

  for (let i = 0; i < itemCount; i++) {
    if (i === 0) {
      const largerSmallerDate = getLargerSmallerDateFromArr(today, dates);
      result = [
        largerSmallerDate.smallerItem,
        today !== largerSmallerDate.smallerItem && dates.indexOf(today) !== -1 && today,
        today !== largerSmallerDate.largerItem && largerSmallerDate.largerItem,
      ].filter(typeGuardFormActionMenu);
      smallerItem = largerSmallerDate.smallerItem;
      hasNextSmallerItem = largerSmallerDate.hasNextSmallerItem;
      hasNextLargerItem = largerSmallerDate.hasNextLargerItem;
    } else {
      const lastArrDate = result[result.length - 1] || today;
      const largerSmallerDate = getLargerSmallerDateFromArr(lastArrDate, dates);

      result = [
        ...result,
        lastArrDate !== largerSmallerDate.largerItem && largerSmallerDate.largerItem,
      ].filter(typeGuardFormActionMenu);

      hasNextLargerItem = largerSmallerDate.hasNextLargerItem;
      largerItem = largerSmallerDate.largerItem;
      if (!largerSmallerDate.hasNextLargerItem) {
        break;
      }
    }
  }

  return { result, hasNextSmallerItem, hasNextLargerItem, smallerItem, largerItem };
};
