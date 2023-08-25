import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
import { StatusesItemContainer } from './StatusesItem.style';
type StatuesItemProps = {
  selectedStatus: PlannerItemStatusesEnum;
  isSmall?: boolean;
};
const StatuesItem: FC<StatuesItemProps> = ({ selectedStatus, isSmall }) => {
  const selectedItem = plannerItemStatusesConfig[selectedStatus];

  return (
    <StatusesItemContainer
      isSmall={isSmall}
      iconColor={selectedItem.iconColor}
      selectedBgColor={selectedItem.selectedBgColor}
    >
      <selectedItem.icon />
      <Typography
        color={selectedItem.color}
        sx={{ ml: isSmall ? '0' : '6px' }}
        variant={isSmall ? 't10m' : 't12m'}
      >
        {selectedItem.label}
      </Typography>
    </StatusesItemContainer>
  );
};

export default StatuesItem;
