import { TFunction } from 'i18next';

import { ChecklistItemTypeEnum } from '../../enums/todo/checklistItemType.enum';

type getChecklistItemConfigType = {
  [key: string]: {
    icon: string;
    label: string;
  };
};

export const getChecklistItemConfig = (t: TFunction): getChecklistItemConfigType => ({
  [ChecklistItemTypeEnum.shopping]: {
    icon: ChecklistItemTypeEnum.shopping,
    label: t('general.todoActionMenuPreset.shopping'),
  },
  [ChecklistItemTypeEnum.work]: {
    icon: ChecklistItemTypeEnum.work,
    label: t('general.todoActionMenuPreset.work'),
  },
  [ChecklistItemTypeEnum.products]: {
    icon: ChecklistItemTypeEnum.products,
    label: t('general.todoActionMenuPreset.products'),
  },
  [ChecklistItemTypeEnum.cleaning]: {
    icon: ChecklistItemTypeEnum.cleaning,
    label: t('general.todoActionMenuPreset.cleaning'),
  },
  [ChecklistItemTypeEnum.party]: {
    icon: ChecklistItemTypeEnum.party,
    label: t('general.todoActionMenuPreset.party'),
  },
  [ChecklistItemTypeEnum.custom]: {
    icon: ChecklistItemTypeEnum.custom,
    label: t('general.header.newChecklist'),
  },
  [ChecklistItemTypeEnum.new]: {
    icon: '',
    label: t('general.header.newChecklist'),
  },
});
