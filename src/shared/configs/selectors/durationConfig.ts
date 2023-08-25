import i18next from 'i18next';
import { DurationTimeEnum } from '../../enums/duration.enum';

type DurationConfigType = {
  [key: string]: {
    label: string;
    value: DurationTimeEnum;
  };
};

export const DurationTimeConfig: DurationConfigType = {
  [DurationTimeEnum.none_duration]: {
    value: DurationTimeEnum.none_duration,
    label: i18next.t('general.durationTime.noneDuration'),
  },
  [DurationTimeEnum.fifteen_minute_duration]: {
    value: DurationTimeEnum.fifteen_minute_duration,
    label: i18next.t('general.durationTime.minutes', { time: 15 }),
  },
  [DurationTimeEnum.thirty_minute_duration]: {
    value: DurationTimeEnum.thirty_minute_duration,
    label: i18next.t('general.durationTime.minutes', { time: 30 }),
  },
  [DurationTimeEnum.forty_five_duration]: {
    value: DurationTimeEnum.forty_five_duration,
    label: i18next.t('general.durationTime.minutes', { time: 45 }),
  },
  [DurationTimeEnum.one_hour_duration]: {
    value: DurationTimeEnum.one_hour_duration,
    label: i18next.t('general.durationTime.hour', { hour: 1 }),
  },
  [DurationTimeEnum.two_hour_duration]: {
    value: DurationTimeEnum.two_hour_duration,
    label: i18next.t('general.durationTime.hours', { hours: 2 }),
  },
  [DurationTimeEnum.three_hour_duration]: {
    value: DurationTimeEnum.three_hour_duration,
    label: i18next.t('general.durationTime.hours', { hours: 3 }),
  },
  [DurationTimeEnum.four_hour_duration]: {
    value: DurationTimeEnum.four_hour_duration,
    label: i18next.t('general.durationTime.hours', { hours: 4 }),
  },
  [DurationTimeEnum.five_hour_duration]: {
    value: DurationTimeEnum.five_hour_duration,
    label: i18next.t('general.durationTime.hours', { hours: 5 }),
  },
  [DurationTimeEnum.six_hour_duration]: {
    value: DurationTimeEnum.six_hour_duration,
    label: i18next.t('general.durationTime.hours', { hours: 6 }),
  },
  [DurationTimeEnum.seven_hour_duration]: {
    value: DurationTimeEnum.seven_hour_duration,
    label: i18next.t('general.durationTime.hours', { hours: 7 }),
  },
};
