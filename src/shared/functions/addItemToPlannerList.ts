import Moment from 'moment';
import { outOfDate } from './outOfCurrentDate';
import { PlannerItemModelTypeEnum } from '../enums/plannerItemModelType.enum';

export const addItemToPlannerList = ({
  plannerList,
  item,
  topPaginationDate,
  bottomPaginationDate,
  plannerGeneralMaxMinDate,
}: {
  plannerList: any;
  item: any;
  topPaginationDate: string;
  bottomPaginationDate: string;
  plannerGeneralMaxMinDate: any;
}) => {
  const outOfMinDate = outOfDate(item.started_at || '', plannerGeneralMaxMinDate.started_at || '');
  const outOMaxDate = outOfDate(item.finished_at || '', plannerGeneralMaxMinDate.finished_at || '');
  const outOfTopPaginationDate = outOfDate(item.started_at || '', topPaginationDate || '');
  const outOfBottomPaginationDate = outOfDate(item.finished_at || '', bottomPaginationDate || '');
  const startDate =
    outOfMinDate && topPaginationDate === plannerGeneralMaxMinDate.started_at
      ? outOfTopPaginationDate
        ? topPaginationDate
        : Moment.utc(item.started_at, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD')
      : Moment.utc(item.started_at, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD');
  const finishDate =
    outOMaxDate && bottomPaginationDate === plannerGeneralMaxMinDate.finished_at
      ? outOfBottomPaginationDate
        ? Moment.utc(item.finished_at, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD')
        : bottomPaginationDate
      : Moment.utc(item.finished_at, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD');
  const dayDiff = Moment(finishDate).diff(Moment(startDate), 'days');
  const daysArr: string[] = [];
  let newPlannerList = [...plannerList];

  for (let i = 0; i <= dayDiff; i++) {
    daysArr.push(Moment(startDate).add(i, 'days').format('YYYY-MM-DD'));
  }

  daysArr.forEach((day: string) => {
    const dayIndex = newPlannerList.findIndex(
      (dayItem) => Moment(dayItem.date).diff(Moment(day), 'days') === 0,
    );

    if (dayIndex !== -1) {
      newPlannerList = newPlannerList.map((dayItem: any) => {
        if (Moment(dayItem.date).diff(Moment(day), 'days') === 0) {
          return {
            ...dayItem,
            eventCount:
              item.model_type === PlannerItemModelTypeEnum.event
                ? dayItem.eventCount + 1
                : dayItem.eventCount,
            taskCount:
              item.model_type === PlannerItemModelTypeEnum.task ? dayItem.taskCount + 1 : dayItem.taskCount,
            items: [...dayItem.items, item]
              .sort((a, b) => {
                a = new Date(Moment(a.started_at).format());
                b = new Date(Moment(b.started_at).format());
                return a - b;
              })
              .sort((a, b) => {
                if (b?.is_all_day === true) {
                  return 1;
                }
                if (a?.is_all_day === true) {
                  return -1;
                }
                return 0;
              }),
          };
        }
        return dayItem;
      });
    } else {
      newPlannerList = [
        ...newPlannerList,
        {
          eventCount: item.model_type === PlannerItemModelTypeEnum.event ? 1 : 0,
          taskCount: item.model_type === PlannerItemModelTypeEnum.task ? 1 : 0,
          paymentCount: 0,
          date: Moment(day).format('MMMM DD, YYYY'),
          items: [item],
        },
      ];
    }
  });

  return newPlannerList.sort((a, b) => {
    return Moment(a.date).diff(Moment(b.date), 'minute');
  });
};
