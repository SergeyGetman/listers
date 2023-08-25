import React, { FC } from 'react';
import { Box } from '@mui/material';
import PaperActionMenu from '../../actionMenus/PaperActionMenu';
import { plannerItemPriorityConfig } from '../../../shared/configs/plannerItemPriority.config';
import { PlannerItemPriorityEnum } from '../../../shared/enums/plannerItemPriority.enum';
import PriorityItem from './components/PriorityItem';
type PriorityPopoverProps = {
  selectedPriority?: PlannerItemPriorityEnum | null;
  setPriority: (val: PlannerItemPriorityEnum) => void;
};
const PriorityPopover: FC<PriorityPopoverProps> = ({
  selectedPriority = PlannerItemPriorityEnum.none,
  setPriority,
}) => {
  const priorityMenu = [
    {
      item: plannerItemPriorityConfig.high,
      callback: () => setPriority(plannerItemPriorityConfig.high.id),
    },
    {
      item: plannerItemPriorityConfig.middle,
      callback: () => setPriority(plannerItemPriorityConfig.middle.id),
    },
    {
      item: plannerItemPriorityConfig.low,
      callback: () => setPriority(plannerItemPriorityConfig.low.id),
    },
    {
      item: plannerItemPriorityConfig.none,
      callback: () => setPriority(plannerItemPriorityConfig.none.id),
    },
  ];

  return (
    <Box>
      <PaperActionMenu activeItem={selectedPriority ?? PlannerItemPriorityEnum.none} menuList={priorityMenu}>
        <PriorityItem selectedPriority={selectedPriority ?? PlannerItemPriorityEnum.none} />
      </PaperActionMenu>
    </Box>
  );
};

export default PriorityPopover;
