import React, { FC } from 'react';
import { MuiButtonProps } from '../MuiButton/MuiButton';
import { BottomCardButtonItem } from './BottomCardButton.style';

export type BottomCardButtonProps = MuiButtonProps & {
  loading?: boolean;
  variant: 'outlined' | 'contained' | 'text';
  textColor?: string;
  hoverTextColor?: string;
};

const BottomCardButton: FC<BottomCardButtonProps> = ({
  loading = false,
  variant = 'outlined',
  size = 'large',
  textColor,
  hoverTextColor,
  color,
  isDisabled,
  startIcon,
  endIcon,
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
    <BottomCardButtonItem
      {...args}
      textColor={textColor}
      hoverTextColor={hoverTextColor}
      loading={loading}
      variant={variant}
      size={size}
      disabled={isDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={handleClick}
      type={type}
    >
      {label}
    </BottomCardButtonItem>
  );
};

export default BottomCardButton;
