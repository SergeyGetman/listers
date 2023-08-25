import { RecurringWeeklyDaysEnum } from '../enums/recurringWeeklyDays.enum';

export const getWeekDayEnumFromNumber = (day: number) => {
  const dayEnumArr = [
    RecurringWeeklyDaysEnum.MO,
    RecurringWeeklyDaysEnum.TU,
    RecurringWeeklyDaysEnum.WE,
    RecurringWeeklyDaysEnum.TH,
    RecurringWeeklyDaysEnum.FR,
    RecurringWeeklyDaysEnum.SA,
    RecurringWeeklyDaysEnum.SU,
  ];
  return dayEnumArr[day - 1];
};
