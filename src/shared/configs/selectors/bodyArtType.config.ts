import i18next from 'i18next';
import { BodyArtTypeEnum } from '../../enums/bodyArtType.enum';

type BodyArtTypeConfigType = {
  [key: string]: {
    label: string;
    value: BodyArtTypeEnum;
  };
};

export const BodyArtTypeConfig: BodyArtTypeConfigType = {
  [BodyArtTypeEnum.branding]: {
    value: BodyArtTypeEnum.branding,
    label: i18next.t('general.bodyArtType.branding'),
  },
  [BodyArtTypeEnum.earrings]: {
    value: BodyArtTypeEnum.earrings,
    label: i18next.t('general.bodyArtType.earrings'),
  },
  [BodyArtTypeEnum.piercing]: {
    value: BodyArtTypeEnum.piercing,
    label: i18next.t('general.bodyArtType.piercing'),
  },
  [BodyArtTypeEnum.tattoo]: {
    value: BodyArtTypeEnum.tattoo,
    label: i18next.t('general.bodyArtType.tattoo'),
  },
  [BodyArtTypeEnum.permanent_makeup]: {
    value: BodyArtTypeEnum.permanent_makeup,
    label: i18next.t('general.bodyArtType.permanentMakeup'),
  },
  [BodyArtTypeEnum.other]: {
    value: BodyArtTypeEnum.other,
    label: i18next.t('general.bodyArtType.other'),
  },
};
