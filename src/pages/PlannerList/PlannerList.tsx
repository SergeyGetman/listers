import React, { useCallback, useEffect, useRef, useState, Fragment, useMemo, memo } from 'react';
import { Collapse } from '@mui/material';
import Moment from 'moment';
import Scrollbars from 'react-custom-scrollbars';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import { getConnections } from '../../store/Profile/profile.actions';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import PlannerLIstNavigationPanel from './components/PlannerLIstNavigationPanel';
import { getPlannerDataByDate, getPlannerDates, plannerInitialize } from '../../store/planner/plannerThunk';
import {
  resetPlannerData,
  setBottomPaginationPlannerDate,
  setPlannerBottomPaginationDate,
  setPlannerCurrentMaxDate,
  setPlannerCurrentMinDate,
  setPlannerTopPaginationDate,
  setTopPaginationPlannerDate,
} from '../../store/planner/plannerSlice';
import { getLargerSmallerDateFromArr } from '../../shared/functions/getLargerSmallerDateFromArr';
import PlannerDayContainer from './components/PlannerDayContainer';
import { PlannerListContainer } from './PlannerList.style';
import PlannerDayContainerSkeleton from './components/skeletons/PlannerDayContainerSkeleton';
import PlannerEvent from '../../components/itemCards/PlannerEvent';
import PlannerListTopNoItems from './components/stubs/PlannerListTopNoItems';
import PlannerListNoItems from './components/stubs/PlannerListNoItems';
import PlannerBottomStub from './components/stubs/PlannerBottomStub';
import PlannerSkeleton from './components/skeletons/PlannerSkeleton';
import PlannerListBottomNoItems from './components/stubs/PlannerListBottomNoItems';
import PlannerTask from '../../components/itemCards/PlannerTask';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { AddBottomButtonContainer } from '../../shared/styles/AddBottomButtonContainer';
import PlusActionMenu from '../../components/actionMenus/PlusActionMenu';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { noFilterMatchStubConfig, plannerListNoItemStubConfig } from '../../shared/configs/stub.config';
import Stub from '../../components/stubs/Stub';
import PlannerPayment from '../../components/itemCards/PlannerPayment';
import { PageStubContainer } from '../../shared/styles/StubContainer';
import WelcomeStub from '../../components/stubs/WelcomeStub';
import { plannerWelcomePageStubConfig } from '../../shared/configs/welcomePageStubs/plannerWelcomePageStub.config';
import modalObserver from '../../shared/utils/observers/modalObserver';
import PlannerMeeting from '../../components/itemCards/PlannerMeeting';

