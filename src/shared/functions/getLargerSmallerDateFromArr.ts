import Moment from 'moment';

export const getLargerSmallerDateFromArr = (date: string, dateArr: string[]) => {
  const formatDate =
    dateArr.indexOf(date) !== -1
      ? dateArr
      : [...dateArr, date].slice().sort((a: string, b: string) => {
          return Moment(a).diff(Moment(b), 'minute');
        });
  const dateIndex = formatDate.indexOf(date);
  const indexSmallerItem = dateIndex === 0 ? dateIndex : dateIndex - 1;
  const indexLargerItem = dateIndex === formatDate.length - 1 ? dateIndex : dateIndex + 1;
  return {
    smallerItem: formatDate[indexSmallerItem],
    largerItem: formatDate[indexLargerItem],
    hasNextSmallerItem: dateIndex - 2 >= 0,
    hasNextLargerItem: dateIndex + 1 <= formatDate.length - 2,
  };
};
