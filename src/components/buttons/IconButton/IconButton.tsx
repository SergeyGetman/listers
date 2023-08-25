import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { StyledIconButton } from './IconButton.style';
import MuiChip from '../../MuiChip';

type MuiIconButtonProps = {
  size: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  type?: 'button' | 'reset' | 'submit';
  isDisabled?: boolean;
  isRounded?: boolean;
  isStopPropagation?: boolean;
  isPrimaryHover?: boolean;
  isSelected?: boolean;
  isShowBadge?: boolean;
  budge?: string | number;
  children?: ReactElement | ReactElement[] | string;
  onClick?: (event: React.MouseEvent<any, MouseEvent>) => void;
  [x: string]: any;
};
// TODO storybook

const IconButton: FC<MuiIconButtonProps> = ({
  size,
  color,
  type = 'button',
  isDisabled,
  children,
  isRounded = false,
  isSelected = false,
  isStopPropagation = true,
  isShowBadge = false,
  budge,
  isPrimaryHover,
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
    <Box sx={{ position: 'relative' }}>
      <StyledIconButton
        {...args}
        type={type}
        color={color}
        size={size}
        isSelected={isSelected}
        isRounded={isRounded}
        disabled={isDisabled}
        onClick={handleClick}
      >
        {children}
      </StyledIconButton>

      {isShowBadge && !!budge ? (
        <Box sx={{ position: 'absolute', top: -3, right: -4 }}>
          <MuiChip isShow label={budge} />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default IconButton;
