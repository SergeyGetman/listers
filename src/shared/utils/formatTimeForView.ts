import moment, { Moment } from 'moment';

export const formatTimeForView = (time?: Moment | null, isAllDay?: boolean) => {
  if (isAllDay || !time) return '';
  return `${moment(time).format('LT')}`;
};
