import React, { FC } from 'react';
import { PriorityItemContainer } from './PriorityItem.style';
import { PlannerItemPriorityEnum } from '../../../../../shared/enums/plannerItemPriority.enum';
import { plannerItemPriorityConfig } from '../../../../../shared/configs/plannerItemPriority.config';
type PriorityItemProps = {
  selectedPriority: PlannerItemPriorityEnum;
};
const PriorityItem: FC<PriorityItemProps> = ({ selectedPriority }) => {
  const priorityItem = plannerItemPriorityConfig[selectedPriority];

  return (
    <PriorityItemContainer
      backgroundColor={priorityItem.backgroundColor}
      borderColor={priorityItem.borderColor}
      iconColor={priorityItem.iconColor}
      priorityId={priorityItem.id}
    >
      <priorityItem.icon />
    </PriorityItemContainer>
  );
};

export default PriorityItem;
