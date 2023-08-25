import axios from 'axios';
import { MessageModel, ThreadModel, UserEmoji } from '../../../models/chat/chat.model';
import { ResponseMetaType } from '../../../models/general';
import { MetaModel } from '../../../models/meta.model';

const chatEndpoints = {
  getThread: (id: number): Promise<ThreadModel> => axios.get(`/threads/${id}`),
  getMessages: (
    threadId: number,
    direction: number,
    lastMessageId?: number,
    message_id?: number,
    toMessageId?: number,
    to_message_id?: number,
  ): Promise<{ data: MessageModel[] }> =>
    axios.get(
      `/threads/${threadId}/messages?id=${lastMessageId || ''}&direction=${direction}&message_id=${
        message_id || ''
      }${toMessageId ? `&to_message_id=${toMessageId}` : ''}${
        to_message_id ? `&to_message_id=${to_message_id}` : ''
      }`,
    ),
  getThreads: (
    page: number,
    isGroup: number,
    query: string = '',
  ): Promise<{ data: ThreadModel[]; meta: ResponseMetaType }> =>
    axios.get(`threads?page=${page}&is_group=${isGroup}&query=${query}`),
  sendMessage: (
    threadId: number,
    data: { body: string; documents: { id: number }[]; replay_id?: number },
  ): Promise<MessageModel> => axios.post(`/threads/${threadId}/messages`, data),
  getThreadUnreadReplies: (threadId: number): Promise<number[]> => axios.get(`/threads/${threadId}/replies`),
  getMessage: (threadId: number): Promise<MessageModel> => axios.get(`messages/${threadId}`),
  deleteMessage: (id: number) => axios.delete(`/messages/${id}`),
  addReaction: (messageId: number, data: { emoji: string }): Promise<MessageModel> =>
    axios.post(`/messages/${messageId}/emojis`, data),
  deleteReaction: (emojiId: number): Promise<MessageModel> => axios.delete(`/emojis/${emojiId}`),
  getUsersReaction: (messageId: number): Promise<{ [key: string]: UserEmoji[] }> =>
    axios.get(`/messages/${messageId}/emojis`),
  editMessage: (
    data: { body: string; documents: { id: number }[] },
    messageId: number,
  ): Promise<MessageModel> => axios.put(`/messages/${messageId}`, data),
  getReplays: (
    replayId: number,
    page: number,
  ): Promise<{ message: MessageModel; replays: { data: MessageModel[]; meta: MetaModel } }> =>
    axios.get(`/messages/${replayId}/replays?page=${page}`),
  createGroupChat: (data: {
    subject: string;
    avatar: { id: number } | null;
    participants: { id: number }[];
  }): Promise<ThreadModel> => axios.post('/threads', data),
  editGroupChat: (
    data: { subject: string; avatar: { id: number } | null },
    id: number,
  ): Promise<ThreadModel> => axios.put(`/threads/${id}`, data),
  inviteToGroupChat: (userId: number, thread_id: number) =>
    axios.post(`/participants/${userId}`, { thread_id }),
  kickFromGroupChat: (userId: number, thread_id: number) =>
    axios.delete(`/participants/${userId}?thread_id=${thread_id}`),
  leaveFromGroupChat: (threadId: number): Promise<ThreadModel> => axios.delete(`/threads/${threadId}/self`),
  deleteFromGroupChat: (threadId: number): Promise<ThreadModel> => axios.delete(`/threads/${threadId}`),
  clearThreadHistory: (threadId: number): Promise<ThreadModel> =>
    axios.delete(`/threads/${threadId}/history`),
  getGlobalChatCounters: (): Promise<{
    count_unread_group: number;
    count_unread_message: number;
    count_unread_private: number;
  }> => axios.get('threads/global-counters'),
  getThreadCounter: (id: number): Promise<{ count_unread_messages: number }> =>
    axios.get(`/threads/${id}/counter`),
  seenThread: (id: number) => axios.put(`/threads/${id}/seen`),
  getSupportThread: (): Promise<ThreadModel> => axios.post(`threads/support`),
};

export default chatEndpoints;
