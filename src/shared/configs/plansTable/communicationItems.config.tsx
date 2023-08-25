import { TFunction } from 'i18next';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { ReactComponent as NetworkIcon } from '../../../assets/Images/network/network-icon.svg';
import { ReactComponent as ChatIcon } from '../../../assets/Images/chat-icon.svg';
import { ReactComponent as EmojiIcon } from '../../../assets/Images/emoji.svg';
import { ReactComponent as FeedIcon } from '../../../assets/Images/feed-icon.svg';

export type CommunicationItemsType = {
  title: string;
  icon: JSX.Element;
  description: string;
};

export const getCommunicationItemsConfig = (t: TFunction): CommunicationItemsType[] => [
  {
    title: t('table.communication.chat.title'),
    icon: <ChatIcon />,
    description: t('table.communication.chat.description'),
  },
  {
    title: t('table.communication.network.title'),
    icon: <NetworkIcon />,
    description: t('table.communication.network.description'),
  },
  {
    title: t('table.communication.contacts.title'),
    icon: <EmojiIcon />,
    description: t('table.communication.contacts.description'),
  },
  {
    title: t('table.communication.notifications.title'),
    icon: <FeedIcon />,
    description: t('table.communication.notifications.description'),
  },
  {
    title: t('table.communication.reminders.title'),
    icon: <CheckCircleOutlineIcon />,
    description: t('table.communication.reminders.description'),
  },
];
