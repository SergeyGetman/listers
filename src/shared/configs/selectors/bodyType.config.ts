import i18next from 'i18next';
import { BodyTypeEnum } from '../../enums/bodyType.enum';

type BodyTypeConfigType = {
  [key: string]: {
    label: string;
    value: BodyTypeEnum;
  };
};

export const BodyTypeConfig: BodyTypeConfigType = {
  [BodyTypeEnum.petite]: {
    value: BodyTypeEnum.petite,
    label: i18next.t('general.bodyType.petite'),
  },
  [BodyTypeEnum.slim]: {
    value: BodyTypeEnum.slim,
    label: i18next.t('general.bodyType.slim'),
  },
  [BodyTypeEnum.athletic]: {
    value: BodyTypeEnum.athletic,
    label: i18next.t('general.bodyType.athletic'),
  },
  [BodyTypeEnum.average]: {
    value: BodyTypeEnum.average,
    label: i18next.t('general.bodyType.average'),
  },
  [BodyTypeEnum.few_extra_pounds]: {
    value: BodyTypeEnum.few_extra_pounds,
    label: i18next.t('general.bodyType.fewExtraPounds'),
  },
  [BodyTypeEnum.full_figured]: {
    value: BodyTypeEnum.full_figured,
    label: i18next.t('general.bodyType.fullFigured'),
  },
  [BodyTypeEnum.large_and_lovely]: {
    value: BodyTypeEnum.large_and_lovely,
    label: i18next.t('general.bodyType.largeAndLovely'),
  },
  [BodyTypeEnum.other]: {
    value: BodyTypeEnum.other,
    label: i18next.t('general.bodyType.other'),
  },
};
