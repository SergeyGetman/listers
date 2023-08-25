import React, { FC, useState } from 'react';
import { ActionButtonContainer } from './ActionButton.style';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import { actionButtonItemsConfig } from '../../../shared/configs/actionButtonItems.config';

export type PlannerItemStatusBtnProps = {
  variant: PlannerItemStatusesEnum;
  isDisabled?: boolean;
  isSelected?: boolean;
  // TODO any (setIsLoading?: (val: boolean) => void) => void
  onClick: any;
  isShowRequestLoading?: boolean;
  isExstraSmallBtn?: boolean;
  isFullWidth?: boolean;
  isStartIcon?: boolean;
};

const ActionButton: FC<PlannerItemStatusBtnProps> = ({
  isDisabled,
  variant,
  isSelected,
  isShowRequestLoading,
  onClick,
  isExstraSmallBtn,
  isFullWidth,
  isStartIcon = false,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedItem = actionButtonItemsConfig[variant];

  return (
    <ActionButtonContainer
      size="small"
      disabled={isDisabled}
      loading={isLoading}
      variant="outlined"
      startIcon={isStartIcon ? <selectedItem.icon /> : null}
      onClick={() => (isShowRequestLoading ? onClick(setIsLoading) : onClick())}
      isSelected={isSelected}
      selectedBgColor={selectedItem.selectedBgColor}
      hoverBgColor={selectedItem.hoverBgColor}
      isExstraSmallBtn={isExstraSmallBtn}
      isFullWidth={isFullWidth}
    >
      {selectedItem?.label}
    </ActionButtonContainer>
  );
};

export default ActionButton;
