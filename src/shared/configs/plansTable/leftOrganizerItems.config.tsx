import { TFunction } from 'i18next';

export type PlansTableLeftItems = {
  isDisabled: boolean;
  label: string;
};

export const getPlansTableLeftOrganizerItemsConfig = (t: TFunction): PlansTableLeftItems[] => [
  {
    label: t('table.leftColumnItems.todo'),
    isDisabled: false,
  },
  {
    label: t('table.leftColumnItems.journalCalendar'),
    isDisabled: false,
  },
  {
    label: t('table.leftColumnItems.tasks'),
    isDisabled: false,
  },
  {
    label: t('table.leftColumnItems.backlog'),
    isDisabled: false,
  },
  {
    label: t('table.leftColumnItems.budget'),
    isDisabled: true,
  },
  {
    label: t('table.leftColumnItems.cloud'),
    isDisabled: true,
  },
];
