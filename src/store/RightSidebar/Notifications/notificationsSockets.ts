import { AppDispatch, RootState } from '../../store';
import { RightSidebarTabsEnum } from '../../../shared/enums/rightSidebarEnum';
import { NotificationsEnum, NotificationsTypesEnum } from '../../../shared/enums/notificationsEnum';
import { addNewsItem, addRequestItem, deleteRequestItem, updateRequestItem } from './notificationsSlice';
import { showAllNews } from './notificationsActions';
import {
  setProfileHubsGarageExpiredAtDate,
  setProfileNotificationsCount,
  setProfileNotificationsNewsCount,
} from '../../Profile/profile.slice';
import { NewsItemModel } from '../../../shared/models/notifications/news/newsItem.model';
import { RequestItemModel } from '../../../shared/models/notifications/requests/requestItem.model';
import { updateFeedsCounter } from '../../Profile/profile.actions';

export const notificationsGlobalSocketAddItem =
  (item: NewsItemModel) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { activeTab } = getState().notifications;
    const { isOpenRightSidebar, rightSidebarSelectedTab } = getState().rightSidebar;

    if (
      isOpenRightSidebar &&
      rightSidebarSelectedTab === RightSidebarTabsEnum.notifications &&
      activeTab === NotificationsEnum.news
    ) {
      dispatch(addNewsItem(item));
      dispatch(showAllNews());
    } else {
      dispatch(setProfileNotificationsNewsCount(1));
    }
  };

export const notificationsGlobalSocketCreateItem =
  (item: RequestItemModel) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { activeTab } = getState().notifications;

    if (activeTab === NotificationsEnum.requests) {
      dispatch(addRequestItem(item));
    }
    if (item.type === NotificationsTypesEnum.garage) {
      dispatch(setProfileHubsGarageExpiredAtDate(true));
    }
    dispatch(setProfileNotificationsCount(1));
  };

export const requestsGlobalSocketUpdateItem =
  (item: RequestItemModel) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { activeTab } = getState().notifications;
    if (activeTab === NotificationsEnum.requests) {
      dispatch(updateRequestItem(item));
    }
  };

export const notificationsGlobalSocketDeleteItem =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { activeTab } = getState().notifications;

    dispatch(updateFeedsCounter());

    if (activeTab === NotificationsEnum.requests) {
      dispatch(deleteRequestItem(id));
    }
  };
