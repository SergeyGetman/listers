import i18next from '../../locales/i18n';

type AutoArchiveConfigType = {
  [key: string]: {
    label: string;
    value: number | string;
  };
};

export const AutoArchiveConfig: AutoArchiveConfigType = {
  none: {
    value: 'none',
    label: i18next.t('general.priority.none'),
  },
  '15': {
    value: 15,
    label: i18next.t('general.period.fifteenDays'),
  },
  '30': {
    value: 30,
    label: i18next.t('general.period.thirtyDays'),
  },
};
