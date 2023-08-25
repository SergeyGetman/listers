/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Collapse, Skeleton, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSearchParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import ArchiveNavigationPanel from './components/ArchiveNavigationPanel';
import { ArchiveContainer, ArchiveScrollableContainer } from './Archive.style';
import TaskItemCard from '../../../../components/itemCards/TaskItemCard';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { getArchiveItems } from '../../../../store/archive/archiveThunk';
import { PlannerItemModelTypeEnum } from '../../../../shared/enums/plannerItemModelType.enum';
import { resetArchiveData } from '../../../../store/archive/archiveSlice';
import { getConnections } from '../../../../store/Profile/profile.actions';
import EventItemCard from '../../../../components/itemCards/EventItemCard';
import { archiveNoItemStubConfig, noFilterMatchStubConfig } from '../../../../shared/configs/stub.config';
import Stub from '../../../../components/stubs/Stub';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';
import WelcomeStub from '../../../../components/stubs/WelcomeStub';
import { archiveWelcomePageStubConfig } from '../../../../shared/configs/welcomePageStubs/archiveWelcomePageStub.config';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

const Archive = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isGetInitialData, setIsGetInitialData] = useState<boolean>(false);
  const skeletonArr = Array(12).fill({ name: '' });
  const listRef = useRef<any>();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = searchParams.get('taskId');
  const eventId = searchParams.get('eventId');

  const profileData = useAppSelector(({ profile }) => profile?.data);

  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('md')}`);

  const { isShowArchiveNavigationPanel, archiveData, isListOver, filters, isFetchingWithFilter } =
    useAppSelector(({ archive }) => archive);
  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.settings.archive') }]));
    dispatch(getConnections());
  }, [dispatch, t]);

  const handleOpenViwTaskModal = useCallback(
    (id: number) => {
      setSearchParams({ taskId: id.toString() });
    },
    [setSearchParams],
  );

  const handleOpenViwEventModal = useCallback(
    (id: number) => {
      setSearchParams({ eventId: id.toString() });
    },
    [setSearchParams],
  );

  const fetchMoreData = (page?: number) => {
    if (!isListOver) {
      dispatch(
        getArchiveItems({
          page: page ? page : archiveData.meta.current_page + 1,
          ...filters,
        }),
      );
    }
  };

  useEffect(() => {
    setIsGetInitialData(false);
    dispatch(
      getArchiveItems({
        ...filters,
        page: 1,
      }),
    ).then((result) => {
      if (getArchiveItems.fulfilled.match(result)) {
        setIsGetInitialData(true);
      }
    });
    fetchMoreData(2);
    return () => {
      dispatch(resetArchiveData());
    };
  }, [dispatch, filters]);
  useEffect(() => {
    return () => {
      dispatch(resetArchiveData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (taskId) {
      modalObserver.addModal(ModalNamesEnum.viewTaskModal, {
        props: { taskId: taskId },
      });
    }
  }, [taskId]);

  useEffect(() => {
    if (eventId) {
      modalObserver.addModal(ModalNamesEnum.viewEventModal, {
        props: { eventId: eventId },
      });
    }
  }, [eventId]);

  if (profileData?.view_data.is_view_archive === false) {
    return (
      <ArchiveContainer>
        <ArchiveScrollableContainer id="archive-list" ref={listRef}>
          <PageStubContainer isWelcomeSlider>
            <WelcomeStub sliderOptions={archiveWelcomePageStubConfig} />
          </PageStubContainer>
        </ArchiveScrollableContainer>
      </ArchiveContainer>
    );
  }

  return (
    <ArchiveContainer>
      <Box>
        <Collapse in={isShowArchiveNavigationPanel}>
          <ArchiveNavigationPanel filters={filters} />
        </Collapse>
      </Box>

      {isGetInitialData ? (
        <>
          {!!archiveData?.data?.length ? (
            <ArchiveScrollableContainer id="archive-list" ref={listRef}>
              <InfiniteScroll
                scrollableTarget="archive-list"
                dataLength={archiveData.data.length}
                next={() => fetchMoreData()}
                hasMore={!isListOver}
                className="archive-scrollable"
                loader={
                  <Box sx={{ m: { xs: '2px 0 20px 0', sm: '10px 20px 10px 5px' } }}>
                    <Skeleton variant="rectangular" height="195px" width="320px" />
                  </Box>
                }
              >
                {archiveData.data.map((item: any, index: number) =>
                  item.model_type === PlannerItemModelTypeEnum.task ? (
                    <TaskItemCard
                      isArchive
                      task={item}
                      key={index}
                      handleOpenViwTaskModal={handleOpenViwTaskModal}
                    />
                  ) : (
                    <EventItemCard
                      isArchive
                      event={item}
                      key={index}
                      handleOpenViwEventModal={handleOpenViwEventModal}
                    />
                  ),
                )}
              </InfiniteScroll>
            </ArchiveScrollableContainer>
          ) : (
            <>
              {isFetchingWithFilter ? (
                <PageStubContainer isNoFilterMatch>
                  <Stub isBoltSubtitleText={false} value={noFilterMatchStubConfig} />
                </PageStubContainer>
              ) : (
                <PageStubContainer>
                  <Stub value={archiveNoItemStubConfig} />
                </PageStubContainer>
              )}
            </>
          )}
        </>
      ) : (
        <Box className="archive-scrollable">
          {skeletonArr.map((_, index) => (
            <Box
              key={index}
              sx={{
                m: { xs: '2px 0 20px 0', sm: '10px 20px 10px 5px' },
                height: { sm: '195px', xs: '143px' },
                width: isSmallDisplay ? '100%' : '320px',
              }}
            >
              <Skeleton
                variant="rectangular"
                height="100%"
                width="100%"
                sx={{
                  borderRadius: '5px',
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </ArchiveContainer>
  );
};

export default Archive;
