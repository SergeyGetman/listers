/* eslint-disable prefer-const */

import Moment from 'moment';
import { outOfDate } from './outOfCurrentDate';

export const updatePlannerDates = ({
  item,
  plannerDates,
  plannerCurrentMinDate,
  plannerCurrentMaxDate,
}: {
  item: any;
  plannerDates: string[];
  plannerCurrentMinDate: string;
  plannerCurrentMaxDate: string;
}) => {
  const outOfTopCurrentMinDate = outOfDate(item.started_at || '', plannerCurrentMinDate || '');
  const outOfBottomCurrentMaxDate = outOfDate(item.finished_at || '', plannerCurrentMaxDate || '');
  const minDate = outOfTopCurrentMinDate
    ? plannerCurrentMinDate
    : Moment.utc(item.started_at, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD');
  const maxDate = outOfBottomCurrentMaxDate
    ? Moment.utc(item.finished_at, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD')
    : plannerCurrentMaxDate;

  const currentDayDiff = Moment(maxDate).diff(Moment(minDate), 'days');
  const currentDayDiffArr: string[] = [];
  let newPlannerDates = [...plannerDates];
  for (let i = 0; i <= currentDayDiff; i++) {
    currentDayDiffArr.push(Moment(minDate).add(i, 'days').format('YYYY-MM-DD'));
  }

  currentDayDiffArr.forEach((day: string) => {
    const dayIndex = newPlannerDates.indexOf(day);

    if (dayIndex === -1) {
      newPlannerDates = [...newPlannerDates, day];
    }
  });
  return newPlannerDates.sort((a, b) => {
    return Moment(a).diff(Moment(b), 'minute');
  });
};
