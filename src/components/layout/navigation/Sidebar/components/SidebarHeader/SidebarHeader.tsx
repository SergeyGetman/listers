import React, { FC } from 'react';
import { Box, useTheme, Zoom } from '@mui/material';
import { ReactComponent as HubmeeLogo } from '../../../../../../assets/Images/logo-hubmee.svg';
import { ReactComponent as NavigationLeftIcon } from '../../../../../../assets/Images/navigation-left-arrow.svg';
import IconButton from '../../../../../buttons/IconButton';

type SidebarHeaderProps = {
  handleCloseSidebar: () => void;
  isOpenLeftSidebar: boolean;
  isMouseEnter: boolean;
  isSmallDisplay: boolean;
};
const SidebarHeader: FC<SidebarHeaderProps> = ({
  handleCloseSidebar,
  isOpenLeftSidebar,
  isMouseEnter,
  isSmallDisplay,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        paddingBottom: '6px',
        borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
      }}
    >
      {isSmallDisplay ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton isRounded size="medium" onClick={handleCloseSidebar}>
            <NavigationLeftIcon />
          </IconButton>
          <Box ml="12px">
            <HubmeeLogo />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box ml="6px">
            <HubmeeLogo />
          </Box>
          <Zoom in={isSmallDisplay || (isOpenLeftSidebar && isMouseEnter)}>
            <Box>
              <IconButton isRounded size="medium" onClick={handleCloseSidebar}>
                <NavigationLeftIcon />
              </IconButton>
            </Box>
          </Zoom>
        </Box>
      )}
    </Box>
  );
};
export default SidebarHeader;
