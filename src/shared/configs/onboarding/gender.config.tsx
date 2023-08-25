import { TFunction } from 'i18next';
import { GenderEnum } from '../../enums/onboarding/gender.enum';

type GenderItemType = {
  key: GenderEnum;
  label: string;
};

export const getGenderConfig = (t: TFunction): GenderItemType[] => [
  {
    label: t('onboarding.secondStep.selectors.female'),
    key: GenderEnum.female,
  },
  {
    label: t('onboarding.secondStep.selectors.male'),
    key: GenderEnum.male,
  },
  {
    label: t('onboarding.secondStep.selectors.nonBinary'),
    key: GenderEnum.unspecified,
  },
  {
    label: t('onboarding.secondStep.selectors.dontIdentify'),
    key: GenderEnum.undisclosed,
  },
];
