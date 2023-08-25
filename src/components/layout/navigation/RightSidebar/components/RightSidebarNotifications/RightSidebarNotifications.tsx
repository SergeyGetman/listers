import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import MuiTabs from './components/Tabs';
import BaseActionMenu from '../../../../../actionMenus/BaseActionMenu';
import NotificationNewsCard from './components/NotificationNewsCard';
import {
  NotificationsActionsTypesEnum,
  NotificationsEnum,
  NotificationsTypesEnum,
} from '../../../../../../shared/enums/notificationsEnum';
import NotificationRequestCard from './components/NotificationRequestCard';
import {
  MenuButtonContainer,
  NewsCardsContainer,
  NotificationsContainer,
  NotificationsHeaderTitleContainer,
} from './RightSidebarNotifications.style';
import {
  getNews,
  getRequests,
  removeAllNews,
  removeNews,
  viewedAllNews,
  viewedNews,
} from '../../../../../../store/RightSidebar/Notifications/notificationsActions';
import {
  clearNewsState,
  clearRequestsState,
  setNotificationActiveTab,
} from '../../../../../../store/RightSidebar/Notifications/notificationsSlice';
import { NewsItemModel } from '../../../../../../shared/models/notifications/news/newsItem.model';
import { RequestItemModel } from '../../../../../../shared/models/notifications/requests/requestItem.model';
import {
  setRightSidebarSelectedTab,
  toggleOpenRightSidebar,
} from '../../../../../../store/RightSidebar/rightSidebarSlice';
import router from '../../../../../../shared/services/router';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';
import { ItemUserModel } from '../../../../../../shared/models/itemUser.model';
import { NetworkTypeEnum } from '../../../../../../shared/enums/networkType.enum';
import requestsStubImage from '../../../../../../assets/Images/stub/notification-requests-stub.png';
import newsStubImage from '../../../../../../assets/Images/stub/notification-news-stub.png';
import NotificationStub from './components/NotificationStub';
import { setProfileNotificationsAllNewsCount } from '../../../../../../store/Profile/profile.slice';
import { PlannerItemStatusesEnum } from '../../../../../../shared/enums/plannerItemStatuses.enum';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';

