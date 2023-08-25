import { TFunction } from 'i18next';
import { ReactComponent as ShoppingIcon } from '../../../assets/Images/todoIcons/shopping.svg';
import { ReactComponent as CleaningIcon } from '../../../assets/Images/todoIcons/cleaning.svg';
import { ReactComponent as WorkIcon } from '../../../assets/Images/todoIcons/work.svg';
import { ReactComponent as PartyIcon } from '../../../assets/Images/todoIcons/party.svg';
import { ReactComponent as ProductsIcon } from '../../../assets/Images/todoIcons/products.svg';

import { ChecklistItemTypeEnum } from '../../enums/todo/checklistItemType.enum';

type CheckListTemplateType = {
  key: ChecklistItemTypeEnum;
  label: string;
  icon: JSX.Element;
  isStroke?: boolean;
};

export const getChecklistTemplatesLeftConfig = (t: TFunction): CheckListTemplateType[] => [
  {
    icon: <ShoppingIcon />,
    isStroke: true,
    label: t('general.todoActionMenuPreset.shopping'),
    key: ChecklistItemTypeEnum.shopping,
  },
  {
    icon: <WorkIcon />,
    label: t('general.todoActionMenuPreset.work'),
    key: ChecklistItemTypeEnum.work,
  },
  {
    icon: <ProductsIcon />,
    label: t('general.todoActionMenuPreset.products'),
    key: ChecklistItemTypeEnum.products,
  },
];

export const getChecklistTemplatesRightConfig = (t: TFunction): CheckListTemplateType[] => [
  {
    icon: <CleaningIcon />,
    label: t('general.todoActionMenuPreset.cleaning'),
    key: ChecklistItemTypeEnum.cleaning,
  },
  {
    icon: <PartyIcon />,
    label: t('general.todoActionMenuPreset.party'),
    key: ChecklistItemTypeEnum.party,
  },
];
