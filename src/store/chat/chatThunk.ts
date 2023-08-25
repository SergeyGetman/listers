import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import i18next from '../../shared/locales/i18n';
import { MessageModel, ThreadModel, UserEmoji } from '../../shared/models/chat/chat.model';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { AppDispatch, RootState } from '../store';
import api from '../../shared/services/api';
import { ResponseMetaType } from '../../shared/models/general';
import {
  addDeletedMessage,
  addDeletedReplyMessage,
  addThreadsItems,
  deleteMessage,
  deleteReplyMessage,
  replaceMessage,
  replaceReplyMessage,
  setThreadCounter,
} from './chatSlice';
import { MediaType } from '../../shared/models/media.model';
import { MetaModel } from '../../shared/models/meta.model';
import { setChatCounters } from '../Common/commonSlice';

type GetThreadsResponse = {
  data: ThreadModel[];
  meta: ResponseMetaType;
  links?: { next: string };
};

type GetMessageEmojiUsers = {
  [key: string]: UserEmoji[];
};

export const getThreads = createAsyncThunk<
  GetThreadsResponse,
  { isGroup: number; query?: string | undefined; page: number },
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('getThreads', async ({ isGroup, query, page }, { rejectWithValue, getState }) => {
  try {
    const storeQuery = getState().chat.query;
    return await api.chat.getThreads(page, isGroup, query || storeQuery);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getSupportThread = createAsyncThunk<
  ThreadModel,
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('getSupportThread', async (_, { rejectWithValue }) => {
  try {
    return await api.chat.getSupportThread();
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
  // finally {
  //   dispatch(setThreadsFetching(false));
  // }
});

export const getThread = createAsyncThunk<
  ThreadModel,
  { id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getThread', async ({ id }, { rejectWithValue }) => {
  try {
    // dispatch(setThreadsFetching(true));
    return await api.chat.getThread(id);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
  // finally {
  //   dispatch(setThreadsFetching(false));
  // }
});

export const updateThread = createAsyncThunk<
  ThreadModel,
  { id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateThread', async ({ id }, { rejectWithValue }) => {
  try {
    return await api.chat.getThread(id);
  } catch (e: any) {
    return rejectWithValue(e.data as ErrorType);
  }
});

export const addThread = (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const res = await api.chat.getThread(id);
    const resCounter = await api.chat.getThreadCounter(id);
    const type = getState().chat.threads.type;
    if (type && ((type === 'group' && res.owner_id) || (type === 'personal' && !!res.owner_id === false)))
      dispatch(addThreadsItems({ ...res, count_unread_messages: resCounter.count_unread_messages }));
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
  }
};

export const getMessages = createAsyncThunk<
  { data: MessageModel[]; direction: number; messageId?: number; messagePage?: number; isReplice: boolean },
  {
    page?: number | undefined;
    threadId: number;
    direction: number;
    id?: number;
    isReplice?: boolean;
    isPrependItems?: boolean;
  },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getMessages', async ({ page, threadId, direction, id, isReplice }, { rejectWithValue }) => {
  try {
    const res = await api.chat.getMessages(threadId, direction, page || undefined, id);
    return {
      ...res,
      data: res.data,
      direction,
      messagePage: page || undefined,
      messageId: id,
      isReplice: !!isReplice,
    };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const sendMessage = createAsyncThunk<
  MessageModel,
  { message: string; threadId: number; files: MediaType[] },
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('sendMessage', async ({ message, threadId, files }, { rejectWithValue }) => {
  try {
    const newMessage = {
      body: message,
      documents: files.map(({ id }) => ({
        id,
      })),
    };

    return await api.chat.sendMessage(threadId, newMessage);
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e as ErrorType);
  }
});

export const getThreadUnreadReplies = createAsyncThunk<
  number[],
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getThreadUnreadReplies', async (threadId, { rejectWithValue }) => {
  try {
    return await api.chat.getThreadUnreadReplies(threadId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getMessage = createAsyncThunk<
  MessageModel,
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getMessage', async (messageId, { rejectWithValue }) => {
  try {
    return await api.chat.getMessage(messageId);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const setReaction = createAsyncThunk<
  MessageModel,
  { messageId: number; data: { emoji: string } },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('setReaction', async ({ messageId, data }, { rejectWithValue }) => {
  try {
    return await api.chat.addReaction(messageId, data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const removeReaction = createAsyncThunk<
  { messageId: number; reaction: string },
  MessageModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('removeReaction', async (message, { rejectWithValue }) => {
  try {
    await api.chat.deleteReaction(message.myEmoji?.id as number);
    return { messageId: message.id, reaction: message.myEmoji?.emoji as string };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const handleDeleteMessage =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const deletedMessage = getState().chat.messages.data.find((message) => message.id === id);
    const deletedMessageIndex = getState().chat.messages.data.findIndex((message) => message.id === id);
    dispatch(deleteMessage(id));
    try {
      await api.chat.deleteMessage(id);
    } catch (e) {
      if (deletedMessageIndex && deletedMessage) {
        dispatch(addDeletedMessage({ message: deletedMessage, index: deletedMessageIndex }));
      }
      NotificationService.error(i18next.t('general.notifications.defaultError'));
    }
  };

export const getEmojiUsers =
  (messageId: number, setValue: (data: GetMessageEmojiUsers) => void) => async () => {
    try {
      const res = await api.chat.getUsersReaction(messageId);
      setValue(res);
      return res;
    } catch (e) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return e;
    }
  };

export const editMessage = createAsyncThunk<
  MessageModel,
  { message: string; messageId: number; files: MediaType[] },
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('editMessage', async ({ message, messageId, files }, { dispatch, rejectWithValue, getState }) => {
  const messageState = getState().chat.messages.data.find((item) => item.id === messageId);
  try {
    const newMessage = {
      body: message,
      documents: files.map(({ id }) => ({
        id,
      })),
    };
    if (messageState) {
      dispatch(
        replaceMessage({
          ...messageState,
          body: message,
          media: files,
          edited_at: moment().format('YYYY-MM-DD HH-mm-ss'),
        }),
      );
    }

    return await api.chat.editMessage(newMessage, messageId);
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    if (messageState) {
      dispatch(replaceMessage(messageState));
    }

    return rejectWithValue(e as ErrorType);
  }
});

export const getReplays = createAsyncThunk<
  { message: MessageModel; replays: { data: MessageModel[]; meta: MetaModel } },
  number,
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('getReplays', async (replyId, { rejectWithValue, getState }) => {
  try {
    const { page } = getState().chat.reply;
    return await api.chat.getReplays(replyId, page);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const sendReplyMessage = createAsyncThunk<
  MessageModel,
  {
    message: string;
    threadId: number;
    files: MediaType[];
    replayId: number;
    createdPendingMessage?: () => void;
  },
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('sendReplyMessage', async ({ message, threadId, files, replayId }, { rejectWithValue }) => {
  try {
    const newMessage = {
      replay_id: replayId,
      body: message,
      documents: files.map(({ id }) => ({
        id,
      })),
    };

    return await api.chat.sendMessage(threadId, newMessage);
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e as ErrorType);
  }
});

export const editReplyMessage = createAsyncThunk<
  MessageModel,
  { message: string; messageId: number; files: MediaType[] },
  { rejectValue: ErrorType; dispatch: AppDispatch; state: RootState }
>('editReplyMessage', async ({ message, messageId, files }, { dispatch, rejectWithValue, getState }) => {
  const messageState = getState().chat.reply.data.find((item) => item.id === messageId);
  try {
    const newMessage = {
      body: message,
      documents: files.map(({ id }) => ({
        id,
      })),
    };
    if (messageState) {
      dispatch(
        replaceReplyMessage({
          ...messageState,
          body: message,
          media: files,
          edited_at: moment().format('YYYY-MM-DD HH-mm-ss'),
        }),
      );
    }

    return await api.chat.editMessage(newMessage, messageId);
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    if (messageState) {
      dispatch(replaceReplyMessage(messageState));
    }

    return rejectWithValue(e as ErrorType);
  }
});

export const handleDeleteReplyMessage =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const deletedMessage = getState().chat.reply.data.find((message) => message.id === id);
    const deletedMessageIndex = getState().chat.reply.data.findIndex((message) => message.id === id);
    dispatch(deleteReplyMessage(id));
    try {
      await api.chat.deleteMessage(id);
    } catch (e) {
      if (deletedMessageIndex && deletedMessage) {
        dispatch(addDeletedReplyMessage({ message: deletedMessage, index: deletedMessageIndex }));
      }
      NotificationService.error(i18next.t('general.notifications.defaultError'));
    }
  };

export const setReplyReaction = createAsyncThunk<
  MessageModel,
  { messageId: number; data: { emoji: string } },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('setReplyReaction', async ({ messageId, data }, { rejectWithValue }) => {
  try {
    return await api.chat.addReaction(messageId, data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const removeReplyReaction = createAsyncThunk<
  { messageId: number; reaction: string },
  MessageModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('removeReplyReaction', async (message, { rejectWithValue }) => {
  try {
    await api.chat.deleteReaction(message.myEmoji?.id as number);
    return { messageId: message.id, reaction: message.myEmoji?.emoji as string };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getGlobalChatCounters = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.chat.getGlobalChatCounters();
    dispatch(setChatCounters(res));
    return true;
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return e;
  }
};

export const createGroupChat = createAsyncThunk<
  ThreadModel,
  {
    data: { subject: string; avatar: { id: number } | null; participants: { id: number }[] };
    setFormLoading: (isLoading: boolean) => void;
  },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('createGroupChat', async ({ data, setFormLoading }, { rejectWithValue }) => {
  try {
    setFormLoading(true);
    return await api.chat.createGroupChat(data);
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    setFormLoading(false);
  }
});

export const inviteToGroupChat = (userId: number, thread_id: number) => async () => {
  try {
    const res = await api.chat.inviteToGroupChat(userId, thread_id);
    NotificationService.success(i18next.t('chat.toasts.addedUserToGroupChat'));
    return res;
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return e;
  }
};

export const updateGroupThread = createAsyncThunk<
  ThreadModel,
  {
    data: { subject: string; avatar: { id: number } | null };
    id: number;
    setFormLoading: (isLoading: boolean) => void;

    thread?: ThreadModel | null;
  },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('updateThread', async ({ data, id, setFormLoading, thread = null }, { rejectWithValue }) => {
  try {
    setFormLoading(true);
    const res = await api.chat.editGroupChat(data, id);
    if (thread) {
      return { ...thread, ...res };
    }
    return res;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  } finally {
    setFormLoading(false);
  }
});

export const kickFromGroupChat = (userId: number, thread_id: number) => async () => {
  try {
    const res = await api.chat.kickFromGroupChat(userId, thread_id);
    NotificationService.success(i18next.t('general.notifications.userSuccessfullyDeleted'));
    return res;
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return e;
  }
};

export const leaveGroupChat = (thread_id: number) => async () => {
  try {
    const res = await api.chat.leaveFromGroupChat(thread_id);
    NotificationService.success(i18next.t('chat.toasts.removeMyself'));
    return res;
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return e;
  }
};

export const deleteGroupChat = (thread_id: number) => async () => {
  try {
    const res = await api.chat.deleteFromGroupChat(thread_id);
    NotificationService.success(i18next.t('chat.toasts.deleted'));
    return res;
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return e;
  }
};

export const clearThreadHistory = (thread_id: number) => async () => {
  try {
    const res = await api.chat.clearThreadHistory(thread_id);

    NotificationService.success(i18next.t('chat.toasts.deleteChatHistory'));
    return res;
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return e;
  }
};

export const getThreadCounter = (thread_id: number) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.chat.getThreadCounter(thread_id);
    dispatch(setThreadCounter({ id: thread_id, count: res.count_unread_messages }));
    return res;
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return e;
  }
};

export const fastMessageSend = (message: string, threadId: number) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.chat.sendMessage(threadId, { body: message, documents: [] });
    dispatch(getThreadCounter(threadId));
    dispatch(getGlobalChatCounters());
    return res;
  } catch (e) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return e;
  }
};

export const fastReplyMessageSend =
  (message: string, threadId: number, replyId: number) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.chat.sendMessage(threadId, { body: message, documents: [], replay_id: replyId });
      dispatch(getThreadCounter(threadId));
      dispatch(getGlobalChatCounters());
      return res;
    } catch (e) {
      NotificationService.error(i18next.t('general.notifications.defaultError'));
      return e;
    }
  };

export const seenThread = (threadId: number) => async () => {
  return await api.chat.seenThread(threadId);
};

export const getFirstMessages = createAsyncThunk<
  { data: MessageModel[] },
  { thread: ThreadModel },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('getFirstMessages', async ({ thread }, { rejectWithValue }) => {
  try {
    // dispatch(setThreadsFetching(true));
    if (thread.last_read_message_id) {
      const res = await api.chat.getMessages(
        thread.id,
        0,
        undefined,
        undefined,
        undefined,
        thread.last_read_message_id,
      );

      return { data: [...res.data] };
    }

    const messagesRes = await api.chat.getMessages(thread.id, 1, undefined);
    const data = messagesRes.data;

    return { data };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const handleFindMessage = createAsyncThunk<
  { data: MessageModel[] },
  { id: number; unreadId: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('handleFindMessage', async ({ id, unreadId }, { rejectWithValue }) => {
  try {
    const res1 = await api.chat.getMessages(id, 1, undefined, undefined, unreadId);
    if (res1.data.length) {
      const res2 = await api.chat.getMessages(id, 0, res1.data[res1.data.length - 1].id);
      return { data: [...res1.data, ...res2.data] };
    }

    return res1;
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});

export const handleLoadChatData = createAsyncThunk<
  { thread: ThreadModel; messages: MessageModel[] },
  { id: number },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('handleLoadChat', async ({ id }, { dispatch, rejectWithValue }) => {
  try {
    const thread = await api.chat.getThread(id);
    let messages = [];

    if (thread.last_read_message_id) {
      const res = await api.chat.getMessages(
        thread.id,
        0,
        undefined,
        undefined,
        undefined,
        thread.last_read_message_id,
      );

      dispatch(getThreadCounter(thread.id));
      dispatch(getGlobalChatCounters());
      messages = res.data;
      return { thread, messages };
    }

    messages = await (await api.chat.getMessages(thread.id, 1, undefined)).data;

    dispatch(getThreadCounter(thread.id));
    dispatch(getGlobalChatCounters());
    const data = messages;
    return { thread, messages: data };
  } catch (e: any) {
    NotificationService.error(i18next.t('general.notifications.defaultError'));
    return rejectWithValue(e.data as ErrorType);
  }
});
