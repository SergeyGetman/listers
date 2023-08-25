import Moment from 'moment';

interface TimeConfigItem {
  item: {
    value: string;
    label: string;
  };
  callback: any;
}

export const createTimeConfig = (callback: any): TimeConfigItem[] => {
  const timeConfig: TimeConfigItem[] = [];
  for (let i = 0; i < 24 * 4; i++) {
    const timeMoment = Moment()
      .startOf('day')
      .add(i * 15, 'minutes');
    const timeString = timeMoment.format('hh:mm A');

    timeConfig.push({
      item: {
        value: timeString,
        label: timeString,
      },
      callback: () => callback(timeString),
    });
  }

  return timeConfig;
};
