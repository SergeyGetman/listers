import { Button } from '@mui/material';
import React, { FC } from 'react';
import { MuiSquareButtonContainer } from './MuiSquareButton.style';

type Props = {
  icon?: React.ReactNode;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary';
  onClick?: () => void;
  isDisabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'text' | 'outlined' | 'contained';
};

const MuiSquareButton: FC<Props> = ({
  size = 'small',
  icon,
  color = 'primary',
  isDisabled = false,
  onClick,
  type = 'button',
  variant = 'outlined',
}) => {
  return (
    <MuiSquareButtonContainer variant={variant} size={size} color={color}>
      <Button
        onClick={onClick}
        classes={{
          root: 'squareBtn',
        }}
        type={type}
        disabled={isDisabled}
        color={color === 'primary' ? 'primary' : 'error'}
        variant={variant}
      >
        {icon}
      </Button>
    </MuiSquareButtonContainer>
  );
};

export default MuiSquareButton;
