/* eslint-disable @typescript-eslint/no-unused-vars */
import { Howl, Howler } from 'howler';
import { v4 as uuidv4 } from 'uuid';
import { ChatReaction, MessageModel, ThreadModel } from '../../shared/models/chat/chat.model';
import { AppDispatch, RootState } from '../store';
import {
  addMessage,
  addThreadsItems,
  deleteMessage,
  deleteThreadsItem,
  replaceMessage,
  deleteReplyMessage,
  replaceReplyMessage,
  setSeenMessage,
  addReplyMessage,
  plusThreadCounter,
  addUnreadReply,
  addTypingUser,
  removeTypingUser,
  addMyReaction,
  addReaction,
  deleteMyReaction,
  deleteReaction,
  clearReplyState,
  changeThreadCounter,
} from './chatSlice';
import {
  addThread,
  fastMessageSend,
  fastReplyMessageSend,
  getGlobalChatCounters,
  getMessage,
  getThreadCounter,
  getThreadUnreadReplies,
  seenThread,
  updateThread,
} from './chatThunk';
import notificationSound from '../../assets/sounds/notification.mp3';
import { setChatCounters } from '../Common/commonSlice';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import modalObserver from '../../shared/utils/observers/modalObserver';
import { handleDeleteSocialNetwork } from '../auth/authThunk';

export type ChatSocketType = {
  message: MessageModel;
  thread: ThreadModel;
};

export const chatGlobalSocketThreadUpdate =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(updateThread({ id }));
  };
export const chatGlobalSocketThreadCreate =
  (event: { thread_id: number }) => async (dispatch: AppDispatch) => {
    dispatch(addThread(event.thread_id));
  };
export const chatGlobalSocketThreadRemove = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(deleteThreadsItem(id));
};
export const chatGlobalSocketThreadCounter = () => {};

export const chatGlobalSocketMessageCreated =
  (event: ChatSocketType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const userId = getState().profile.data?.id;
    const chatCounter = getState().common.counters.chat;
    const openedThread = getState().chat.thread.data;
    const threadsData = getState().chat.threads.data;
    const openedRely = getState().chat.reply;
    const type = getState().chat.threads.type;
    const eventType = event.thread.users.length <= 2 ? 'personal' : 'group';
    const sound = new Howl({
      src: notificationSound,
      format: ['mp3'],
    });
    Howler.volume(1.0);

    const foundThread = threadsData.find((item) => item.id === event.thread.id);

    if (foundThread?.id) {
      dispatch(addThreadsItems(event.thread));
      if (event.message.replay_id === null) {
        dispatch(
          changeThreadCounter({
            id: event.thread.id,
            count: foundThread.id === openedThread?.id ? 0 : foundThread.count_unread_messages + 1,
          }),
        );
      }
    } else {
      if (type === eventType) {
        dispatch(addThread(event.thread.id));
      }
    }

    if (event.thread.id === openedThread?.id) {
      dispatch(seenThread(event.thread.id));
    }

    // global counter
    if (event.thread.id !== openedThread?.id) {
      if (event.thread.owner_id) {
        dispatch(
          setChatCounters({
            ...chatCounter,
            count_unread_group: chatCounter.count_unread_group + 1,
            count_unread_message: chatCounter.count_unread_message + 1,
          }),
        );
      } else {
        dispatch(
          setChatCounters({
            ...chatCounter,
            count_unread_private: chatCounter.count_unread_private + 1,
            count_unread_message: chatCounter.count_unread_message + 1,
          }),
        );
      }
    }

    if (event.message.replay_id) {
      if (openedRely.message === null || openedRely.message.id !== event.message.replay_id) {
        dispatch(getThreadCounter(event.thread.id));
        dispatch(getGlobalChatCounters());
      }
    }

    // reply counter
    if (openedThread && openedThread.id === event.thread.id && event.message.replay_id) {
      if (openedRely.message === null || openedRely.message.id !== event.message.replay_id) {
        dispatch(addUnreadReply(event.message.replay_id));
      }
    }

    if (event.message.replay_id && event.message.replay_id !== openedRely?.message?.id) {
      sound.play();
      if (event.thread.owner_id && event.message.replayed_user_id !== userId) {
        return;
      }
      NotificationService.chatMessage(event.thread, event.message, (messageText: string) => {
        if (event.message.replay_id) {
          dispatch(fastReplyMessageSend(messageText, event.thread.id, event.message.replay_id));
          dispatch(seenThread(event.thread.id));
        } else {
          dispatch(fastMessageSend(messageText, event.thread.id));
          dispatch(seenThread(event.thread.id));
        }
      });
    } else if (openedThread?.id !== event.thread.id) {
      sound.play();
      NotificationService.chatMessage(event.thread, event.message, (messageText: string) => {
        if (event.message.replay_id) {
          dispatch(fastReplyMessageSend(messageText, event.thread.id, event.message.replay_id));
          dispatch(seenThread(event.thread.id));
        } else {
          dispatch(fastMessageSend(messageText, event.thread.id));
          dispatch(seenThread(event.thread.id));
        }
      });
    }
  };

