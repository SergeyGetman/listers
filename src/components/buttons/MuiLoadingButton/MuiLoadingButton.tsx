import React, { FC } from 'react';

import { MuiButtonProps } from '../MuiButton/MuiButton';
import { MuiCustomLoadingButton } from './MuiLoadingButton.style';

export type MuiLoadingButtonProps = MuiButtonProps & {
  loading?: boolean;
};
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

const MuiLoadingButton: FC<MuiLoadingButtonProps> = ({
  loading = false,
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
    <MuiCustomLoadingButton
      {...args}
      loading={loading}
      className={buttonVariant.className}
      variant={buttonVariant.variant}
      color={color}
      size={size}
      disabled={isDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={handleClick}
      type={type}
    >
      {label}
    </MuiCustomLoadingButton>
  );
};

export default MuiLoadingButton;
