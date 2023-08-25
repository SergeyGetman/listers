import { ReactComponent as ShoppingIcon } from '../../../assets/Images/todoIcons/shopping.svg';
import { ReactComponent as CleaningIcon } from '../../../assets/Images/todoIcons/cleaning.svg';
import { ReactComponent as PartyIcon } from '../../../assets/Images/todoIcons/party.svg';
import { ReactComponent as ProductsIcon } from '../../../assets/Images/todoIcons/products.svg';
import { ReactComponent as CustomIcon } from '../../../assets/Images/todoIcons/custom.svg';
import { ReactComponent as WorkIcon } from '../../../assets/Images/todoIcons/work.svg';

import { ChecklistItemTypeEnum } from '../../enums/todo/checklistItemType.enum';

type getChecklistIconConfigType = {
  [key: string]: {
    icon: JSX.Element;
  };
};

export const getChecklistIconConfig: getChecklistIconConfigType = {
  [ChecklistItemTypeEnum.shopping]: {
    icon: ShoppingIcon,
  },
  [ChecklistItemTypeEnum.work]: {
    icon: WorkIcon,
  },
  [ChecklistItemTypeEnum.products]: {
    icon: ProductsIcon,
  },
  [ChecklistItemTypeEnum.cleaning]: {
    icon: CleaningIcon,
  },
  [ChecklistItemTypeEnum.party]: {
    icon: PartyIcon,
  },
  [ChecklistItemTypeEnum.custom]: {
    icon: CustomIcon,
  },
};
