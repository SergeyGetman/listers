import { ByPersonFiltersEnum } from '../enums/byPersonFilters.enum';
import i18next from '../locales/i18n';

type ByPersonFiltersConfigType = {
  [key: string]: {
    label: string;
    value: ByPersonFiltersEnum;
  };
};
export const byPersonFiltersConfig: ByPersonFiltersConfigType = {
  [ByPersonFiltersEnum.all]: {
    value: ByPersonFiltersEnum.all,
    label: i18next.t('general.byPersonFilters.all'),
  },
  [ByPersonFiltersEnum.mine]: {
    value: ByPersonFiltersEnum.mine,
    label: i18next.t('general.byPersonFilters.mine'),
  },
  [ByPersonFiltersEnum.created_by_me]: {
    value: ByPersonFiltersEnum.created_by_me,
    label: i18next.t('general.byPersonFilters.createdByMe'),
  },
};
