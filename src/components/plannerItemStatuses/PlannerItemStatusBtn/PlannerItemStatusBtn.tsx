import React, { FC, useState } from 'react';
import { ItemStatusBtn } from './PlannerItemStatusBtn.style';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import { plannerItemStatusesConfig } from '../../../shared/configs/plannerItemStatuses.config';

export type PlannerItemStatusBtnProps = {
  variant: PlannerItemStatusesEnum;
  isDisabled?: boolean;
  isSelected?: boolean;
  isExstraSmallBtn?: boolean;
  // TODO any (setIsLoading?: (val: boolean) => void) => void
  onClick: any;
  isShowRequestLoading?: boolean;
};

const PlannerItemStatusBtn: FC<PlannerItemStatusBtnProps> = ({
  isDisabled,
  variant,
  isSelected,
  isExstraSmallBtn = false,
  isShowRequestLoading,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedItem = plannerItemStatusesConfig[variant];

  return (
    <ItemStatusBtn
      size="small"
      disabled={isDisabled}
      loading={isLoading}
      isExstraSmallBtn={isExstraSmallBtn}
      startIcon={<selectedItem.icon />}
      variant="outlined"
      onClick={() => (isShowRequestLoading ? onClick(setIsLoading) : onClick())}
      isSelected={isSelected}
      selectedBgColor={selectedItem.selectedBgColor}
      hoverBgColor={selectedItem.hoverBgColor}
    >
      {selectedItem?.label}
    </ItemStatusBtn>
  );
};

export default PlannerItemStatusBtn;