export const chatGlobalSocketCounters = () => async (dispatch: AppDispatch) => {};

export const chatSocketMessageCreated =
  (event: ChatSocketType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const openedThread = getState().chat.thread.data;
    const userId = getState().profile.data?.id;
    if (userId !== event.message.user_id) {
      dispatch(addMessage({ ...event.message, renderId: `message-${uuidv4()}` }));
    }

    if (event.message.user_id === userId && openedThread) {
      dispatch(addThreadsItems({ ...openedThread, count_unread_messages: 0 }));
    }
  };

export const chatSocketMessageSeen =
  (event: { thread_id: number; user_id: number }) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const userId = getState().profile.data.id;
    if (event.user_id !== userId) {
      dispatch(setSeenMessage());
    }
  };

export const chatSocketMessageUpdate =
  (event: ChatSocketType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const openedRely = getState().chat.reply;
    dispatch(getMessage(event.message.id)).then((result) => {
      if (getMessage.fulfilled.match(result)) {
        dispatch(
          replaceMessage({
            ...result.payload,
            is_read_replies:
              openedRely.message === null || openedRely.message.id !== result.payload.id
                ? result.payload.is_read_replies
                : true,
          }),
        );
      }
    });
  };

export const chatSocketMessageDelete =
  (event: ChatSocketType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const reply = getState().chat.reply;
    const openedThread = getState().chat.thread.data;
    const profileId = getState().profile.data?.id;
    if (reply.message && reply.message.id === event.message.id) {
      modalObserver.removeModal(ModalNamesEnum.replyModal);
      dispatch(clearReplyState());
      if (profileId && profileId !== event.message.user_id) {
        // TODO locale and need need new text
        NotificationService.error('Message deleted');
      }
    }
    if (event.message.thread_id && openedThread?.id === event.message.thread_id) {
      dispatch(getThreadUnreadReplies(event.message.thread_id));
    }

    dispatch(deleteMessage(event.message.id));
  };
export const chatSocketMessageTyping =
  (event: { isTyping: boolean; name: string }) => async (dispatch: AppDispatch) => {
    if (event.isTyping) {
      dispatch(addTypingUser(event.name));
      return;
    }
    dispatch(removeTypingUser(event.name));
  };

export const chatSocketReplyMessageCreate =
  (event: ChatSocketType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const userId = getState().profile.data?.id;

    if (event.message.user_id !== userId) {
      dispatch(addReplyMessage(event.message));
    }
  };

export const chatSocketReplyMessageUpdate =
  (event: ChatSocketType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const selectedMessage = getState().chat.messages.data.find((message) => message.id === event.message.id);
    dispatch(
      replaceReplyMessage({
        ...event.message,
        myEmoji: selectedMessage?.myEmoji || null,
        is_read_replies: selectedMessage?.is_read_replies || false,
      }),
    );
  };

export const chatSocketThreadUpdated = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(updateThread({ id }));
};

export const chatSocketReplyMessageDelete = (event: ChatSocketType) => async (dispatch: AppDispatch) => {
  dispatch(deleteReplyMessage(event.message.id));
};

export const chatSocketAddReaction =
  (event: ChatReaction) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const userId = getState().profile.data.id;
    if (userId === event.emoji.user_id) {
      dispatch(addMyReaction(event));
      return;
    }
    dispatch(addReaction(event));
  };

export const chatSocketRemoveReaction =
  (event: ChatReaction) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const userId = getState().profile.data.id;
    if (userId === event.emoji.user_id) {
      dispatch(deleteMyReaction(event));
      return;
    }
    dispatch(deleteReaction(event));
  };
