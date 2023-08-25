import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch } from 'react-redux';
import { SidebarDrawer } from './Sidebar.style';
import SidebarFooter from './components/SidebarFooter';
import { toggleOpenLeftSidebar } from '../../../../store/Common/commonSlice';
import { useAppSelector } from '../../../../shared/hooks/redux';
import SidebarHeader from './components/SidebarHeader';
import SidebarOrganizerList from './components/SidebarOrganizerList';
import SidebarHubsList from './components/SidebarHubsList/SidebarHubsList';
import { SidebarEnum } from '../../../../shared/enums/sidebar.enum';

const Sidebar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { isOpenLeftSidebar } = useAppSelector(({ common }) => common);
  const { data } = useAppSelector(({ profile }) => profile);
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('md')}`);
  const isTabletDisplay = useMediaQuery(`${theme.breakpoints.down('lg')}`);

  const handleCloseSidebar = useCallback(() => {
    dispatch(toggleOpenLeftSidebar(false));
  }, [dispatch]);

  const handleOpenSidebar = useCallback(() => {
    dispatch(toggleOpenLeftSidebar(true));
  }, [dispatch]);
  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (!isTabletDisplay) {
      handleOpenSidebar();
    }
  }, [handleOpenSidebar]);

  useEffect(() => {
    if (isTabletDisplay) {
      handleCloseSidebar();
    }
  }, [isTabletDisplay, handleCloseSidebar]);

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };
  return (
    <>
      <SidebarDrawer
        variant={isSmallDisplay ? 'temporary' : 'permanent'}
        onClose={() => handleCloseSidebar()}
        open={isOpenLeftSidebar}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isSmallDisplay={isSmallDisplay}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 8px',
          }}
        >
          <SidebarHeader
            isMouseEnter={isMouseEnter}
            isSmallDisplay={isSmallDisplay}
            isOpenLeftSidebar={isOpenLeftSidebar}
            handleCloseSidebar={handleCloseSidebar}
          />

          {data?.sidebar?.organizers ? (
            <SidebarOrganizerList
              isSmallDisplay={isSmallDisplay}
              handleCloseSidebar={handleCloseSidebar}
              organizerList={data?.sidebar?.organizers}
            />
          ) : (
            <></>
          )}
          {data?.sidebar?.hubs ? (
            <SidebarHubsList
              isSmallDisplay={isSmallDisplay}
              handleCloseSidebar={handleCloseSidebar}
              hubsList={[
                ...data.sidebar.hubs,
                { hub_id: 10, position: 2, tag: SidebarEnum.garage_new },

                { hub_id: 22, position: 3, tag: SidebarEnum.test_create_car },
              ]}
            />
          ) : (
            <></>
          )}

          <Box sx={{ height: '100%' }} />

          <SidebarFooter
            userId={data?.id}
            firstName={data?.first_name}
            lastName={data?.last_name}
            fullName={data?.full_name}
            email={data?.email}
            phone={data?.phone}
            handleCloseSidebar={handleCloseSidebar}
            isSmallDisplay={isSmallDisplay}
            avatarSrc={data?.avatar?.additional_info?.size_urls?.avatar_icon || data?.avatar?.url || ''}
          />
        </Box>
      </SidebarDrawer>
    </>
  );
};

export default memo(Sidebar);
