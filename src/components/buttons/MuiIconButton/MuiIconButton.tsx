import React, { FC, ReactElement } from 'react';
import { IconButton, useTheme } from '@mui/material';

type MuiIconButtonProps = {
  size: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  type?: 'button' | 'reset' | 'submit';
  isDisabled?: boolean;
  isStopPropagation?: boolean;
  isPrimaryHover?: boolean;
  children?: ReactElement | ReactElement[] | string;
  onClick?: (event: React.MouseEvent<any, MouseEvent>) => void;
  [x: string]: any;
};
// TODO storybook

const MuiIconButton: FC<MuiIconButtonProps> = ({
  size,
  color,
  type = 'button',
  isDisabled,
  children,
  isStopPropagation = true,
  isPrimaryHover,
  onClick,
  ...args
}) => {
  const theme = useTheme();
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
    <IconButton
      sx={{
        '&: hover': {
          svg: {
            path: {
              fill: isPrimaryHover ? theme.palette.primary.main : '',
            },
          },
        },
      }}
      {...args}
      type={type}
      color={color}
      size={size}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {children}
    </IconButton>
  );
};

export default MuiIconButton;
