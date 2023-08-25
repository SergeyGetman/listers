import React, { FC, useMemo, useRef } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Box } from '@mui/material';
import useHover from '../../../shared/hooks/useHover';
import MuiIconButton from '../MuiIconButton';
import { BigCircularButton } from './CircularButton.style';
import { ReactComponent as PlusIcon } from '../../../assets/Images/plus.svg';

type CircularButtonProps = {
  size: 'small' | 'smallLarge' | 'medium' | 'large';
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void;
  [x: string]: any;
};

const CircularButton: FC<CircularButtonProps> = ({ size = 'medium', isDisabled, onClick, ...args }) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  const choseSize = useMemo(() => {
    switch (size) {
      case 'large': {
        return (
          <BigCircularButton size="large" onClick={onClick} color="primary" disabled={isDisabled}>
            <PlusIcon />
          </BigCircularButton>
        );
      }
      case 'medium': {
        return (
          <BigCircularButton size="medium" onClick={onClick} color="primary" disabled={isDisabled}>
            <PlusIcon />
          </BigCircularButton>
        );
      }
      case 'smallLarge': {
        return (
          <Box
            component="div"
            ref={hoverRef}
            sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center' }}
          >
            <MuiIconButton size="medium" onClick={onClick} color="primary" isDisabled={isDisabled}>
              {isHover && !isDisabled ? <AddCircleRoundedIcon /> : <AddCircleOutlineOutlinedIcon />}
            </MuiIconButton>
          </Box>
        );
      }
      case 'small': {
        return (
          <Box ref={hoverRef} sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
            <MuiIconButton size="small" onClick={onClick} color="primary" isDisabled={isDisabled}>
              {isHover && !isDisabled ? <AddCircleRoundedIcon /> : <AddCircleOutlineOutlinedIcon />}
            </MuiIconButton>
          </Box>
        );
      }
      default: {
        return null;
      }
    }
  }, [size, isHover, onClick, isDisabled]);

  return <Box {...args}>{choseSize}</Box>;
};

export default CircularButton;
