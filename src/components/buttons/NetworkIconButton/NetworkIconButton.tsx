import React, { FC } from 'react';
import { CustomButton, CircleIconButtonIcon } from './NetworkIconButton.style';

export type MuiButtonProps = {
  variant?: 'outlined' | 'contained' | 'text';
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  startIcon?: React.ReactNode;
  label: string;
  colorIconBtn?: string;
  type?: 'button' | 'reset' | 'submit';
  isStopPropagation?: boolean;
  onClick?: (event: React.MouseEvent<any, MouseEvent>) => void;
};

const MuiButton: FC<MuiButtonProps> = ({
  variant = 'text',
  size = 'large',
  isDisabled,
  startIcon,
  colorIconBtn,
  label,
  isStopPropagation = true,
  type = 'button',
  onClick,
  ...args
}) => {
  const handleClick = (e: React.MouseEvent<any, MouseEvent>) => {
    if (isStopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (onClick) {
      onClick(e);
    }
  };
  return (
    <CustomButton
      isBigIcon={false}
      colorTextBtn={colorIconBtn}
      {...args}
      variant={variant}
      size={size}
      disabled={isDisabled}
      startIcon={
        <CircleIconButtonIcon disabled={isDisabled} color={colorIconBtn}>
          {startIcon}
        </CircleIconButtonIcon>
      }
      onClick={handleClick}
      type={type}
    >
      {label}
    </CustomButton>
  );
};

export default MuiButton;
