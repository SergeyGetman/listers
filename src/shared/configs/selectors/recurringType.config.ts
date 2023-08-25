import i18next from 'i18next';
import { RecurringTypeEnum } from '../../enums/recurringType.enum';

type RecurringTypeConfigType = {
  [key: string]: {
    label: string;
    value: RecurringTypeEnum;
  };
};

export const RecurringTypeConfig: RecurringTypeConfigType = {
  [RecurringTypeEnum.DAILY]: {
    value: RecurringTypeEnum.DAILY,
    label: i18next.t('general.recurringType.daily'),
  },
  [RecurringTypeEnum.WEEKLY]: {
    value: RecurringTypeEnum.WEEKLY,
    label: i18next.t('general.recurringType.weekly'),
  },
  [RecurringTypeEnum.MONTHLY]: {
    value: RecurringTypeEnum.MONTHLY,
    label: i18next.t('general.recurringType.monthly'),
  },
  [RecurringTypeEnum.CUSTOM]: {
    value: RecurringTypeEnum.CUSTOM,
    label: i18next.t('general.recurringType.custom'),
  },
  [RecurringTypeEnum.NONE]: {
    value: RecurringTypeEnum.NONE,
    label: i18next.t('general.recurringType.neverRepeat'),
  },
};
