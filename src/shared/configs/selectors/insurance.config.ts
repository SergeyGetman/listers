import i18next from 'i18next';
import { FrequencyEnum } from '../../enums/frequency.enum';

type FrequencyTypeConfigType = {
  [key: string]: {
    label: string;
    value: FrequencyEnum;
  };
};

export const FrequencyTypeConfig: FrequencyTypeConfigType = {
  [FrequencyEnum.none]: {
    value: FrequencyEnum.none,
    label: i18next.t('garage.frequency.none'),
  },
  [FrequencyEnum.once_a_week]: {
    value: FrequencyEnum.once_a_week,
    label: i18next.t('garage.frequency.once_week'),
  },
  [FrequencyEnum.once_a_two_weeks]: {
    value: FrequencyEnum.once_a_two_weeks,
    label: i18next.t('garage.frequency.once_in_two_weeks'),
  },
  [FrequencyEnum.once_a_mounts]: {
    value: FrequencyEnum.once_a_mounts,
    label: i18next.t('garage.frequency.once_month'),
  },
  [FrequencyEnum.once_a_6_mounts]: {
    value: FrequencyEnum.once_a_6_mounts,
    label: i18next.t('garage.frequency.once_in_six_months'),
  },
};
