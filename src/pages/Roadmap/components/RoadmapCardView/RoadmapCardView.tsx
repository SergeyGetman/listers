/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useEffect, useRef, useState } from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import useMediaQuery from '@mui/material/useMediaQuery';
import { resetCardViewData, RoadmapFilters } from '../../../../store/roadmap/roadmapSlice';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { getRoadmapCardViewData } from '../../../../store/roadmap/roadmapThunk';
import { plannerItemPriorityConfig } from '../../../../shared/configs/plannerItemPriority.config';
import { RoadmapCardViewContainer, RoadmapViewScrollableContainer } from './RoadmapCardView.style';
import TaskItemCard from '../../../../components/itemCards/TaskItemCard';
import { TaskItemModel } from '../../../../shared/models/tasks/taskItem.model';
import { plannerItemStatusesConfig } from '../../../../shared/configs/plannerItemStatuses.config';
import { PlannerItemStatusesEnum } from '../../../../shared/enums/plannerItemStatuses.enum';
import Stub from '../../../../components/stubs/Stub';
import { noFilterMatchStubConfig, roadmapNoItemStubConfig } from '../../../../shared/configs/stub.config';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';
import RoadmapCardViewHeaderFilters from './components/RoadmapCardViewHeaderFilters';

type RoadmapCardViewProps = {
  filters: RoadmapFilters;
  handleOpenViwTaskModal: (id: number, isEdit?: boolean) => void;
};

const RoadmapCardView: FC<RoadmapCardViewProps> = ({ filters, handleOpenViwTaskModal }) => {
  const [isGetInitialData, setIsGetInitialData] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('md')}`);

  const { cardViewData, isListOver, isFetchingWithFilter } = useAppSelector(({ roadmap }) => roadmap);
  const skeletonArr = Array(12).fill({ name: '' });
  const dispatch = useAppDispatch();
  const listRef = useRef<any>();

  const fetchMoreData = (page?: number) => {
    if (!isListOver) {
      dispatch(
        getRoadmapCardViewData({
          page: page ? page : cardViewData.meta.current_page + 1,
          ...filters,
          priorities: filters.priorities
            ? filters.priorities.map((item: string) =>
                plannerItemPriorityConfig.none.id === item ? '' : item,
              )
            : null,
          statuses: filters.statuses
            ? filters.statuses.map((item: string) =>
                plannerItemStatusesConfig.in_progress.label.toLowerCase() === item
                  ? PlannerItemStatusesEnum.in_progress
                  : item,
              )
            : null,
        }),
      );
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetCardViewData());
    };
  }, [dispatch]);

  useEffect(() => {
    setIsGetInitialData(false);
    dispatch(
      getRoadmapCardViewData({
        ...filters,
        priorities: filters.priorities
          ? filters.priorities.map((item: string) => (plannerItemPriorityConfig.none.id === item ? '' : item))
          : null,
        statuses: filters.statuses
          ? filters.statuses.map((item: string) =>
              plannerItemStatusesConfig.in_progress.label.toLowerCase() === item
                ? PlannerItemStatusesEnum.in_progress
                : item,
            )
          : null,
        page: 1,
      }),
    ).then((result) => {
      if (getRoadmapCardViewData.fulfilled.match(result)) {
        setIsGetInitialData(true);
        fetchMoreData(2);
      }
    });
  }, [dispatch, filters]);

  return (
    <RoadmapCardViewContainer>
      <RoadmapCardViewHeaderFilters filters={filters} />

      {isGetInitialData ? (
        <>
          {cardViewData.data.length ? (
            <RoadmapViewScrollableContainer id="roadmap-card-view-list" ref={listRef}>
              <InfiniteScroll
                scrollableTarget="roadmap-card-view-list"
                dataLength={cardViewData.data.length}
                next={() => fetchMoreData()}
                hasMore={!isListOver}
                className="roadmap-card-view-scrollable"
                loader={
                  isListOver ? (
                    <Box
                      sx={{
                        m: { xs: '2px 0 20px 0', sm: '10px 20px 10px 5px' },
                        height: { sm: '195px', xs: '143px' },
                        width: isSmallDisplay ? '100%' : '320px',
                      }}
                    >
                      <Skeleton
                        sx={{ borderRadius: '5px' }}
                        variant="rectangular"
                        height="100%"
                        width="100%"
                      />
                    </Box>
                  ) : (
                    <></>
                  )
                }
              >
                {cardViewData.data.map((item: TaskItemModel, index: number) => (
                  <TaskItemCard task={item} handleOpenViwTaskModal={handleOpenViwTaskModal} key={index} />
                ))}
              </InfiniteScroll>
            </RoadmapViewScrollableContainer>
          ) : (
            <>
              {isFetchingWithFilter ? (
                <PageStubContainer isNoFilterMatch>
                  <Stub isBoltSubtitleText={false} value={noFilterMatchStubConfig} />
                </PageStubContainer>
              ) : (
                <PageStubContainer>
                  <Stub value={roadmapNoItemStubConfig} />
                </PageStubContainer>
              )}
            </>
          )}
        </>
      ) : (
        <Box className="roadmap-card-view-scrollable">
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
    </RoadmapCardViewContainer>
  );
};

export default RoadmapCardView;
