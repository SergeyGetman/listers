import React, { FC } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import NavigationButton from '../../../../buttons/NavigationButton';
import {
  ModalHeaderContainer,
  ModalHeaderTitle,
  ModalHeaderContentContainer,
} from './FeatureInfoModalHeader.style';

type OrganizerInfoModalHeaderProps = {
  title: string;
  onClose: () => void;
};
const FeatureInfoModalHeader: FC<OrganizerInfoModalHeaderProps> = ({ title, onClose }) => {
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ position: 'fixed', width: '100%' }}>
      <ModalHeaderContainer>
        <ModalHeaderContentContainer>
          <ModalHeaderTitle variant={isMobileDisplay ? 'large' : 'h3'}>{title}</ModalHeaderTitle>
          <Box>
            <NavigationButton background="initial" size="large" type="close" onClick={onClose} />
          </Box>
        </ModalHeaderContentContainer>
      </ModalHeaderContainer>
    </Box>
  );
};

export default FeatureInfoModalHeader;
