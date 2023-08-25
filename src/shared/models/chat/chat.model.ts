import { AvatarModel } from '../avatar.model';
import { ItemUserModel } from '../itemUser.model';
import { MediaType } from '../media.model';

export type ThreadUserType = {
  avatar: AvatarModel;
  chat_id: number | null;
  connection_status: string | null;
  first_name: string;
  full_name: string;
  id: number;
  last_name: string;
  role: null | string;
};

export type ChatReaction = {
  emoji: {
    created_at: string;
    emoji: string;
    id: number;
    message?: MessageModel;
    message_id: number;
    updated_at: string;
    user_id: number;
  };
  is_reply: boolean;
  message_id: number;
  user?: any;
};

export type ThreadModel = {
  avatar: AvatarModel;
  count_unread_messages: number;
  id: number;
  is_active: boolean;
  is_support: boolean;
  is_system: boolean;
  owner_id: number | null;
  subject: string;
  all_users: ItemUserModel[];
  users: ItemUserModel[];
  renderId?: string;
  last_read_message_id: number | null;
};

export type ReactionsModel = {
  name: string;
  count: number;
};

export type UserEmoji = {
  avatar: AvatarModel;
  first_name: string;
  full_name: string;
  id: number;
  last_name: string;
};

export type MyEmojiModel = {
  created_at: string;
  emoji: string;
  id: number;
  message_id: number;
  updated_at: string;
  user_id: number;
};

export type SenderModel = {
  avatar: AvatarModel;
  connection_status: null | string;
  first_name: string;
  full_name: string;
  id: number;
  last_name: string;
  role: null | string;
};

export type LastReplyModel = {
  body: string;
  count_replays: null | number;
  created_at: string;
  edited_at: null | string;
  id: number;
  last_reply: LastReplyModel | null;
  is_read_replies?: boolean;
  media: null;
  reactions: ReactionsModel[];
  replay_id: number;
  replayed_user_id: null | number;
  sender: SenderModel;
  user_id: number;
};

export type MessageModel = {
  body: string;
  count_replays: number | null;
  created_at: string;
  edited_at: string | null;
  id: number;
  thread_id?: number;
  last_reply: LastReplyModel | null;
  media: MediaType[];
  myEmoji: MyEmojiModel | null;
  reactions: ReactionsModel[];
  replay_id: number | null;
  replayed_user_id: number | null;
  sender: null;
  status: string;
  user_id: number;
  renderId?: string;
  is_read_replies?: boolean;
  isShowDate?: boolean;
  pendingId?: string;
  answer?: MessageModel;
};
