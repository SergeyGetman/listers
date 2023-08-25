import React, { FC, ReactElement, useMemo } from 'react';
import { MuiCustomIconButton } from './MuiIconButton.style';

type MuiIconButtonProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  type?: 'button' | 'reset' | 'submit';
  variant?: 'outlined' | 'contained' | 'white' | 'default';
  isDisabled?: boolean;
  isSelected?: boolean;
  isStopPropagation?: boolean;
  isPrimaryHover?: boolean;
  children?: ReactElement | ReactElement[] | React.ReactNode | string;
  onClick?: (event: React.MouseEvent<any, MouseEvent>) => void;
  [x: string]: any;
};
// TODO storybook

const MuiIconButton: FC<MuiIconButtonProps> = ({
  size = 'small',
  color = 'primary',
  variant = 'default',
  type = 'button',
  isSelected = false,
  isDisabled,
  children,
  isStopPropagation = true,
  isPrimaryHover,
  onClick,
  ...args
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isStopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (onClick) {
      onClick(e);
    }
  };

  const choseVariantClassName = useMemo(() => {
    switch (variant) {
      case 'outlined':
        return 'outlined-mui-icon-button';
      case 'contained':
        return 'contained-mui-icon-button';
      case 'white':
        return 'white-mui-icon-button';
      case 'default':
        return 'default-mui-icon-button';
      default:
        return '';
    }
  }, [variant]);

  return (
    <MuiCustomIconButton
      {...args}
      type={type}
      isSelected={isSelected}
      className={choseVariantClassName}
      color={color}
      size={size}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {children}
    </MuiCustomIconButton>
  );
};

export default MuiIconButton;
