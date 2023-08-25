import i18next from 'i18next';
import { BustCupSizeEnum } from '../../enums/bustCupSize.enum';

type BustCupSizeConfigType = {
  [key: string]: {
    label: string;
    value: BustCupSizeEnum;
  };
};

export const BustCupSizeConfig: BustCupSizeConfigType = {
  [BustCupSizeEnum.a]: {
    value: BustCupSizeEnum.a,
    label: i18next.t('general.bustSize.a'),
  },
  [BustCupSizeEnum.b]: {
    value: BustCupSizeEnum.b,
    label: i18next.t('general.bustSize.b'),
  },
  [BustCupSizeEnum.c]: {
    value: BustCupSizeEnum.c,
    label: i18next.t('general.bustSize.c'),
  },
  [BustCupSizeEnum.d]: {
    value: BustCupSizeEnum.d,
    label: i18next.t('general.bustSize.d'),
  },
  [BustCupSizeEnum.dd]: {
    value: BustCupSizeEnum.dd,
    label: i18next.t('general.bustSize.dd'),
  },
  [BustCupSizeEnum.ddd]: {
    value: BustCupSizeEnum.ddd,
    label: i18next.t('general.bustSize.ddd'),
  },
  [BustCupSizeEnum.e]: {
    value: BustCupSizeEnum.e,
    label: i18next.t('general.bustSize.e'),
  },
  [BustCupSizeEnum['f+']]: {
    value: BustCupSizeEnum['f+'],
    label: i18next.t('general.bustSize.f+'),
  },
  [BustCupSizeEnum.g]: {
    value: BustCupSizeEnum.g,
    label: i18next.t('general.bustSize.g'),
  },
};
