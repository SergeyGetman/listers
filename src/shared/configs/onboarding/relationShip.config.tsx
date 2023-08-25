import { TFunction } from 'i18next';
import { RelationShipEnum } from '../../enums/onboarding/relationShip.enum';

type RelationShipItemType = {
  key: RelationShipEnum;
  label: string;
};

export const getRelationShipConfig = (t: TFunction): RelationShipItemType[] => [
  {
    label: t('onboarding.fourthSlide.selectors.single'),
    key: RelationShipEnum.single,
  },
  {
    label: t('onboarding.fourthSlide.selectors.InARelationship'),
    key: RelationShipEnum.in_a_relationship,
  },
  {
    label: t('onboarding.fourthSlide.selectors.married'),
    key: RelationShipEnum.married,
  },
];
