import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { OnboardingSelectContainer } from './OnboardingSelect.styled';

type Props = {
  text: string;
  icon: React.ReactNode;
  selected: boolean;
  selectedIcon?: React.ReactNode;
  isStroke?: boolean;
  onClick: () => void;
  isCustomizeIcon?: boolean;
};
const OnboardingSelect: FC<Props> = ({
  icon,
  text,
  selected,
  onClick,
  selectedIcon,
  isStroke = false,
  isCustomizeIcon = true,
}) => {
  return (
    <OnboardingSelectContainer
      isCustomizeIcon={isCustomizeIcon}
      isStroke={isStroke}
      onClick={onClick}
      selected={selected}
    >
      <Box>{selectedIcon ? (selected ? selectedIcon : icon) : icon}</Box>
      <Box ml="16px">
        <Typography variant="large">{text}</Typography>
      </Box>
    </OnboardingSelectContainer>
  );
};

export default OnboardingSelect;
