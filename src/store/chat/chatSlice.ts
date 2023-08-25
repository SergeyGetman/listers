import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatReaction, MessageModel, ThreadModel } from '../../shared/models/chat/chat.model';
import { MediaType } from '../../shared/models/media.model';
import {
  editMessage,
  getFirstMessages,
  getMessages,
  getReplays,
  getThread,
  getThreads,
  getThreadUnreadReplies,
  handleFindMessage,
  handleLoadChatData,
  sendMessage,
  sendReplyMessage,
  updateThread,
} from './chatThunk';

type EditStateType = {
  message: string;
  files: MediaType[];
  messageId: number;
};

export const START_INDEX = 1000000000000;
export interface ChatState {
  threads: {
    data: ThreadModel[];
    type: string;
  };
  query: string;
  thread: {
    data: ThreadModel | null;
    isFetching: boolean;
    unreadReplies: number[];
    isFullLoading: boolean;
  };
  messages: {
    data: MessageModel[];
    typingUser: string[];
    isLoading: boolean;
  };
  reply: {
    message: MessageModel | null;
    data: MessageModel[];
    isStopPagination: boolean;
    page: number;
    firstIndex: number;
  };
  stubs: {
    isNoFound: boolean;
    isNoMessages: boolean;
  };
  pendingMessages: MessageModel[];
  pendingReplyMessages: MessageModel[];
  editState: {
    data: EditStateType | null;
  };
}

