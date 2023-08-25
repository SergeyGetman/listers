import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import NavigationButton from '../../../../../buttons/NavigationButton';
import { RightSidebarHeaderContainer } from './RightSidebarHeader.style';
type RightSidebarHeaderProps = {
  selectedTab: string;
  handleCloseSidebar: () => void;
};

const RightSidebarHeader: FC<RightSidebarHeaderProps> = ({ selectedTab, handleCloseSidebar }) => {
  const theme = useTheme();
  return (
    <RightSidebarHeaderContainer>
      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{
            marginRight: '5px',
            color: theme.palette.case.neutral.n700,
            textTransform: 'capitalize',
            lineHeight: '23px',
          }}
          variant="h3"
        >
          {selectedTab}
        </Typography>
      </Box>

      <NavigationButton type="next" onClick={handleCloseSidebar} />
    </RightSidebarHeaderContainer>
  );
};
export default RightSidebarHeader;
