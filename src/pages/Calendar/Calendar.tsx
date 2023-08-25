/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Eventcalendar } from '@mobiscroll/react';
import { useMediaQuery, useTheme } from '@mui/material';
import Moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import { getConnections } from '../../store/Profile/profile.actions';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import CalendarHeader from './components/CalendarHeader';
import { CalendarContainer, CalendarContentWrap } from './Calendar.style';
import { CalendarViewEnum } from '../../shared/enums/calendarView.enum';
import {
  resetCalendarData,
  setSelectedCalendarView,
  updateCalendarItem,
} from '../../store/calendar/calendarSlice';
import { changeCalendarItemDate, getCalendarData } from '../../store/calendar/calendarThunk';
import ScheduleEvent from './components/ScheduleEvent';
import EventContent from './components/EventContent';
import EventLabel from './components/EventLabel';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import CalendarHoverItemPopup from './components/CalendarHoverItemPopup';
import { AddBottomButtonContainer } from '../../shared/styles/AddBottomButtonContainer';
import PlusActionMenu from '../../components/actionMenus/PlusActionMenu';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { PageStubContainer } from '../../shared/styles/StubContainer';
import WelcomeStub from '../../components/stubs/WelcomeStub';
import { calendarWelcomePageStubConfig } from '../../shared/configs/welcomePageStubs/calendarWelcomePageStub.config';
import modalObserver from '../../shared/utils/observers/modalObserver';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const { isShowCalendarNavigationPanel, selectedCalendarView, calendarData, filters } = useAppSelector(
    ({ calendar }) => calendar,
  );
  // TODO ADDED RESET STATE
  const [isOpenHoverPopup, setIsOpenHoverPopup] = useState<boolean>(false);
  const [myEvents, setEvents] = useState([]);
  const [anchor, setAnchor] = useState(null);
  const [hoverItem, setHoverItem] = useState({});
  const timerRef = useRef<any>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDateObj, setCalendarDateObj] = useState(null);
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);

  const [searchParams, setSearchParams] = useSearchParams();
  const taskId = searchParams.get('taskId');
  const eventId = searchParams.get('eventId');
  const paymentId = searchParams.get('paymentId');

  const [calendarView, setCalendarView] = useState<CalendarViewEnum>(selectedCalendarView);
  const profileData = useAppSelector(({ profile }) => profile?.data);

  useEffect(() => {
    dispatch(getConnections());
    return () => {
      dispatch(resetCalendarData());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.planner.calendar') }]));
  }, [dispatch, t]);

  const handleChangeCalendarView = useCallback(
    (val: CalendarViewEnum) => {
      setCalendarView(val);
      setEvents([]);
      dispatch(setSelectedCalendarView(val));
    },
    [dispatch],
  );

  const handleOpenCreateEventModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.createEventModal, {
      props: {
        createDate: calendarView === CalendarViewEnum.week && !isMobileScreen ? null : currentDate,
      },
    });
  }, [calendarView, currentDate]);

  const handleOpenCreateTaskModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.createTaskModal, {
      props: {
        createDate: calendarView === CalendarViewEnum.week && !isMobileScreen ? null : currentDate,
      },
    });
  }, [calendarView, currentDate]);

  const menuList = [
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
  ];

  const handleOpenCalendarItem = useCallback(
    (item: any) => {
      setIsOpenHoverPopup(false);
      if (item.model_type === PlannerItemModelTypeEnum.task) {
        setSearchParams({ taskId: item.id.toString() });
      }
      if (item.model_type === PlannerItemModelTypeEnum.event) {
        setSearchParams({ eventId: item.id.toString() });
      }
      if (item.model_type === PlannerItemModelTypeEnum.payment) {
        setSearchParams({ paymentId: item.id.toString() });
      }
    },
    [setSearchParams, setIsOpenHoverPopup],
  );

  const onEventHoverIn = useCallback((args: any) => {
    const event = args.event;
    setHoverItem(event);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setAnchor(args.domEvent.target);
    setIsOpenHoverPopup(true);
  }, []);

  const onEventHoverOut = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setIsOpenHoverPopup(false);
      setHoverItem({});
    }, 400);
  }, []);

  const onEventDragStart = useCallback(() => {
    setIsOpenHoverPopup(false);
    setHoverItem({});
  }, []);

  const onMouseEnter = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const onMouseLeave = React.useCallback(() => {
    timerRef.current = setTimeout(() => {
      setIsOpenHoverPopup(false);
    }, 400);
  }, []);

  useEffect(() => {
    if (taskId) {
      modalObserver.addModal(ModalNamesEnum.viewTaskModal, {
        props: {
          taskId: taskId,
        },
      });
    }
  }, [taskId, currentDate]);

  useEffect(() => {
    if (eventId) {
      modalObserver.addModal(ModalNamesEnum.viewEventModal, {
        props: {
          eventId: eventId,
        },
      });
    }
  }, [eventId, currentDate]);

  useEffect(() => {
    if (paymentId) {
      modalObserver.addModal(ModalNamesEnum.viewPaymentModal, {
        props: { paymentId: paymentId },
      });
    }
  }, [paymentId, dispatch]);

  useEffect(() => {
    if (!!calendarData) {
      const newArr = calendarData.map((x: any) => ({ ...x }));
      setEvents(newArr);
    }
  }, [calendarData]);

  const onPageLoading = useCallback((e: any) => {
    setCalendarDateObj(e);
  }, []);

  const onGetCalendarData = useCallback(
    (e: any) => {
      const fromDate = Moment(e.firstDay);
      let toDate = Moment();
      if (calendarView === CalendarViewEnum.month) {
        toDate = Moment(fromDate).add(41, 'day');
      } else if (calendarView === CalendarViewEnum.week) {
        toDate = Moment(fromDate).add(6, 'day');
      } else {
        toDate = Moment(e.lastDay).subtract(1, 'day');
      }

      const day = fromDate.format('DD');
      const dayTo = toDate.format('DD');
      const month = fromDate.format('MM');
      const monthTo = toDate.format('MM');
      const year = fromDate.format('YYYY');
      const yearTo = toDate.format('YYYY');

      const dateFrom = `${year}-${month}-${day}`;
      const dateTo = `${yearTo}-${monthTo}-${dayTo}`;
      dispatch(getCalendarData({ calendarView, dateFrom, dateTo, filters }));
    },
    [calendarView, dispatch, filters],
  );

  useEffect(() => {
    if (calendarDateObj) {
      onGetCalendarData(calendarDateObj);
    }
  }, [calendarDateObj, filters]);

  const getFirstDayOfWeek = useCallback((d: Date, prev: boolean) => {
    const day = d.getDay();
    const diff = d.getDate() - day + (prev ? -6 : 8);
    return new Date(d.setDate(diff));
  }, []);

  const navigatePage = useCallback(
    (prev: boolean) => {
      if (calendarView === CalendarViewEnum.month) {
        const prevNextPage = new Date(currentDate.getFullYear(), currentDate.getMonth() + (prev ? -1 : 1), 1);
        setCurrentDate(prevNextPage);
        setEvents([]);
      } else {
        const prevNextSunday = getFirstDayOfWeek(currentDate, prev);
        setCurrentDate(prevNextSunday);
        setEvents([]);
      }
    },
    [calendarView, currentDate, setCurrentDate, getFirstDayOfWeek],
  );

  const onSelectedDateChange = useCallback(
    (event: any) => {
      setCurrentDate(event.date);
    },
    [setCurrentDate],
  );

  const handleSelectedDateChange = (e: any) => {
    setCurrentDate(e);
  };
  const refreshItemList = useCallback(() => {
    if (calendarDateObj) {
      onGetCalendarData(calendarDateObj);
    }
  }, [calendarDateObj]);

  const navigateToPrevPage = useCallback(() => {
    const prevPage = new Date(currentDate);
    prevPage.setDate(1);
    prevPage.setMonth(prevPage.getMonth() - 1);
    setEvents([]);
    setCurrentDate(prevPage);
  }, [currentDate]);

  const navigateToNextPage = useCallback(() => {
    const nextPage = new Date(currentDate);

    nextPage.setDate(1);
    nextPage.setMonth(nextPage.getMonth() + 1);
    setEvents([]);

    setCurrentDate(nextPage);
  }, [currentDate]);

  const navigateToPrevPageYear = useCallback(() => {
    const prevPage = new Date(currentDate);

    prevPage.setDate(1);
    prevPage.setFullYear(prevPage.getFullYear() - 1);
    setEvents([]);

    setCurrentDate(prevPage);
  }, [currentDate]);

  const navigateToNextPageYear = useCallback(() => {
    const nextPage = new Date(currentDate);

    nextPage.setDate(1);
    nextPage.setFullYear(nextPage.getFullYear() + 1);
    setEvents([]);

    setCurrentDate(nextPage);
  }, [currentDate]);

  const renderLabel = useCallback((data: any) => {
    return <EventLabel data={data} />;
  }, []);

  const renderEventContent = useCallback((data: any) => {
    return <EventContent data={data} />;
  }, []);

  const renderScheduleEvent = useCallback((data: any) => {
    return <ScheduleEvent data={data} />;
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <CalendarHeader
        navigateToPrevPage={navigateToPrevPage}
        navigateToNextPage={navigateToNextPage}
        navigateToNextPageYear={navigateToNextPageYear}
        navigateToPrevPageYear={navigateToPrevPageYear}
        setCalendarView={handleChangeCalendarView}
        isShowCalendarNavigationPanel={isShowCalendarNavigationPanel}
        handleSelectedDateChange={handleSelectedDateChange}
        calendarView={calendarView}
        navigatePage={navigatePage}
        filters={filters}
      />
    );
  }, [
    navigatePage,
    filters,
    isShowCalendarNavigationPanel,
    handleChangeCalendarView,
    calendarView,
    navigateToNextPage,
    navigateToNextPageYear,
    navigateToPrevPage,
    navigateToPrevPageYear,
  ]);

  const getCalendarClass = useMemo(() => {
    if (calendarView === CalendarViewEnum.month) {
      if (isMobileScreen) {
        return 'mobile-month-container';
      }
      return 'desktop-month-container';
    }

    if (calendarView === CalendarViewEnum.week) {
      if (isMobileScreen) {
        return 'mobile-week-container';
      }
      return 'desktop-week-container';
    }

    if (isMobileScreen) {
      return 'mobile-year-container';
    }

    return 'desktop-year-container';
  }, [calendarView, isMobileScreen]);

  const getCalendarView = useMemo(() => {
    if (calendarView === CalendarViewEnum.month) {
      if (isMobileScreen) {
        return {
          calendar: {
            type: 'month',
            timeFormat: 'hh:mm a',
          },
          agenda: { type: 'day', allDay: true, timeFormat: 'hh:mm a' },
        };
      }
      return {
        calendar: {
          type: 'month',
          timeFormat: 'hh:mm a',
        },
      };
    }

    if (calendarView === CalendarViewEnum.week) {
      if (isMobileScreen) {
        return {
          calendar: {
            type: 'week',
          },
          schedule: {
            type: 'day',
            allDay: true,
            size: 1,
            timeFormat: 'hh:mm a',
          },
        };
      }

      return {
        schedule: {
          type: 'week',
          allDay: true,
          size: 1,
          timeFormat: 'hh:mm a',
        },
      };
    }

    return {
      calendar: {
        type: 'year',
        outerDays: true,
        timeFormat: 'hh:mm a',
      },
    };
  }, [calendarView, isMobileScreen]);

  const handleOnCellClick = (data: any) => {
    if (calendarView === CalendarViewEnum.year) {
      setCurrentDate(data.date);
      handleChangeCalendarView(CalendarViewEnum.month);
    }
  };

  const handleChangeItemData = (event: any, confirmation_status: string) => {
    const updatedData = {
      is_all_day: !!event?.allDay,
      started_at: Moment(event.start).utc().format('YYYY-MM-DD HH:mm:ss'),
      finished_at: Moment(event.end).utc().format('YYYY-MM-DD HH:mm:ss'),
      confirmation_status,
    };
    if (event?.model_type === PlannerItemModelTypeEnum.event) {
      dispatch(changeCalendarItemDate({ params: updatedData, itemId: event.id })).then((result) => {
        if (changeCalendarItemDate.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.eventUpdated'));
          dispatch(updateCalendarItem(result.payload));
          if (confirmation_status !== 'self') {
            refreshItemList();
          }
        }
      });
    } else if (event.model_type === PlannerItemModelTypeEnum.task) {
      dispatch(changeCalendarItemDate({ params: updatedData, itemId: event.id })).then((result) => {
        if (changeCalendarItemDate.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.taskUpdated'));
          dispatch(updateCalendarItem(result.payload));
          if (confirmation_status !== 'self') {
            refreshItemList();
          }
        }
      });
    } else if (event.model_type === PlannerItemModelTypeEnum.payment) {
      dispatch(changeCalendarItemDate({ params: updatedData, itemId: event.id })).then((result) => {
        if (changeCalendarItemDate.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.paymentUpdated'));
          dispatch(updateCalendarItem(result.payload));
          if (confirmation_status !== 'self') {
            refreshItemList();
          }
        }
      });
    }
  };

  const handleOpenChangeRecurringItemModal = (data: any) => {
    if (data?.event?.is_recurring) {
      modalObserver.addModal(ModalNamesEnum.confirmModalWithThreeVariant, {
        props: {
          title: t('general.modals.confirmRecurringModal.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: (confirmation_status: string) =>
            handleChangeItemData(data.event, confirmation_status),
          handleCancel: () => Promise.resolve().then(() => dispatch(updateCalendarItem(data.oldEvent))),
        },
      });
    } else {
      handleChangeItemData(data.event, 'self');
    }
  };

  if (profileData?.view_data.is_view_calendar === false) {
    return (
      <PageStubContainer isWelcomeSlider>
        <WelcomeStub sliderOptions={calendarWelcomePageStubConfig} />
      </PageStubContainer>
    );
  }

  return (
    <CalendarContainer>
      <CalendarContentWrap className={getCalendarClass}>
        <Eventcalendar
          onSelectedDateChange={onSelectedDateChange}
          renderHeader={renderHeader}
          themeVariant="light"
          selectedDate={currentDate}
          onPageLoading={onPageLoading}
          onEventDragStart={onEventDragStart}
          renderLabel={renderLabel}
          renderEventContent={renderEventContent}
          renderScheduleEvent={renderScheduleEvent}
          data={myEvents}
          dragToMove
          onEventUpdated={(e) => handleOpenChangeRecurringItemModal(e)}
          onEventHoverIn={onEventHoverIn}
          onEventHoverOut={onEventHoverOut}
          dragToResize
          onEventClick={(e) => handleOpenCalendarItem(e.event)}
          firstDay={1}
          // @ts-ignore
          view={getCalendarView}
          showOuterDays={false}
          showEventTooltip={false}
          onCellClick={(e: any) => (e.outer !== undefined ? handleOnCellClick(e) : null)}
          theme="ios"
        />
      </CalendarContentWrap>
      <CalendarHoverItemPopup
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        isOpen={isOpenHoverPopup}
        anchor={anchor}
        setIsOpenHoverPopup={setIsOpenHoverPopup}
        hoverItem={hoverItem}
      />
      <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
        <PlusActionMenu menuList={menuList} />
      </AddBottomButtonContainer>
    </CalendarContainer>
  );
};

export default Calendar;