const initialState: ChatState = {
  threads: {
    data: [],

    type: '',
  },
  query: '',
  messages: {
    data: [],

    typingUser: [],
    isLoading: false,
  },
  thread: {
    data: null,
    isFetching: false,
    unreadReplies: [],
    isFullLoading: true,
  },
  reply: {
    message: null,
    data: [],
    page: 1,
    isStopPagination: false,
    firstIndex: START_INDEX,
  },
  stubs: {
    isNoFound: false,
    isNoMessages: false,
  },
  editState: {
    data: null,
  },
  pendingMessages: [],
  pendingReplyMessages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatType: (state, action: PayloadAction<string>) => {
      state.threads.type = action.payload;
    },
    // Threads
    clearThreadsState: (state, action: PayloadAction<boolean | undefined>) => {
      state.threads.data = [];

      state.stubs.isNoFound = false;
      if (action.payload === undefined) {
        state.query = '';
      }
    },

    setFullThreadLoading(state, action: PayloadAction<boolean>) {
      state.thread.isFullLoading = action.payload;
    },

    setThreadsQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setThreadPreloadData(state, action: PayloadAction<ThreadModel>) {
      state.thread.data = action.payload;
    },
    addThreadsItems(state, action: PayloadAction<ThreadModel>) {
      if (
        (action.payload.owner_id && state.threads.type === 'group') ||
        (!!action.payload.owner_id === false && state.threads.type === 'personal')
      ) {
        const threadIndex = state.threads.data.findIndex((thread) => thread.id === action.payload.id);
        if (threadIndex !== 0 && threadIndex !== -1) {
          state.threads.data = [
            action.payload,
            ...state.threads.data.filter((thread) => thread.id !== action.payload.id),
          ];
          state.stubs.isNoFound = false;
        }
        if (threadIndex === -1) {
          state.stubs.isNoFound = false;
          state.threads.data = [action.payload, ...state.threads.data];
        }
      }
    },
    changeThreadCounter(state, action: PayloadAction<{ id: number; count: number }>) {
      state.threads.data = state.threads.data.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, count_unread_messages: action.payload.count };
        }
        return item;
      });
    },
    deleteThreadsItem(state, action: PayloadAction<number>) {
      const filtredData = state.threads.data.filter((thread) => thread.id !== action.payload);
      state.threads.data = filtredData;
      if (filtredData.length === 0) {
        state.stubs.isNoFound = true;
      }
    },
    clearChatState(state) {
      return { ...initialState, query: state.query };
    },
    // Thread
    setThreadFetching(state, action: PayloadAction<boolean>) {
      state.thread.isFetching = action.payload;
    },
    clearChatThreadState(state) {
      state.thread.data = null;
      state.thread.unreadReplies = [];
      state.messages.data = [];
      state.stubs.isNoMessages = false;
    },
    updateChatThread(state, action: PayloadAction<ThreadModel>) {
      state.thread.data = action.payload;
      state.threads.data = state.threads.data.map((thread) => {
        if (thread.id === action.payload.id) {
          return action.payload;
        }
        return thread;
      });
    },
    plusThreadCounter(state, action: PayloadAction<number>) {
      state.threads.data = state.threads.data.map((thread) => {
        if (thread.id === action.payload) {
          return {
            ...thread,
            count_unread_messages: thread.count_unread_messages ? thread.count_unread_messages + 1 : 1,
          };
        }
        return thread;
      });
    },
    setThreadCounter(state, action: PayloadAction<{ id: number; count: number }>) {
      state.threads.data = state.threads.data.map((thread) => {
        if (thread.id === action.payload.id) {
          return {
            ...thread,
            count_unread_messages: action.payload.count,
          };
        }
        return thread;
      });
    },

    // Messages
    setMessagesLoading(state, action: PayloadAction<boolean>) {
      state.messages.isLoading = action.payload;
    },
    addMessage(state, action: PayloadAction<MessageModel>) {
      state.messages.data = [...state.messages.data, action.payload];
    },
    addReplyMessage(state, action: PayloadAction<MessageModel>) {
      state.reply.data = [...state.reply.data, action.payload];
    },
    clearMessagesHistory(state) {
      state.messages.data = [];
      state.stubs.isNoMessages = true;
    },
    clearMessagesState(state) {
      state.messages.data = [];
    },
    deleteMessage(state, action: PayloadAction<number>) {
      state.messages.data = state.messages.data.filter((message) => message.id !== action.payload);
      // if (state.reply.message && state.reply.message.id === action.payload) {
      //   state.reply = initialState.reply;
      // }
    },
    deleteReplyMessage(state, action: PayloadAction<number>) {
      state.reply.data = state.reply.data.filter((message) => message.id !== action.payload);
    },
    addDeletedMessage(state, action: PayloadAction<{ message: MessageModel; index: number }>) {
      state.messages.data = [
        ...state.messages.data.slice(0, action.payload.index),
        action.payload.message,
        ...state.messages.data.slice(action.payload.index),
      ];
    },
    addDeletedReplyMessage(state, action: PayloadAction<{ message: MessageModel; index: number }>) {
      state.reply.data = [
        ...state.reply.data.slice(0, action.payload.index),
        action.payload.message,
        ...state.reply.data.slice(action.payload.index),
      ];
    },
    addTypingUser(state, action: PayloadAction<string>) {
      state.messages.typingUser.push(action.payload);
    },
    removeTypingUser(state, action: PayloadAction<string>) {
      state.messages.typingUser = state.messages.typingUser.filter((user) => user !== action.payload);
    },
    removeAllTypingUser(state) {
      state.messages.typingUser = [];
    },
    replaceMessage(state, action: PayloadAction<MessageModel>) {
      // TODO Render id ???
      state.messages.data = state.messages.data.map((message) => {
        if (message.id === action.payload.id) {
          return {
            ...action.payload,
            myEmoji: message.myEmoji,
            reactions: message.reactions,
          };
        }
        return message;
      });
      if (state.reply.message && state.reply.message.id === action.payload.id) {
        state.reply.message = {
          ...action.payload,
          myEmoji: state.reply.message.myEmoji,
          reactions: state.reply.message.reactions,
        };
      }
    },
    replaceReplyMessage(state, action: PayloadAction<MessageModel>) {
      // TODO Render id ???
      state.reply.data = state.reply.data.map((message) => {
        if (message.id === action.payload.id) {
          return action.payload;
        }
        return message;
      });
    },
    setSeenMessage(state) {
      state.messages.data = state.messages.data.map((item) => ({ ...item, status: 'seen' }));
    },
    setSeenReplyButton(state, action: PayloadAction<number>) {
      state.messages.data = state.messages.data.map((item) => {
        if (item.id === action.payload) {
          return { ...item, is_read_replies: true };
        }
        return item;
      });
    },
    addUnreadReply(state, action: PayloadAction<number>) {
      state.thread.unreadReplies = [
        ...state.thread.unreadReplies.filter((item) => item !== action.payload),
        action.payload,
      ];
    },
    clearReplyState(state) {
      state.reply = initialState.reply;
    },
    deleteMyReaction(state, action: PayloadAction<ChatReaction>) {
      if (state.reply.message && state.reply.message.id === action.payload.emoji.message_id) {
        state.reply.message.myEmoji = null;
        state.reply.message.reactions = state.reply.message.reactions.map((el) => {
          if (el.name === action.payload.emoji.emoji) {
            return { ...el, count: el.count - 1 };
          }
          return el;
        });
      }
      state[action.payload.is_reply ? 'reply' : 'messages'].data = state[
        action.payload.is_reply ? 'reply' : 'messages'
      ].data.map((item) => {
        if (item.id === action.payload.emoji.message_id) {
          return {
            ...item,
            myEmoji: null,
            reactions: item.reactions.map((el) => {
              if (el.name === action.payload.emoji.emoji) {
                return { ...el, count: el.count - 1 };
              }
              return el;
            }),
          };
        }
        return item;
      });
    },
    deleteReaction(state, action: PayloadAction<ChatReaction>) {
      if (state.reply.message && state.reply.message.id === action.payload.emoji.message_id) {
        state.reply.message.reactions = state.reply.message.reactions.map((el) => {
          if (el.name === action.payload.emoji.emoji) {
            return { ...el, count: el.count - 1 };
          }
          return el;
        });
      }

      state[action.payload.is_reply ? 'reply' : 'messages'].data = state[
        action.payload.is_reply ? 'reply' : 'messages'
      ].data.map((item) => {
        if (item.id === action.payload.emoji.message_id) {
          return {
            ...item,
            reactions: item.reactions.map((el) => {
              if (el.name === action.payload.emoji.emoji) {
                return { ...el, count: el.count - 1 };
              }
              return el;
            }),
          };
        }
        return item;
      });
    },
    addMyReaction(state, action: PayloadAction<ChatReaction>) {
      if (state.reply.message && state.reply.message.id === action.payload.emoji.message_id) {
        const isEmoji = state.reply.message.reactions.findIndex(
          (el) => el.name === action.payload.emoji.emoji,
        );
        if (isEmoji !== -1) {
          state.reply.message.myEmoji = action.payload.emoji;
          state.reply.message.reactions = state.reply.message.reactions.map((el) => {
            if (el.name === action.payload.emoji.emoji) {
              return { ...el, count: el.count + 1 };
            }
            return el;
          });
        } else {
          state.reply.message.myEmoji = action.payload.emoji;
          state.reply.message.reactions = [
            ...state.reply.message.reactions,
            { name: action.payload.emoji.emoji, count: 1 },
          ];
        }
      }

      state[action.payload.is_reply ? 'reply' : 'messages'].data = state[
        action.payload.is_reply ? 'reply' : 'messages'
      ].data.map((item) => {
        if (item.id === action.payload.emoji.message_id) {
          const isEmoji = item.reactions.findIndex((el) => el.name === action.payload.emoji.emoji);
          if (isEmoji !== -1) {
            return {
              ...item,
              myEmoji: action.payload.emoji,
              reactions: item.reactions.map((el) => {
                if (el.name === action.payload.emoji.emoji) {
                  return { ...el, count: el.count + 1 };
                }
                return el;
              }),
            };
          }
          return {
            ...item,
            myEmoji: action.payload.emoji,
            reactions: [...item.reactions, { name: action.payload.emoji.emoji, count: 1 }],
          };
        }
        return item;
      });
    },
    addReaction(state, action: PayloadAction<ChatReaction>) {
      if (state.reply.message && state.reply.message.id === action.payload.emoji.message_id) {
        const isEmoji = state.reply.message.reactions.findIndex(
          (el) => el.name === action.payload.emoji.emoji,
        );
        if (isEmoji !== -1) {
          state.reply.message.reactions = state.reply.message.reactions.map((el) => {
            if (el.name === action.payload.emoji.emoji) {
              return { ...el, count: el.count + 1 };
            }
            return el;
          });
        } else {
          state.reply.message.reactions = [
            ...state.reply.message.reactions,
            { name: action.payload.emoji.emoji, count: 1 },
          ];
        }
      }
      state[action.payload.is_reply ? 'reply' : 'messages'].data = state[
        action.payload.is_reply ? 'reply' : 'messages'
      ].data.map((item) => {
        if (item.id === action.payload.emoji.message_id) {
          const isEmoji = item.reactions.findIndex((el) => el.name === action.payload.emoji.emoji);
          if (isEmoji !== -1) {
            return {
              ...item,
              reactions: item.reactions.map((el) => {
                if (el.name === action.payload.emoji.emoji) {
                  return { ...el, count: el.count + 1 };
                }
                return el;
              }),
            };
          }
          return { ...item, reactions: [...item.reactions, { name: action.payload.emoji.emoji, count: 1 }] };
        }
        return item;
      });
    },
    addPendingMessage(state, action: PayloadAction<MessageModel>) {
      state.pendingMessages = [...state.pendingMessages, action.payload];
    },
    removePendingMessage(state, action: PayloadAction<string>) {
      state.pendingMessages = state.pendingMessages.filter((el) => el.pendingId !== action.payload);
    },
    addPendinReplygMessage(state, action: PayloadAction<MessageModel>) {
      state.pendingReplyMessages = [...state.pendingReplyMessages, action.payload];
    },
    removePendingReplyMessage(state, action: PayloadAction<string>) {
      state.pendingReplyMessages = state.pendingReplyMessages.filter((el) => el.pendingId !== action.payload);
    },
    setEditState(state, action: PayloadAction<EditStateType | null>) {
      state.editState.data = action.payload;
    },
    resetThreadChatQuery(state) {
      state.query = '';
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getThreads.fulfilled, (state, { payload }) => {
      if (payload.meta.current_page !== 1) {
        state.threads.data = [...state.threads.data, ...payload.data];
      } else {
        state.threads.data = payload.data;
      }

      if (payload.data.length === 0 && payload.meta.current_page === 1) {
        state.stubs.isNoFound = true;
      } else {
        state.stubs.isNoFound = false;
      }
    });

    addCase(getThread.fulfilled, (state, { payload }) => {
      state.thread.data = payload;
    });

    addCase(updateThread.fulfilled, (state, { payload }) => {
      state.thread.data = state?.thread?.data?.id === payload.id ? payload : state.thread.data;
      state.threads.data = state.threads.data.map((thread) => {
        if (thread.id === payload.id) {
          return payload;
        }
        return thread;
      });
    });

    addCase(getMessages.fulfilled, (state, { payload }) => {
      if (payload.isReplice) {
        state.messages.data = payload.data;
      }
      if (payload.direction === 1) {
        const topMessages = payload.data;
        state.stubs.isNoMessages = payload.data.length === 0;
        if (payload.data.length === 0) return;
        state.messages.data = [...topMessages, ...state.messages.data];
      } else {
        const bottomMessages = payload.data;
        if (payload.data.length === 0) return;
        state.messages.data = [...state.messages.data, ...bottomMessages];
      }
      // state.thread.isFullLoading = true;
    });
    addCase(sendMessage.fulfilled, (state, { payload }) => {
      state.messages.data = payload.answer
        ? [...state.messages.data, payload, payload.answer]
        : [...state.messages.data, payload];
    });
    addCase(sendReplyMessage.fulfilled, (state, { payload }) => {
      state.reply.data = [...state.reply.data, payload];
    });
    addCase(getThreadUnreadReplies.fulfilled, (state, { payload }) => {
      state.thread.unreadReplies = payload;
    });

    addCase(editMessage.fulfilled, (state, { payload }) => {
      state.messages.data = state.messages.data.map((message) => {
        if (message.id === payload.id) {
          return payload;
        }
        return message;
      });
    });
    addCase(getReplays.fulfilled, (state, { payload }) => {
      const newReply = payload.replays.data.reverse();

      state.reply.message = payload.message;
      state.reply.data =
        payload.replays.meta.current_page === 1 ? [...newReply] : [...newReply, ...state.reply.data];
      state.reply.page = payload.replays.meta.current_page + 1;
      state.reply.isStopPagination = payload.replays.data.length < 15;
    });

    addCase(getFirstMessages.fulfilled, (state, { payload }) => {
      state.messages.data = payload.data;
    });

    addCase(handleFindMessage.fulfilled, (state, { payload }) => {
      const messages = payload.data;
      state.messages.data = messages;
    });
    addCase(handleLoadChatData.fulfilled, (state, { payload }) => {
      state.thread.data = payload.thread;
      state.messages.data = payload.messages;
      state.messages.isLoading = false;
    });
  },
});

export const {
  clearThreadsState,
  addThreadsItems,
  deleteThreadsItem,

  setThreadsQuery,
  clearChatState,
  setThreadFetching,
  clearChatThreadState,
  addMessage,
  clearMessagesState,
  deleteMessage,
  addDeletedMessage,
  replaceMessage,
  clearReplyState,
  addReplyMessage,
  setSeenMessage,
  replaceReplyMessage,
  deleteReplyMessage,
  addDeletedReplyMessage,
  clearMessagesHistory,
  setFullThreadLoading,
  setThreadCounter,
  plusThreadCounter,
  setSeenReplyButton,
  addUnreadReply,
  addTypingUser,
  removeTypingUser,
  removeAllTypingUser,
  setChatType,
  setMessagesLoading,
  deleteMyReaction,
  deleteReaction,
  addMyReaction,
  addReaction,
  changeThreadCounter,
  setThreadPreloadData,
  addPendingMessage,
  removePendingMessage,
  setEditState,
  addPendinReplygMessage,
  removePendingReplyMessage,
  resetThreadChatQuery,
} = chatSlice.actions;
export default chatSlice.reducer;
