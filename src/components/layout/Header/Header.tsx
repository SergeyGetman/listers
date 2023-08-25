import React, { FC, memo, useMemo } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import BaseHeader from './components/BaseHeader';
import RoadmapHeader from './components/RoadmapHeader';
import router from '../../../shared/services/router';
import BacklogHeader from './components/BacklogHeader';
import EventsHeader from './components/EventsHeader';
import ChatHeader from './components/ChatHeader';
import ArchiveHeader from './components/ArchiveHeader';
import CalendarHeader from './components/CalendarHeader';
import NetworkHeader from './components/NetworkHeader';
import PlannerHeader from './components/PlannerHeader';

type HeaderProps = {
  isShowRightSidebar?: boolean;
};

const Header: FC<HeaderProps> = ({ isShowRightSidebar }) => {
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const getHeader = useMemo(() => {
    if (location.pathname.includes(`${router.roadmap.path}`)) {
      return <RoadmapHeader isShowRightSidebar={isShowRightSidebar} />;
    }
    if (location.pathname === router.journal.path) {
      return <PlannerHeader isShowRightSidebar={isShowRightSidebar} />;
    }
    if (location.pathname.includes(`${router.backlog.path}`)) {
      return <BacklogHeader isShowRightSidebar={isShowRightSidebar} />;
    }

    if (location.pathname.includes(`${router.events.path}`)) {
      return <EventsHeader isShowRightSidebar={isShowRightSidebar} />;
    }
    if (location.pathname.includes(`${router.settings.path}/${router.settings.children.archive.path}`)) {
      return <ArchiveHeader isShowRightSidebar={isShowRightSidebar} />;
    }
    if (location.pathname.includes(router.network.path)) {
      return <NetworkHeader isShowRightSidebar={isShowRightSidebar} />;
    }
    if (
      // TODO config
      (location.pathname.includes('chat/personal/') || location.pathname.includes('chat/group/')) &&
      matches
    ) {
      return <ChatHeader />;
    }
    if (location.pathname.includes(router.calendar.path)) {
      return <CalendarHeader isShowRightSidebar={isShowRightSidebar} />;
    }

    return <BaseHeader isShowRightSidebar={isShowRightSidebar} />;
  }, [isShowRightSidebar, location.pathname, matches]);

  return <Box>{getHeader}</Box>;
};

export default memo(Header);
