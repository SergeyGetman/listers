import i18next from 'i18next';
import { ReminderTimeEnum } from '../../enums/reminderTime.enum';

type ReminderTimeConfigType = {
  [key: string]: {
    label: string;
    value: ReminderTimeEnum;
  };
};

export const ReminderTimeConfig: ReminderTimeConfigType = {
  [ReminderTimeEnum.never_remind]: {
    value: ReminderTimeEnum.never_remind,
    label: i18next.t('general.reminderTime.neverRemind'),
  },
  [ReminderTimeEnum.five_minute_before]: {
    value: ReminderTimeEnum.five_minute_before,
    label: i18next.t('general.reminderTime.minutesBefore', { time: 5 }),
  },
  [ReminderTimeEnum.ten_minute_before]: {
    value: ReminderTimeEnum.ten_minute_before,
    label: i18next.t('general.reminderTime.minutesBefore', { time: 10 }),
  },
  [ReminderTimeEnum.fifteen_minute_before]: {
    value: ReminderTimeEnum.fifteen_minute_before,
    label: i18next.t('general.reminderTime.minutesBefore', { time: 15 }),
  },
  [ReminderTimeEnum.thirty_minute_before]: {
    value: ReminderTimeEnum.thirty_minute_before,
    label: i18next.t('general.reminderTime.minutesBefore', { time: 30 }),
  },
  [ReminderTimeEnum.one_hour_before]: {
    value: ReminderTimeEnum.one_hour_before,
    label: i18next.t('general.reminderTime.hourBefore', { hour: 1 }),
  },
  [ReminderTimeEnum.two_hour_before]: {
    value: ReminderTimeEnum.two_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 2 }),
  },
  [ReminderTimeEnum.three_hour_before]: {
    value: ReminderTimeEnum.three_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 3 }),
  },
  [ReminderTimeEnum.four_hour_before]: {
    value: ReminderTimeEnum.four_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 4 }),
  },
  [ReminderTimeEnum.five_hour_before]: {
    value: ReminderTimeEnum.five_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 5 }),
  },
  [ReminderTimeEnum.six_hour_before]: {
    value: ReminderTimeEnum.six_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 6 }),
  },
  [ReminderTimeEnum.seven_hour_before]: {
    value: ReminderTimeEnum.seven_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 7 }),
  },
  [ReminderTimeEnum.eight_hour_before]: {
    value: ReminderTimeEnum.eight_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 8 }),
  },
  [ReminderTimeEnum.nine_hour_before]: {
    value: ReminderTimeEnum.nine_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 9 }),
  },
  [ReminderTimeEnum.ten_hour_before]: {
    value: ReminderTimeEnum.ten_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 10 }),
  },
  [ReminderTimeEnum.eleven_hour_before]: {
    value: ReminderTimeEnum.eleven_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 11 }),
  },
  [ReminderTimeEnum.twelve_hour_before]: {
    value: ReminderTimeEnum.twelve_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 12 }),
  },
  [ReminderTimeEnum.thirteen_hour_before]: {
    value: ReminderTimeEnum.thirteen_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 13 }),
  },
  [ReminderTimeEnum.fourteen_hour_before]: {
    value: ReminderTimeEnum.fourteen_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 14 }),
  },
  [ReminderTimeEnum.fifteen_hour_before]: {
    value: ReminderTimeEnum.fifteen_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 15 }),
  },
  [ReminderTimeEnum.sixteen_hour_before]: {
    value: ReminderTimeEnum.sixteen_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 16 }),
  },
  [ReminderTimeEnum.seventeen_hour_before]: {
    value: ReminderTimeEnum.seventeen_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 17 }),
  },
  [ReminderTimeEnum.eighteen_hour_before]: {
    value: ReminderTimeEnum.eighteen_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 18 }),
  },
  [ReminderTimeEnum.nineteen_hour_before]: {
    value: ReminderTimeEnum.nineteen_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 19 }),
  },
  [ReminderTimeEnum.twenty_hour_before]: {
    value: ReminderTimeEnum.twenty_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 20 }),
  },
  [ReminderTimeEnum.twenty_one_hour_before]: {
    value: ReminderTimeEnum.twenty_one_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 21 }),
  },
  [ReminderTimeEnum.twenty_two_hour_before]: {
    value: ReminderTimeEnum.twenty_two_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 22 }),
  },
  [ReminderTimeEnum.twenty_three_hour_before]: {
    value: ReminderTimeEnum.twenty_three_hour_before,
    label: i18next.t('general.reminderTime.hoursBefore', { hours: 23 }),
  },
  [ReminderTimeEnum.on_a_day_of_task]: {
    value: ReminderTimeEnum.on_a_day_of_task,
    label: i18next.t('general.reminderTime.onADayOfTask'),
  },
  [ReminderTimeEnum.on_a_day_of_event]: {
    value: ReminderTimeEnum.on_a_day_of_event,
    label: i18next.t('general.reminderTime.onADayOfEvent'),
  },
  [ReminderTimeEnum.on_a_day_of_meeting]: {
    value: ReminderTimeEnum.on_a_day_of_meeting,
    label: i18next.t('general.reminderTime.onADayOfMeeting'),
  },
  [ReminderTimeEnum.one_day_before]: {
    value: ReminderTimeEnum.one_day_before,
    label: i18next.t('general.reminderTime.dayBefore', { day: 1 }),
  },
  [ReminderTimeEnum.two_days_before]: {
    value: ReminderTimeEnum.two_days_before,
    label: i18next.t('general.reminderTime.daysBefore', { days: 2 }),
  },
  [ReminderTimeEnum.three_days_before]: {
    value: ReminderTimeEnum.three_days_before,
    label: i18next.t('general.reminderTime.daysBefore', { days: 3 }),
  },
  [ReminderTimeEnum.four_days_before]: {
    value: ReminderTimeEnum.four_days_before,
    label: i18next.t('general.reminderTime.daysBefore', { days: 4 }),
  },
  [ReminderTimeEnum.five_days_before]: {
    value: ReminderTimeEnum.five_days_before,
    label: i18next.t('general.reminderTime.daysBefore', { days: 5 }),
  },
  [ReminderTimeEnum.one_week_before]: {
    value: ReminderTimeEnum.five_days_before,
    label: i18next.t('general.reminderTime.weekBefore', { week: 1 }),
  },
};
