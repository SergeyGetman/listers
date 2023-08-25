/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Collapse, Skeleton, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import EventsNavigationPanel from './components/EventsNavigationPanel';
import { AddBottomButtonContainer } from '../../shared/styles/AddBottomButtonContainer';
import CircularButton from '../../components/buttons/CilrcularButton';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { getConnections } from '../../store/Profile/profile.actions';
import { getEventsData } from '../../store/events/eventsThunk';
import { EventItemModel } from '../../shared/models/event/eventItem.model';
import EventItemCard from '../../components/itemCards/EventItemCard';
import { eventNoItemStubConfig, noFilterMatchStubConfig } from '../../shared/configs/stub.config';
import { plannerItemStatusesConfig } from '../../shared/configs/plannerItemStatuses.config';
import { PlannerItemStatusesEnum } from '../../shared/enums/plannerItemStatuses.enum';
import Stub from '../../components/stubs/Stub';
import { PageStubContainer } from '../../shared/styles/StubContainer';
import WelcomeStub from '../../components/stubs/WelcomeStub';
import { eventsWelcomePageStubConfig } from '../../shared/configs/welcomePageStubs/eventWelcomePageStub.config';
import { EventsContainer, EventScrollableContainer } from './Events.style';
import { resetEventsState } from '../../store/events/eventsSlice';
import modalObserver from '../../shared/utils/observers/modalObserver';

const Events = () => {
  const { t } = useTranslation();
  const [isGetInitialData, setIsGetInitialData] = useState<boolean>(false);
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);

  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('md')}`);
  const { isShowEventsNavigationPanel, filters, isListOver, eventsData, isFetchingWithFilter } =
    useAppSelector(({ events }) => events);
  const profileData = useAppSelector(({ profile }) => profile.data);
  const skeletonArr = useMemo(() => {
    return Array(12).fill({ name: '' });
  }, []);
  const dispatch = useAppDispatch();
  const listRef = useRef<any>();
  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.events') }]));
    dispatch(getConnections());
    return () => {
      dispatch(resetEventsState());
    };
  }, [dispatch]);

  const handleOpenViwEventModal = useCallback(
    (id: number, editMode?: boolean) => {
      setSearchParams({ eventId: id.toString() });
      setIsOpenEditMode(editMode ? editMode : false);
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (eventId) {
      modalObserver.addModal(ModalNamesEnum.viewEventModal, {
        props: { eventId: eventId, isOpenEditMode },
      });
    }
  }, [eventId, dispatch, isOpenEditMode]);

  const fetchMoreData = (page?: number) => {
    if (!isListOver) {
      dispatch(
        getEventsData({
          page: page ? page : eventsData.meta.current_page + 1,
          ...filters,
          statuses: filters.statuses
            ? filters.statuses.map((item: string) =>
                plannerItemStatusesConfig.not_going.label.toLowerCase() === item
                  ? PlannerItemStatusesEnum.not_going
                  : item,
              )
            : null,
        }),
      );
    }
  };

  useEffect(() => {
    setIsGetInitialData(false);
    dispatch(
      getEventsData({
        ...filters,
        page: 1,
        statuses: filters.statuses
          ? filters.statuses.map((item: string) =>
              plannerItemStatusesConfig.not_going.label.toLowerCase() === item
                ? PlannerItemStatusesEnum.not_going
                : item,
            )
          : null,
      }),
    ).then((result) => {
      if (getEventsData.fulfilled.match(result)) {
        setIsGetInitialData(true);
        fetchMoreData(2);
      }
    });
  }, [dispatch, filters]);

  const handleOpenCreateEventModal = () => {
    modalObserver.addModal(ModalNamesEnum.createEventModal, {});
  };

  if (profileData?.view_data.is_view_events === false) {
    return (
      <PageStubContainer isWelcomeSlider>
        <WelcomeStub sliderOptions={eventsWelcomePageStubConfig} />
      </PageStubContainer>
    );
  }

  return (
    <EventsContainer>
      <Box sx={{ flexShrink: '0' }}>
        <Collapse in={isShowEventsNavigationPanel}>
          <EventsNavigationPanel isData={!!eventsData?.data?.length || !isGetInitialData} filters={filters} />
        </Collapse>
      </Box>

      {isGetInitialData && profileData?.view_data.is_view_events ? (
        <>
          {eventsData.data.length ? (
            <EventScrollableContainer id="events-list" ref={listRef}>
              <InfiniteScroll
                scrollableTarget="events-list"
                dataLength={eventsData.data.length}
                next={() => fetchMoreData()}
                hasMore={!isListOver}
                className="events-scrollable"
                loader={
                  isListOver ? (
                    <Box
                      sx={{
                        m: { xs: '2px 0 20px 0', sm: '10px 20px 10px 5px' },
                        width: isSmallDisplay ? '100%' : '320px',
                      }}
                    >
                      <Skeleton
                        sx={{ borderRadius: '5px' }}
                        variant="rectangular"
                        height="195px"
                        width="100%"
                      />
                    </Box>
                  ) : (
                    <></>
                  )
                }
              >
                {eventsData.data.map((item: EventItemModel, index: number) => (
                  <EventItemCard event={item} key={index} handleOpenViwEventModal={handleOpenViwEventModal} />
                ))}
              </InfiniteScroll>
            </EventScrollableContainer>
          ) : (
            <>
              {isFetchingWithFilter ? (
                <PageStubContainer isNoFilterMatch>
                  <Stub isBoltSubtitleText={false} value={noFilterMatchStubConfig} />
                </PageStubContainer>
              ) : (
                <PageStubContainer>
                  <Stub value={eventNoItemStubConfig} />
                </PageStubContainer>
              )}
            </>
          )}
        </>
      ) : (
        <Box className="events-scrollable">
          {skeletonArr.map((_, index) => (
            <Box
              key={index}
              sx={{
                m: { xs: '2px 0 20px 0', sm: '10px 20px 10px 5px' },
                height: { sm: '195px', xs: '143px' },
                width: isSmallDisplay ? '100%' : '320px',
              }}
            >
              <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height="100%" width="100%" />
            </Box>
          ))}
        </Box>
      )}

      <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
        <CircularButton size="large" onClick={handleOpenCreateEventModal} />
      </AddBottomButtonContainer>
    </EventsContainer>
  );
};

export default Events;
