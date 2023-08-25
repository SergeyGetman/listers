import React, { FC } from 'react';
import { StyledButton } from './FullWidthIconButton.style';

type FullWidthIconButtonProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  isDisabled?: boolean;
  label: string;
  isStopPropagation?: boolean;
  onClick?: (event: React.MouseEvent<any, MouseEvent>) => void;
  [x: string]: any;
};
// TODO storybook

const FullWidthIconButton: FC<FullWidthIconButtonProps> = ({
  size = 'small',
  color,
  isDisabled,
  label,
  isStopPropagation = true,
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
    <StyledButton
      {...args}
      disabled={isDisabled}
      size={size}
      loading={false}
      variant="outlined"
      onClick={handleClick}
    >
      {label}
    </StyledButton>
  );
};

export default FullWidthIconButton;
