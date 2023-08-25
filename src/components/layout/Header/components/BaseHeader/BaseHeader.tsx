import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Collapse, useMediaQuery, useTheme } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { ReactComponent as MenuSvg } from '../../../../../assets/Images/burger-icon.svg';
import { ReactComponent as NetworkIcon } from '../../../../../assets/Images/network/network-icon.svg';
import { ReactComponent as ChatIcon } from '../../../../../assets/Images/chat-icon.svg';
import { ReactComponent as FeedIcon } from '../../../../../assets/Images/feed-icon.svg';
import { ReactComponent as NavigationLeftIcon } from '../../../../../assets/Images/navigation-left-arrow.svg';

import { toggleOpenLeftSidebar } from '../../../../../store/Common/commonSlice';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import { DefaultHeaderWrapper, HeaderContainer, HeaderRightBtnContainer } from './BaseHeader.style';
import HeaderTittle from '../HeaderTittle';
import {
  setRightSidebarSelectedTab,
  toggleOpenRightSidebar,
} from '../../../../../store/RightSidebar/rightSidebarSlice';
import { setNotificationActiveTab } from '../../../../../store/RightSidebar/Notifications/notificationsSlice';
import { NotificationsEnum } from '../../../../../shared/enums/notificationsEnum';
import { RightSidebarTabsEnum } from '../../../../../shared/enums/rightSidebarEnum';
import IconButton from '../../../../buttons/IconButton';
import router from '../../../../../shared/services/router';
import MuiLinkButton from '../../../../buttons/MuiLinkButton';
type BaseHeaderProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  isShowRightSidebar?: boolean;
  handleHideNavigationPanel?: (val: boolean) => void;
  isShowHideNavigationBtn?: boolean;
  isShowNavigationPanel?: boolean;
};
const BaseHeader: FC<BaseHeaderProps> = ({
  isShowHideNavigationBtn,
  isShowNavigationPanel,
  handleHideNavigationPanel,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { isOpenLeftSidebar, breadcrumbs } = useAppSelector(({ common }) => common);
  const { isOpenRightSidebar } = useAppSelector(({ rightSidebar }) => rightSidebar);
  const { counters } = useAppSelector((state) => state.common);
  const resolvedChat = useResolvedPath(router.chat.path);
  const matchChat = useMatch({ path: resolvedChat?.pathname, end: router.chat.path?.length === 1 });
  const resolvedNetwork = useResolvedPath(router.network.path);
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('md'));
  const matchNetwork = useMatch({ path: resolvedNetwork?.pathname, end: router.network.path?.length === 1 });

  const resolvedNewNetwork = useResolvedPath(router.networkNew.path);
  const matchNewNetwork = useMatch({
    path: resolvedNewNetwork?.pathname,
    end: router.networkNew.path?.length === 1,
  });
  const chatCounters = useMemo(() => {
    return counters?.chat?.global;
  }, [counters]);
  const networkCounters = useMemo(() => {
    return counters?.network?.global;
  }, [counters]);

  const { data } = useAppSelector(({ profile }) => profile);

  const notificationCounters = useMemo(() => {
    if (data?.counters?.count_requests && data?.counters?.count_news) {
      return data.counters.count_requests + data.counters.count_news;
    }
    if (data?.counters?.count_requests) {
      return data.counters.count_requests;
    }
    if (data?.counters?.count_news) {
      return data.counters.count_news;
    }
    return false;
  }, [data]);

  const toggleLeftSidebar = () => {
    dispatch(toggleOpenLeftSidebar(!isOpenLeftSidebar));
  };

  const toggleRightSidebar = () => {
    dispatch(setRightSidebarSelectedTab(RightSidebarTabsEnum.notifications));
    dispatch(setNotificationActiveTab(NotificationsEnum.requests));
    dispatch(toggleOpenRightSidebar(!isOpenRightSidebar));
  };
  const networkSelectedFilterType = useAppSelector(({ network }) => network?.network?.networkFilterType);
  const handleMouseEnter = useCallback(() => {
    setIsMouseEnter(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsMouseEnter(false);
  }, []);
  return (
    <HeaderContainer isOpenLeftSidebar={isOpenLeftSidebar}>
      <DefaultHeaderWrapper>
        <Collapse orientation="horizontal" in={!isOpenLeftSidebar}>
          <Box
            sx={{
              marginRight: '15px',
              paddingBottom: '2px',
              display: {
                xs: 'block',
              },
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <IconButton isRounded size="medium" onClick={toggleLeftSidebar}>
              {isMouseEnter ? (
                <NavigationLeftIcon style={{ transform: 'rotate(180deg)' }} />
              ) : (
                <MenuSvg
                  style={{ transform: isOpenLeftSidebar ? 'rotate(90deg)' : '', transition: '0.3s' }}
                />
              )}
            </IconButton>
          </Box>
        </Collapse>

        <HeaderTittle
          breadcrumbs={breadcrumbs}
          isMobileDisplay={isMobileDisplay}
          isShowHideNavigationBtn={isShowHideNavigationBtn}
          handleHideNavigationPanel={handleHideNavigationPanel}
          isShowNavigationPanel={isShowNavigationPanel}
        />

        <HeaderRightBtnContainer>
          <Box mr="8px">
            <MuiLinkButton>
              <Link
                style={{
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
                to={`${router.networkNew.path}`}
              >
                <IconButton
                  isStopPropagation={false}
                  isSelected={!!matchNewNetwork}
                  budge={networkCounters}
                  isShowBadge
                  size="large"
                >
                  <NetworkIcon />
                </IconButton>
              </Link>
            </MuiLinkButton>
          </Box>
          <Box mr="8px">
            <MuiLinkButton>
              <Link
                style={{
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
                to={`${router.network.path}/${networkSelectedFilterType}`}
              >
                <IconButton
                  isStopPropagation={false}
                  isSelected={!!matchNetwork}
                  budge={networkCounters}
                  isShowBadge
                  size="large"
                >
                  <NetworkIcon />
                </IconButton>
              </Link>
            </MuiLinkButton>
          </Box>
          <Box mr="8px">
            <MuiLinkButton>
              <Link
                style={{
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
                to={`${router.chat.path} `}
              >
                <IconButton
                  isStopPropagation={false}
                  isSelected={!!matchChat}
                  isShowBadge
                  budge={chatCounters}
                  size="large"
                >
                  <ChatIcon />
                </IconButton>
              </Link>
            </MuiLinkButton>
          </Box>

          <IconButton
            isSelected={isOpenRightSidebar}
            isShowBadge
            budge={notificationCounters}
            size="large"
            onClick={toggleRightSidebar}
          >
            <FeedIcon />
          </IconButton>
        </HeaderRightBtnContainer>
      </DefaultHeaderWrapper>
    </HeaderContainer>
  );
};

export default memo(BaseHeader);
