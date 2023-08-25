import React, { FC, memo } from 'react';

import { PopoverButtonItem } from './PopoverButton.style';

export type PopoverButtonProps = {
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'contained';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isHideTextOnMobile?: boolean;
  isContacts?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  isPrimaryText?: boolean;
  isIconBtn?: boolean;
  onClick?: () => void;
  [x: string]: any;
};

const PopoverButton: FC<PopoverButtonProps> = ({
  isDisabled,
  isSelected,
  onClick,
  isContacts = false,
  label,
  isHideTextOnMobile = false,
  startIcon,
  endIcon,
  size = 'large',
  variant = 'outlined',
  isPrimaryText = false,
  isIconBtn,
  ...args
}) => {
  return (
    <PopoverButtonItem
      {...args}
      size={size}
      disabled={isDisabled}
      startIcon={startIcon}
      isContacts={isContacts}
      isPrimaryText={isPrimaryText}
      endIcon={endIcon}
      isIconBtn={isIconBtn}
      variant={variant}
      onClick={onClick}
      isSelected={isSelected}
      isHideTextOnMobile={isHideTextOnMobile}
    >
      {label}
    </PopoverButtonItem>
  );
};

export default memo(PopoverButton);