const RightSidebarNotifications: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { data } = useAppSelector(({ profile }) => profile);
  const { activeTab } = useAppSelector(({ notifications }) => notifications);
  const { newsData, isViewedAll, isStopPagination, isLoading, isFetchingNews } = useAppSelector(
    ({ notifications }) => notifications.news,
  );
  const { requestsData, isRequestsStopPagination, isRequestsLoading, isFetchingRequests } = useAppSelector(
    ({ notifications }) => notifications.requests,
  );
  const skeletonArray = Array(15).fill('');
  const { t } = useTranslation();
  const location = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollTop = () => {
    containerRef?.current?.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (activeTab === NotificationsEnum.news) {
      dispatch(getNews()).then((result) => {
        if (getNews.fulfilled.match(result)) {
          dispatch(setProfileNotificationsAllNewsCount());
        }
      });
      return () => {
        dispatch(clearNewsState());
        handleScrollTop();
      };
    }
    dispatch(getRequests());
    return () => {
      dispatch(clearRequestsState());
      handleScrollTop();
    };
  }, [activeTab, dispatch]);

  const handleViewNews = useCallback(
    (id: number) => {
      dispatch(viewedNews(id));
    },
    [dispatch],
  );

  const handleRemoveNews = useCallback(
    (id: number) => {
      dispatch(removeNews(id));
    },
    [dispatch],
  );

  const newsLink = useCallback(
    ({
      entity_id,
      entity_type,
      type,
      globalStatus,
    }: {
      entity_id: number;
      entity_type: NotificationsTypesEnum;
      type?: NotificationsActionsTypesEnum;
      globalStatus?: PlannerItemStatusesEnum;
    }): string => {
      if (type !== NotificationsActionsTypesEnum.deleted) {
        if (entity_type === NotificationsTypesEnum.task) {
          if (globalStatus === PlannerItemStatusesEnum.backlog) {
            return `${router.backlog.path}?taskId=${entity_id}`;
          }
          if (type === NotificationsActionsTypesEnum.autoArchived) {
            return `${router.settings.path}/${router.settings.children.archive.path}?taskId=${entity_id}`;
          }
          return `${router.journal.path}?taskId=${entity_id}`;
        }

        if (entity_type === NotificationsTypesEnum.event) {
          if (type === NotificationsActionsTypesEnum.autoArchived) {
            return `${router.settings.path}/${router.settings.children.archive.path}?eventId=${entity_id}`;
          }

          return `${router.journal.path}?eventId=${entity_id}`;
        }

        if (entity_type === NotificationsTypesEnum.thread) {
          return `${router.chat.path}/${router.chat.children.group.path}/${entity_id}`;
        }

        if (entity_type === NotificationsTypesEnum.userRequest) {
          if (type === NotificationsActionsTypesEnum.cancelInvitation) {
            return `${router.network.path}/${NetworkTypeEnum.sent}`;
          }
          if (
            type === NotificationsActionsTypesEnum.contactShared ||
            type === NotificationsActionsTypesEnum.acceptContact
          ) {
            return `${router.network.path}/${NetworkTypeEnum.contacts}`;
          }
          return `${router.network.path}`;
        }

        if (entity_type === NotificationsTypesEnum.todo) {
          return `${router.todo.path}`;
        }

        if (entity_type === NotificationsTypesEnum.note) {
          return `${router.todo.path}/${router.todo.children.notes.path}`;
        }

        if (entity_type === NotificationsTypesEnum.garage) {
          return `${router.garage.path}/${entity_id}`;
        }
      }

      return location.pathname;
    },
    [location.pathname],
  );

  const handleToggleOpenRightSidebar = useCallback(
    (props: boolean) => {
      dispatch(toggleOpenRightSidebar(props));
      dispatch(setRightSidebarSelectedTab(''));
    },
    [dispatch],
  );

  const handleClickOnCard = useCallback(
    ({
      isViewed,
      user,
      news_id,
      entity_type,
      type,
    }: {
      isViewed?: boolean;
      news_id?: number;
      user: ItemUserModel | any;
      entity_type: NotificationsTypesEnum;
      type?: string;
    }) => {
      if (type === NotificationsActionsTypesEnum.deletedAccount) {
        if (!isViewed && news_id) {
          handleViewNews(news_id);
        }
      } else if (type !== NotificationsActionsTypesEnum.deleted) {
        handleToggleOpenRightSidebar(false);

        if (!isViewed && news_id) {
          handleViewNews(news_id);
        }

        if (entity_type === NotificationsTypesEnum.userRequest && !type) {
          modalObserver.addModal(ModalNamesEnum.userShortProfileModal, {
            props: {
              userId: user.sender_id ? user.sender_id : user.id,
            },
          });
        }
      }

      return '';
    },
    [handleViewNews, handleToggleOpenRightSidebar],
  );

  const requestCardBorderColor = useCallback(
    ({ type, globalStatus }: { type: NotificationsTypesEnum; globalStatus: PlannerItemStatusesEnum }) => {
      if (type === NotificationsTypesEnum.task) {
        if (globalStatus === PlannerItemStatusesEnum.backlog) return `${theme.palette.case.main.orange.high}`;
        return `${theme.palette.case.main.purple.high}`;
      }

      if (type === NotificationsTypesEnum.event) {
        return `${theme.palette.case.warning.middle}`;
      }

      if (type === NotificationsTypesEnum.garage) {
        // TODO add color to theme
        return `#10B982`;
      }

      if (type === NotificationsTypesEnum.thread) {
        return `${theme.palette.case.main.gey.high}`;
      }

      if (type === NotificationsTypesEnum.userRequest) {
        // TODO add color to theme
        return `#2563EC`;
      }

      if (type === NotificationsTypesEnum.todo || type === NotificationsTypesEnum.note) {
        // TODO add color to theme
        return `#07B6D5`;
      }

      return '';
    },
    [theme],
  );

  useEffect(() => {
    if (requestsData.length === 14 && !isRequestsStopPagination) {
      dispatch(getRequests({ page: 1 }));
    }
  }, [isRequestsStopPagination, requestsData.length, dispatch]);

  useEffect(() => {
    if (newsData.length === 14 && !isStopPagination) {
      dispatch(getNews({ page: 1 }));
    }
  }, [isStopPagination, newsData.length, dispatch]);

  return (
    <NotificationsContainer>
      <MuiTabs
        options={[
          { name: 'Requests', key: NotificationsEnum.requests, counter: data?.counters?.count_requests },
          { name: 'News', key: NotificationsEnum.news, counter: data?.counters?.count_news },
        ]}
        value={activeTab}
        handleChanged={(newActiveTab) =>
          dispatch(setNotificationActiveTab(newActiveTab as NotificationsEnum))
        }
      />

      {activeTab === NotificationsEnum.news ? (
        <>
          {newsData.length > 0 && (
            <NotificationsHeaderTitleContainer>
              <Typography variant="large_bolt">{t('general.containers.allNews')}</Typography>
              <MenuButtonContainer>
                <BaseActionMenu
                  menuList={[
                    {
                      callback: () => {
                        dispatch(viewedAllNews());
                      },
                      isDisabled: !newsData.length || isViewedAll,
                      label: t('general.actionMenus.markAllAsRead'),
                    },
                    {
                      callback: () => {
                        dispatch(removeAllNews());
                      },
                      isDisabled: !newsData.length,
                      label: t('general.actionMenus.removeAllNews'),
                    },
                  ]}
                />
              </MenuButtonContainer>
            </NotificationsHeaderTitleContainer>
          )}

          <NewsCardsContainer ref={containerRef} id="news-scroll">
            <InfiniteScroll
              next={() => {
                dispatch(getNews());
              }}
              hasMore={isStopPagination === false}
              style={{ overflow: 'initial' }}
              loader={isLoading}
              dataLength={newsData.length}
              scrollableTarget="news-scroll"
            >
              {newsData.length > 0 &&
                newsData.map((item: NewsItemModel) => {
                  return (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} key={item.id}>
                      <NotificationNewsCard
                        viewNews={() => {
                          handleViewNews(item.id);
                        }}
                        removeNews={() => {
                          handleRemoveNews(item.id);
                        }}
                        user={{
                          firstName: item.user?.first_name,
                          id: item.user?.id,
                          lastName: item.user?.last_name,
                          src:
                            item?.user?.avatar?.additional_info?.size_urls?.avatar_icon ||
                            item?.user?.avatar?.url ||
                            '',
                        }}
                        data={item?.data}
                        isViewed={item.viewed_at}
                        newsDescription={item.text}
                        type={item.type}
                        newsData={item.created_at}
                        entityType={item.entity_type}
                        globalStatus={item?.entity?.global_status}
                        newsLink={newsLink({
                          entity_type: item.entity_type as NotificationsTypesEnum,
                          entity_id: item.entity_id,
                          type: item.type as NotificationsActionsTypesEnum,
                          globalStatus: item?.entity?.global_status as PlannerItemStatusesEnum,
                        })}
                        handleClickOnCard={() => {
                          handleClickOnCard({
                            news_id: item.id,
                            type: item.type,
                            isViewed: item.viewed_at,
                            user: item.user,
                            entity_type: item.entity_type as NotificationsTypesEnum,
                          });
                        }}
                      />
                    </Box>
                  );
                })}

              {newsData.length === 0 && !isLoading && isFetchingNews && (
                <NotificationStub text={t('stubs.sidebarNotifications.newsStub')} imageUrl={newsStubImage} />
              )}

              {isLoading &&
                skeletonArray.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: '8px',
                      width: '100%',
                      maxWidth: '359px',
                      margin: '8px auto 0 auto',
                    }}
                  >
                    <Skeleton
                      sx={{ borderRadius: '8px', width: '100%', height: '58px' }}
                      variant="rectangular"
                    />
                  </Box>
                ))}
            </InfiniteScroll>
          </NewsCardsContainer>
        </>
      ) : (
        <>
          {requestsData.length > 0 && (
            <NotificationsHeaderTitleContainer>
              <Typography variant="large_bolt">{t('general.containers.allRequests')}</Typography>
            </NotificationsHeaderTitleContainer>
          )}

          <NewsCardsContainer ref={containerRef} id="news-scroll">
            <InfiniteScroll
              next={() => {
                dispatch(getRequests());
              }}
              hasMore={isRequestsStopPagination === false}
              style={{ overflow: 'initial' }}
              loader={isRequestsLoading}
              dataLength={requestsData.length}
              scrollableTarget="news-scroll"
            >
              {requestsData.length > 0 &&
                requestsData.map((item: RequestItemModel) => {
                  return (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} key={item.id}>
                      <NotificationRequestCard
                        user={{
                          firstName: item.sender.first_name,
                          id: item.sender.id,
                          lastName: item.sender.last_name,
                          src:
                            item?.sender?.avatar?.additional_info?.size_urls?.avatar_icon ||
                            item?.sender?.avatar?.url ||
                            '',
                        }}
                        startedAt={item.entity.started_at}
                        isAllDay={item.entity.is_all_day}
                        location={item.entity.location}
                        globalStatus={item.entity.global_status}
                        id={item.id}
                        status={!!item?.status}
                        entityId={item.type_id}
                        action={item.action}
                        actions={item.actions}
                        type={item.type as NotificationsTypesEnum}
                        requestDescription={item.text}
                        requestCardBorderColor={requestCardBorderColor({
                          type: item.type as NotificationsTypesEnum,
                          globalStatus: item.entity.global_status as PlannerItemStatusesEnum,
                        })}
                        newsLink={newsLink({
                          entity_type: item.type as NotificationsTypesEnum,
                          entity_id: item.type_id,
                          type: item.action as NotificationsActionsTypesEnum,
                          globalStatus: item.entity.global_status as PlannerItemStatusesEnum,
                        })}
                        handleClickOnCard={() => {
                          handleClickOnCard({
                            user:
                              item.action === NotificationsActionsTypesEnum.contactShared
                                ? item.entity
                                : item.sender,
                            entity_type: item.type as NotificationsTypesEnum,
                          });
                        }}
                      />
                    </Box>
                  );
                })}

              {requestsData.length === 0 && !isRequestsLoading && isFetchingRequests && (
                <NotificationStub
                  text={t('stubs.sidebarNotifications.requestsStub')}
                  imageUrl={requestsStubImage}
                />
              )}

              {isRequestsLoading &&
                skeletonArray.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: '100%',
                      borderRadius: '0px 4px 4px 0px',
                      maxWidth: '359px',
                      margin: '8px auto 0 auto',
                    }}
                  >
                    <Skeleton
                      sx={{
                        borderRadius: '0px 4px 4px 0px',
                        width: '100%',
                        height: '103px',
                      }}
                      variant="rectangular"
                    />
                  </Box>
                ))}
            </InfiniteScroll>
          </NewsCardsContainer>
        </>
      )}
    </NotificationsContainer>
  );
};

export default RightSidebarNotifications;
