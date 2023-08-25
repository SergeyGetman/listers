import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ReplyIcon from '@mui/icons-material/Reply';
import React, { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  ChatMessageActionsContainer,
  ChatMessageActionsItem,
  ChatMessageActionsItemContainer,
} from './ChatMessageAction.style';
import EmojiPopover from '../../../../../components/popovers/EmojiPopover';
import BaseActionMenu from '../../../../../components/actionMenus/BaseActionMenu';

type Props = {
  isEmoji: boolean;
  isReply: boolean;
  isMenu: boolean;
  isPin: boolean;
  isDelete: boolean;
  isEdit: boolean;
  onSelectEmoji: (emoji: string) => void;
  onReply: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onPin: () => void;
};

const ChatMessageActions: FC<Props> = ({
  isEmoji,
  isReply,
  isMenu,
  isPin,
  isDelete,
  isEdit,
  onSelectEmoji,
  onReply,
  onDelete,
  onEdit,
  onPin,
}) => {
  const { t } = useTranslation();

  const menuList = useMemo(() => {
    const menu = [];
    if (isEdit) {
      menu.push({
        label: t('general.buttons.edit'),
        callback: onEdit,
      });
    }
    if (isPin) {
      menu.push({
        label: t('general.buttons.pin'),
        callback: onPin,
      });
    }
    if (isDelete) {
      menu.push({
        label: t('general.buttons.delete'),
        callback: onDelete,
      });
    }
    return menu;
  }, [isDelete, isEdit, isPin, onDelete, onEdit, onPin, t]);

  return (
    <ChatMessageActionsContainer className="chat-message-actions">
      {isEmoji && (
        <ChatMessageActionsItemContainer>
          <EmojiPopover
            onSelectEmoji={onSelectEmoji}
            anchorOriginVertical="bottom"
            anchorOriginHorizontal="center"
            transformOriginHorizontal="right"
            transformOriginVertical="top"
          >
            <ChatMessageActionsItem disableTouchRipple>
              <InsertEmoticonIcon />
            </ChatMessageActionsItem>
          </EmojiPopover>
        </ChatMessageActionsItemContainer>
      )}
      {isReply && (
        <ChatMessageActionsItemContainer>
          <ChatMessageActionsItem disableTouchRipple onClick={onReply}>
            <ReplyIcon />
          </ChatMessageActionsItem>
        </ChatMessageActionsItemContainer>
      )}
      {isMenu && (
        <ChatMessageActionsItemContainer>
          <BaseActionMenu iconSize="small" isUseChildrenComponent menuList={menuList}>
            <ChatMessageActionsItem disableTouchRipple>
              <MoreVertIcon />
            </ChatMessageActionsItem>
          </BaseActionMenu>
        </ChatMessageActionsItemContainer>
      )}
    </ChatMessageActionsContainer>
  );
};

export default memo(ChatMessageActions);
