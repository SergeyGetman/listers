import i18next from 'i18next';
import { RelationshipEnum } from '../enums/relationship.enum';

type RelationshipConfigType = {
  [key: string]: {
    label: string;
    value: RelationshipEnum;
  };
};

export const RelationshipConfig: RelationshipConfigType = {
  [RelationshipEnum.single]: {
    value: RelationshipEnum.single,
    label: i18next.t('general.relationship.single'),
  },
  [RelationshipEnum.in_a_relationship]: {
    value: RelationshipEnum.in_a_relationship,
    label: i18next.t('general.relationship.in_a_relationship'),
  },
  [RelationshipEnum.married]: {
    value: RelationshipEnum.married,
    label: i18next.t('general.relationship.married'),
  },
  [RelationshipEnum.engaged]: {
    value: RelationshipEnum.engaged,
    label: i18next.t('general.relationship.engaged'),
  },
  [RelationshipEnum.in_a_civil_union]: {
    value: RelationshipEnum.in_a_civil_union,
    label: i18next.t('general.relationship.in_a_civil_union'),
  },
  [RelationshipEnum.in_an_open_relationship]: {
    value: RelationshipEnum.in_an_open_relationship,
    label: i18next.t('general.relationship.in_an_open_relationship'),
  },
  [RelationshipEnum.its_complicated]: {
    value: RelationshipEnum.its_complicated,
    label: i18next.t('general.relationship.its_complicated'),
  },
  [RelationshipEnum.separated]: {
    value: RelationshipEnum.separated,
    label: i18next.t('general.relationship.separated'),
  },
  [RelationshipEnum.divorced]: {
    value: RelationshipEnum.divorced,
    label: i18next.t('general.relationship.divorced'),
  },
  [RelationshipEnum.widowed]: {
    value: RelationshipEnum.widowed,
    label: i18next.t('general.relationship.widowed'),
  },
};
