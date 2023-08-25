import { NetworkTypeEnum } from '../../shared/enums/networkType.enum';
import { NetworkUserModel } from '../../shared/models/network';
import { AppDispatch, RootState } from '../store';
import { addNetworkUser, changeNetworkUser, deleteNetworkUser } from './networkSlice';
import { setNetworkCounter } from '../Common/commonSlice';

export type NetworkSocketType = {
  count_pending: number;
  user: NetworkUserModel;
};
export type NetworkSocketRemoveConnectionType = {
  recipient_id: number;
  sender: NetworkUserModel;
};

export const networkSocketHandleCanceled = (event: NetworkSocketType) => async (dispatch: AppDispatch) => {
  dispatch(setNetworkCounter(event.count_pending));
  dispatch(changeNetworkUser(event.user));
};

export const networkSocketHandleSentCanceled =
  (event: NetworkSocketRemoveConnectionType) => async (dispatch: AppDispatch) => {
    dispatch(deleteNetworkUser(event.sender.id));
  };
export const networkSocketPendingCanceled = (event: NetworkSocketType) => async (dispatch: AppDispatch) => {
  dispatch(setNetworkCounter(event.count_pending));
  dispatch(deleteNetworkUser(event.user.sender_id));
};

export const networkSocketSent = (event: NetworkSocketType) => async (dispatch: AppDispatch) => {
  dispatch(setNetworkCounter(event.count_pending));
  dispatch(addNetworkUser(event.user));
};

export const networkSocketApproved =
  (event: NetworkSocketType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { isStopPagination } = getState().network.network;
    dispatch(setNetworkCounter(event.count_pending));
    if (isStopPagination) {
      dispatch(changeNetworkUser(event.user));
    } else {
      dispatch(deleteNetworkUser(event.user.friend_id));
    }
  };

export const networkSocketCreatedContact =
  (event: NetworkSocketType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const type = getState().network.network.type;
    dispatch(setNetworkCounter(event.count_pending));
    if (type && type === NetworkTypeEnum.contacts) {
      dispatch(addNetworkUser(event.user));
    }
  };

export const networkSocketCreatedFuture =
  (event: NetworkSocketType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const type = getState().network.network.type;
    dispatch(setNetworkCounter(event.count_pending));
    if ((type && type === NetworkTypeEnum.all) || type === NetworkTypeEnum.sent) {
      dispatch(addNetworkUser(event.user));
    }
  };

export const networkSocketRemovedFriend =
  (event: NetworkSocketRemoveConnectionType) => async (dispatch: AppDispatch) => {
    dispatch(deleteNetworkUser(event.sender.id));
  };

export const networkGlobalSocketCreate = (event: NetworkSocketType) => async (dispatch: AppDispatch) => {
  dispatch(setNetworkCounter(event.count_pending));
  dispatch(addNetworkUser(event.user));
};
