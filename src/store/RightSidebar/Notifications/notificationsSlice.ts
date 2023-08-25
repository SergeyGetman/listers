import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getNews,
  viewedNews,
  removeNews,
  viewedAllNews,
  getRequests,
  removeAllNews,
} from './notificationsActions';
import { NewsItemModel } from '../../../shared/models/notifications/news/newsItem.model';
import { RequestItemModel } from '../../../shared/models/notifications/requests/requestItem.model';
import { NotificationsEnum } from '../../../shared/enums/notificationsEnum';

export interface Notifications {
  activeTab: NotificationsEnum;
  news: {
    newsData: NewsItemModel[];
    page: number;
    isStopPagination: boolean;
    isLoading: boolean;
    isViewedAll: boolean;
    isFetchingNews: boolean;
  };
  requests: {
    requestsData: RequestItemModel[];
    page: number;
    isRequestsStopPagination: boolean;
    isRequestsLoading: boolean;
    isFetchingRequests: boolean;
  };
}

const initialState: Notifications = {
  activeTab: NotificationsEnum.requests,
  news: {
    newsData: [],
    page: 1,
    isStopPagination: false,
    isLoading: false,
    isViewedAll: false,
    isFetchingNews: false,
  },
  requests: {
    requestsData: [],
    page: 1,
    isRequestsStopPagination: false,
    isRequestsLoading: false,
    isFetchingRequests: false,
  },
};

export const notificationsSlice = createSlice({
  name: 'notificationsSlice',
  initialState,
  reducers: {
    setNotificationActiveTab(state, action: PayloadAction<NotificationsEnum>) {
      state.activeTab = action.payload;
    },
    setNewsLoading({ news }, action: PayloadAction<boolean>) {
      news.isLoading = action.payload;
    },
    setNewsPage({ news }, action: PayloadAction<number>) {
      news.page = action.payload;
    },
    setRequestsPage({ requests }, action: PayloadAction<number>) {
      requests.page = action.payload;
    },
    setRequestStatus({ requests }, action: PayloadAction<number>) {
      requests.requestsData = requests.requestsData.map((item: RequestItemModel) => {
        if (item.id === action.payload) {
          return { ...item, status: 'event' };
        }
        return item;
      });
    },
    clearNewsState(state) {
      state.news = initialState.news;
    },
    setRequestsLoading({ requests }, action: PayloadAction<boolean>) {
      requests.isRequestsLoading = action.payload;
    },
    clearRequestsState(state) {
      state.requests = initialState.requests;
    },
    setIsViewedAll({ news }, action: PayloadAction<boolean>) {
      news.isViewedAll = action.payload;
    },
    addNewsItem({ news }, action: PayloadAction<NewsItemModel>) {
      news.newsData = [action.payload, ...news.newsData];
    },
    addRequestItem({ requests }, action: PayloadAction<RequestItemModel>) {
      requests.requestsData = [action.payload, ...requests.requestsData];
    },
    updateRequestItem({ requests }, action: PayloadAction<RequestItemModel>) {
      requests.requestsData = requests.requestsData.map((item: RequestItemModel) => {
        if (item.id === action.payload.id) {
          return { ...action.payload };
        }
        return item;
      });
    },
    deleteRequestItem({ requests }, action: PayloadAction<number>) {
      requests.requestsData = requests.requestsData.filter((item: any) => item.id !== action.payload);
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getNews.fulfilled, ({ news }, { payload: { data, meta, links } }) => {
      if (news.page === 1) {
        news.newsData = data;
      } else {
        news.newsData = [...news.newsData, ...data];
      }
      news.isStopPagination = meta.last_page === news.page;
      news.isFetchingNews = true;
      news.page = meta.current_page + 1;
      // eslint-disable-next-line
      const [leftString, rightString] = links.first.split('&');
      news.isViewedAll = !!+leftString.slice(-1);
    });
    addCase(getRequests.fulfilled, ({ requests }, { payload: { data, meta } }) => {
      if (requests.page === 1) {
        requests.requestsData = data;
      } else {
        requests.requestsData = [...requests.requestsData, ...data];
      }
      requests.isFetchingRequests = true;
      requests.isRequestsStopPagination = meta.last_page === requests.page;
      requests.page = meta.current_page + 1;
    });
    addCase(viewedNews.fulfilled, ({ news }, action) => {
      news.newsData = news.newsData.map((item: NewsItemModel) => {
        if (item.id === action.payload) {
          return { ...item, viewed_at: true };
        }
        return item;
      });
      const viewedNewsArray = news.newsData.filter((item: NewsItemModel) => {
        return !item.viewed_at;
      });
      news.isViewedAll = !viewedNewsArray.length;
    });
    addCase(removeNews.fulfilled, (state, action) => {
      state.news.newsData = state.news.newsData.filter((item: NewsItemModel) => {
        return item.id !== action.payload;
      });
    });
    addCase(viewedAllNews.fulfilled, ({ news }) => {
      news.newsData = news.newsData.map((item: NewsItemModel) => {
        return { ...item, viewed_at: true };
      });
      const viewedNewsArray = news.newsData.filter((item: NewsItemModel) => {
        return !item.viewed_at;
      });
      news.isViewedAll = !viewedNewsArray.length;
    });
    addCase(removeAllNews.fulfilled, (state) => {
      state.news.newsData = [];
    });
  },
});

export const {
  setNotificationActiveTab,
  setNewsLoading,
  setNewsPage,
  setRequestsPage,
  setRequestStatus,
  clearNewsState,
  setRequestsLoading,
  clearRequestsState,
  setIsViewedAll,
  addNewsItem,
  addRequestItem,
  deleteRequestItem,
  updateRequestItem,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
