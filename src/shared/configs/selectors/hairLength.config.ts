import i18next from 'i18next';

import { HairLengthEnum } from '../../enums/hairLength.enum';

type HairLengthConfigType = {
  [key: string]: {
    label: string;
    value: HairLengthEnum;
  };
};

export const HairLengthConfig: HairLengthConfigType = {
  [HairLengthEnum.bald]: {
    value: HairLengthEnum.bald,
    label: i18next.t('general.hairLength.bald'),
  },
  [HairLengthEnum.bald_on_top]: {
    value: HairLengthEnum.bald_on_top,
    label: i18next.t('general.hairLength.baldOnTop'),
  },
  [HairLengthEnum.shaved]: {
    value: HairLengthEnum.shaved,
    label: i18next.t('general.hairLength.shaved'),
  },
  [HairLengthEnum.short]: {
    value: HairLengthEnum.short,
    label: i18next.t('general.hairLength.short'),
  },
  [HairLengthEnum.medium]: {
    value: HairLengthEnum.medium,
    label: i18next.t('general.hairLength.medium'),
  },
  [HairLengthEnum.long]: {
    value: HairLengthEnum.long,
    label: i18next.t('general.hairLength.long'),
  },
  [HairLengthEnum.other]: {
    value: HairLengthEnum.other,
    label: i18next.t('general.hairLength.other'),
  },
};
