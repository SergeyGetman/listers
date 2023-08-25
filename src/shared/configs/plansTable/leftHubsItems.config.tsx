import { TFunction } from 'i18next';
import { PlansTableLeftItems } from './leftOrganizerItems.config';

export const getPlansTableLeftIHubsItemsConfig = (t: TFunction): PlansTableLeftItems[] => [
  {
    label: t('table.leftColumnItems.garage'),
    isDisabled: false,
  },
  {
    label: t('table.leftColumnItems.profile'),
    isDisabled: false,
  },
  {
    label: t('table.leftColumnItems.pets'),
    isDisabled: true,
  },
  {
    label: t('table.leftColumnItems.education'),
    isDisabled: true,
  },
  {
    label: t('table.leftColumnItems.work'),
    isDisabled: true,
  },
  {
    label: t('table.leftColumnItems.health'),
    isDisabled: true,
  },
  {
    label: t('table.leftColumnItems.property'),
    isDisabled: true,
  },
];