const PlannerList = () => {
  const dispatch = useAppDispatch();
  const {
    isShowPlannerNavigationPanel,
    filters,
    plannerList,
    topPaginationDate,
    bottomPaginationDate,
    isCurrentMinDateListOver,
    plannerGeneralMaxMinDate,
    isCurrentMaxDateListOver,
    plannerCurrentMinDate,
    plannerCurrentMaxDate,
    plannerDates,
    isTopPaginationHasMore,
    isBottomPaginationHasMore,
    isGetPlannerData,
    isFetchingWithFilter,
  } = useAppSelector(({ planner }) => planner);
  const currentUserFirstName = useAppSelector(({ profile }) => profile?.data?.first_name);
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);
  const profileData = useAppSelector(({ profile }) => profile.data);
  const listRef = useRef<any>(null);
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = searchParams.get('taskId');
  const meetingId = searchParams.get('meetingId');
  const eventId = searchParams.get('eventId');
  const paymentId = searchParams.get('paymentId');
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getConnections());
  }, [dispatch]);
  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.planner.journal') }]));
  }, [dispatch, t]);

  useEffect(() => {
    if (taskId) {
      modalObserver.addModal(ModalNamesEnum.viewTaskModal, {
        props: { taskId: taskId, isOpenEditMode },
      });
    }
  }, [taskId, isOpenEditMode]);

  useEffect(() => {
    if (meetingId) {
      modalObserver.addModal(ModalNamesEnum.viewMeetingModal, {
        props: { meetingId: meetingId, isOpenEditMode },
      });
    }
  }, [meetingId, isOpenEditMode]);

  useEffect(() => {
    if (paymentId) {
      modalObserver.addModal(ModalNamesEnum.viewPaymentModal, {
        props: { paymentId: paymentId, isOpenEditMode },
      });
    }
  }, [paymentId, isOpenEditMode]);

  useEffect(() => {
    if (eventId) {
      modalObserver.addModal(ModalNamesEnum.viewEventModal, {
        props: { eventId: eventId, isOpenEditMode },
      });
    }
  }, [eventId, isOpenEditMode]);

  const handleOpenPlannerItem = useCallback(
    (itemId: number, modelType: PlannerItemModelTypeEnum, editMode?: boolean) => {
      if (modelType === PlannerItemModelTypeEnum.task) {
        setSearchParams({ taskId: itemId.toString() });
        setIsOpenEditMode(editMode ? editMode : false);
      }
      if (modelType === PlannerItemModelTypeEnum.meet) {
        setSearchParams({ meetingId: itemId.toString() });
        setIsOpenEditMode(editMode ? editMode : false);
      }
      if (modelType === PlannerItemModelTypeEnum.event) {
        setSearchParams({ eventId: itemId.toString() });
        setIsOpenEditMode(editMode ? editMode : false);
      }
      if (modelType === PlannerItemModelTypeEnum.payment) {
        setSearchParams({ paymentId: itemId.toString() });
        setIsOpenEditMode(editMode ? editMode : false);
      }
    },
    [setSearchParams],
  );

  const getCurrentMinDate = useCallback(
    (date: string, infoMinDate: string) => {
      if (infoMinDate === null || date === null) {
        return null;
      }
      if (Moment(date, 'YYYY-MM-DD').diff(Moment(infoMinDate, 'YYYY-MM-DD'), 'month') > 6) {
        const resultDate = Moment(date, 'YYYY-MM-DD').subtract(6, 'month').format('YYYY-MM-DD');
        dispatch(
          setPlannerCurrentMinDate({
            date: resultDate,
            isListOver: false,
          }),
        );
        return { currentMinDate: resultDate, prevMinDate: date };
      }

      dispatch(setPlannerCurrentMinDate({ date: infoMinDate, isListOver: true }));
      return { currentMinDate: infoMinDate, prevMinDate: date };
    },
    [dispatch],
  );

  const getCurrentMaxDate = useCallback(
    (date: string, infoMaxDate: string) => {
      if (infoMaxDate === null || date === null) {
        return null;
      }
      if (Moment(date, 'YYYY-MM-DD').diff(Moment(infoMaxDate, 'YYYY-MM-DD'), 'month') > 6) {
        const resultDate = Moment(date, 'YYYY-MM-DD').add(6, 'month').format('YYYY-MM-DD');
        dispatch(
          setPlannerCurrentMaxDate({
            date: resultDate,
            isListOver: false,
          }),
        );
        return { currentMaxDate: resultDate, prevMaxDate: date };
      }

      dispatch(
        setPlannerCurrentMaxDate({
          date: infoMaxDate,
          isListOver: true,
        }),
      );
      return { currentMaxDate: infoMaxDate, prevMaxDate: date };
    },
    [dispatch],
  );

  const getMorePrependDates = useCallback(() => {
    if (plannerDates.indexOf(topPaginationDate || '') < 4) {
      const dates = getCurrentMinDate(
        Moment(plannerCurrentMinDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        Moment(plannerGeneralMaxMinDate?.started_at || '', 'YYYY-MM-DD').format('YYYY-MM-DD'),
      );
      if (dates?.currentMinDate && dates?.prevMinDate) {
        dispatch(
          getPlannerDates({
            dateFrom: dates.currentMinDate,
            dateTo: dates.prevMinDate,
            filters,
          }),
        ).then((getDateResponse) => {
          if (getPlannerDates.fulfilled.match(getDateResponse)) {
            dispatch(setTopPaginationPlannerDate(getDateResponse.payload));
          }
        });
      }
    }
  }, [
    dispatch,
    filters,
    getCurrentMinDate,
    plannerCurrentMinDate,
    plannerDates,
    plannerGeneralMaxMinDate?.started_at,
    topPaginationDate,
  ]);

  const getMoreBottomDates = useCallback(() => {
    if (plannerDates.indexOf(bottomPaginationDate || '') > plannerDates.length - 4) {
      const dates = getCurrentMaxDate(
        Moment(plannerCurrentMaxDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        Moment(plannerGeneralMaxMinDate?.finished_at || '', 'YYYY-MM-DD').format('YYYY-MM-DD'),
      );
      if (dates?.currentMaxDate && dates?.prevMaxDate) {
        dispatch(
          getPlannerDates({
            dateFrom: dates.prevMaxDate,
            dateTo: dates.currentMaxDate,
            filters,
          }),
        ).then((getDateResponse) => {
          if (getPlannerDates.fulfilled.match(getDateResponse)) {
            dispatch(setBottomPaginationPlannerDate(getDateResponse.payload));
          }
        });
      }
    }
  }, [
    dispatch,
    filters,
    getCurrentMaxDate,
    plannerCurrentMaxDate,
    plannerDates,
    plannerGeneralMaxMinDate?.finished_at,
    bottomPaginationDate,
  ]);

  const prependItems = useCallback(
    async (height: number) => {
      if (isTopPaginationHasMore) {
        if (!isCurrentMinDateListOver) {
          getMorePrependDates();
        }

        const paginationDate = getLargerSmallerDateFromArr(
          Moment(topPaginationDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
          plannerDates,
        );

        dispatch(
          setPlannerTopPaginationDate({
            date: paginationDate.smallerItem,
            isListOver: paginationDate.hasNextSmallerItem,
          }),
        );
        dispatch(
          getPlannerDataByDate({ date: paginationDate.smallerItem, filters, isBottomPagination: false }),
        ).then(() => listRef.current.scrollTop(listRef.current.view.scrollHeight - height));
      }
    },
    [
      isTopPaginationHasMore,
      plannerDates,
      topPaginationDate,
      dispatch,
      isCurrentMinDateListOver,
      filters,
      getMorePrependDates,
    ],
  );

  const loadMore = useCallback(() => {
    if (isBottomPaginationHasMore) {
      if (!isCurrentMaxDateListOver) {
        getMoreBottomDates();
      }

      const paginationDate = getLargerSmallerDateFromArr(
        Moment(bottomPaginationDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        plannerDates,
      );

      dispatch(
        setPlannerBottomPaginationDate({
          date: paginationDate.largerItem,
          isListOver: paginationDate.hasNextLargerItem,
        }),
      );
      dispatch(getPlannerDataByDate({ date: paginationDate.largerItem, filters, isBottomPagination: true }));
    }
  }, [
    isBottomPaginationHasMore,
    plannerDates,
    bottomPaginationDate,
    dispatch,
    filters,
    getMoreBottomDates,
    isCurrentMaxDateListOver,
  ]);

  const handleScrollToToday = useCallback(() => {
    if (listRef === null) return;

    const element = document.getElementById('today');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    dispatch(plannerInitialize()).finally(() => handleScrollToToday());
    return () => {
      dispatch(resetPlannerData());
    };
  }, [dispatch, filters, handleScrollToToday]);

  useEffect(() => {
    if (isGetPlannerData) {
      handleScrollToToday();
    }
  }, [handleScrollToToday, isGetPlannerData]);

  const onMessagesListScroll = useCallback(
    (value: any) => {
      if (value.top === 0) {
        prependItems(value.scrollHeight);
      }

      if (value.top > 0.99) {
        loadMore();
      }
    },
    [prependItems, loadMore],
  );
  const handleOpenCreateEventModal = () => {
    modalObserver.addModal(ModalNamesEnum.createEventModal, {});
  };

  const handleOpenCreateTaskModal = () => {
    modalObserver.addModal(ModalNamesEnum.createTaskModal, {});
  };

  const handleOpenCreateMeetingModal = () => {
    modalObserver.addModal(ModalNamesEnum.createMeetingModal, {});
  };

  const menuList = useMemo(() => {
    return [
      {
        label: t('general.actionMenus.task'),
        callback: () => handleOpenCreateTaskModal(),
        isDisabled: false,
      },
      {
        label: t('general.actionMenus.event'),
        callback: () => handleOpenCreateEventModal(),
        isDisabled: false,
      },
      {
        label: t('general.actionMenus.meeting'),
        callback: () => handleOpenCreateMeetingModal(),
        isDisabled: false,
      },
    ];
  }, [t]);

  if (profileData?.view_data?.is_view_journal === false) {
    return (
      <PageStubContainer isWelcomeSlider>
        <WelcomeStub sliderOptions={plannerWelcomePageStubConfig} />
      </PageStubContainer>
    );
  }
  return (
    <>
      {profileData?.view_data?.is_view_journal && (
        <PlannerListContainer>
          <Collapse in={isShowPlannerNavigationPanel}>
            <PlannerLIstNavigationPanel
              isData={!!plannerList.length || !isGetPlannerData}
              handleScrollToToday={handleScrollToToday}
              filters={filters}
            />
          </Collapse>
          {isGetPlannerData ? (
            <>
              {!!plannerList.length ? (
                <Scrollbars
                  ref={listRef}
                  style={{
                    height: '100%',
                    position: 'relative',
                    overflow: 'auto',
                    flexGrow: '3',
                  }}
                  onScrollFrame={onMessagesListScroll}
                  renderView={(props: any) => (
                    <div
                      {...props}
                      style={{
                        position: 'absolute',
                        overflow: 'auto',
                        width: '100%',
                        height: '100%',
                        scrollbarWidth: 'none',
                      }}
                    />
                  )}
                  renderTrackHorizontal={(props: any) => (
                    <div {...props} style={{ display: 'none !important' }} />
                  )}
                  renderTrackVertical={(props: any) => (
                    <div {...props} style={{ display: 'none !impotent' }} />
                  )}
                  renderThumbHorizontal={(props: any) => (
                    <div {...props} style={{ display: 'none !impotent' }} />
                  )}
                  renderThumbVertical={(props: any) => (
                    <div {...props} style={{ display: 'none !impotent' }} />
                  )}
                >
                  {isTopPaginationHasMore && <PlannerDayContainerSkeleton />}
                  <PlannerListTopNoItems plannerCurrentMinDate={plannerCurrentMinDate || ''} />
                  {plannerList.map((day: any, index: number, array: any) => (
                    <Fragment key={day.date}>
                      <PlannerListNoItems prevDate={array[index - 1]?.date} currentDate={day?.date} />

                      <PlannerDayContainer
                        isFormatDate
                        date={day.date}
                        taskCount={day.taskCount}
                        eventCount={day.eventCount}
                        currentUserFirstName={currentUserFirstName}
                      >
                        {day.items.map((dayItem: any) => (
                          <Fragment key={dayItem.id}>
                            {dayItem.model_type === PlannerItemModelTypeEnum.task && (
                              <PlannerTask
                                handleOpenPlannerItem={handleOpenPlannerItem}
                                containerDate={day.date}
                                item={dayItem}
                              />
                            )}
                            {dayItem.model_type === PlannerItemModelTypeEnum.meet && (
                              <PlannerMeeting
                                handleOpenPlannerItem={handleOpenPlannerItem}
                                containerDate={day.date}
                                item={dayItem}
                              />
                            )}
                            {dayItem.model_type === PlannerItemModelTypeEnum.event && (
                              <PlannerEvent
                                handleOpenPlannerItem={handleOpenPlannerItem}
                                containerDate={day.date}
                                item={dayItem}
                              />
                            )}
                            {dayItem.model_type === PlannerItemModelTypeEnum.payment && (
                              <PlannerPayment
                                handleOpenPlannerItem={handleOpenPlannerItem}
                                containerDate={day.date}
                                item={dayItem}
                              />
                            )}
                          </Fragment>
                        ))}
                      </PlannerDayContainer>
                    </Fragment>
                  ))}
                  <PlannerListBottomNoItems plannerList={plannerList} />
                  {isBottomPaginationHasMore && <PlannerDayContainerSkeleton />}
                  {!isBottomPaginationHasMore && <PlannerBottomStub />}
                </Scrollbars>
              ) : (
                <>
                  {isFetchingWithFilter ? (
                    <PageStubContainer isNoFilterMatch>
                      <Stub isBoltSubtitleText={false} value={noFilterMatchStubConfig} />
                    </PageStubContainer>
                  ) : (
                    <PageStubContainer>
                      <Stub value={plannerListNoItemStubConfig} />
                    </PageStubContainer>
                  )}
                </>
              )}
            </>
          ) : (
            <PlannerSkeleton />
          )}

          <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
            <PlusActionMenu menuList={menuList} />
          </AddBottomButtonContainer>
        </PlannerListContainer>
      )}
    </>
  );
};

export default memo(PlannerList);
