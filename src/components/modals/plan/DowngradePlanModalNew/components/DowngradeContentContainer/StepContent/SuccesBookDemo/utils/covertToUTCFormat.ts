import Moment from 'moment/moment';

export const covertToUTCFormat = (startDate: Date, endDate: Date): [string, string] => {
  const covertStartDate = Moment(startDate).format('YYYY-MM-DD HH:mm:ss');
  const covetEndDate = Moment(endDate).format('YYYY-MM-DD HH:mm:ss');

  return [covertStartDate, covetEndDate];
};
