import React, { FC } from 'react';
import { Collapse, Typography } from '@mui/material';

import { CircleIconButtonContainer, CircleIconButtonIcon } from './CircleIconButton.style';
import { MuiButtonProps } from '../MuiButton/MuiButton';

type Props = {
  isShowText?: boolean;
  colorIconBtn: string;
  colorLabelBtn?: string;
  isButtonPadding?: boolean;
  icon: React.ReactNode;
} & MuiButtonProps;
// TODO storybook
const CircleIconButton: FC<Props> = ({
  isDisabled = false,
  colorIconBtn,
  colorLabelBtn,
  isShowText = true,
  type,
  onClick,
  label,
  icon,
  isButtonPadding = true,
}) => {
  // only material icons
  return (
    <CircleIconButtonContainer
      isButtonPadding={isButtonPadding}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      <CircleIconButtonIcon isButtonPadding={isButtonPadding} disabled={isDisabled} color={colorIconBtn}>
        {icon}
      </CircleIconButtonIcon>
      {label && (
        <Collapse unmountOnExit in={isShowText} orientation="horizontal">
          <Typography
            noWrap
            sx={{ ml: '5px', color: colorLabelBtn ? colorLabelBtn : 'initial' }}
            variant="default"
          >
            {label}
          </Typography>
        </Collapse>
      )}
    </CircleIconButtonContainer>
  );
};

export default CircleIconButton;
