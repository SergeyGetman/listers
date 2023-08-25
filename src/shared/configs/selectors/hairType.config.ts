import i18next from 'i18next';

import { HairTypeEnum } from '../../enums/hairType.enum';

type HairTypeConfigType = {
  [key: string]: {
    label: string;
    value: HairTypeEnum;
  };
};

export const HairTypeConfig: HairTypeConfigType = {
  [HairTypeEnum.straight]: {
    value: HairTypeEnum.straight,
    label: i18next.t('general.hairType.straight'),
  },
  [HairTypeEnum.wavy]: {
    value: HairTypeEnum.wavy,
    label: i18next.t('general.hairType.wavy'),
  },
  [HairTypeEnum.curly]: {
    value: HairTypeEnum.curly,
    label: i18next.t('general.hairType.curly'),
  },
  [HairTypeEnum.other]: {
    value: HairTypeEnum.other,
    label: i18next.t('general.hairType.other'),
  },
};
