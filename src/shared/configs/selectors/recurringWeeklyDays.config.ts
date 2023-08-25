import i18next from 'i18next';
import { RecurringWeeklyDaysEnum } from '../../enums/recurringWeeklyDays.enum';

type RelationshipConfigType = {
  [key: string]: {
    label: string;
    value: RecurringWeeklyDaysEnum;
  };
};

export const RecurringWeeklyDaysConfig: RelationshipConfigType = {
  [RecurringWeeklyDaysEnum.SU]: {
    value: RecurringWeeklyDaysEnum.SU,
    label: i18next.t('general.recurringWeeklyDays.sun'),
  },
  [RecurringWeeklyDaysEnum.MO]: {
    value: RecurringWeeklyDaysEnum.MO,
    label: i18next.t('general.recurringWeeklyDays.mon'),
  },
  [RecurringWeeklyDaysEnum.TU]: {
    value: RecurringWeeklyDaysEnum.TU,
    label: i18next.t('general.recurringWeeklyDays.tue'),
  },
  [RecurringWeeklyDaysEnum.WE]: {
    value: RecurringWeeklyDaysEnum.WE,
    label: i18next.t('general.recurringWeeklyDays.wed'),
  },
  [RecurringWeeklyDaysEnum.TH]: {
    value: RecurringWeeklyDaysEnum.TH,
    label: i18next.t('general.recurringWeeklyDays.thu'),
  },
  [RecurringWeeklyDaysEnum.FR]: {
    value: RecurringWeeklyDaysEnum.FR,
    label: i18next.t('general.recurringWeeklyDays.fri'),
  },
  [RecurringWeeklyDaysEnum.SA]: {
    value: RecurringWeeklyDaysEnum.SA,
    label: i18next.t('general.recurringWeeklyDays.sat'),
  },
};
