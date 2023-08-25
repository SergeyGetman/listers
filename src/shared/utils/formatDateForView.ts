import moment, { Moment } from 'moment/moment';

export const formatDateForView = (date?: Moment | null) => {
  if (!date) return '';
  return moment(date).format('MMM DD');
};
