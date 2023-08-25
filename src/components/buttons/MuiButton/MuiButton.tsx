import React, { FC } from 'react';
import { MuiCustomButton } from './MuiButton.style';

export type MuiButtonProps = {
  variant?: 'outlined' | 'contained' | 'tertiary' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error';
  isDisabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label: string;
  type?: 'button' | 'reset' | 'submit';
  isStopPropagation?: boolean;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<any, MouseEvent>) => void;
  [x: string]: any;
};
// TODO NEED REFACTOR AFTER UPDATE DS
const getButtonVariant = (
  variant: 'outlined' | 'contained' | 'tertiary' | 'text',
): {
  className: string;
  variant: 'outlined' | 'contained' | 'text';
} => {
  switch (variant) {
    case 'outlined':
      return {
        className: 'outlined-mui-button',
        variant: 'outlined',
      };
    case 'contained':
      return {
        className: 'contained-mui-button',
        variant: 'contained',
      };
    case 'tertiary':
      return {
        className: 'tertiary-mui-button',
        variant: 'text',
      };
    case 'text':
      return {
        className: 'text-mui-button',
        variant: 'text',
      };

    default:
      return {
        className: 'outlined-mui-button',
        variant: 'outlined',
      };
  }
};

const MuiButton: FC<MuiButtonProps> = ({
  variant = 'outlined',
  size = 'large',
  color,
  isDisabled,
  startIcon,
  endIcon,
  label,
  isStopPropagation = true,
  type = 'button',
  onClick,
  fullWidth = false,
  ...args
}) => {
  const buttonVariant = getButtonVariant(variant);

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
    <MuiCustomButton
      {...args}
      className={buttonVariant.className}
      classes={{ root: 'button-root' }}
      variant={buttonVariant.variant}
      color={color}
      size={size}
      disabled={isDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={handleClick}
      type={type}
      fullWidth={fullWidth}
    >
      {label}
    </MuiCustomButton>
  );
};

export default MuiButton;
