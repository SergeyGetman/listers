import i18next from 'i18next';
import { GenderEnum } from '../enums/gender.enum';

type GenderConfigType = {
  [key: string]: {
    label: string;
    value: GenderEnum;
  };
};

export const GenderConfig: GenderConfigType = {
  [GenderEnum.male]: {
    value: GenderEnum.male,
    label: i18next.t('general.gender.male'),
  },
  [GenderEnum.female]: {
    value: GenderEnum.female,
    label: i18next.t('general.gender.female'),
  },
  [GenderEnum.unspecified]: {
    value: GenderEnum.unspecified,
    label: i18next.t('general.gender.unspecified'),
  },
  [GenderEnum.undisclosed]: {
    value: GenderEnum.undisclosed,
    label: i18next.t('general.gender.undisclosed'),
  },
};
