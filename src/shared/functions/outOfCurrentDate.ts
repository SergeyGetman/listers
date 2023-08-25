import Moment from 'moment';

export const outOfDate = (date: string, firstDate?: string) => {
  const checkedDate = firstDate ? Moment(firstDate) : Moment();
  const formatDate = Moment.utc(date, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD HH:mm:ss');

  return checkedDate.diff(Moment(formatDate), 'minute') > 0;
};
