import i18next from 'i18next';
import { HairColorEnum } from '../../enums/hairColor.enum';

type HairColorConfigType = {
  [key: string]: {
    label: string;
    value: HairColorEnum;
  };
};

export const HairColorConfig: HairColorConfigType = {
  [HairColorEnum.white]: {
    value: HairColorEnum.white,
    label: i18next.t('general.hairColor.white'),
  },
  [HairColorEnum.yellow]: {
    value: HairColorEnum.yellow,
    label: i18next.t('general.hairColor.yellow'),
  },
  [HairColorEnum.dark_brown]: {
    value: HairColorEnum.dark_brown,
    label: i18next.t('general.hairColor.darkBrown'),
  },
  [HairColorEnum.blond]: {
    value: HairColorEnum.blond,
    label: i18next.t('general.hairColor.blond'),
  },
  [HairColorEnum.black]: {
    value: HairColorEnum.black,
    label: i18next.t('general.hairColor.black'),
  },
  [HairColorEnum.gray]: {
    value: HairColorEnum.gray,
    label: i18next.t('general.hairColor.gray'),
  },
  [HairColorEnum.brown]: {
    value: HairColorEnum.brown,
    label: i18next.t('general.hairColor.brown'),
  },
  [HairColorEnum.silver]: {
    value: HairColorEnum.silver,
    label: i18next.t('general.hairColor.silver'),
  },
  [HairColorEnum.changes_frequently]: {
    value: HairColorEnum.changes_frequently,
    label: i18next.t('general.hairColor.changesFrequently'),
  },
  [HairColorEnum.other]: {
    value: HairColorEnum.other,
    label: i18next.t('general.hairColor.other'),
  },
};
